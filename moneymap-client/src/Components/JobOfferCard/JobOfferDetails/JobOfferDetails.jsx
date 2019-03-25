import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Select from "react-select";
import "../JobOfferCard.css";

class JobOfferDetails extends Component {
  state = {
    selectedOption: { value: "", label: "" }, //map this to the cityid in the database and pass over to joc
    inputs: ["input-0"], //:{name:"", amount:null} maybe send row data here then send using row???
    filledInName: false,
    filledInAmount: false
  };

  handleThisChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  addRow() {
    if (!!this.state.filledInName && !!this.state.filledInAmount) {
      console.log("Filled in!");
      var newInput = `input-${this.state.inputs.length}`;
      this.setState(prevState => ({
        inputs: prevState.inputs.concat([newInput]), //what if i did an object of objects
        filledInName: false,
        filledInAmount: false
      }));
    }
    //else error message to fill last box in
  }

  render() {
    const { selectedOption } = this.state;
    const { values } = this.props;
    let row = (
      <Form.Row>
        {/* can i send the whole row to handle change */}
        <Col>
          <Form.Control
            required
            type="text"
            placeholder="Income source"
            onChange={this.props.handleNameChange()}
            onInput={() => this.setState({ filledInName: true })}
            // defaultValue={
            //   "values.Components[values.Components.cdesc].cdesc" || null
            // }
          />
        </Col>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {" "}
          Please enter your income name.
        </Form.Control.Feedback>
        <Col>
          <Form.Control
            required
            type="number"
            placeholder="Income"
            onInput={() => this.setState({ filledInAmount: true })}
            onChange={this.props.handleChange(
              "Components",
              "values.Components",
              1
            )} //how to grab the name that was input
            defaultValue={values.Components["Income"].camt || null} //how to reference the object that was just created
          />
        </Col>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          {" "}
          Please enter your income.
        </Form.Control.Feedback>
      </Form.Row>
    );
    return (
      <div>
        <Form.Group controlId="name">
          <Form.Label className="required">Job name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Job name"
            onChange={this.props.handleChange("name")}
            defaultValue={values.name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {" "}
            Please enter a job name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label className="required">Job city</Form.Label>

          <Select
            isClearable //handle this; breaks
            defaultValue={selectedOption.value || ""}
            onChange={this.handleThisChange}
            options={cities}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {" "}
            Please enter a city name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="income">
          <Form.Label className="required">Income</Form.Label>

          {this.state.inputs.map(input => (
            <div key={input}>{row}</div>
          ))}

          <Button variant="primary" onClick={() => this.addRow()}>
            {" "}
            Add row
          </Button>
        </Form.Group>
        <Button variant="primary" onClick={this.next}>
          Next
        </Button>
      </div>
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

const cities = [
  {
    value: "NYC",
    label: "NYC"
  },
  {
    value: "NC",
    label: "NC"
  },
  {
    value: "NCR",
    label: "NCR"
  },
  {
    value: "NOO",
    label: "NOO"
  },
  { value: "NCA", label: "NCA" }
];

export default JobOfferDetails;
