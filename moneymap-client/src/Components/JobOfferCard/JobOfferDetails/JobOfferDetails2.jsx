import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";

class JobOfferDetails2 extends Component {
  render() {
    return (
      <div>
        <Form.Group controlId="details">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="text"
            placeholder="Details"
            onChange={this.props.handleChange("details")}
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
        <ButtonToolbar>
          <Button variant="secondary" onClick={this.prev}>
            Previous
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </ButtonToolbar>
      </div>
    );
  }

  prev = e => {
    e.preventDefault();
    this.props.prevStep();
  };
}

export default JobOfferDetails2;
