import { useAuth } from "../context/AuthContext";
import { getGPXAsString, getPoisByUser, getUserParams } from "../services/dbService";
import MapView from "../components/MapView";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { showGPX } from "../services/dbService";

const test = {
  currentLocation: { lat: 46.294574, lng: 7.569767 },
  zoom: 16,
};

const UserPage = () => {
  const { user, signOut } = useAuth();
  const [gpxHistory, setgpxHistory] = useState();
  const [pois, setPois] = useState();
  const [positions, setPositions] = useState();

  useEffect(() => {
    loadPois();

    loadGpx();
    showGPX().then((positions) => setPositions(positions));
  }, []);

  const loadPois = async () => {
    let history = await getGPXAsString(user);
    setgpxHistory(history);
  };

  const loadGpx = async () => {
    let poisList = await getPoisByUser(user);
    setPois(poisList);
  };

  function handleClick(event) {
    event.preventDefault();
    console.log(event.target.name);
  }

  if (!gpxHistory || !pois) return <p>"Loading"</p>;

  return (
    <>
      <h1>Welcome on user page {user?.email}</h1>
      <button onClick={() => signOut()}>Sign out</button>
      <MapView pois={pois} positions={positions} test={test} />

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
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
    </>
  );
};

export default UserPage;
