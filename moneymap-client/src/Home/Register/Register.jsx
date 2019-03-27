import React, { Component } from "react";
import UserDetails from "./UserDetails";
import ProfileDetails from "./ProfileDetails";
import ProfileDetails2 from "./ProfileDetails2";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../Home.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      userInfo: {
        firstName: "",
        lastName: "",
        email: "",
        famSize: null,
        age: null,
        city: "",
        state: "",
        country: ""
      },
      profileInfo: {
        info: "",
        moreinfo: ""
      },
      profileInfo2: { info: "", moreinfo: "" },
      submit: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { step } = this.state;
    let success;
    if (this.state.submit === true) {
      console.log("Profile successfully created");

      success = (
        // <h6 style={{ marginTop: "10px" }}>
        //   Profile successfully created. Thank you for registering!
        // </h6>

        // <Redirect
        //   to={{ pathname: "/dashboard", state: { fromRegister: true } }}
        // />
        <Redirect to="/dashboard" />
      );
    }

    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        {/* <p>Step {this.state.step} </p> */}
        <p className="required">Required field = </p>
        {this.renderSwitch(step)}
        {success}
      </Form>
    );
  }

  renderSwitch(step) {
    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            userInfo={this.state.userInfo}
          />
        );
      case 2:
        return (
          <ProfileDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            profileInfo={this.state.profileInfo}
          />
        );
      case 3:
        return (
          <ProfileDetails2
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            profileInfo2={this.state.profileInfo2}
          />
        );
      default:
        return;
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
    const { email, username, password } = this.state;
    alert(`Your registration detail: \n 
      Email: ${email} \n 
      Username: ${username} \n
      Password: ${password}`);
  };
}

export default Register;
