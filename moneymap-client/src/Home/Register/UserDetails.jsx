import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";

class UserDetails extends Component {
  render() {
    return (
      <div>
        <Form.Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label className="required">First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                onChange={this.props.handleChange("firstName")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label className="required">Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                onChange={this.props.handleChange("lastName")}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label className="required">Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                onChange={this.props.handleChange("email")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="famSize">
              <Form.Label className="required">Family size</Form.Label>
              <Form.Control
                as="select"
                required
                placeholder="Choose..."
                onChange={this.props.handleChange("famSize")}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10+</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="required">Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label className="required">Re-enter Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Re-enter Password"
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            required
            type="checkbox"
            label="I have read and agree to the privacy policy."
            className="required"
          />
          <a href="privacy">Privacy policy</a>
        </Form.Group>
        {/* <Button variant="primary" onClick={this.next}>
          Next
        </Button> */}
      </div>
    );
  }

  checkInput = () => {
    // if (this.props.firstName.length < 5) {
    //   return false;
    // }
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
