import { useAuth } from "../context/AuthContext";
import { getGPXAsString, getPoisByUser, getUserParams } from "../services/dbService";
import { MapContainer, Polyline, TileLayer, Marker, Popup } from "react-leaflet";
import MapView from "../components/MapView";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { showGPX } from "../services/dbService";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const iconPerson = new L.Icon({
  iconUrl: require("../assets/venue_location_icon.svg"),
  iconRetinaUrl: require("../assets/venue_location_icon.svg"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

const test = {
  currentLocation: { lat: 46.294574, lng: 7.569767 },
  zoom: 16,
  url: "https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
};

const UserPage = () => {
  const { user, signOut } = useAuth();
  const [gpxHistory, setgpxHistory] = useState();
  const [pois, setPois] = useState();
  const [positions, setPositions] = useState();

  useEffect(() => {
    getPoisByUser(user).then((res) => setPois(res));
    getGPXAsString(user).then((res) => setgpxHistory(res));
    showGPX().then((res) => setPositions(res));
    //showGPX().then((positions) => setPositions(positions));
  }, []);

  const loadPois = async () => {
    let history = await getGPXAsString(user);
    return history;
  };

  const loadGpx = async () => {
    let poisList = await getPoisByUser(user);
    return poisList;
  };

  function handleClick(event) {
    event.preventDefault();
    console.log(event.target.name);
  }

  if (!gpxHistory || !pois || !positions) return <p>"Loading"</p>;

  return (
    <>
      <h1>Welcome on user page {user?.email}</h1>
      <button onClick={() => signOut()}>Sign out</button>
      <Map pois={pois} positions={positions} test={test} />

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

const Map = ({ pois, positions, test }) => {
  return (
    <MapContainer
      center={test.currentLocation}
      zoom={test.zoom}
      style={{ height: "720px", width: "1280px" }}
    >
      <TileLayer url={test.url} />
      <Polyline
        pathOptions={{ fillColor: "red", color: "orange", weight: 6 }}
        positions={positions}
      />
      {pois.map((poi, i) => (
        <Marker key={i} position={[poi.latitude, poi.longitude]} icon={iconPerson}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default UserPage;
