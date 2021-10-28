import React, { Component } from "react";
import { MapContainer, Polyline, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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
    const defaultMarker = new L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    console.log(defaultMarker);
    this.setState({ icon: defaultMarker });
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
        <TileLayer url={test.url} />
        <Polyline
          pathOptions={{ fillColor: "red", color: "orange", weight: 6 }}
          positions={positions}
        />
        {pois.map((poi, i) => (
          <Marker key={i} position={[poi.latitude, poi.longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
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
        <Marker key={i} position={[poi.latitude, poi.longitude]}>
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
