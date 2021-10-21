import React, { useState } from "react";
import QRCode from "react-qr-code";
import { firebase } from "../initFirebase";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/button";

const CreatePOIForm = (props) => {
  const db = firebase.firestore();
  const COLLECTION_POIS = "pois";
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [inputWebsite, setInputWebsite] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = () => {
    setQRCode(inputWebsite);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const poisCollection = await db.collection(COLLECTION_POIS);

    try {
      await poisCollection.add({
        title: title,
        latitude: latitude,
        longitude: longitude,
        description: description,
        inputWebsite: inputWebsite,
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

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      ></div>

      <Modal show={isOpen} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create POI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>POI title: </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title of POI"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLatitude(e.target.value)}
              value={latitude}
              placeholder="Latitude"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLongitude(e.target.value)}
              value={longitude}
              placeholder="Longitude"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setInputWebsite(e.target.value)}
              value={inputWebsite}
              placeholder="Website url"
            />
          </Form.Group>
          <Button variant="secondary" onClick={generateQR}>
            Generate QR Code
          </Button>
          <QRCode value={qrCode} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="primary" type="submit" onClick={() => handleSubmit(this.state.name)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePOIForm;
