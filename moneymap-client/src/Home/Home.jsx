import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Register from "./Register/Register";
import LoginDetails from "./Login/LoginDetails";
import AuthService from "../AuthService/AuthService";
import "./Home.css";

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRegister: false,
      showLogin: false
    };

    this.Auth = new AuthService();
  }
  render() {
    return (
      <div className="app">
        <h1
          align="center"
          style={{
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          MoneyMap
        </h1>
        <div align="center">
          <Button
            style={{
              margin: "10px"
            }}
            onClick={this.handleShowLogin}
            id="newPrimary"
          >
            Login
          </Button>
          <Button
            style={{
              margin: "10px"
            }}
            id="newSecondary"
            onClick={this.handleShowRegister}
          >
            Register
          </Button>
        </div>

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
}
export default Home;
