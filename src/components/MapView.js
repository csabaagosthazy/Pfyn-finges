import React, { Component } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { showGPX } from "../services/dbService";
//import ShowPois from "./ShowPois";
import { useAuth } from "../context/AuthContext";

import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

//import favicon from "../../public/";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 46.294574, lng: 7.569767 },
      zoom: 16,
      positions: "",
    };
  }
  /* 
  componentDidMount() {
    showGPX().then((positions) => this.setState({ positions }));
    //console.log(positions);
  } */

  render() {
    //const { currentLocation, zoom, positions } = this.state;
    const { pois, positions, test } = this.props;
    console.log("rendered");
    return (
      <MapContainer
        center={test.currentLocation}
        zoom={test.zoom}
        style={{ height: "720px", width: "1280px" }}
      >
        <TileLayer url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg" />
        <Polyline
          pathOptions={{ fillColor: "red", color: "orange", weight: 6 }}
          positions={positions}
        />
        {pois.map((poi, i) => (
          <Marker
            key={i}
            position={[poi.latitude, poi.longitude]}
            icon="pfyn-finges-template\public\favicon.ico"
          />
        ))}
      </MapContainer>
    );
  }
}

function ShowPois(props) {
  console.log("Show rendered", props.pois);
  return (
    <div>
      {props.pois.map((poi, i) => (
        <Marker
          key={i}
          position={[poi.latitude, poi.longitude]}
          icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
          <Popup>
            {poi.title}
            <br />
            <a href={poi.inputWebsite}>{poi.inputWebsite}</a>
            <br />
            {poi.description}
          </Popup>
        </Marker>
      ))}
    </div>
  );
}

export default MapView;

/*   <Popup>
              {poi.title}
              <br />
              <a href={poi.inputWebsite}>{poi.inputWebsite}</a>
              <br />
              {poi.description}
            </Popup>
          </Marker> */
