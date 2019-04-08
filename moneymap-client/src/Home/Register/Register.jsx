import React, { Component } from "react";
import UserDetails from "./UserDetails";
// import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AuthService from "../../Components/AuthService/AuthService";
import "../Home.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        fname: "",
        lname: "",
        username: "", //email
        password: "",
        reenterPass: "",
        adultFamSize: 0,
        childFamSize: 0.0,
        size: 0.0 //float, change to adults + children and make children .5 person
      },
      submit: false,
      hasError: false
    };
    this.add = this.add.bind(this);
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
      <div>
        {/* <p>Step {this.state.step} </p> */}
        <p className="required">Required field = </p>
        <UserDetails
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          userInfo={this.state.userInfo}
        />
        {success}
      </div>
    );
  }

  add = () => {
    const { adultFamSize, childFamSize } = this.state;
    this.setState({
      size: adultFamSize + childFamSize / 2
    });
  };

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.add();
    console.log("Registration details: ", this.state.userInfo);
    this.Auth.register(this.state.userInfo)
      .then(res => {
        this.setState({ submit: true });
        // const {username, password } = this.state;
        // alert(`Your registration detail: \n
        //     Username: ${username} \n
        //     Password: ${password}`);
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true });
      });
  }
}

export default Register;
