import React, {useState} from "react";
import QRCode from "react-qr-code";
import {firebase} from "../initFirebase";



function  AddPoi() {
    // Get the DB object from the firebase app
    const db = firebase.firestore();

// EXAMPLE : Reference to a collection of POIs
    const COLLECTION_POIS = "pois";
    const [title, setTitle] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const [inputWebsite, setInputWebsite] = useState('');
    const [qrCode, setQRCode] = useState('');


    const generateQR = () => {
        setQRCode(inputWebsite);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const poisCollection = await db.collection(COLLECTION_POIS);

        try {
            await poisCollection.add({
                title:title,
                latitude:latitude,
                longitude:longitude,
                description:description,
                inputWebsite:inputWebsite,
            });
        } catch (e) {
            console.error("Could not add new POI");
        }
        setTitle("");
        setDescription("");
        setLatitude("");
        setLongitude("");
        setInputWebsite("");
    };
    return(
        <form className="form" onSubmit={handleSubmit}>
            <h1>Insertion of a new Poi</h1>
            <label>Title</label>
            <input placeholder="Tile of the AddPoi" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>

            <label>Latitude</label>
            <input placeholder="Latitude" value={latitude}
                   onChange={(e) => setLatitude(e.target.value)}/>

            <label>Longitude</label>
            <input placeholder="Longitude" value={longitude}
                   onChange={(e) => setLongitude(e.target.value)}/>

            <label>Description</label>
            <input placeholder="Description" value={description}
                   onChange={(e) => setDescription(e.target.value)}/>

            <label>Website</label>
            <input type="text"
                   value={inputWebsite}
                   placeholder="Enter the website"
                   onChange={e => setInputWebsite(e.target.value)}/>
            <input
                type="button"
                value="Generate QR Code"
                onClick={generateQR}/>
            <QRCode
                value={qrCode}/>

            <button type="submit">Submit</button>
        </form>
    )
}

export default AddPoi
