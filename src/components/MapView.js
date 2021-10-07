import React, {Component} from 'react';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/data';
import Markers from './VenueMarkers';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {lat: 46.294574, lng: 7.569767},
            zoom: 16,
        }
    }

    render() {
        const {currentLocation, zoom} = this.state;
        return (
            <Map center={currentLocation} zoom={zoom} style={{height: '720px', width: '1280px'}}>
                <TileLayer
                    url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                />
                <Markers venues={data.venues}/>
            </Map>
        );
    }
}

export default MapView;