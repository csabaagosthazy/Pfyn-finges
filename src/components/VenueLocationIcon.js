import L from 'leaflet';
import icon from "../assets/venue_location_icon.svg"

export const VenueLocationIcon = L.icon({
    iconUrl: icon,
    iconSize: [35, 35],
});