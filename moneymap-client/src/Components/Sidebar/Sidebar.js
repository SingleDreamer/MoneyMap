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
import JobOfferCard from "../JobOfferCard/JobOfferCard";
import AuthService from "../../AuthService/AuthService";
import Preferences from "../PreferencesWorksheet/PreferencesWorksheet";

import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {
        FirstName: "",
        LastName: "",
        FamilySize: 0
      },
      company: {},
      profile: {},
      open: false,
      show: false,
      showProfile: false
    };

    this.Auth = new AuthService();
  }

  handleCloseSidebar = () => {
    this.setState({ open: false });
    console.log("handle close");
  };
  handleCloseModal = () => {
    this.setState({ show: false, showProfile: false });
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
  editProfile = () => {
    this.toggleDrawer();
    this.setState({ showProfile: !this.state.showProfile });
  };

  // deleteOldProfile = () => {
  //   let config = {
  //     headers: {
  //       authorization: this.Auth.getToken(),
  //       "Content-Type": "application/json"
  //     }
  //   };
  //   axios
  //     .get(
  //       `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
  //         "user"
  //       )}/jocs`,
  //       config
  //     )
  //     .then(response => {
  //       let jocs = response.data.result;
  //       console.log("JOCS array: ", jocs);
  //       jocs.forEach(company => {
  //         if (company.priority === 0) {
  //           axios
  //             .delete(
  //               "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/" +
  //                 company.jocid,
  //               config
  //             )
  //             .then(res => this.props.getCards("Deleted Cards"))
  //             .catch(error => {
  //               console.log(error);
  //             });
  //         }
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      company: nextProps.currentJob,
      userInfo: nextProps.user
    });
    console.log("company: ", this.state.company);
  }

  componentWillMount = () => {
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
          "user"
        )}/profile`,
        config
      )
      .then(response => {
        let jocs = response.data.result;
        console.log(jocs);
        this.setState({
          profile: jocs
        });
      })
      .catch(error => {
        console.log(error);
      });
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
        <Drawer
          dismissible
          open={this.state.open}
          onClose={this.handleCloseSidebar}
        >
          <DrawerHeader className="header">
            <DrawerTitle>
              <span className="icon">
                <i className="fas fa-user-circle" />
              </span>
              {`${this.state.userInfo.FirstName}
          ${this.state.userInfo.LastName}`}
            </DrawerTitle>
          </DrawerHeader>
          {this.state.company.jocrfc !== undefined ? (
            <div>
              {this.state.open ? (
                <DrawerContent className="content">
                  <DrawerSubtitle>Relative Finance Score</DrawerSubtitle>
                  <div className="content">{`${
                    this.state.company.jocrfc
                  }`}</div>
                  <br />
                  <DrawerSubtitle>Current City</DrawerSubtitle>
                  <div className="content">{`${
                    this.state.company.city.City
                  }`}</div>
                  <br />
                  <DrawerSubtitle>Monthly Income</DrawerSubtitle>
                  <div className="content">{`$${
                    this.state.company.components[0].ComponentAmount
                  }`}</div>
                  <br />
                  <DrawerSubtitle>Family Size</DrawerSubtitle>
                  <div className="content">{`${
                    this.state.userInfo.FamilySize
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
                  <div className="content">{`$${
                    this.state.company.savings
                  }`}</div>
                  <br />
                  <Button onClick={this.openPrefrenceWorksheet}>
                    Edit Basket Of Goods
                  </Button>
                  <br />
                  <br />
                  <Button onClick={this.editProfile}>Replace Profile</Button>
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
                          Add your estimated monthly amounts for each category
                          in order to get a more accurate report. If a field is
                          left blank we will use the averages for that city.
                        </strong>
                      </p>
                      <Preferences
                        items={this.props.items}
                        profCity={this.props.profCity}
                        profilePrefs={this.props.profilePrefs}
                        close={this.handleCloseModal}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.handleCloseModal}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal
                    show={this.state.showProfile}
                    onHide={this.handleCloseModal}
                  >
                    <Modal.Header closeButton={false}>
                      <Modal.Title>New Profile Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <JobOfferCard
                        newProfile={true}
                        handleCloseModal={this.handleCloseModal}
                        getCards={this.props.getCards}
                        jocid={this.state.company.jocid}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.handleCloseModal}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                  {/* delete current card/give priority 0 
              get edit method from backend*/}
                </DrawerContent>
              )}
            </div>
          ) : (
            <DrawerContent className="content">
              <Modal
                size="lg"
                show={this.state.show}
                onHide={this.handleCloseModal}
              >
                <Modal.Header closeButton={false}>
                  <Modal.Title>Basket Of Goods</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    <strong>
                      Add your estimated monthly amounts for each category in
                      order to get a more accurate report. If a field is left
                      blank we will use the averages for that city.
                    </strong>
                  </p>
                  <Preferences
                    items={this.props.items}
                    profCity={this.props.profCity}
                    profilePrefs={this.props.profilePrefs}
                    close={this.handleCloseModal}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleCloseModal}>Close</Button>
                </Modal.Footer>
              </Modal>
              <p>The next job offer you create will become your Profile</p>
              <br />
              <p>AND</p>
              <br />
              <p>Set/Adjust your monthly purchases and expenses below</p>
              <i className="fas fa-arrow-down" style={{ fontSize: "2.5em" }} />
              <br />
              <Button onClick={this.openPrefrenceWorksheet}>Prefrences</Button>
            </DrawerContent>
          )}
        </Drawer>
      </div>
    );
  }
}
export default withRouter(Sidebar);
