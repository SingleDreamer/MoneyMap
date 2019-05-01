import React, { Component } from "react";
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
      uid: sessionStorage.getItem("user"),
      name: "",
      cityid: 1,
      image: "",
      Components: {},
      cityAvgs: {},
      submit: false,
      error: null,
      newProfile: false,
      temp: []
    };
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ newProfile: nextProps.newProfile });
  }
  render() {
    const { step, cityAvgs } = this.state;
    const { name, cityid, image, Components } = this.state;
    const values = { name, cityid, image, Components };

    let success;
    if (
      this.state.submit === true &&
      !this.state.error &&
      this.state.page === 2
    ) {
      //add other checks for post response
      success = (
        <h6 style={{ marginTop: "10px" }}>
          JobOfferCard Successfully created.!
        </h6>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        {" "}
        <p>Step {step} </p>
        {this.renderSwitch(step, values, cityAvgs)}
        {success}
      </Form>
    );
  }

  renderSwitch(step, values, cityAvgs) {
    switch (step) {
      case 1:
        return (
          <JobOfferDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleCitySelection={this.handleCitySelection}
            values={values}
          />
        );
      case 2:
        return (
          <JobOfferDetails2
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            cityAvgs={this.state.cityAvgs}
            temp={this.state.temp}
          />
        );
      default:
        return;
    }
  }

  nextStep = () => {
    console.log("Values: ", this.state.Components);
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
            this.state.temp.push(this.state.cityAvgs[i].Amount);
          }
        }
        for (var j = 0; j < this.state.cityAvgs.length; j++) {
          if (this.state.cityAvgs[j].ComponentTypeID === 3) {
            this.state.temp.push(this.state.cityAvgs[j].Amount);
          }
        }
        for (var k = 0; k < this.state.cityAvgs.length; k++) {
          if (this.state.cityAvgs[k].ComponentTypeID === 4) {
            this.state.temp.push(this.state.cityAvgs[k].Amount);
          }
        }
        console.log("temp: ", this.state.temp);
        console.log("City averages: ", this.state.cityAvgs);
      })
      .catch(error => {
        console.log(error);
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
      this.setState({
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
      });
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

  sendRequest() {
    let url =
      "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc";

    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    console.log("CONFIG");
    console.log(config.headers.authorization);
    const { uid, name, cityid, image, Components } = this.state;
    let payload1 = { uid, name, cityid, image };

    console.log("Payload1: ", payload1);
    let body = [];
    for (var key in Components) {
      body.push(Components[key]);
    }
    console.log("bodyy: ", body);
    try {
      axios
        .post(url, payload1, config)

        .then(response => {
          // console.log(".then() payload1: ", payload1);
          console.log("Response: ", response.data);
          //something something response something
          let url2 =
            "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/" +
            response.data.JobOfferCardID;
          console.log("Response: ", response.data);
          const body2 = body.map(component => {
            return { ...component, JobOfferCardID: response.data };
          });
          console.log("bodyy2: ", body2);

          axios
            .post(url2, body2, config)
            .then(response2 => {
              //something something response something
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
              //   alert(`Ya got an error boy reponse2 \n
              // ${err}`);
            });
        })
        .catch(err => {
          this.setState({ error: err });
          //   console.log("####");
          console.log("Error2: ", err);
          //   alert(`Ya got an error boy \n
          // ${err}`);
        });
    } catch (err) {
      this.setState({ error: err });
      console.log("####");
      console.log(err);
      // alert(`Ya got an error boy \n
      // ${err}`);
    }
  }
}

export default JobOfferCard;
