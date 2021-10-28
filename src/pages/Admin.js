import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { firebase } from "../initFirebase";

import { Form, Button, Modal, Alert } from "react-bootstrap";
import AddPoi from "../components/AddPoi";
import MapView from "../components/MapView";
/* 
<Button variant="secondary" onClick={generateQR}>
Generate QR Code
</Button>
<QRCode value={qrCode} /> */

const AdminPage = () => {
  const db = firebase.firestore();
  const COLLECTION_POIS = "pois";
  const poisCollection = db.collection(COLLECTION_POIS);

  const { user, signOut } = useAuth();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onSubmit = async (event, title, latitude, longitude, description, inputWebsite) => {
    event.preventDefault();
    console.log("submit");
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
    if (!error) handleClose();
  };

  useEffect(() => {
    console.log("Admin rendered");
  }, []);

  return (
    <>
      <h1>Welcome on admin page {user?.email}</h1>
      <Button onClick={handleShow}>Create new POI</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TestForm onSubmit={onSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button>
        </Modal.Footer>
      </Modal>
      {/*{isOpen ? <AddPoi show={showModal} isOpen={isOpen} /> : null}
      <MapView user = {user}/> */}
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default AdminPage;

const TestForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [inputWebsite, setInputWebsite] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      e.preventDefault();
      onSubmit(e, title, latitude, longitude, description, inputWebsite);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
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
    </div>
  );
};
