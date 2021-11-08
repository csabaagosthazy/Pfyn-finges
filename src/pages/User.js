import { useAuth } from "../context/Auth2";
import { getGPXAsString, getPoisByUser, showGPX } from "../services/dbService";
import PopUpModal from "../components/modal/PopUpModal";
import DataTable from "../components/table/DataTable";
import MapView from "../components/MapView";
import QrCodeHandler from "../components/qrcode/QrCodeHandler";

import { useCallback, useEffect, useState } from "react";
import { Container, Col, Row, Spinner } from "react-bootstrap";

import translation from "../locales/translation.json"
import {useLang} from "../context/LanguageContext";

const UserPage = () => {
  const {language} = useLang();
  const { currentUser } = useAuth();
  const [showQrModal, setShowQrModal] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrRef, setQrRef] = useState();

  const [gpxHistory, setgpxHistory] = useState(null);
  let [positions, setPositions] = useState(null);
  const [pois, setPois] = useState(null);

  const handleShowQr = () => setShowQrModal(true);
  const handleCloseQr = () => setShowQrModal(false);

  const getUserHistory = useCallback(async () => {
    setLoading(true);
    let userGpx = await getGPXAsString(currentUser);
    if (!userGpx.err && userGpx.response.length > 0) {
      setgpxHistory(userGpx.response);
      let res = await showGPX(userGpx.response[0]);
      if (!res.err) {
        setPositions(res.response);
      }
    }
    let poiList = await getPoisByUser(currentUser);

    if (!poiList.err && poiList.response.length > 0) {
      setPois(poiList.response);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getUserHistory();
  }, []);

  const setMapGpx = useCallback(async (event) => {
    setLoading(true);
    event.preventDefault();
    let res = await showGPX(event.target.name);
    if (!res.err) {
      setPositions(res.response);
    }
    setLoading(false);
  }, []);

  const showQr = (website) => {
    //creates an image

    setQrRef(website);
    handleShowQr();
  };
  const handleMapSelection = (selectedPois) => {
    setMapData(selectedPois);
  };

  if (loading)
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
        <h1>{translation[language].welcome_user}</h1>
        <PopUpModal
          title={translation[language].qr_code}
          show={showQrModal}
          handleHide={handleCloseQr}
          component={<QrCodeHandler value={qrRef} fullFunctions={false} />}
        />
        <Container style={style.container} fluid>
          <Row style={style.tableRow}>
            <Col style={style.table}>
              <DataTable
                data={pois}
                showQr={showQr}
                setMapPoi={handleMapSelection}
                fullFunctions={false}
              />
            </Col>
          </Row>
          <Row style={style.mapRow}>
            <Col style={style.table}>
              <MapView
                pois={mapData}
                positions={positions}
                gpxHistory={gpxHistory}
                setGpx={setMapGpx}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
};

export default UserPage;

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
  mapDropdown: {
    margin: 10,
  },
  mapRow: {
    alignItems: "center",
    width: "60%",
    marginTop: 20,
  },
  map: { display: "flex", flexDirection: "column", alignItems: "center" },
};
