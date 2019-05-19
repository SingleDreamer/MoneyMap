import React, { Component } from "react";
import { Tabs, Tab, Button, Modal, Card } from "react-bootstrap";
import Chart from "react-apexcharts";
import ProfileDetails from "../Profile/ProfileDetails";
import JobOfferCard from "../JobOfferCard/JobOfferCard";
import Charts from "../Card/AnalysisCharts";
import axios from "axios";
import AuthService from "../../AuthService/AuthService";

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "profileDetails",
      profile: {},
      user: {},
      cityAverages: {
        0: {
          0: {
            ComponentTypeID: 2,
            ComponentTypeDescription: "Mandatory Costs",
            Amount: 0
          },
          1: {
            ComponentTypeID: 3,
            ComponentTypeDescription: "Consumable Costs",
            Amount: 0
          },
          2: {
            ComponentTypeID: 4,
            ComponentTypeDescription: "Entertainment Expenses",
            Amount: 0
          },
          3: {
            ComponentTypeID: 1,
            ComponentTypeDescription: "Income",
            Amount: 0
          }
        }
      },
      userInfo: {},
      showEdit: false,
      showProfile: false,
      analyseProfile: false
    };
    this.Auth = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile,
      user: nextProps.user
    });
  }

  componentDidMount() {
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/cities/" +
          this.state.profile.joccityid +
          "/averages/" +
          this.Auth.getUser(),
        config
      )
      .then(res => {
        // console.log("City averages:", res.data.recordsets);
        if (
          (res.data.recordsets[0].length > 0 &&
            res.data.recordsets[0].length < 4) ||
          res.data.recordsets[0].length > 4
        ) {
          this.setState(
            {
              cityAverages: {
                0: {
                  ...this.state.cityAverages[0],
                  0: !!res.data.recordsets[0].find(amount => {
                    return amount.ComponentTypeID === 2;
                  })
                    ? res.data.recordsets[0].find(amount => {
                        return amount.ComponentTypeID === 2;
                      })
                    : { ...this.state.cityAverages[0][0] },
                  1: !!res.data.recordsets[0].find(amount => {
                    return amount.ComponentTypeID === 3;
                  })
                    ? res.data.recordsets[0].find(amount => {
                        return amount.ComponentTypeID === 3;
                      })
                    : { ...this.state.cityAverages[0][1] },
                  2: !!res.data.recordsets[0].find(amount => {
                    return amount.ComponentTypeID === 4;
                  })
                    ? res.data.recordsets[0].find(amount => {
                        return amount.ComponentTypeID === 4;
                      })
                    : { ...this.state.cityAverages[0][2] },
                  3: !!res.data.recordsets[0].find(amount => {
                    return amount.ComponentTypeID === 1;
                  })
                    ? res.data.recordsets[0].find(amount => {
                        return amount.ComponentTypeID === 1;
                      })
                    : { ...this.state.cityAverages[0][3] }
                }
              }
            }
            // () => console.log("This is the state ::: ", this.state.cityAverages)
          );
        } else if (res.data.recordsets[0].length === 4) {
          this.setState({ cityAverages: res.data.recordsets });
          // console.log(this.state.cityAverages[0][0].Amount);
        } else {
          this.setState({
            cityAverages: {
              0: {
                0: { Amount: 0 },
                1: { Amount: 0 },
                2: { Amount: 0 },
                3: { Amount: 0 }
              }
            }
          });
          // console.log(this.state.cityAverages[0][0].Amount);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  handleClose = () => {
    this.setState({
      showProfile: false,
      showPrefs: false,
      showEdit: false,
      analyseProfile: false
    });
  };

  handleShowProfile = () => {
    this.setState({ showProfile: true });
  };
  handleShowAnalysis = () => {
    this.setState({ analyseProfile: true });
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
    // if (rfs >= 50) {
    //   optionsRadial.colors = ["#35ff53"];
    // } else if (rfs < 50 && rfs >= 0) {
    //   optionsRadial.colors = ["#f48e00"];
    // } else if (rfs < 0 && rfs >= -50) {
    //   optionsRadial.plotOptions.radialBar.startAngle = 360 * (rfs / 100);
    //   optionsRadial.colors = ["#ffa434"];
    // } else {
    //   optionsRadial.plotOptions.radialBar.startAngle = 360 * (rfs / 100);
    //   optionsRadial.colors = ["#f45042"];
    // }
    // return optionsRadial;
    if (rfs >= 30 && rfs <= 50) {
      optionsRadial.colors = ["#dbf400"]; //light green
    } else if (rfs > 50) {
      optionsRadial.colors = ["#35ff53"]; //green
    } else { //rfs < 30
      optionsRadial.colors = ["#f45042"]; //red
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

    let rfs = this.state.profile.jocrfc;
    var colors = "dbf400";
    if (rfs >= 30 && rfs <= 50) {
      colors = "dbf400"; //light green
    } else if (rfs > 50) {
      colors = "35ff53"; //green
    } else { //rfs < 30
      colors = "f45042"; //red
    }

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
             {/* <Chart
              options={this.test(this.state.profile.jocrfc)}
              series={[Math.ceil(this.state.profile.jocrfc)]}
              type="radialBar"
              width="100"
              height="130"
            /> */}
            <img src= {"https://ui-avatars.com/api/?length=4\
              &name=" + Math.ceil(this.state.profile.jocrfc).toString() +
              "&rounded=true" +
              "&color=000000" +
              "&background=" + colors}
            style={{ marginRight: "20px", marginTop:"10px" }}
            height="65"
            width="65"/>
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
            <Button variant="primary" onClick={this.handleShowAnalysis}>
              Analyze Profile
            </Button>
          </div>
          <Modal
            show={this.state.analyseProfile}
            onHide={this.closeModal}
            centered
            size="lg"
          >
            <Modal.Header closeButton={false}>
              <Modal.Title>Job offer analysis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Charts
                company={this.state.profile}
                cityAverages={this.state.cityAverages}
                profile={this.state.profile}
              />
              {/* get profile info */}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
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
        <img src= {"https://ui-avatars.com/api/?\
        name=" + this.state.user.FirstName + "+" + this.state.user.LastName +
        "&background=0D8ABC&color=fff"}
        style={{ margin: "10px" }}/>
        <p/>
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
