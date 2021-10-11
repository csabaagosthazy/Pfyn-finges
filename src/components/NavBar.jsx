import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

export const Navigation = (props) => {
  //auth user and role needed
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav defaultActiveKey="/home" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-1">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Link to="/login">Log In</Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};
