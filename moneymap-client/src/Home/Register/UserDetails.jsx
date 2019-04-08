import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";

class UserDetails extends Component {
  render() {
    return (
      <Form>
        <Form.Row>
          <Col>
            <Form.Group controlId="fname">
              <Form.Label className="required">First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                onChange={this.props.handleChange("fname")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lname">
              <Form.Label className="required">Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                onChange={this.props.handleChange("lname")}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="username">
              <Form.Label className="required">Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                onChange={this.props.handleChange("username")}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="adultFamSize">
              <Form.Label className="required">Adults in family</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Adults in family"
                onChange={this.props.handleChange("adultFamSize")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="childFamSize">
              <Form.Label className="required">Children in family</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Children in family"
                onChange={this.props.handleChange("childFamSize")}
              />
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
        <Button variant="primary" onSubmit={e => this.props.handleSubmit(e)}>
          Submit
        </Button>
      </Form>
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
