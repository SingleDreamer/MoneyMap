import React, { Component } from "react";
import JobOfferDetails from "./JobOfferDetails/JobOfferDetails";
import JobOfferDetails2 from "./JobOfferDetails/JobOfferDetails2";
import { Form } from "react-bootstrap";

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
      submit: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

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
            userInfo={this.state.userInfo}
          />
        );
      case 2:
        return (
          <JobOfferDetails2
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            profileInfo={this.state.profileInfo}
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

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submit: true });
    const { jobInfo, jobInfo2 } = this.state;
    alert(`Your job offer detail: \n 
      Job info: ${jobInfo} \n 
      Job info 2: ${jobInfo2}`);
  };
}

export default JobOfferCard;
