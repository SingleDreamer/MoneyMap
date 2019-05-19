import React, { Component } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import Register from "./Register/Register";
//import LoginDetails from "./Login/LoginDetails";
//import Sidebar from "../Components/Sidebar/Sidebar.js";
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

  clearSession = () => {
    this.props.history.replace("/");
    sessionStorage.clear();
  };

  redirectToDashboard = () => {
    this.props.history.replace("/Dashboard");
  };


  render() {
    const { open } = this.state;
    let text = "test";
    if (this.Auth.loggedIn()) {
        text = "test2";
    }
    let navbarButton = "";
    let navbarDash = "";
    if (this.Auth.loggedIn()) {
      navbarButton = <Button variant="danger" onClick={this.clearSession} style={{marginRight:"10px"}}>
        Log Out
      </Button>
      navbarDash = <Nav.Link href="/Dashboard">Dashboard</Nav.Link>

    } else {
      navbarButton = <Button variant="info" onClick={this.redirectToDashboard} style={{marginRight:"10px"}}> Log in </Button>
    }
    return (
      <div className="about">
      <Navbar variant="dark" className="justify-content-between">
        <Navbar.Brand>
        <i
        className="fas fa-map-signs navIcon d-inline-block align-top"
        onClick={this.toggleDrawer}
        width="30"
        height="30"
        alt = ""/>
        <a className="title">{ 'MoneyMap' }</a>
        </Navbar.Brand>
        <Nav className="mr-auto">
          {navbarDash}
          <Nav.Link href="/About">About</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
            {navbarButton}
          </Nav.Link>
        </Nav>
      </Navbar>
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
