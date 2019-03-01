import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class Register extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userInfo: this.props.userInfo,
  //   };
  // }

  render() {
    return (
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            onChange={this.props.handleChange("firstName")}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            onChange={this.props.handleChange("lastName")}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={this.props.handleChange("email")}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control type="password" placeholder="Re-enter Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I have read and agree to the privacy policy."
          />
          <a href="privacy">Privacy policy</a>
        </Form.Group>
        <Button variant="primary" onClick={this.next}>
          Next
        </Button>
      </Form>
    );
  }

  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };
}

export default Register;
