import React from "react";
import { Navbar, Container } from "react-bootstrap";

function MainFooter(props) {
  return (
    <Navbar
      as="footer"
      variant="dark"
      bg="dark"
      className="mt-5 user-select-none"
    >
      <Container>
        <Navbar.Brand>Inforce test task</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default MainFooter;
