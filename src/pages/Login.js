import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/Auth2";
import translation from "../locales/translation.json";

import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const isMounted = useRef(null);
  const { login, checkAdmin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useLang();
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
      user = await login(email, password);
      isAdmin = await checkAdmin(user, true);
    } catch {
      setError("Failed to log in");
    } finally {
      if (isMounted.current) {
        setLoading(false);
        if (!!user) {
          if (isAdmin) history.push("/admin");
          else history.push("/user");
        } else {
          alert(translation[language].auth_failed);
          history.push("/");
        }
      }
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{translation[language].login}</h2>
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
            <Form.Group id="password">
              <Form.Label>{translation[language].password}</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {translation[language].login}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {translation[language].need_account}{" "}
        <Link to="/signup">{translation[language].signup}</Link>
      </div>
    </>
  );
};

export default Login;
