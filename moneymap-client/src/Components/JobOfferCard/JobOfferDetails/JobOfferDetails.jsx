import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import ReactAutocomplete from "react-autocomplete";
import "../JobOfferCard.css";

class JobOfferDetails extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      fields: {},
      errors: {},
      validated: false
    };
  }

  render() {
    const { validated } = this.state;

    return (
      <Form noValidate validated={validated}>
        <Form.Group controlId="name">
          <Form.Label className="required">Job name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Job name"
            onChange={this.props.handleChange("name")}
            defaultValue={this.props.name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {" "}
            Please enter a job name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label className="required">Job city</Form.Label>
          <p />
          {/* <Form.Control
            required
            type="text"
            placeholder="City"
            onChange={this.props.handleChange("city")}
            defaultValue={this.props.cityid}
          /> */}
          <ReactAutocomplete
            items={[
              { id: "NYC", label: "NYC" },
              { id: "BOS", label: "BOS" },
              { id: "LA", label: "LA" }
            ]}
            shouldItemRender={(item, value) =>
              item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            getItemValue={item => item.label}
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: highlighted ? "#eee" : "transparent"
                }}
              >
                {item.label}
              </div>
            )}
            value={this.state.value}
            onChange={this.props.handleChange("city")}
            // onChange={e => this.setState({ value: e.target.value })}
            onSelect={value => this.setState({ value })}
            defaultValue={this.props.cityid}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {" "}
            Please enter a city name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="income">
          <Form.Label className="required">Income</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Income"
            onChange={this.props.handleChange("Components", "Income", 1)}
            defaultValue={this.props.Components.Income}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {" "}
            Please enter your income.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={this.next}>
          Next
        </Button>
      </Form>
    );
  }

  next = e => {
    e.preventDefault();
    //if (this.checkInput()) {
    //     let fields = {};
    //     fields["name"] = "";
    //     fields["city"] = "";
    //     fields["income"] = "";
    //     this.setState({fields:fields});
    //     alert("Form submitted");
    // }
    if (e.currentTarget.checkValidity() === false) {
      console.log("Validation false");
      e.stopPropagation();
    } else {
      console.log("Validation true");
      this.props.nextStep();
      this.setState({ validated: true });
    }
  };

  checkInput = () => {
    //   let fields = this.state.fields;
    let errors = {};
    //   let formIsValid = true;

    //   if (!fields["name"]) {
    //     formIsValid = false;
    //     errors["name"] = "*Please enter your job name.";
    //   }

    //   if (typeof fields["name"] !== "undefined") {
    //     if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
    //       formIsValid = false;
    //       errors["name"] = "*Please enter alphabet characters only.";
    //     }
    //   }
    this.setState({
      errors: errors
    });
    return true;
    //   return formIsValid;
  };
}

export default JobOfferDetails;
