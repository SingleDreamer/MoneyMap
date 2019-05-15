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
        adults: 0,
        children: 0
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
    this.setState({
      ...this.state,
      userInfo: {
        ...this.state.userInfo,
        [input]: event.target.value
      }
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        adults: Number(this.state.adults),
        children: Number(this.state.children)
      }
    });
    let userInfo = this.state.userInfo;
    userInfo.adults = Number(this.state.userInfo.adults);
    userInfo.children = Number(this.state.userInfo.children);
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
        alert("There was an error with your registration.");
      }
    } catch (err) {
      console.log("Registration error: ", err.response);
      this.setState({ hasError: true });
    }
  }
}

export default withRouter(Register);
