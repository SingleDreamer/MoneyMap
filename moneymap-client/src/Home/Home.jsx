import React, { Component } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import Register from "./Register/Register";
import LoginDetails from "./Login/LoginDetails";
import AuthService from "../AuthService/AuthService";
import Collapse from "react-bootstrap/Collapse";
import "./Home.css";

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRegister: false,
      showLogin: false,
      open: false,
    };
    this.Auth = new AuthService();
  }
  render() {
    const { open } = this.state;
    return (
      <div className="app">

        <h1  align="center" className="title">{ 'MoneyMap' }</h1>

<Container>
<Row className="justify-content-md-center">

        <Button
          onClick={() => this.setState({ open: !open })}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="outline-light"
          style={{
            margin: "10px"
          }}
        >
        <i
        className="fas fa-map-signs navIcon d-inline-block align-top"
        onClick={this.toggleDrawer}
        width="30"
        height="30"
        alt = ""/>
        </Button>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text">
          <h2
            className="tagline"
            align="center"
          >
            A map to financial success.
          </h2>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </Collapse>
        </Row>
</Container>
        <Container>

        <Row className="justify-content-md-center">
        <Col xs lg="3">
          <Button
            id="newPrimary"
            size="lg"
            style={{
              margin: "10px",
              marginTop:"60px"
            }}
            onClick={this.handleShowLogin}
            block
          >
            Login
          </Button>
          </Col>
          </Row>

          <Row className="justify-content-md-center">
          <Col xs lg="3">
          <Button
            style={{
              margin: "10px"
            }}
            id="newSecondary"
            size="lg"
            onClick={this.handleShowRegister}
            block
          >
            Register
          </Button>
          </Col>
          </Row>

          </Container>


        <Modal show={this.state.showRegister} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Register />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} variant="danger">
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showLogin} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginDetails />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} variant="danger">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="png" />
      </div>
    );
  }
  handleShowRegister = () => {
    this.setState({ showRegister: true });
  };
  handleShowLogin = () => {
    this.setState({ showLogin: true });
  };
  handleClose = () => {
    this.setState({
      showRegister: false,
      showLogin: false
    });
  };
  componentWillMount = () => {
    if (this.Auth.loggedIn()) {
      this.props.history.replace("/dashboard");
    }
  };
}
export default Home;
