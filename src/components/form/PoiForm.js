import { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";

import translation from "../../locales/translation.json"
import {useLang} from "../../context/LanguageContext";

const PoiForm = ({ onSubmit, values }) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [inputWebsite, setInputWebsite] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [validated, setValidated] = useState(false);

  const {language} = useLang();

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
          <Form.Label>{translation[language].poi_title} :</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder={translation[language].poi_title}
            required
          />
        </Form.Group>
        <Form.Group controlId="Latitude" style={style.fromGroup}>
          <Form.Label>{translation[language].latitude} :</Form.Label>
          <Form.Control
            type="number"
            step="0.0000001"
            onChange={(e) => setLatitude(e.target.value)}
            value={latitude}
            placeholder={translation[language].latitude}
            required
            min={"-90"}
            max={"90"}
          />
        </Form.Group>
        <Form.Group controlId="Longitude" style={style.fromGroup}>
          <Form.Label>{translation[language].longitude} :</Form.Label>
          <Form.Control
            type="number"
            step="0.0000001"
            onChange={(e) => setLongitude(e.target.value)}
            value={longitude}
            placeholder={translation[language].longitude}
            required
            min={"-180"}
            max={"80"}
          />
        </Form.Group>
        <Form.Group controlId="Description" style={style.fromGroup}>
          <Form.Label>{translation[language].description} :</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder={translation[language].description}
            required
          />
        </Form.Group>
        <Form.Group controlId="Website" style={style.fromGroup}>
          <Form.Label>{translation[language].website} :</Form.Label>
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
            label={translation[language].activate_poi}
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </Form.Group>
        <Button style={{ margin: 10 }} variant="primary" type="submit">
          {translation[language].submit}
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
