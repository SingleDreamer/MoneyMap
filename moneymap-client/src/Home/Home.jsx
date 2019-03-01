import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Register from "./Register/Register";
import "./Home.css";

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
            style={{
              marginRight: "10px"
            }}
            bsStyle="secondary"
            bsSize="small"
          >
            Login
          </Button>
          <Button bsStyle="secondary" bsSize="small" onClick={this.handleShow}>
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
      </div>
    );
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  componentWillMount = () => {
    document.body.classList.add("HomeBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("HomeBg");
  };
}
export default Home;
