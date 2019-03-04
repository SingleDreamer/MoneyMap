import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class JobOfferDetails extends Component {
  render() {
    return (
      <div>
        <Form.Group controlId="JOCName">
          <Form.Label>Job name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Job name"
            onChange={this.props.handleChange("JOCName")}
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label> Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Location"
            onChange={this.props.handleChange("location")}
          />
        </Form.Group>
        <Form.Group controlId="salary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Salary"
            onChange={this.props.handleChange("salary")}
          />
        </Form.Group>
        <Button variant="primary" onClick={this.next}>
          Next
        </Button>
      </div>
    );
  }

  next = e => {
    e.preventDefault();
    this.props.nextStep();
  };
}

export default JobOfferDetails;
