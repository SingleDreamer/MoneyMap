import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Select from "react-select";
import "../JobOfferCard.css";

class JobOfferDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: "", label: "" }, //map this to the cityid in the database and pass over to joc
      inputs: [{ id: "input-0", tempName: "", tempIncome: "" }],
      filledInName: false,
      filledInAmount: false
      // tempName: "",
      // tempIncome: ""
    };
    this.handleTempChange = this.handleTempChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.filledIn = this.filledIn.bind(this);
  }

  // maybe create arrays of objects for the 5 categories {id, tempName, tempIncome}
  // and onSubmit of form append to components without id (for each delete array.id)
  // or just remap componennts without id // id being...counter per array?

  // how to grab final input values and pass in on submit??
  handleTempChange = input => event => {
    var foundIndex = this.state.inputs.findIndex(
      i => i.id === this.state.inputs.id
    );
    if (foundIndex !== -1) {
      this.setState({
        ...this.state,
        // write over existing input for field
        inputs: {
          id: event.target.input.id,
          tempName: event.target.value,
          tempIncome: event.target.value
        }
      });
    } else {
      this.setState({
        ...this.state,
        inputs: {
          ...this.state.inputs,
          id: this.target.event.input.id,
          value: event.target.value
        }
      });
    }
    //console.log(`Option selected: `, input, event.target.value);
  };

  handleCityChange = selectedOption => {
    this.setState({ selectedOption });
   // console.log(`Option selected:`, selectedOption);
  };

  addRow = () => {
    // also put this in "next" button for case where user doesn't add row
    if (!!this.state.filledInName && !!this.state.filledInAmount) {
      
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
      //console.log("fill in previous row");
    }
  };

  removeRow = rowItem => {
    this.setState(({ inputs }) => ({
      inputs: inputs.filter(i => i !== rowItem)
    }));
  };

  filledIn = input => event => {
    if (event.target.value !== "") {
      this.setState({
        ...this.state,
        [input]: true
      });
    }
  };

  render() {
    const { selectedOption, inputs } = this.state;
    const { values, cities } = this.props;

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
            // onInput={() => this.setState({ filledInName: true })}
            onInput={this.filledIn("filledInName")}
            // make sure things arent deleted
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
        {/* submit first thing */}
        {/* onclick second box sends variable of first box to components state */}
        <Col>
          <Form.Control
            required
            type="number"
            placeholder="Income"
            // onInput={() => this.setState({ filledInAmount: true })}
            onInput={this.filledIn("filledInAmount")}
            onChange={this.handleTempChange("tempIncome")}
            // onChange={this.props.handleChange(
            //   "Components",
            //   "values.Components",
            //   1
            // )} //how to grab the name that was input
            // defaultValue={values.Components["Income"].camt || null} //how to reference the object that was just created
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
            onChange={this.handleCityChange}
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

          {inputs.map(input => (
            <div key={input.id}>
              {row}
              {/* <Button variant="primary" onClick={() => this.removeRow(input)}>
                {" "}
                Remove
              </Button> */}
            </div>
          ))}

          <Button variant="primary" onClick={this.addRow}>
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
      //console.log("Validation false");
      e.stopPropagation();
    } else {
      //console.log("Validation true");
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
