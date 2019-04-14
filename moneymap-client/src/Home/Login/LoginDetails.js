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
      submit: false
    };
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <p className="required">Required field = </p>
        <Form.Group controlId="email">
          <Form.Label className="required">Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="required">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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
}

export default LoginDetails;
