import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";

class UserDetails extends Component {
  render() {
    return (
      <Form onSubmit={e => this.props.handleSubmit(e)}>
        <Form.Row>
          <Col>
            <Form.Group controlId="fname">
              <Form.Label className="required">First name</Form.Label>
              <Form.Control
                required
                minLength="1"
                maxLength="20"
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
                minLength="1"
                maxLength="20"
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
                minLength="3"
                type="email"
                placeholder="Email"
                onChange={this.props.handleChange("username")}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="married">
              <Form.Label className="required">Marital Status</Form.Label>
              <Form.Control
                required
                as="select"
                defaultValue=""
                onChange={this.props.handleChange("married")}
              >
                <option disabled hidden value="" />
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="married_separately">Married Separately</option>
                <option value="head_of_household">Head Of Household</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="adults">
              <Form.Label className="required">Adults in family</Form.Label>
              <Form.Control
                type="number"
                required
                min="1"
                max="10"
                step="1"
                placeholder="#Adults"
                onChange={this.props.handleChange("adults")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="children">
              <Form.Label className="required">Children in family</Form.Label>
              <Form.Control
                type="number"
                required
                min="0"
                max="10"
                step="1"
                placeholder="#Children"
                onChange={this.props.handleChange("children")}
              />
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="required">Password</Form.Label>
              <Form.Control
                required
                minLength="4"
                maxLength="15"
                type="password"
                placeholder="Password"
                onInput={this.checkPass}
                onChange={this.props.handleChange("password")}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label className="required">Re-enter Password</Form.Label>
              <Form.Control
                required
                minLength="4"
                maxLength="15"
                type="password"
                placeholder="Re-enter Password"
                onInput={this.checkPass}
                onChange={this.props.handleChange("reenterPass")}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            required
            type="checkbox"
            label="I have read and agree to the privacy policy."
            className="required"
          />
          <a href="privacy">Privacy policy</a>
        </Form.Group> */}
        <Button id="newPrimary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }

  checkPass = () => {
    var pass = document.getElementById("formBasicPassword");
    var pass2 = document.getElementById("formBasicPassword2");

    if (
      pass.validity.valid &&
      pass.validity.valid &&
      pass.value !== pass2.value
    ) {
      pass.setCustomValidity("Passwords do not match.");
      pass2.setCustomValidity("Passwords do not match.");
    } else {
      pass.setCustomValidity("");
      pass2.setCustomValidity("");
    }
  };
}

export default UserDetails;
