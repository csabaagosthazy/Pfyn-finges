import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

function ShowPois(props) {
  return (
    <>
      {props.pois.map((poi) => (
        <Marker
          key={poi.id}
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
    </>
  );
}

export default ShowPois;
