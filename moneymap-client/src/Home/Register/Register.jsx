import React, { Component } from "react";
import UserDetails from "./UserDetails";
// import { Redirect } from "react-router-dom";
import axios from "axios";
import "../Home.css";
import { withRouter, Redirect } from "react-router-dom";
import AuthService from "../../AuthService/AuthService";

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
      hasError: false,
      isAuthed: false
    };
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    // let success;
    // if (this.state.submit === true) {
    //   console.log("Profile successfully created");
    //   return <Redirect to="/Dashboard" />;
    //   success = (
    //     // <Redirect
    //     //   to={{ pathname: "/dashboard", state: { fromRegister: true } }}
    //     // />

    //     <Redirect to="/dashboard" />
    //   );
    // } else {
    //   // console.log("Registration: ", this.state.submit);
    //}
    if (this.state.isAuthed) {
      return <Redirect to="/Dashboard" />;
    }

    return (
      <div>
        <p className="required">Required field = </p>
        <UserDetails
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          userInfo={this.state.userInfo}
        />
        {/* {success} */}
      </div>
    );
  }

  handleChange = input => event => {
    const { adultFamSize, childFamSize } = this.state;
    if (input === "adultFamSize" || input === "childFamSize") {
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
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        adultFamSize: Number(this.state.adultFamSize),
        childFamSize: Number(this.state.childFamSize),
        size: Number(this.state.size)
      }
    });
    let userInfo = this.state.userInfo;
    userInfo.adultFamSize = Number(userInfo.adultFamSize);
    userInfo.childFamSize = Number(userInfo.childFamSize);
    userInfo.size = Number(userInfo.adultFamSize + userInfo.childFamSize);
    console.log("New registration: ", userInfo);

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
      if (result.data.status !== "error") {
        console.log("success");
        this.setState({ submit: true });
        this.Auth.login(
          this.state.userInfo.username,
          this.state.userInfo.password
        )
          .then(res => {
            this.setState({ isAuthed: true });
          })
          .catch(err => {
            console.log(err);
            this.setState({ hasError: true });
          });
      } else {
        alert("The email you have entered is already in use.");
      }
    } catch (err) {
      console.log("Registration error: ", err.response);
      this.setState({ hasError: true });
    }
  }
}

export default withRouter(Register);
