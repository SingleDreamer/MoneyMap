import React, { Component } from "react";
// import "../Home/Home.css";
import { Form, Button } from "react-bootstrap";

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
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicChecbox">
          <Form.Check
            type="checkbox"
            label="Remember Me."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    )
  }
}

export default LoginDetails;
