import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class UserDetails extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userInfo: this.props.userInfo,
  //   };
  // }

  render() {
    return (
      <div>
        <Form.Group controlId="firstName">
          <Form.Label className="required">First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            onChange={this.props.handleChange("firstName")}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label className="required">Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            onChange={this.props.handleChange("lastName")}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label className="required">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={this.props.handleChange("email")}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="required">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword2">
          <Form.Label className="required">Re-enter Password</Form.Label>
          <Form.Control type="password" placeholder="Re-enter Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I have read and agree to the privacy policy."
            className="required"
          />
          <a href="privacy">Privacy policy</a>
        </Form.Group>
        <Button variant="primary" onClick={this.next}>
          Next
        </Button>
      </div>
    );
  }

  next = e => {
    e.preventDefault();
    if (this.checkInput() === true) {
      this.props.nextStep();
    }
  };

  checkInput = () => {
    if (this.props.firstName.length < 5) {
      return false;
    }
    // let inputs = [
    //   { field: "firstName", errMsg: "Please enter first name" },
    //   { field: "lastName", errMsg: "Please enter last name" },
    //   { field: "email", errMsg: "Please enter email" }
    //   // { field: "password", errMsg: "Please enter password" },
    //   // { field: "reenterPassword", errMsg: "Please reenter password" }
    // ];
    // for (let input of inputs) {
    //   if (!this.state[input.field]) return input;
    // }
    return true;
  };
}

export default UserDetails;
