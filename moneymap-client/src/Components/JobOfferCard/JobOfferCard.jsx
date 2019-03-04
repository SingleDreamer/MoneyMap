import React, { Component } from "react";
import JobOfferDetails from "./JobOfferDetails/JobOfferDetails";
import JobOfferDetails2 from "./JobOfferDetails/JobOfferDetails2";
import { Form } from "react-bootstrap";
import { axios } from "axios";

class JobOfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      jobInfo: [
        {
          info: "",
          moreinfo: ""
        }
      ],
      jobInfo2: [
        {
          info: "",
          moreinfo: ""
        }
      ],
      joc_creation: [
        {
          UID: 1,
          JOCName: "",
          CityID: 1,
          CardImageSrc: ""
        }
      ],
      submit: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  /*POST
/JOC_creation
Body
{
	UID: (1) for now
	JOCName: (max 50 chars)
	CityID: (1) for now
	CardImageSrc: “” (empty string for now)
}
Return 
{
	JobOfferCardID
}
 */

  render() {
    const { step } = this.state;
    let success;
    if (this.state.submit === true) {
      success = (
        <h6 style={{ marginTop: "10px" }}>
          JobOfferCard Successfully created.!
        </h6>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        {" "}
        <p>Step {this.state.step} </p>
        {this.renderSwitch(step)}
        {success}
      </Form>
    );
  }

  renderSwitch(step) {
    switch (step) {
      case 1:
        return (
          <JobOfferDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            joc_creation={this.state.joc_creation}
          />
        );
      case 2:
        return (
          <JobOfferDetails2
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            // profileInfo={this.state.profileInfo}
          />
        );
    }
  }

  nextStep = () => {
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

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submit: true });
    let validation = this.checkInput();
    if (validation) {
      alert(validation.errMsg);
      return;
    }
    const { jobInfo, jobInfo2, joc_creation } = this.state;
    alert(`Your job offer detail: \n 
      Job info: ${jobInfo} \n 
      Job info 2: ${jobInfo2}\n
      JOC Creations: ${joc_creation.JOCName}`);

    return this.sendRequest();
  };

  async sendRequest() {
    let url = "http://localhost:3000/test";
    // let url = "http://104.248.233.14:5000/v1/survey";

    let config = {
      headers: {
        // Authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };

    let payload = {
      UID: 1,
      JOCName: this.state.JOCName,
      CityID: 1,
      CityImageSrc: ""
    };

    console.log(payload);

    try {
      let response = await axios.post(url, payload, config);
      console.log("****");
      console.log(response);
      if (response.data.message) alert(response.data.message);
      return response;
    } catch (err) {
      console.log("####");
      console.log(err);
    }
  }

  checkInput = () => {
    let inputs = [
      { field: "JOCName", errMsg: "Please enter a name" },
      {
        field: "location",
        errMsg: "Please enter location"
      },
      { field: "salary", errMsg: "Please enter your salary" }
    ];
    for (let input of inputs) {
      if (!this.state[input.field]) return input;
    }

    return null;
  };
}

export default JobOfferCard;
