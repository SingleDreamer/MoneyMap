import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Register from "./Register/Register";
import LoginDetails from "./Login/LoginDetails";
import AuthService from "../Components/AuthService/AuthService";
import "./Home.css";

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      showLogin: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.Auth = new AuthService();
  }
  render() {
    return (
      <div>
        <h1
          align="center"
          style={{
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          Welcome to MoneyMap
        </h1>
        <div align="center">
          <Button
            id="newPrimary"
            style={{
              marginRight: "10px"
            }}
            onClick={this.handleShowLogin}
          >
            Login
          </Button>
          <Button id="newSecondary" onClick={this.handleShow}>
            Register now
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Register />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
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
  handleShow() {
    this.setState({ show: true });
  }
  handleShowLogin() {
    this.setState({ showLogin: true });
  }
  handleClose() {
    this.setState({
      show: false,
      showLogin: false
    });
  }
  componentWillMount = () => {
    if (this.Auth.loggedIn()) {
      this.props.history.replace("/dashboard");
    }
  };
}
export default Home;
