import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./Sidebar.css";

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
        <Form.Group controlId="MartialStatus">
          <Form.Label className="required">Marital Status</Form.Label>
          <Form.Control
            required
            as="select"
            defaultValue="Choose..."
            onChange={this.props.handleProfChange("MartialStatus")}
          >
            <option>Single</option>
            <option>Married</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="adultFamSize">
          <Form.Label className="required">Adults in family</Form.Label>
          <Form.Control
            type="number"
            required
            min="1"
            max="10"
            step="1"
            placeholder="Adults in family"
            onChange={this.props.handleProfChange("adultFamSize")}
          />
        </Form.Group>

        <Form.Group controlId="childFamSize">
          <Form.Label className="required">Children in family</Form.Label>
          <Form.Control
            type="number"
            required
            min="0"
            max="10"
            step="1"
            placeholder="Children in family"
            onChange={this.props.handleProfChange("childFamSize")}
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
