import React, { useState } from "react";
import { firebase } from "../initFirebase";

import { Form, Button, Modal, Alert } from "react-bootstrap";

const AddPoi = ({ isOpen, show }) => {
  const db = firebase.firestore();
  const COLLECTION_POIS = "pois";
  const poisCollection = db.collection(COLLECTION_POIS);

  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [inputWebsite, setInputWebsite] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      setLoading(true);

      try {
        await poisCollection.add({
          title,
          latitude,
          longitude,
          description,
          inputWebsite,
        });
      } catch (e) {
        console.error(e);
        setError("Could not add new POI");
      } finally {
        setLoading(false);
      }
    }
    if (form.checkValidity() && !error) {
      setTitle("");
      setDescription("");
      setLatitude("");
      setLongitude("");
      setInputWebsite("");
      setValidated(false);
      show();
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      ></div>

      <Modal show={isOpen} onHide={show} backdrop="static">
        {error && <Alert variant="danger">{error}</Alert>}
        {loading && <Alert variant="info">Loading...</Alert>}
        <Modal.Header closeButton>
          <Modal.Title>Create POI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>POI title: </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title of POI"
                required
              />
            </Form.Group>
            <Form.Group controlId="Latitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLatitude(e.target.value)}
                value={latitude}
                placeholder="Latitude"
                required
              />
            </Form.Group>
            <Form.Group controlId="Longitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLongitude(e.target.value)}
                value={longitude}
                placeholder="Longitude"
                required
              />
            </Form.Group>
            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Description"
                required
              />
            </Form.Group>
            <Form.Group controlId="Website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setInputWebsite(e.target.value)}
                value={inputWebsite}
                placeholder="Website url"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={show}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPoi;
