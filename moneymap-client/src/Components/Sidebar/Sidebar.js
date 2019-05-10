import React, { Component } from "react";
import { Modal, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "@material/react-drawer/dist/drawer.css";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import AuthService from "../../AuthService/AuthService";
import ProfileDetails from "./ProfileDetails";

import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {},
      showEdit: false
    };

    this.Auth = new AuthService();
  }

  clearSession = () => {
    this.props.history.replace("/");
    sessionStorage.clear();
  };

  handleCloseModal = () => {
    this.setState({ showEdit: false });
  };

  handleProfChange = input => event => {
    this.setState(
      {
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          [input]: event.target.value
        }
      },
      () => console.log("prof: ", this.state.userInfo)
    );
  };

  handleShowEdit = () => {
    this.setState({
      showEdit: true
    });
  };

  sendProfile = e => {
    e.preventDefault();
    console.log("Send profile");
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        adultFamSize: Number(this.state.adultFamSize),
        childFamSize: Number(this.state.childFamSize),
        size: Number(this.state.size)
      }
    });
    let userInfo = this.state.userInfo;
    userInfo.adultFamSize = Number(userInfo.adultFamSize);
    userInfo.childFamSize = 0;
    userInfo.size = Number(userInfo.adultFamSize);
    let url = `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
      "user"
    )}/profile`;
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    console.log("userInfo ", userInfo);

    try {
      axios
        .post(url, userInfo, config)
        .then(response => {
          console.log("Edit Profile Response: ", response.data);
        })
        .catch(err => {
          this.setState({ error: err });
          console.log("Error1: ", err);
        });
    } catch (err) {
      console.log("Edit Profile error: ", err.response);
    }
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      userInfo: nextProps.user
    });
  }

  render() {
    return (
      <div>
        <Navbar className="justify-content-between">
          <i className="fas fa-map-signs navIcon" onClick={this.toggleDrawer} />
          <div className="title">Money Map</div>
          <ButtonGroup>
            <Button variant="primary" onClick={this.handleShowEdit}>
              Edit Account Details
            </Button>
            <Button variant="danger" onClick={this.clearSession}>
              Log Out
            </Button>
          </ButtonGroup>
        </Navbar>
        <Modal show={this.state.showEdit} onHide={this.handleCloseModal}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Edit Account Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProfileDetails
              handleProfChange={this.handleProfChange}
              sendProfile={this.sendProfile}
              userInfo={this.state.userInfo}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default withRouter(Sidebar);
