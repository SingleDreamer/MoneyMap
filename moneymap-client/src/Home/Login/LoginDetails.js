import React, { Component } from "react";
import "../Home.css";
import { Form, Button } from "react-bootstrap";
import AuthService from "../../AuthService/AuthService";
import { Link } from "react-router-dom";
class LoginDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submit: false,
      hasError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <p className="required">Required field = </p>
        <Form.Group controlId="email">
          <Form.Label className="required">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={e => this.handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="required">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Link to="/Dashboard">
          <Button
            id="newPrimary"
            type="submit"
            onClick={() => this.handleSubmit()}
          >
            Login
          </Button>
        </Link>
      </Form>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    this.Auth.login(this.state.email, this.state.password).catch(err => {
      console.log(err);
      this.setState({ hasError: true });
    });
  }

  // componentWillMount = () => {
  //   if (this.Auth.loggedIn()) {
  //     this.props.history.replace("/dashboard");
  //   }
  // };
}

export default LoginDetails;
