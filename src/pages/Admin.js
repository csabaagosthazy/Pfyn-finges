import { useState, useEffect, useCallback } from "react";
import { Button, Container, Col, Row, Spinner } from "react-bootstrap";
import PopUpModal from "../components/modal/PopUpModal";
import DataTable from "../components/table/DataTable";
import PoiForm from "../components/form/PoiForm";
import MapView from "../components/MapView";
import QrCodeHandler from "../components/qrcode/QrCodeHandler";
import InfoToast from "../components/toast/InfoToast";
import { getAllPois, updatePoi, addPoi } from "../services/dbService";
import translation from "../locales/translation.json";
import { useLang } from "../context/LanguageContext";

const AdminPage = () => {
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pois, setPois] = useState();
  const [poiToEdit, setPoiToEdit] = useState(null);
  const [qrRef, setQrRef] = useState();
  const [toastProp, setToastProp] = useState({ message: "", type: "" });

  const { language } = useLang();

  const handleShowNew = () => setShowNew(true);
  const handleCloseNew = () => setShowNew(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowQr = () => setShowQrModal(true);
  const handleCloseQr = () => setShowQrModal(false);

  const changePoiActivity = useCallback(async (id, isActive) => {
    setLoading(true);
    const fields = { isActive: !isActive };
    const result = await updatePoi(id, fields);
    PoisToDisplay();
    setLoading(false);
    if (!result.err) {
      setToastProp({ message: result.message, type: "info" });
    } else {
      setToastProp({ message: result.message, type: "warning" });
    }
    setShowToast(true);
  }, []);

  const editPoi = (id) => {
    let poiData = pois.find((poi) => poi.id === id);
    poiData = { ...poiData, id };
    setPoiToEdit(poiData);
    handleShowEdit();
  };
  const showQr = (website) => {
    //creates an image
    setQrRef(website);
    handleShowQr();
  };

  const onSubmit = useCallback(
    async (
      event,
      id,
      title,
      latitude,
      longitude,
      description,
      inputWebsite,
      isActive
    ) => {
      event.preventDefault();
      setLoading(true);
      const fields = {
        title,
        latitude,
        longitude,
        description,
        inputWebsite,
        isActive,
      };
      const result = await addPoi(fields);
      await PoisToDisplay();
      if (result.err) {
        setToastProp({ message: result.message, type: "warning" });
      } else {
        setToastProp({ message: result.message, type: "info" });
        handleCloseNew();
      }
      setLoading(false);
      setShowToast(true);
    },
    []
  );

  const onEdit = useCallback(
    async (
      event,
      id,
      title,
      latitude,
      longitude,
      description,
      inputWebsite,
      isActive
    ) => {
      event.preventDefault();
      setLoading(true);
      const fields = {
        title,
        latitude,
        longitude,
        description,
        inputWebsite,
        isActive,
      };
      const result = await updatePoi(id, fields);
      await PoisToDisplay();
      if (result.err) {
        setToastProp({ message: result.message, type: "warning" });
      } else {
        setToastProp({ message: result.message, type: "info" });
        handleCloseEdit();
      }
      setLoading(false);
      setShowToast(true);
    },
    []
  );
  const handleMapSelection = (selectedPois) => {
    setMapData(selectedPois);
  };

  const PoisToDisplay = useCallback(async () => {
    let poiList = await getAllPois();
    if (!poiList.err) setPois(poiList.response);
  }, []);

  useEffect(() => {
    PoisToDisplay();
  }, []);

  if (!pois || pois.length === 0 || loading)
    return (
      <Spinner
        animation="border"
        variant="primary"
        style={{ position: "fixed", top: "50%", left: "50%" }}
      />
    );
  else
    return (
      <>
        <InfoToast
          show={showToast}
          setShow={setShowToast}
          message={toastProp.message}
          type={toastProp.type}
        />

        <h1>{translation[language].welcome_admin}</h1>

        <PopUpModal
          title={translation[language].new_poi}
          show={showNew}
          handleHide={handleCloseNew}
          component={<PoiForm onSubmit={onSubmit} values={null} />}
        />
        <PopUpModal
          title={translation[language].modify_poi}
          show={showEdit}
          handleHide={handleCloseEdit}
          component={<PoiForm onSubmit={onEdit} values={poiToEdit} />}
        />
        <PopUpModal
          title={translation[language].qr_code}
          show={showQrModal}
          handleHide={handleCloseQr}
          component={<QrCodeHandler value={qrRef} fullFunctions={true} />}
        />
        <Container style={style.container} fluid>
          <Row style={style.tableRow}>
            <Col style={style.table}>
              <DataTable
                data={pois}
                changePoiActivity={changePoiActivity}
                editPoi={editPoi}
                showQr={showQr}
                setMapPoi={handleMapSelection}
                fullFunctions={true}
              />
              <Button style={style.tableButton} onClick={handleShowNew}>
                {translation[language].new_poi}
              </Button>
            </Col>
          </Row>
          <Row style={style.map}>
            <MapView pois={mapData} />
          </Row>
        </Container>
      </>
    );
};

export default AdminPage;

const style = {
  container: {
    backgroundColor: "#e3ffea",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  tableRow: {
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tableButton: {
    margin: 10,
  },
  map: { width: "60%" },
};
