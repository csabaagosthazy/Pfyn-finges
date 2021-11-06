import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/Auth2";

import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const isMounted = useRef(null);
  const { login, checkAdmin, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // executed when component mounted
    isMounted.current = true;
    return () => {
      // executed when unmount
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    let user;
    let isAdmin;
    try {
      user = await login(emailRef.current.value, passwordRef.current.value);
      isAdmin = await checkAdmin(user, true);
    } catch {
      setError("Failed to log in");
    } finally {
      console.log(user);
      console.log(!!user);
      if (isMounted.current) {
        setLoading(false);
        if (!!user) {
          console.log("Yes user");
          console.log(isAdmin);
          alert("Authorization success!");
          if (isAdmin) history.push("/admin");
          else history.push("/user");
        } else {
          alert("Authorization failed!");
          history.push("/");
        }
      }
    }
  };

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
