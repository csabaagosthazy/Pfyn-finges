import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { firebase } from "../initFirebase";

import { Form, Button, Modal, Table, InputGroup, Dropdown } from "react-bootstrap";
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

  const { user, signOut, isAdmin } = useAuth();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const getAllPois = async () => {
    const data = [
      {
        id: "x",
        title: "xtitle",
        latitude: "xlat",
        longitude: "xlong",
        description: "xdesc",
        inputWebsite: "xweb",
        isActive: true,
      },
      {
        id: "y",
        title: "ytitle",
        latitude: "ylat",
        longitude: "ylong",
        description: "ydesc",
        inputWebsite: "yweb",
        isActive: false,
      },
    ];

    return data;
  };

  const onSubmit = async (
    event,
    title,
    latitude,
    longitude,
    description,
    inputWebsite,
    isActive
  ) => {
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
        isActive,
      });
    } catch (e) {
      console.error(e);
      setError("Could not add new POI");
    } finally {
      setLoading(false);
    }
    if (!error) handleClose();
  };

  useEffect(async () => {
    console.log("Admin rendered");
    const pois = await getAllPois();
    setData(pois);
  }, []);

  return (
    <>
      <h1>Welcome on admin page {user?.email}</h1>
      <Button onClick={handleShow}>Create new POI</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creat new POI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TestForm onSubmit={onSubmit} />
        </Modal.Body>
      </Modal>
      <TableComp data={data} />

      {/*   {isOpen ? <AddPoi show={showModal} isOpen={isOpen} /> : null}
      <MapView /> */}
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

const TestForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [inputWebsite, setInputWebsite] = useState("");
  const [isActive, setIsActive] = useState(true);
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
    <div>
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
        <Form.Group controlId="Website">
          <Form.Label>Active</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setIsActive(e.target.value)}
            value={isActive}
            placeholder="Is poi active"
            required
          />
        </Form.Group>
        <Button style={{ margin: 10 }} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

const TableComp = ({ data }) => {
  //headers, body => array
  const headers = ["", "Title", "Latitude", "Longitude", "Website", ""];

  const handleSelectAction = (eventKey, id) => {
    console.log(eventKey);
    console.log(id);
  };

  const handleSelectRow = (event) => {
    console.log(event.target.name);
    //filter out data array
  };

  return data.length > 0 ? (
    <div>
      <p>List of POI</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((head, i) => (
              <th key={i}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <InputGroup.Checkbox name={item.id} onChange={handleSelectRow} />
              </td>
              <td>{item.title}</td>
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td>{item.inputWebsite}</td>
              <td>
                <Dropdown onSelect={(eventKey) => handleSelectAction(eventKey, item.id)}>
                  <Dropdown.Toggle variant="primary" id="action-dropdown">
                    Actions
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="update">Update</Dropdown.Item>
                    <Dropdown.Item eventKey="deactivate">Deactivate</Dropdown.Item>
                    <Dropdown.Item eventKey="showqr">Show QR</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  ) : (
    <p>There are no POI in the database</p>
  );
};

export default AdminPage;
