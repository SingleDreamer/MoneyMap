import React, { Component } from "react";
import ProfileDetails from "../Sidebar/ProfileDetails";
import JobOfferDetails from "./JobOfferDetails/JobOfferDetails";
import JobOfferDetails2 from "./JobOfferDetails/JobOfferDetails2";
import { Form } from "react-bootstrap";
import AuthService from "../../AuthService/AuthService";
import axios from "axios";

class JobOfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      userInfo: {
        fname: "",
        lname: "",
        adultFamSize: 0,
        childFamSize: 0.0
      },
      uid: sessionStorage.getItem("user"),
      name: "",
      cityid: 0,
      image: "",
      Components: {
        Income: {
          cdesc: "Income",
          camt: 0,
          ctype: 1
        },
        "Mandatory Costs": {
          cdesc: "Mandatory Costs",
          camt: 0,
          ctype: 2
        },
        "Consumable Costs": {
          cdesc: "Consumable Costs",
          camt: 0,
          ctype: 3
        },
        "Entertainment Expenses": {
          cdesc: "Entertainment Expenses",
          camt: 0,
          ctype: 4
        },
        Debt: {
          cdesc: "Debt",
          camt: 0,
          ctype: 5
        }
      },
      cityAvgs: {},
      profSubmit: false,
      submit: false,
      error: null,
      newProfile: false
    };
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleProfChange = this.handleProfChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ newProfile: nextProps.newProfile });
  }
  render() {
    const { step, cityAvgs } = this.state;
    const { name, cityid, image, Components } = this.state;
    const values = { name, cityid, image, Components };

    let joc = (
      <Form onSubmit={this.handleSubmit}>
        <p>Step {step} </p>
        {this.renderSwitch(step, values, cityAvgs)}
      </Form>
    );

    return (
      <div>
        {this.state.profSubmit === true || this.state.newProfile === false ? (
          joc
        ) : (
          <ProfileDetails
            nextStep={this.nextStep}
            handleProfChange={this.handleProfChange}
            sendProfile={this.sendProfile}
            userInfo={this.state.userInfo}
          />
        )}
      </div>
    );
  }

  renderSwitch(step, values, cityAvgs) {
    switch (step) {
      case 1:
        return (
          <JobOfferDetails
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleCitySelection={this.handleCitySelection}
            values={values}
            cityid={this.state.cityid}
          />
        );
      case 2:
        return (
          <JobOfferDetails2
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            cityAvgs={cityAvgs}
          />
        );
      default:
        return;
    }
  }

  nextStep = () => {
    // console.log("Values: ", this.state.Components);
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };
  handleCitySelection = cityid => {
    this.setState({
      cityid: cityid
    });
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/cities/${cityid}/averages/${sessionStorage.getItem(
          "user"
        )}`,
        config
      )
      .then(response => {
        let avgs = response.data.recordset;
        this.setState({
          cityAvgs: avgs
        });

        for (var i = 0; i < this.state.cityAvgs.length; i++) {
          if (this.state.cityAvgs[i].ComponentTypeID === 2) {
            this.setState({
              ...this.state,
              Components: {
                ...this.state.Components,
                "Mandatory Costs": {
                  ...this.state.Components["Mandatory Costs"],
                  camt: Math.round(this.state.cityAvgs[i].Amount)
                }
              }
            });
            break;
          }
        }
        for (var j = 0; j < this.state.cityAvgs.length; j++) {
          if (this.state.cityAvgs[j].ComponentTypeID === 3) {
            this.setState({
              ...this.state,
              Components: {
                ...this.state.Components,
                "Consumable Costs": {
                  ...this.state.Components["Consumable Costs"],
                  camt: Math.round(this.state.cityAvgs[j].Amount)
                }
              }
            });
            break;
          }
        }
        for (var k = 0; k < this.state.cityAvgs.length; k++) {
          if (this.state.cityAvgs[k].ComponentTypeID === 4) {
            this.setState({
              ...this.state,
              Components: {
                ...this.state.Components,
                "Entertainment Expenses": {
                  ...this.state.Components["Entertainment Expenses"],
                  camt: Math.round(this.state.cityAvgs[k].Amount)
                }
              }
            });
            break;
          }
        }
        console.log("City averages: ", this.state.cityAvgs);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleProfChange = input => event => {
    this.setState({
      ...this.state,
      userInfo: {
        ...this.state.userInfo,
        [input]: event.target.value
      }
    });
  };

  handleChange = (input, input2, input3) => event => {
    // console.log("input: ", input, input2, input3);
    if (!!input2 && !!this.state.Components[input2]) {
      this.setState(
        {
          ...this.state,
          Components: {
            ...this.state.Components,
            [input2]: {
              cdesc: input2,
              camt: event.target.value,
              ctype: input3
            }
          }
        },
        () => {
          console.log("Components: ", this.state.Components);
        }
      );
    } else if (!!input2) {
      this.setState(
        {
          ...this.state,
          Components: {
            ...this.state.Components,
            [input2]: {
              ...this.state.Components[input2],
              cdesc: input2,
              camt: event.target.value,
              ctype: input3
            }
          }
        },
        () => {
          console.log("Components 2: ", this.state.Components);
        }
      );
    } else {
      this.setState({ ...this.state, [input]: event.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.newProfile === false) {
      this.props.handleClose();
    } else {
      this.props.handleCloseModal();
    }
    // this.props.profileSubmit();

    this.setState({
      submit: true
    });
    console.log("Components: ", this.state.Components);

    return this.sendRequest();
  };

  sendProfile = e => {
    e.preventDefault();
    console.log("Send profile");
    this.setState({ profSubmit: true });
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
          console.log("edit profilesuccess");
          console.log("Response: ", response.data);
        })
        .catch(err => {
          this.setState({ error: err });
          //   console.log("####");
          console.log("Error1: ", err);
        });
    } catch (err) {
      console.log("Edit Profile error: ", err.response);
    }
  };

  sendRequest() {
    let url =
      "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc";

    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    // console.log("CONFIG");
    // console.log(config.headers.authorization);
    const { uid, name, cityid, image, Components } = this.state;
    let payload1 = { uid, name, cityid, image };

    console.log("Payload1: ", payload1);
    let body = [];
    for (var key in Components) {
      body.push(Components[key]);
    }
    console.log("bodyy: ", body);

    //update profile post
    if (this.state.newProfile === true) {
      let updateUrl = `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/${sessionStorage.getItem(
        "user"
      )}`;
      let updatePayload = { name, cityid, image, body };
      try {
        axios
          .post(updateUrl, updatePayload, config)
          .then(response => {
            // console.log(".then() payload1: ", payload1);
            console.log("Response: ", response.data);
          })
          .catch(err => {
            this.setState({ error: err });
            //   console.log("####");
            console.log("Error2: ", err);
          });
      } catch (err) {
        this.setState({ error: err });
        console.log("####");
        console.log(err);
      }
    } else {
      //normal joc post
      try {
        axios
          .post(url, payload1, config)
          .then(response => {
            // console.log(".then() payload1: ", payload1);
            console.log("Response: ", response.data);
            let url2 =
              "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/" +
              response.data.JobOfferCardID +
              "/components";
            console.log("Response: ", response.data);
            const body2 = body.map(component => {
              return { ...component, JobOfferCardID: response.data };
            });
            console.log("bodyy2: ", body2);

            axios
              .post(url2, body2, config)
              .then(response2 => {
                console.log(response2);
                //alert(`Successfully submitted`);
                if (this.state.newProfile === true) {
                  this.props.deleteOldProfile();
                  console.log("deleted old profile");
                  // doesn't assign priority 0
                }
                this.props.getCards("Created New Profile");
              })
              .catch(err => {
                this.setState({ error: err });
                //   console.log("####");
                console.log("Error1: ", err);
              });
          })
          .catch(err => {
            this.setState({ error: err });
            //   console.log("####");
            console.log("Error2: ", err);
          });
      } catch (err) {
        this.setState({ error: err });
        console.log("####");
        console.log(err);
      }
    }
  }
}

export default JobOfferCard;
