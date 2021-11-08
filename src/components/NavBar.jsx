import React from "react";

import { useAuth } from "../context/Auth2";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Dropdown } from "react-bootstrap";
import { languagesList, useLang } from "../context/LanguageContext";
import translation from "../locales/translation.json";

export const Navigation = (props) => {
  //auth user and role needed
  const { currentUser, logout, isAdmin } = useAuth();
  const { changeLanguage, language } = useLang();
  console.log("navbar");
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">{translation[language].homepage}</Navbar.Brand>
        <Nav defaultActiveKey="/home" as="ul">
          <Nav.Item as="li">
            {currentUser && (
              <Nav.Link href={isAdmin ? "/admin" : "/user"}>
                {isAdmin ? translation[language].administration : translation[language].account}
              </Nav.Link>
            )}
          </Nav.Item>
          <Nav.Item as="li">
            {currentUser && isAdmin && (
              <Nav.Link href={"/user"}>{translation[language].user_page}</Nav.Link>
            )}
          </Nav.Item>
        </Nav>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            {currentUser ? (
              <Nav.Link onClick={logout}>
                {translation[language].logout}
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">{translation[language].login}</Nav.Link>
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
            {language === 'en' ? ('English') : ('Français')}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {languagesList.map(({ code, name, country_code }) => (
              <Dropdown.Item key={code} onClick={() => changeLanguage(code)}>
                <span className={`flag-icon flag-icon-${country_code} mx-2`} />
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};