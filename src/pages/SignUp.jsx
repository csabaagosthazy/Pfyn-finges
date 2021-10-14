import { useState, useCallback, useRef } from "react";
import { firebase } from "../initFirebase";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import {createUserData} from "../services/dbService";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const lastnameRef = useRef();
  const firstnameRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then((user) =>
          createUserData(user, firstnameRef.current.value, lastnameRef.current.value))
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        let user = userCredential.user;
        console.log(user);
        history.push("/successLogin");
      })
      .catch((error) => {
        setError("Failed to create an account");
      });
  });
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="firstname">
              <Form.Label>Firstname</Form.Label>
              <Form.Control type="firstname" ref={firstnameRef} required />
            </Form.Group>
            <Form.Group id="lastname">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="lastname" ref={lastnameRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
