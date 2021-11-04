import React, { useContext } from "react";

import { useAuth } from "../context/Auth2";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Dropdown } from "react-bootstrap";
import { languagesList } from "../context/LanguageContext";

export const Navigation = (props) => {
  //auth user and role needed
  const { currentUser, logout, isAdmin } = useAuth();
  console.log("navbar");
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav defaultActiveKey="/home" as="ul">
          <Nav.Item as="li">
            <Nav.Link href={isAdmin ? "/admin" : "/user"}>Account</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            {currentUser ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav.Item>
          {
            <Nav.Item as="li">
              <Nav.Link eventkey={"role"} disabled>
                {!currentUser ? "" : isAdmin ? "admin" : "user"}
              </Nav.Link>
            </Nav.Item>
          }
        </Nav>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose your language
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {languagesList.map(({ code, name }) => (
              <Dropdown.Item key={code}>
                <span className={`flag-icon flag-icon-${code} mx-2`} />
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};
