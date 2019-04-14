import React, { Component } from "react";
import CardArray from "../Components/CardArray/CardArray.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import { JobOfferCard } from "../Components/JobOfferCard";
import { Modal, Button } from "react-bootstrap";
import "./Dashboard.css";
import axios from "axios";
import AuthService from "../AuthService/AuthService";

var perks = require("./test.json");

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // fromRegister: false,
      profileSubmit: false,
      show: false,
      companies: []
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.profileSubmit = this.profileSubmit.bind(this);
  }
  componentDidMount() {
    //getting the cards each time the component renders
    axios
      .get(
        "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/11111111-1111-1111-1111-111111111111/jocs"
      )
      .then(response => {
        // handle success
        let jocs = response.data.result;
        console.log(jocs);
        jocs.forEach(company => {
          company.selected = false;
        });
        this.setState({
          companies: jocs
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }
  render() {
    let cardType;
    if (this.state.profileSubmit === false) {
      cardType = <Modal.Title>Profile Card</Modal.Title>; //check if profile submission exists vs backend call
    } else {
      cardType = <Modal.Title>New JobOfferCard</Modal.Title>;
    }

    return (
      <div className="App">
        {/*Need to tuen this into a component to update depending on the currently logged in user's info */}
        <Sidebar className="Sidebar" />
        {/* <Button
          className="AddJOC"
          onClick={() => this.setState({ show: true })}
        >
          Add New JOC
        </Button> */}
        {/*When this.state.companies changes with the addJOC button the state is mutated which causes new props to be passed and rerenders the CARDARRAY*/}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>{cardType}</Modal.Header>
          <Modal.Body>
            <JobOfferCard
              handleClose={this.handleClose}
              profileSubmit={this.profileSubmit}
              updateCompanies={this.updateCompanies}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        <CardArray
          companies={this.state.companies}
          handleShow={this.handleShow}
        />
      </div>
    );
  }

  // profileSubmit() {
  //   this.setState({ profileSubmit: true });
  // }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ fromRegister: false, show: false });
    console.log("Profile submit: ", this.profileSubmit);
  }

  // componentWillMount = () => {
  //   console.log("prop from register: ", this.props.location.state.fromRegister);
  //   console.log("fromRegister: ", this.state.fromRegister);
  //   console.log("show: ", this.state.show);
  //   if (this.props.location.state.fromRegister === true) {
  //     this.setState({ fromRegister: true, show: true });
  //   }
  // };
}
export default Dashboard;
