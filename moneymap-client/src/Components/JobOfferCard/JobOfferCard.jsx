import React, { Component } from "react";
import JobOfferDetails from "./JobOfferDetails/JobOfferDetails";
import JobOfferDetails2 from "./JobOfferDetails/JobOfferDetails2";
import { Form } from "react-bootstrap";
import axios from "axios";

class JobOfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      uid: "11111111-1111-1111-1111-111111111111",
      name: "",
      cityid: 1,
      image: "",
      Components: { Income: { cdes: "", camt: 0, ctype: "" } },
      submit: false,
      error: null
    };

    this.handleNameChange = this.handleNameChange.bind(this);
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
            handleNameChange={this.handleNameChange}
            values={values}
            // name={this.state.name}
            // cityid={this.state.cityid}
            // Components={this.state.Components}
          />
        );
      case 2:
        return (
          <JobOfferDetails2
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleNameChange={this.handleNameChange}
            values={values}
            // Components={this.state.Components}
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

  handleNameChange = () => {
    this.setState({
      Components: {
        ...this.state.Components,
        test: {
          cdesc: "test",
          camt: "",
          ctype: ""
        }
      }
    });
  };

  handleChange = (input, input2, input3) => event => {
    console.log("input: ", input, input2, input3);
    if (!!input2) {
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
    console.log("Components: ", null || this.state.Components["Income"].camt);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleClose();
    // this.props.profileSubmit();

    this.setState({
      submit: true
    });
    console.log("Components: ", this.state.Components);
    let validation = this.checkInput();
    if (validation) {
      alert("Validation error: ", validation.errMsg);
      return;
    }

    return this.sendRequest();
  };

  sendRequest() {
    let url =
      "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc";
    // "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc";

    let config = {
      headers: {
        // Authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
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

          //something something response something
          let url2 =
            "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/";
          // "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc" +
          // response.data.JobOfferCardID;
          console.log("Response: ", response.data.JobOfferCardID);
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

  checkInput = () => {
    //   let inputs = [
    //     { field: "name", errMsg: "Please enter a name" },
    //     {
    //       field: "cityid",
    //       errMsg: "Please enter location"
    //     },
    //     { field: "image", errMsg: "Please enter your image" }
    //   ];
    //   for (let input of inputs) {
    //     if (!this.state[input.field]) console.log("input: ", input);
    //     return input;
    //   }
    //   return null;
  };
}

export default JobOfferCard;
