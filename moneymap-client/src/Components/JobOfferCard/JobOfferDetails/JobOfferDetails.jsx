import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import "../JobOfferCard.css";
import axios from "axios";

class JobOfferDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: "", label: "" },
      countries: []
    };
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  handleCityChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    this.props.handleCitySelection(selectedOption.value);
  };
  handleCountryChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    this.setState({
      selectedCountry: selectedOption.value
    });
    this.selectCity(selectedOption.value);
  };
  componentDidMount() {
    axios
      .get(
        "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/cities"
      )
      .then(response => {
        // handle success
        let temp = response.data.recordset;
        //Had to filter it because if allowed all cities app will crash
        let citiesObjects = temp.filter(city => city.Country);
        //This is for the form to be able to render the city
        let countries = citiesObjects.map(city => city.Country);
        let uniqCountries = [...new Set(countries)];
        let final = uniqCountries.map(country => {
          return { label: country, value: country };
        });
        console.log(final);
        this.setState({ countries: final });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  selectCity = country => {
    axios
      .get(
        "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/cities"
      )
      .then(response => {
        // handle success
        let temp = response.data.recordset;
        //Had to filter it because if allowed all cities app will crash
        let citiesObjects = temp.filter(city => city.Country === country);
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
        //this renders the cities after getting them from the country
        this.setState({ state: this.state });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  render() {
    const { values } = this.props;

    return (
      <div>
        <Form.Group controlId="name">
          <Form.Label className="required">Company name</Form.Label>
          <Form.Control
            required
            type="text"
            minLength="1"
            maxLength="20"
            placeholder="Job name"
            onChange={this.props.handleChange("name")}
            defaultValue={values.name}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label className="required">Country</Form.Label>

          <Select
            //isClearable still breaks
            onChange={this.handleCountryChange}
            options={this.state.countries}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label className="required">Job city</Form.Label>

          <Select
            isClearable //handle this; breaks
            onChange={this.handleCityChange}
            options={cities}
          />
        </Form.Group>
        <Form.Group controlId="income">
          <Form.Label className="required">Income</Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            step="1"
            placeholder="Income"
            onChange={this.props.handleChange("Components", "Income", 1)}
            // defaultValue={values.Components["Income"].camt || null} //how to reference the object that was just created
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
    var name = document.getElementById("name");
    // var country = document.getElementById("country");
    // var city = document.getElementById("city");
    var income = document.getElementById("income");

    if (
      !(
        name.validity.valid &&
        // country.validity.valid &&
        // city.validity.valid &&
        income.validity.valid
      )
    ) {
      console.log("Validation false");

      // city.setCustomValidity("Please enter valid city.");
      // country.setCustomValidity("Please enter valid country.");
    } else {
      // city.setCustomValidity("");
      // country.setCustomValidity("");
      this.props.nextStep();
    }
  };
}

let cities = [{ label: "Please Select A Country" }];

export default JobOfferDetails;
