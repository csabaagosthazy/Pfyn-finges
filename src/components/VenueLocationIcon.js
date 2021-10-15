import L from 'leaflet';
import icon from "../assets/venue_location_icon.svg"

export const VenueLocationIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: 'leaflet-div-icon'
});