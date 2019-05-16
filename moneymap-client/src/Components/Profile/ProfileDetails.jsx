import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class ProfileDetails extends Component {
  render() {
    return (
      <Form onSubmit={this.props.sendProfile}>
        <Form.Group controlId="fname">
          <Form.Label className="required">First name</Form.Label>
          <Form.Control
            required
            minLength="1"
            maxLength="20"
            type="text"
            placeholder="First name"
            onChange={this.props.handleProfChange("fname")}
          />
        </Form.Group>

        <Form.Group controlId="lname">
          <Form.Label className="required">Last name</Form.Label>
          <Form.Control
            required
            minLength="1"
            maxLength="20"
            type="text"
            placeholder="Last name"
            onChange={this.props.handleProfChange("lname")}
          />
        </Form.Group>
        <Form.Group controlId="married">
          <Form.Label className="required">Marital Status</Form.Label>
          <Form.Control
            required
            as="select"
            defaultValue=""
            onChange={this.props.handleProfChange("married")}
          >
            <option disabled hidden value="" />
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="married_separately">Married Separately</option>
            <option value="head_of_household">Head Of Household</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="adults">
          <Form.Label className="required">Adults in family</Form.Label>
          <Form.Control
            type="number"
            required
            min="1"
            max="10"
            step="1"
            placeholder="Adults in family"
            onChange={this.props.handleProfChange("adults")}
          />
        </Form.Group>

        <Form.Group controlId="children">
          <Form.Label className="required">Children in family</Form.Label>
          <Form.Control
            type="number"
            required
            min="0"
            max="10"
            step="1"
            placeholder="Children in family"
            onChange={this.props.handleProfChange("children")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Profile Details
        </Button>
      </Form>
    );
  }
}

export default ProfileDetails;
