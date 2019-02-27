import React, { Component } from "react";
// import "../Home.css";
import UserDetails from "./UserDetails";
import ProfileDetails from "./ProfileDetails";
import ProfileDetails2 from "./ProfileDetails2";
import Success from "./Success";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      values: {},
      submit: false
    };
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
  render() {
    const { step } = this.state;

    return <div>{this.renderSwitch(step)}</div>;
  }

  renderSwitch(step) {
    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={this.values}
          />
        );
      case 2:
        return (
          <ProfileDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={this.values}
          />
        );
      case 3:
        return (
          <ProfileDetails2
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={this.values}
          />
        );
      case 4:
        return <Success />;
    }
  }
}

export default Register;
