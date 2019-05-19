import React, { Component } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
//import Register from "./Register/Register";
//import LoginDetails from "./Login/LoginDetails";
import AuthService from "../AuthService/AuthService";
import Collapse from "react-bootstrap/Collapse";
import "./About.css";

class About extends Component {
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
    let text = "test";
    if (this.Auth.loggedIn()) {
        text = "test2";
    }
    return (
      <div className="about">
      About Page
      {text}
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
  // componentWillMount = () => {
  //   if (this.Auth.loggedIn()) {
  //     this.props.history.replace("/dashboard");
  //   }
  // };
}
export default About;
