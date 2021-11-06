import { useAuth } from "../context/Auth2";
import { getGPXAsString, getPoisByUser } from "../services/dbService";
import PopUpModal from "../components/modal/PopUpModal";
import DataTable from "../components/table/DataTable";
import MapView from "../components/MapView";
import QrCodeHandler from "../components/qrcode/QrCodeHandler";

import { useCallback, useEffect, useState } from "react";
import { Dropdown, Button, Container, Col, Row, Spinner } from "react-bootstrap";

const UserPage = () => {
  const { currentUser } = useAuth();
  const [showQrModal, setShowQrModal] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [qrRef, setQrRef] = useState();

  const [gpxHistory, setgpxHistory] = useState();
  const [gpx, setgpx] = useState();
  const [pois, setPois] = useState();

  const handleShowQr = () => setShowQrModal(true);
  const handleCloseQr = () => setShowQrModal(false);

  const GpxToDisplay = useCallback(async () => {
    setLoading(true);
    let history = await getGPXAsString(currentUser);
    setgpxHistory(history);
    setgpx(history[history.length - 1]);
    let poisList = await getPoisByUser(currentUser, false);
    setPois(poisList);
    setLoading(false);
  }, []);

  useEffect(() => {
    GpxToDisplay();
  }, []);

  function handleClick(event) {
    event.preventDefault();
    console.log("gpx User", event.target.name);
    setgpx(event.target.name);
  }
  const showQr = (website) => {
    //creates an image
    console.log(website);
    setQrRef(website);
    handleShowQr();
  };
  const handleMapSelection = (selectedPois) => {
    setMapData(selectedPois);
  };

  if (!gpx || !pois || loading)
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
        <h1>Welcome on user page</h1>
        <PopUpModal
          title={"Qr code"}
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
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={style.mapDropdown}>
                  History
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {gpxHistory.map((jesus, index) => (
                    <Dropdown.Item name={jesus} onClick={(event) => handleClick(event)} key={index}>
                      {jesus}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <MapView pois={mapData} gpx={gpx} />
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
