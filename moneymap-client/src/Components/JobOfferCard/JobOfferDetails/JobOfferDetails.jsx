import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class JobOfferDetails extends Component {
  render() {
    return (
      <div>
        <Form.Group controlId="name">
          <Form.Label>Job name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Job name"
            onChange={this.props.handleChange("name")}
            defaultValue={this.props.name}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a job name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            onChange={this.props.handleChange("city")}
            defaultValue={this.props.city}
          />
        </Form.Group>
        <Form.Group controlId="income">
          <Form.Label>Income</Form.Label>
          <Form.Control
            type="number"
            placeholder="Income"
            onChange={this.props.handleChange("Components", "income", 1)}
            // value={this.props.Components.ComponentDescription}
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
