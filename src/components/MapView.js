import React, { useState } from "react";
import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Dropdown, Alert } from "react-bootstrap";
import ShowPois from "./ShowPois";
import translation from "../locales/translation.json"
import {useLang} from "../context/LanguageContext";

function MapView({ pois, positions, gpxHistory, setGpx }) {
    const {language} = useLang();
  const [currentLocation] = useState({
    lat: 46.294574,
    lng: 7.569767,
  });
  const zoom = 14;

  const handleClick = (event) => {
    setGpx(event);
  };
  if (!gpxHistory && !positions && !pois)
    return (
      <Alert variant="info">
        <Alert.Heading>{translation[language].map_view}</Alert.Heading>
        <p>
            {translation[language].see_map_alert}
        </p>
        <hr />
        <p className="mb-0">{translation[language].for_info}</p>
      </Alert>
    );
  return (
    <>
      {gpxHistory && (
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={style.mapDropdown}
          >
              {translation[language].history}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {gpxHistory.map((gpxElement, index) => (
              <Dropdown.Item
                name={gpxElement}
                onClick={(event) => handleClick(event)}
                key={index}
              >
                {gpxElement}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <MapContainer
        center={currentLocation}
        zoom={zoom}
        style={{ height: "720px", width: "1280px" }}
      >
        <TileLayer url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg" />
        {positions && (
          <Polyline
            pathOptions={{ fillColor: "yellow", color: "orange", weight: 10 }}
            positions={positions}
          />
        )}
        {positions && (
          <MapCenter
            position={
              positions.length > 0 &&
              positions[Math.round(positions.length / 2)]
            }
          />
        )}
        {pois && <ShowPois pois={pois} />}
      </MapContainer>
    </>
  );
}

function MapCenter({ position }) {
  const map = useMap();
  map.panTo(position);
  return null;
}

export default MapView;

const style = {
  mapDropdown: {
    margin: 10,
  },
};
