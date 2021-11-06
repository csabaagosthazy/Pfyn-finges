import { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";

const PoiForm = ({ onSubmit, values }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [inputWebsite, setInputWebsite] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log(values);
    if (values) {
      const { id, title, latitude, longitude, description, inputWebsite, isActive } = values;
      setId(id);
      setTitle(title);
      setLatitude(latitude);
      setLongitude(longitude);
      setDescription(description);
      setInputWebsite(inputWebsite);
      setIsActive(isActive);
    }
  }, []);

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
      onSubmit(e, id, title, latitude, longitude, description, inputWebsite, isActive);
    }
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="title" style={style.fromGroup}>
          <Form.Label>POI title: </Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title of POI"
            required
          />
        </Form.Group>
        <Form.Group controlId="Latitude" style={style.fromGroup}>
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="number"
            step="0.0000001"
            onChange={(e) => setLatitude(e.target.value)}
            value={latitude}
            placeholder="Latitude"
            required
            min={"-90"}
            max={"90"}
          />
        </Form.Group>
        <Form.Group controlId="Longitude" style={style.fromGroup}>
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="number"
            step="0.0000001"
            onChange={(e) => setLongitude(e.target.value)}
            value={longitude}
            placeholder="Longitude"
            required
            min={"-180"}
            max={"80"}
          />
        </Form.Group>
        <Form.Group controlId="Description" style={style.fromGroup}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
            required
          />
        </Form.Group>
        <Form.Group controlId="Website" style={style.fromGroup}>
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="url"
            onChange={(e) => setInputWebsite(e.target.value)}
            value={inputWebsite}
            placeholder="https://www.something.com"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="activeCheck" style={style.fromGroup}>
          <Form.Check
            type="checkbox"
            label="Activate POI"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </Form.Group>
        <Button style={{ margin: 10 }} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PoiForm;

const style = {
  fromGroup: {
    margin: 10,
  },
};
