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

      <div>
      <h1 className="pagetitle">About Page</h1>
      </div>

      <div style = {{marginTop:"90px", marginRight:"200px", marginLeft:"200px"}}>
      <p className="heading" id="RFS">RFS</p>
      <p className="text">The Relative Financial Score (RFS) is MoneyMap’s unique performance score that shows the financial standing of the Job Offer Card relative to averages in the city,
      that is, how “good” this job offer is for the city it is being offered in,
      based on the user’s expenses, savings, the job offer and the city’s cost of living.
      </p>
      <p className="text">
      Based on our current equation, a good score would then be somewhere in the range of 30-50 and a great score would be anything larger.
      Anything lower than 30 is considered unsustainable.
      </p>
      </div>

      <div style = {{marginTop:"90px", marginRight:"200px", marginLeft:"200px"}}>
      <p className="heading" id="RFS">Basket of Goods</p>
      <p className="text">The Relative Financial Score (RFS) is MoneyMap’s unique performance score that shows the financial standing of the Job Offer Card relative to averages in the city,
      that is, how “good” this job offer is for the city it is being offered in,
      based on the user’s expenses, savings, the job offer and the city’s cost of living.
      </p>
      <p className="text">
      Based on our current equation, a good score would then be somewhere in the range of 30-50 and a great score would be anything larger.
      Anything lower than 30 is considered unsustainable.
      </p>
      </div>

      <div style = {{marginTop:"90px", marginRight:"200px", marginLeft:"200px"}}>
      <p className="heading" id="UserDetails">User Details</p>
      <p className="text">The Relative Financial Score (RFS) is MoneyMap’s unique performance score that shows the financial standing of the Job Offer Card relative to averages in the city,
      that is, how “good” this job offer is for the city it is being offered in,
      based on the user’s expenses, savings, the job offer and the city’s cost of living.
      </p>
      <p className="text">
      Based on our current equation, a good score would then be somewhere in the range of 30-50 and a great score would be anything larger.
      Anything lower than 30 is considered unsustainable.
      </p>
      </div>
      
      </div>
    );
  }
}
export default About;
