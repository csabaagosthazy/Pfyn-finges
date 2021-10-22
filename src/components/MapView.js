import React, {Component} from "react";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {showGPX} from "../services/dbService";
import ShowPois from "./ShowPois";
import {useAuth} from "../context/AuthContext";

class MapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {lat: 46.294574, lng: 7.569767},
            zoom: 16,
            positions: "",
        };
    }

    async componentDidMount() {
        if (this.props.gpx) {
            const positions = await showGPX(this.props.gpx);
            console.log("gpx MapView", this.props.gpx);
            this.setState({positions});
        } else {
            console.log("NO GPX TO SHOW");
        }
    }

    render() {
        const {currentLocation, zoom} = this.state;
        if (this.state.positions === "") return <p>Loading</p>;
        return (
            <MapContainer
                center={currentLocation}
                zoom={zoom}
                style={{height: "720px", width: "1280px"}}
            >
                <TileLayer
                    url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"/>
                <Polyline
                    pathOptions={{fillColor: "red", color: "orange", weight: 10}}
                    positions={this.state.positions}
                />;
                <ShowPois pois={this.props.pois}/>
            </MapContainer>
        );
    }
}

export default MapView;
