import React, {Component} from 'react';
import {MapContainer, Polyline, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {getPois} from "../services/dbService";

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {lat: 46.294574, lng: 7.569767},
            zoom: 16,
            positions : " ",
        }
    }

    async componentDidMount() {
        const positions = await getPois();
        this.setState({positions});
    }

    render() {
        const {currentLocation, zoom} = this.state;

        return (
            <MapContainer center={currentLocation} zoom={zoom} style={{height: '720px', width: '1280px'}}>
                <TileLayer
                    url="https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                />
                <Polyline
                    pathOptions={{fillColor: 'red', color: 'orange', weight: 6}}
                    positions={this.state.positions}
                />
                {/* <Markers venues={data.venues}/> */}
            </MapContainer>
        );
    }
}

export default MapView;