import { useEffect, useState } from "react";
import { firebase } from "../initFirebase";
import { Marker, Popup } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import {useAuth} from "../context/AuthContext";
import {getPoisByUser} from "../services/dbService";

function ShowPois(props) {

  return (

    <div>
      {props.pois.map((poi, i) => (
        <Marker key={i} position={[poi.latitude, poi.longitude]}>
          <Popup>{poi.title}</Popup>
        </Marker>
      ))}


    </div>

  );
}

export default ShowPois;
