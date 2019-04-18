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
        relativeScore: this.props.currentJob.jocrfc,
        currentCity: "Seattle, WA",
        monthlyIncome: 10950,
        familySize: 2,
        expenses: 8750,
        savings: 2200
      },
      company: {},
      open: false
    };

    this.Auth = new AuthService();
  }

  handleClose = () => {
    this.setState({ open: false });
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
  componentWillReceiveProps(nextProps) {
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
            </DrawerContent>
          ) : (
            <DrawerContent />
          )}
        </Drawer>
      </div>
    );
  }
}
export default withRouter(Sidebar);
