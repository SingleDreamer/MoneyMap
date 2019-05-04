import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import "../JobOfferCard.css";

class JobOfferDetails2 extends Component {
  render() {
    const { values } = this.props;

    return (
      <div>
        <strong>*Please Enter Monthly Value for each Field*</strong>
        <p />
        <Form.Group controlId="Mandatory Costs">
          <Form.Label className="required">Mandatory Costs</Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            step="1"
            placeholder="Mandatory Costs"
            onChange={this.props.handleChange(
              "Components",
              "Mandatory Costs",
              2
            )}
            defaultValue={values.Components["Mandatory Costs"].camt || 0}
          />
        </Form.Group>
        <Form.Group controlId="Consumable Costs">
          <Form.Label className="required">Consumable Costs</Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            step="1"
            placeholder="Consumable Costs"
            onChange={this.props.handleChange(
              "Components",
              "Consumable Costs",
              3
            )}
            defaultValue={values.Components["Consumable Costs"].camt || 0}
            // value if i put everything on  same page bc autofill things
          />
        </Form.Group>
        <Form.Group controlId="Entertainment Expenses">
          <Form.Label className="required">Entertainment Expenses</Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            step="1"
            placeholder="Entertainment Expenses"
            onChange={this.props.handleChange(
              "Components",
              "Entertainment Expenses",
              4
            )}
            defaultValue={values.Components["Entertainment Expenses"].camt || 0}
          />
        </Form.Group>
        <Form.Group controlId="Debt">
          <Form.Label className="required">Debt</Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            step="1"
            placeholder="Debt"
            onChange={this.props.handleChange("Components", "Debt", 5)}
            defaultValue={0}
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
