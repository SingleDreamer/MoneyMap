import React, { Component } from "react";
import CardArray from "../Components/CardArray/CardArray.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import { JobOfferCard } from "../Components/JobOfferCard";
import { Modal, Button } from "react-bootstrap";
import "./Dashboard.css";
import myData from "./test.json";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // fromRegister: false,
      profileSubmit: false,
      show: false,
      companies: myData
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.profileSubmit = this.profileSubmit.bind(this);
  }

  render() {
    //When the Add JOC button is clicked it adds 'Uber' the the company list currently in the state
    //using the spread operator. Just for tesing purposes, will be reworked.
    let updateCompanies = () => {
      this.setState({
        ...this.state,
        show: true
      });
      console.log(myData);
    };
    let cardType;
    if (this.state.profileSubmit === false) {
      cardType = <Modal.Title>Profile Card</Modal.Title>; //check if profile submission exists vs backend call
    } else {
      cardType = <Modal.Title>New JobOfferCard</Modal.Title>;
    }

    return (
      <div className="Dashboard">
        {/*Need to tuen this into a component to update depending on the currently logged in user's info */}
        <Sidebar className="Sidebar" />
        <Button className="AddJOC" onClick={() => updateCompanies()}>
          Add New JOC
        </Button>
        {/*When this.state.companies changes with the addJOC button the state is mutated which causes new props to be passed and rerenders the CARDARRAY*/}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>{cardType}</Modal.Header>
          <Modal.Body>
            <JobOfferCard
              handleClose={this.handleClose}
              profileSubmit={this.profileSubmit}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        <CardArray companies={this.state.companies} />
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
    console.log("Profile submit: ", this.state.profileSubmit);
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
