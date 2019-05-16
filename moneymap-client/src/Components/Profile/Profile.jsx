import React, { Component } from "react";
import { Tabs, Tab, Button, Modal, Card } from "react-bootstrap";
import Chart from "react-apexcharts";
import ProfileDetails from "../Profile/ProfileDetails";
import JobOfferCard from "../JobOfferCard/JobOfferCard";
import axios from "axios";
import AuthService from "../../AuthService/AuthService";

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "profileDetails",
      profile: {},
      user: {},
      userInfo: {},
      showEdit: false,
      showProfile: false
    };
    this.Auth = new AuthService();

    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile,
      user: nextProps.user
    });
  }

  handleClose() {
    this.setState({
      showProfile: false,
      showPrefs: false,
      showEdit: false
    });
  }

  handleShowProfile = () => {
    this.setState({ showProfile: true });
  };
  handleShowEdit = () => {
    this.setState({
      showEdit: true
    });
  };
  test = rfs => {
    let optionsRadial = {
      colors: ["#000000"],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          dataLabels: {
            name: {
              offsetY: -50,
              show: false,
              color: "#888",
              fontSize: "15px"
            },
            value: {
              formatter: function(val) {
                return val;
              },
              offsetY: 5,
              color: "#111",
              fontSize: "20px",
              show: true
            }
          }
        }
      },
      labels: ["RFS"]
    };
    if (rfs >= 50) {
      optionsRadial.colors = ["#35ff53"];
    } else if (rfs < 50 && rfs >= 0) {
      optionsRadial.colors = ["#f48e00"];
    } else if (rfs < 0 && rfs >= -50) {
      optionsRadial.plotOptions.radialBar.startAngle = 360 * (rfs / 100);
      optionsRadial.colors = ["#ffa434"];
    } else {
      optionsRadial.plotOptions.radialBar.startAngle = 360 * (rfs / 100);
      optionsRadial.colors = ["#f45042"];
    }
    return optionsRadial;
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

  sendProfile = e => {
    e.preventDefault();
    console.log("Send profile");
    let userInfo = this.state.userInfo;
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
  render() {
    let prof;
    if (Object.keys(this.state.profile).length > 0) {
      // console.log("test: ", this.state.profile.city);
      prof = (
        <div>
          <div className="header">
            <Card.Title>
              <img
                src={`https://logo.clearbit.com/${
                  this.state.profile.jocname
                }.com`}
                alt={"no logo"}
                width={"30px"}
                style={{ marginRight: "5px" }}
              />
              {this.state.profile.jocname}
            </Card.Title>

            <div className="chart">
              <Chart
                options={this.test(this.state.profile.jocrfc)}
                series={[Math.ceil(this.state.profile.jocrfc)]}
                type="radialBar"
                width="100"
                height="130"
              />
            </div>
          </div>
          <Card.Text>{this.state.profile.city.City}</Card.Text>
          {this.state.profile.components.length ? (
            this.state.profile.components.map((component, index) => (
              <Card.Text key={index}>
                {`${component.ComponentDescription}: $${
                  component.ComponentAmount
                }`}
              </Card.Text>
            ))
          ) : (
            <Card.Text>Empty Card</Card.Text>
          )}{" "}
          <Card.Text>
            Savings: ${Math.round(this.state.profile.savings)}
          </Card.Text>
          <div className="buttons">
            <Button variant="primary" onClick={this.handleShowProfile}>
              Replace Profile
            </Button>
          </div>
          <Modal show={this.state.showProfile} onHide={this.handleClose}>
            <Modal.Header closeButton={false}>
              <Modal.Title>New Profile Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <JobOfferCard
                edit={true}
                handleCloseModal={this.handleClose}
                getCards={this.props.getCards}
                jocid={this.state.profile.jocid}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
    let user = (
      <div>
        <Card.Text>{`First Name: ${this.state.user.FirstName}`}</Card.Text>
        <Card.Text>{`Last Name: ${this.state.user.LastName}`}</Card.Text>
        <Card.Text>{`Marital Status: ${
          this.state.user.MaritalStatus
        }`}</Card.Text>
        <Card.Text>{`Adults in Family: ${this.state.user.Adults}`}</Card.Text>
        <Card.Text>{`Children in Family: ${
          this.state.user.Children
        }`}</Card.Text>
        <div className="buttons">
          <Button variant="primary" onClick={this.handleShowEdit}>
            Replace Account Details
          </Button>
        </div>
        <Modal show={this.state.showEdit} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Replace Account Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProfileDetails
              handleProfChange={this.handleProfChange}
              sendProfile={this.sendProfile}
              userInfo={this.state.userInfo}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
    // let buttons = (
    //   <ButtonGroup vertical size="sm" className="button">
    //     <Button onClick={this.props.handleShow}>Add New Job Offer</Button>
    //     <p />
    //     <Button onClick={this.handleShowPrefs}>Edit Basket of Goods</Button>
    //   </ButtonGroup>
    // );
    return (
      <div>
        <Card
          className="profile"
          bg="light"
          text="dark"
          style={{ width: "25rem" }}
        >
          <Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
            >
              <Tab eventKey="profileDetails" title="Profile Details" />
              <Tab eventKey="userDetails" title="User Details" />
            </Tabs>
          </Card.Header>
          {this.state.key === "profileDetails" ? (
            <Card.Body>{prof}</Card.Body>
          ) : (
            <Card.Body>{user}</Card.Body>
          )}
        </Card>
      </div>
    );
  }
}
export default Profile;
