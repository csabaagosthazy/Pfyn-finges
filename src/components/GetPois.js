import {useEffect, useState} from "react";
import {firebase} from "../initFirebase";
import {Marker, Popup} from "react-leaflet";
import {VenueLocationIcon} from "./VenueLocationIcon";

function GetPois() {

    const [pois, setPois] = useState([]);

    useEffect(() => {
        getAllPois();
    }, []);

    const getAllPois = () => {
        const getFromFirebase = firebase.firestore().collection("pois");
        getFromFirebase.onSnapshot((querySnapshot) => {
            const saveFirebasePois = [];
            querySnapshot.forEach((doc) => {
                saveFirebasePois.push(doc.data());
            });
            setPois(saveFirebasePois);
        });
    }

    return (
        <div>
            {pois.map((poi) => (
               <Marker
                    key={poi.key}
                    position={[poi.latitude, poi.longitude]}
                    icon={VenueLocationIcon}>
                    <Popup>
                        {poi.title}
                    </Popup>
                </Marker>
            ))}
        </div>
    )
}

export default GetPois;