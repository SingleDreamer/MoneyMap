import React, { Component } from "react";
import JobOfferDetails from "./JobOfferDetails/JobOfferDetails";
import JobOfferDetails2 from "./JobOfferDetails/JobOfferDetails2";
import { Form } from "react-bootstrap";
import AuthService from "../AuthService/AuthService";
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
      submit: false,
      error: null
    };
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { step } = this.state;
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
        {this.renderSwitch(step, values)}
        {success}
      </Form>
    );
  }

  renderSwitch(step, values) {
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
    this.props.handleClose();
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
              alert(`Successfully submitted`);
              this.props.updateCompanies();
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
