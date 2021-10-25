import React, {Component, useCallback, useEffect, useState} from "react";
import {MapContainer, Polyline, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {showGPX} from "../services/dbService";
import ShowPois from "./ShowPois";

function MapView(props) {

    let [currentLocation, setCurrentLocation] = useState({lat: 46.294574, lng: 7.569767});
    let [zoom, setZoom] = useState(16);
    let [positions, setPositions] = useState(null);

    useEffect(() => {
        async function getPositions() {
            let positions = await showGPX(props.gpx);
            setPositions(positions);
            console.log("poi to show", props.pois);
        }

        getPositions();

    }, [props.gpx])

    /*    refreshMapCenter(){
            const map = useMap();
            console.log("lat long", this.props.gpx[0])
            map.panTo(this.props.gpx[0]);
        }*/

    return (
        <MapContainer
            center={currentLocation}
            zoom={zoom}
            style={{height: "720px", width: "1280px"}}
        >
            <TileLayer
                url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"/>
            {positions && <Polyline
                pathOptions={{fillColor: "red", color: "orange", weight: 10}}
                positions={positions}
            />}
            <ShowPois pois={props.pois}/>
        </MapContainer>
    );

}

export default MapView;
