import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Select from "react-select";
import "../JobOfferCard.css";

class JobOfferDetails extends Component {
  state = {
    selectedOption: { value: "", label: "" }, //map this to the cityid in the database and pass over to joc
    inputs: ["input-0"], //:{name:"", amount:null} maybe send row data here then send using row???
    filledInName: false,
    filledInAmount: false,
    cmt: 0
  };

  handleCityChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleAmountChange = event => {
    this.setState({
      cmt: event.target.value
    });
    console.log(this.state);
  };

  addRow() {
    this.props.handleNameChange();
    if (!!this.state.filledInName && !!this.state.filledInAmount) {
      console.log(
        "Filled in! tempname, tempincome",
        this.state.tempName,
        this.state.tempIncome
      );
      // this.props.handleChange(
      //   "Components",
      //   this.state.tempName,
      //   this.state.tempIncome,
      //   1
      // );
      var newInputLength = `input-${this.state.inputs.length}`;
      var newInput = { id: newInputLength, tempName: "", tempIncome: "" };

      this.setState(prevState => ({
        inputs: prevState.inputs.concat([newInput]), //what if i did an arr of objects
        filledInName: false,
        filledInAmount: false,
        tempName: "",
        tempIncome: ""
      }));
    } else {
      console.log("fill in previous row");
    }
  }

  removeRow = rowItem => {
    this.setState(({ inputs }) => ({
      inputs: inputs.filter(i => i !== rowItem)
    }));
  };

  render() {
    const { selectedOption, inputs } = this.state;
    const { values } = this.props;

    let row = (
      <Form.Row>
        <Col>
          {/* try making it so that first box is entered then second box pops up */}
          <Form.Control
            required
            type="text"
            placeholder="Income source"
            onChange={this.handleTempChange("tempName")}
            // change this
            onInput={() => this.setState({ filledInName: true })}
            // make sure things arent deleted
            // defaultValue={
            //   "values.Components[values.Components.cdesc].cdesc" || null
            // }
          />
        </Col>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Please enter your income name.
        </Form.Control.Feedback>
        {/* submit first thing */}
        {/* onclick second box sends variable of first box to components state */}
        <Col>
          <Form.Control
            required
            type="number"
            placeholder="Income"
            onChange={this.handleAmountChange}
            onInput={() => this.setState({ filledInAmount: true })}
            //how to grab the name that was input
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
            Please enter a job name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label className="required">Job city</Form.Label>

          <Select
            isClearable //handle this; breaks
            defaultValue={selectedOption.value || ""}
            onChange={this.handleCityChange}
            options={cities}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
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
            onInput={() => this.setState({ filledInAmount: true })}
            // value={this.state.cmt}
            //how to grab the name that was input
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {" "}
            Please enter your income.
          </Form.Control.Feedback>
          {/* {this.state.inputs.map(input => (
            <div key={input}>{row}</div>
          ))}

          <Button variant="primary" onClick={() => this.addRow()}>
            Add row
          </Button> */}
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
