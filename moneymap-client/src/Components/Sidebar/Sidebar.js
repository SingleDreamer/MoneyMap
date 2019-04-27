import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "@material/react-drawer/dist/drawer.css";
import Drawer, {
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle
} from "@material/react-drawer";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";

import AuthService from "../../AuthService/AuthService";
import Preferences from "../PreferencesWorksheet/PreferencesWorksheet";

import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {
        firstName: "FirstName",
        lastName: "LastName",
        currentCity: "Seattle, WA",
        familySize: 2
      },
      company: {},
      open: false,
      show: false
    };

    this.Auth = new AuthService();
  }

  handleClose = () => {
    this.setState({ open: false });
    console.log("handle close");
  };
  handleCloseModal = () => {
    this.setState({ show: false });
    console.log("handle close");
  };
  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };
  clearSession = () => {
    //this.Auth.logout();
    console.log("cleared");
    this.props.history.replace("/");
    sessionStorage.clear();
  };
  handleProfile = data => {
    this.setState({ userInfo: data });
    console.log("handleProfile data: " + data);
  };

  openPrefrenceWorksheet = () => {
    this.toggleDrawer();
    this.setState({ show: !this.state.show });
  };
  editProfile = () => {};

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      company: nextProps.currentJob
    });
    console.log("company: ", this.state.company);
  }

  componentWillMount = () => {
    // let config = {
    //   headers: {
    //     authorization: this.Auth.getToken(),
    //     "Content-Type": "application/json"
    //   }
    // };
    // // return (
    // //   axios
    // //     // .get("hhttp://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/", config) //needs a route
    // //     .then(response => {
    // //       console.log("Sidebar profile data: " + response.data);
    // //       this.handleProfile(response.data);
    // //     })
    // //     .catch(function(error) {
    // //       console.log(error);
    // //     })
    // // );
  };

  render() {
    return (
      <div>
        <Navbar className="justify-content-between">
          <i className="fas fa-map-signs navIcon" onClick={this.toggleDrawer} />
          <div className="title">Money Map</div>

          <Button variant="danger" onClick={this.clearSession}>
            Log Out
          </Button>
        </Navbar>
        <Drawer dismissible open={this.state.open} onClose={this.handleClose}>
          <DrawerHeader className="header">
            <DrawerTitle>
              <span className="icon">
                <i className="fas fa-user-circle" />
              </span>
              {`${this.state.userInfo.firstName}
          ${this.state.userInfo.lastName}`}
            </DrawerTitle>
          </DrawerHeader>
          {this.state.open ? (
            <DrawerContent className="content">
              <DrawerSubtitle>Relative Finance Score</DrawerSubtitle>
              <div className="content">{`${this.state.company.jocrfc}`}</div>
              <br />
              <DrawerSubtitle>Curent City</DrawerSubtitle>
              <div className="content">{`${
                this.state.userInfo.currentCity
              }`}</div>
              <br />
              <DrawerSubtitle>Monthly Income</DrawerSubtitle>
              <div className="content">{`$${
                this.state.company.components[0].ComponentAmount
              }`}</div>
              <br />
              <DrawerSubtitle>Family Size</DrawerSubtitle>
              <div className="content">{`${
                this.state.userInfo.familySize
              }`}</div>
              <br />
              <DrawerSubtitle>Monthly Expenses</DrawerSubtitle>
              <div className="content">{`$
              ${this.state.company.components[1].ComponentAmount +
                this.state.company.components[2].ComponentAmount +
                this.state.company.components[3].ComponentAmount +
                this.state.company.components[4].ComponentAmount}`}</div>
              <br />
              <DrawerSubtitle>Monthly Savings</DrawerSubtitle>
              <div className="content">{`$${this.state.company.savings}`}</div>
              <br />
              {/* <Modal show={this.state.show} onHide={this.handleCloseModal}>
                <Modal.Header closeButton={false} />

                <Modal.Body>
                  <Preferences items={this.props.items} />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleCloseModal}>Close</Button>
                </Modal.Footer>
              </Modal> */}
              <Button onClick={this.openPrefrenceWorksheet}>Prefrences</Button>
              <br />
              <br />

              <Button onClick={this.editProfile}>Edit Profile</Button>
            </DrawerContent>
          ) : (
            <DrawerContent>
              <Modal
                size="lg"
                show={this.state.show}
                onHide={this.handleCloseModal}
              >
                <Modal.Header closeButton={false}>
                  <Modal.Title>Adjust Preferences</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    <strong>
                      Add your estimated monthly amounts for each category in
                      order to get a more accurate report. If a field is left
                      blank we will use the averages for that city.
                    </strong>
                  </p>
                  <Preferences items={this.props.items} />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleCloseModal}>Close</Button>
                </Modal.Footer>
              </Modal>
              <Button onClick={this.openPrefrenceWorksheet}>Prefrences</Button>
              <Button onClick={this.editProfiles}>Edit Profile</Button>
            </DrawerContent>
          )}
        </Drawer>
      </div>
    );
  }
}
export default withRouter(Sidebar);
