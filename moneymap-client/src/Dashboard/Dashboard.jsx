import React, { Component } from "react";
import CardArray from "../Components/CardArray/CardArray.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import { JobOfferCard } from "../Components/JobOfferCard";
import { Modal, Button } from "react-bootstrap";
import DashboardMap from "../Components/DashboardMap/DashboardMap.js";
import "./Dashboard.css";
import axios from "axios";
import AuthService from "../AuthService/AuthService";
import { Redirect } from "react-router-dom";

var perks = require("./test.json");

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // fromRegister: false,
      profileSubmit: false,
      show: false,
      isAuthed: true,
      spinner: true,
      companies: [],
      profile: []
    };
    this.Auth = new AuthService();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.profileSubmit = this.profileSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({
      isAuthed: true
    });
    setTimeout(() => {
      if (!this.Auth.getToken()) {
        this.setState({ isAuthed: false });
      } else {
        this.getCards();
        this.setState({ spinner: false });
      }
    }, 800);
  }

  getCards = (message = "default") => {
    console.log(message);
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    //getting the cards each time the component renders

    axios
      .get(
        `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
          "user"
        )}/jocs`,
        config
      )
      .then(response => {
        // handle success
        let jocs = response.data.result;
        console.log(jocs);
        jocs.forEach(company => {
          if (company.priority === 0) {
            this.setState({
              profile: company,
              profileSubmit: true,
              show: false
            });
            console.log("Profile: ", this.state.profile);
          }
          company.selected = false;
          if (company.jocname === "Google") {
            company.perks = perks.Google;
          } else if (company.jocname === "Facebook") {
            company.perks = perks.Facebook;
          }
        });
        this.setState({
          companies: jocs
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log("profile submit: ", this.state.profileSubmit);
    let cardType;
    if (this.state.profileSubmit === false) {
      cardType = <Modal.Title>Profile Card</Modal.Title>;
    } else {
      cardType = <Modal.Title>New JobOfferCard</Modal.Title>;
    }
    if (!this.state.isAuthed) {
      return <Redirect to="/" />;
    } else if (this.state.spinner) {
      return (
        <div className="lds-spinner ">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      );
    }
    return (
      <div className="App">
        {/*Need to tuen this into a component to update depending on the currently logged in user's info */}
        <Sidebar className="Sidebar" currentJob={this.state.profile} />
        {/*When this.state.companies changes with the addJOC button the state is mutated which causes new props to be passed and rerenders the CARDARRAY*/}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>{cardType}</Modal.Header>
          <Modal.Body>
            <JobOfferCard
              handleClose={this.handleClose}
              // profileSubmit={this.state.profileSubmit}
              getCards={this.getCards}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <DashboardMap />
        <CardArray
          getCards={this.getCards}
          companies={this.state.companies}
          profile={this.state.profile}
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
