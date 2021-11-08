import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth2";

import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { createUserData } from "../services/dbService";

import translation from "../locales/translation.json"
import {useLang} from "../context/LanguageContext";

const SignUp = () => {
  const { signup } = useAuth();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passConfirm, setPassConfirm] = useState();
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {language} = useLang();
  const history = useHistory();

  useEffect(() => {
    // executed when component mounted
    setIsMounted(true);
    return () => {
      // executed when unmount
      setIsMounted(false);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      let user = await signup(email, password);
      if (user) await createUserData(user, firstName, lastName);
      alert("Account created");
    } catch (err) {
      alert(err);
    } finally {
      if (isMounted) {
        setLoading(false);
        history.push("/");
      }
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>{translation[language].email}</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="firstname">
              <Form.Label>{translation[language].firstname}</Form.Label>
              <Form.Control
                type="firstname"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="lastname">
              <Form.Label>{translation[language].lastname}</Form.Label>
              <Form.Control
                type="lastname"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>{translation[language].password}</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>{translation[language].password_confirmation}</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassConfirm(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {translation[language].signup}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {translation[language].already_account} <Link to="/login">{translation[language].login}</Link>
      </div>
    </>
  );
};

export default SignUp;
