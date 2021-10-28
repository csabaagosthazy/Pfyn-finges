import React, {Component, useCallback, useEffect, useState} from "react";
import {MapContainer, Polyline, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {showGPX} from "../services/dbService";
import ShowPois from "./ShowPois";

function MapView(props) {

    let [currentLocation, setCurrentLocation] = useState({lat: 46.294574, lng: 7.569767});
    let [zoom, setZoom] = useState(14);
    let [positions, setPositions] = useState(null);

    console.log("POI from admin is " + props.pois);
    console.log("GPX from admin is " + props.gpx);

    useEffect(() => {
        async function getPositions() {
            let positions = await showGPX(props.gpx);
            setPositions(positions);
        }

        getPositions();

    }, [props.gpx])

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
            {positions && <MapCenter position={positions.length > 0 && positions[Math.round(positions.length/2)]}/>}
            {props.pois && <ShowPois pois={props.pois}/>}
        </MapContainer>
    );

}

function MapCenter({position}) {
    const map = useMap();
    map.panTo(position);
    return null;
}

export default MapView;
