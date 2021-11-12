import React from "react";

import { useAuth } from "../context/Auth2";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { languagesList, useLang } from "../context/LanguageContext";
import translation from "../locales/translation.json";

export const Navigation = (props) => {
  //auth user and role needed
  const { currentUser, logout, isAdmin } = useAuth();
  const { changeLanguage, language } = useLang();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">{translation[language].homepage}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" defaultActiveKey="/home">
            <NavDropdown
              title={language === "en" ? "English" : "Français"}
              id="basic-nav-dropdown"
            >
              {languagesList.map(({ code, name, country_code }) => (
                <Dropdown.Item key={code} onClick={() => changeLanguage(code)}>
                  <span
                    className={`flag-icon flag-icon-${country_code} mx-2`}
                  />
                  {name}
                </Dropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Nav className="me-auto" defaultActiveKey="/home">
            {currentUser && (
              <Nav.Link href={isAdmin ? "/admin" : "/user"}>
                {isAdmin
                  ? translation[language].administration
                  : translation[language].account}
              </Nav.Link>
            )}
            {currentUser && isAdmin && (
              <Nav.Link href={"/user"}>
                {translation[language].user_page}
              </Nav.Link>
            )}
          </Nav>

          {currentUser ? (
            <Nav.Link bg="dark" variant="dark" onClick={logout}>
              {translation[language].logout}
            </Nav.Link>
          ) : (
            <Nav.Link href="/login">{translation[language].login}</Nav.Link>
          )}
          <Nav.Link eventkey={"role"} disabled>
            {!currentUser ? "" : isAdmin ? "admin" : "user"}
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
