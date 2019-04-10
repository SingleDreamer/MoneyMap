import React, { Component } from "react";
import UserDetails from "./UserDetails";
import { Redirect } from "react-router-dom";
import axios from "axios";
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
        childFamSize: 0.0
        // size: 0.0 //float, change to adults + children and make children .5 person
      },
      submit: false,
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    } else {
      // console.log("Registered: ", this.state.submit);
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

  handleChange = input => event => {
    const { adultFamSize, childFamSize } = this.state;
    if (input === "adultFamSize" || input === "childFamSize") {
      //fix to update size
      this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          size: Number(Number(adultFamSize) + Number(childFamSize) / 2),

          [input]: event.target.value
        }
      });
    } else {
      this.setState({
        ...this.state,
        userInfo: {
          ...this.state.userInfo,
          [input]: event.target.value
        }
      });
    }
  };

  async handleSubmit(e) {
    e.preventDefault();
    console.log("Registration details: ", this.state.userInfo);

    this.setState({
      userInfo: {
        ...this.state.userInfo,
        adultFamSize: Number(this.state.adultFamSize),
        childFamSize: Number(this.state.childFamSize),
        size: Number(this.state.size)
      }
    });
    let userInfo = this.state.userInfo;
    console.log("Registration details: ", this.state.userInfo);

    console.log(userInfo);
    userInfo.adultFamSize = Number(userInfo.adultFamSize);
    userInfo.childFamSize = 0;
    userInfo.size = Number(userInfo.adultFamSize);
    console.log("new");

    console.log(userInfo);

    let url =
      "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/";
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      let result = await axios.post(url, userInfo, config);
      console.log(result.data);
      if (result.data.success) {
        this.setState({ submit: true });
        alert("Successful reg");
      }
      // const { username, password } = this.state;
      // alert(`Your registration detail: \n
      //        Username: ${username} \n
      //        Password: ${password}`);
    } catch (err) {
      console.log("Frontend error: ", err.response);
      this.setState({ hasError: true });
    }
  }
}

export default Register;
