import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";

class ProfileDetails2 extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       profileInfo2: this.props.profileInfo2,
  //     };
  //   }

  render() {
    return (
      <div>
        <Form.Group controlId="Prof2">
          <Form.Label className="required">Profile 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Prof2"
            onChange={this.props.handleChange("firstName")}
          />
        </Form.Group>

        <Form.Group controlId="Prof2">
          <Form.Label className="required">Profile Info</Form.Label>
          <Form.Control
            type="text"
            placeholder="Prof2"
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

export default ProfileDetails2;
