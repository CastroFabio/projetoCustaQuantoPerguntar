import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "../styles/bodySection-styles.css";

function TextLinkExample() {
  return (
    <Navbar fixed="top" className="background-terciary">
      <Container>
        <Navbar.Brand href="#home">Quanto Custa Perguntar</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
