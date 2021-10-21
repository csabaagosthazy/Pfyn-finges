import React, { Component } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getPois } from "../services/dbService";
import GetPois from "./GetPois";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 46.294574, lng: 7.569767 },
      zoom: 16,
      positions: "",
    };
  }

  async componentDidMount() {
    const positions = await getPois();
    console.log(positions);
    this.setState({ positions });
  }

  render() {
    const { currentLocation, zoom } = this.state;
    if (this.state.positions === "") return <p>Loading</p>;
    return (
      <MapContainer
        center={currentLocation}
        zoom={zoom}
        style={{ height: "720px", width: "1280px" }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg" />
        <Polyline
          pathOptions={{ fillColor: "red", color: "orange", weight: 6 }}
          positions={this.state.positions}
        />
        <GetPois />
      </MapContainer>
    );
  }
}

export default MapView;
