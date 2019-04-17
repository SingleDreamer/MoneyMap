import React, { Component } from "react";
import AuthService from "./AuthService";

export default function withAuth(AuthComponent) {
  const Auth = new AuthService(
    "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users"
  );
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      };
    }

    componentDidMount() {
      // console.log(Auth.loggedIn());
      if (!Auth.loggedIn()) {
        console.log("withAuth-not logged in");
        this.props.history.replace("/");
      } else {
        try {
          const profile = Auth.getProfile();
          console.log("Auth profile: " + profile);
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace("/");
        }
      }
    }
    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      } else {
        return null;
      }
    }
  };
}
