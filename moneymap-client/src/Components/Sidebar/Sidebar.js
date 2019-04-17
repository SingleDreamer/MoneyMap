import React, { Component } from "react";
import "./Sidebar.css";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "@material/react-drawer/dist/drawer.css";
import Drawer, {
  DrawerContent,
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle
} from "@material/react-drawer";
import Navbar from "react-bootstrap/Navbar";
import AuthService from "../../AuthService/AuthService";
import axios from "axios";

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {
        firstName: "FirstName",
        lastName: "LastName",
        relativeScore: 84,
        currentCity: "Seattle, WA",
        monthlyIncome: 10950,
        familySize: 2,
        expenses: 8750,
        savings: 2200
      },
      open: false
    };
    this.Auth = new AuthService();
    this.handleProfile = this.handleProfile.bind(this);
  }

  handleClose = () => {
    this.setState({ open: false });
    console.log("handle close");
  };
  clearSession = () => {
    //this.Auth.logout();
    console.log("cleared");
    this.props.history.replace("/");
    sessionStorage.clear();
  };
  handleProfile(data) {
    this.setState({ userInfo: data });
    console.log("handleProfile data: " + data);
  }

  componentWillMount = () => {
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };

    // return (
    //   axios
    //     // .get("hhttp://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/", config) //needs a route
    //     .then(response => {
    //       console.log("Sidebar profile data: " + response.data);
    //       this.handleProfile(response.data);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     })
    // );
  };

  render() {
    return (
      <div>
        <Navbar id="app" className="justify-content-between">
          <i
            className="fas fa-map-signs navIcon"
            onClick={() => this.setState({ open: true })}
          />
          <div className="title">Money Map</div>

          <Button variant="danger" onClick={this.clearSession}>
            Log Out
          </Button>
        </Navbar>
        <Drawer dismissible open={this.state.open} onClose={this.handleClose}>
          <DrawerHeader className="header">
            <DrawerTitle>
              {" "}
              <span className="icon">
                <i className="fas fa-user-circle" />
              </span>
              {`${this.state.userInfo.firstName}
          ${this.state.userInfo.lastName}`}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerContent className="content">
            <DrawerSubtitle>Relative Finance Score</DrawerSubtitle>
            <div className="content">{`${
              this.state.userInfo.relativeScore
            }`}</div>
            <br />
            <DrawerSubtitle>Curent City</DrawerSubtitle>
            <div className="content">{`${
              this.state.userInfo.currentCity
            }`}</div>
            <br />
            <DrawerSubtitle>Monthly Income</DrawerSubtitle>
            <div className="content">{`$${
              this.state.userInfo.monthlyIncome
            }`}</div>
            <br />
            <DrawerSubtitle>Family Size</DrawerSubtitle>
            <div className="content">{`${this.state.userInfo.familySize}`}</div>
            <br />
            <DrawerSubtitle>Monthly Expenses</DrawerSubtitle>
            <div className="content">{`$${this.state.userInfo.expenses}`}</div>
            <br />
            <DrawerSubtitle>Monthly Savings</DrawerSubtitle>
            <div className="content">{`$${this.state.userInfo.savings}`}</div>
            <br />
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}
export default withRouter(Sidebar);
