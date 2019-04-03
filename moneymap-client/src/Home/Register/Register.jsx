import React, { Component } from "react";
import UserDetails from "./UserDetails";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AuthService from "../../Components/AuthService/AuthService";
import "../Home.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        reenterPass: "",
        famSize: null,
        age: null
        // city: "",
        // state: "",
        // country: ""
      },
      submit: false,
      hasError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }

  render() {
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
      <Form>
        {/* <p>Step {this.state.step} </p> */}
        <p className="required">Required field = </p>
        <UserDetails
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          userInfo={this.state.userInfo}
        />
        <Button variant="primary" onSubmit={e => this.handleSubmit(e)}>
          Submit
        </Button>
        {success}
      </Form>
    );
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.Auth.register(this.state.userInfo)
      .then(res => {
        this.setState({ submit: true });
        const { email, username, password } = this.state;
        alert(`Your registration detail: \n 
            Email: ${email} \n 
            Username: ${username} \n
            Password: ${password}`);
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      });
  }
}

export default Register;
