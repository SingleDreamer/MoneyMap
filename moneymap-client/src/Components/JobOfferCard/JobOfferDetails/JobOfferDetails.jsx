import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import "../JobOfferCard.css";
import axios from "axios";

class JobOfferDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: "", label: "" } //map this to the cityid in the database and pass over to joc
    };
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  handleCityChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  componentDidMount() {
    axios
      .get("/cities")
      .then(response => {
        // handle success
        let temp = response.data.recordset;
        //Had to filter it because if allowed all cities app will crash
        let citiesObjects = temp.filter(
          city => city.Country === "United States"
        );
        //This is for the form to be able to render the city
        cities = citiesObjects.map(city => {
          return {
            value: city.CityID,
            label: city.City + ", " + city.Country,
            latitude: city.Latitude,
            longitude: city.Longitude
          };
        });
        console.log(cities);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { selectedOption } = this.state;
    const { values } = this.props;

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
            // defaultValue={values.Components["Income"].camt || null} //how to reference the object that was just created
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {" "}
            Please enter your income.
          </Form.Control.Feedback>{" "}
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

let cities = [];

export default JobOfferDetails;
