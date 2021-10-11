import { useState, useCallback, useRef } from "react";
import { firebase } from "../initFirebase";

import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    //const { email, password } = inputs;
    setError("");
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log(user);
        history.push("/successLogin");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        setError("Failed to log in");
      });
  });

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
