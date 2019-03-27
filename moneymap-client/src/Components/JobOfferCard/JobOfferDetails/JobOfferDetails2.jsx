import React, { Component } from "react";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import "../JobOfferCard.css";

class JobOfferDetails2 extends Component {
  render() {
<<<<<<< HEAD
    //const { values } = this.props;
    // let temp = values => {
    //   if (values.Components["Mandatory Costs"]) {
    //     return values.Components["Mandatory Costs"];
    //   } else {
    //     return null;
    //   }
    // };
=======
    // const { values } = this.props;

>>>>>>> 0045f25d966a1c66808ae9743fab36efe8d57ba0
    return (
      <div>
        <Form.Group controlId="Mandatory Costs">
          <Form.Label className="required">Mandatory Costs</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Mandatory Costs"
            onChange={this.props.handleChange(
              "Components",
              "Mandatory Costs",
              2
            )}
<<<<<<< HEAD
            // defaultValue={temp(values) || null}
=======
            // defaultValue={values.Components["Mandatory Costs"].camt || null}
>>>>>>> 0045f25d966a1c66808ae9743fab36efe8d57ba0
          />
        </Form.Group>

        <Form.Group controlId="Consumable Costs">
          <Form.Label className="required"> Consumable Costs</Form.Label>
          <Form.Control
            type="text"
            placeholder="Consumable Costs"
            onChange={this.props.handleChange(
              "Components",
              "Consumable Costs",
              3
            )}
          />
        </Form.Group>
        <Form.Group controlId="Entertainment Expenses">
          <Form.Label className="required">Entertainment Expenses</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entertainment Expenses"
            onChange={this.props.handleChange(
              "Components",
              "Entertainment Expenses",
              4
            )}
          />
        </Form.Group>
        <Form.Group controlId="Debt">
          <Form.Label className="required">Debt</Form.Label>
          <Form.Control
            type="number"
            placeholder="Debt"
            onChange={this.props.handleChange("Components", "Debt", 5)}
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
