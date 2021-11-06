import { useState, useEffect, useCallback } from "react";
import { firebase } from "../initFirebase";
import { Button, Toast, Container, Col, Row } from "react-bootstrap";
import PopUpModal from "../components/modal/PopUpModal";
import DataTable from "../components/table/DataTable";
import PoiForm from "../components/form/PoiForm";
import MapView from "../components/MapView";
import QrCodeHandler from "../components/qrcode/QrCodeHandler";
import { getAllPois, updatePoi } from "../services/dbService";

/*
<Button variant="secondary" onClick={generateQR}>
Generate QR Code
</Button>
<QRCode value={qrCode} /> */

const AdminPage = () => {
  const db = firebase.firestore();
  const COLLECTION_POIS = "pois";
  const poisCollection = db.collection(COLLECTION_POIS);

  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [error, setError] = useState("");
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pois, setPois] = useState();
  const [poiToEdit, setPoiToEdit] = useState(null);
  const [qrRef, setQrRef] = useState();

  const handleShowNew = () => setShowNew(true);
  const handleCloseNew = () => setShowNew(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowQr = () => setShowQrModal(true);
  const handleCloseQr = () => setShowQrModal(false);

  console.log("POI for admin", pois);

  const changePoiActivity = useCallback(async (id, isActive) => {
    setLoading(true);
    console.log(id, isActive);
    const fields = { isActive: !isActive };
    const result = await updatePoi(id, fields);
    console.log(result);
    PoisToDisplay();
    setLoading(false);
  }, []);

  const editPoi = (id) => {
    console.log(id);
    let poiData = pois.find((poi) => poi.id === id);
    poiData = { ...poiData, id };
    console.log(poiData);
    setPoiToEdit(poiData);
    handleShowEdit();
  };
  const showQr = (website) => {
    //creates an image
    console.log(website);
    setQrRef(website);
    handleShowQr();
  };

  const onSubmit = async (
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
    console.log("submit");
    setLoading(true);

    try {
      await poisCollection.add({
        title,
        latitude,
        longitude,
        description,
        inputWebsite,
        isActive,
      });
      PoisToDisplay();
    } catch (e) {
      console.error(e);
      setError("Could not add new POI");
    } finally {
      setLoading(false);
    }
    if (!error) handleCloseNew();
  };

  const onEdit = useCallback(
    async (event, id, title, latitude, longitude, description, inputWebsite, isActive) => {
      event.preventDefault();
      console.log("edit : ");
      console.log(event.target);
      setLoading(true);
      const fields = { title, latitude, longitude, description, inputWebsite, isActive };
      const result = await updatePoi(id, fields);
      if (!result.err) handleCloseEdit();
      PoisToDisplay();
      setLoading(false);
    },
    []
  );
  const handleMapSelection = (selectedPois) => {
    setMapData(selectedPois);
  };

  const PoisToDisplay = useCallback(async () => {
    let poisList = await getAllPois();
    console.log(poisList);
    setPois(poisList);
  }, []);

  useEffect(() => {
    console.log("Admin rendered");
    PoisToDisplay();
  }, []);

  if (!pois || pois.length === 0 || loading) return <p>"Loading"</p>;
  else
    return (
      <>
        <h1>Welcome on admin page</h1>

        <PopUpModal
          title={"Creat new POI"}
          show={showNew}
          handleHide={handleCloseNew}
          component={<PoiForm onSubmit={onSubmit} values={null} />}
        />
        <PopUpModal
          title={"Modify POI"}
          show={showEdit}
          handleHide={handleCloseEdit}
          component={<PoiForm onSubmit={onEdit} values={poiToEdit} />}
        />
        <PopUpModal
          title={"Qr code"}
          show={showQrModal}
          handleHide={handleCloseQr}
          component={<QrCodeHandler value={qrRef} />}
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
              />
              <Button style={style.tableButton} onClick={handleShowNew}>
                Create new POI
              </Button>
            </Col>
          </Row>
          <Row style={style.map}>
            <MapView pois={mapData} />
          </Row>
        </Container>

        {/*   {isOpen ? <AddPoi showNew={showModal} isOpen={isOpen} /> : null}*/}
        {/*{isOpen ? <AddPoi showNew={showModal} isOpen={isOpen} /> : null} <MapView user={user} />*/}
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
    width: "70%",
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
