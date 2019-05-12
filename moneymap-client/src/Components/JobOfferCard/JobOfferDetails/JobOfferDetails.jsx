import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import "../JobOfferCard.css";
import axios from "axios";

class JobOfferDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: "", label: "" },
      selectedCity: null,
      countries: []
    };
    this.handleCityChange = this.handleCityChange.bind(this);
  }

  handleCityChange = selectedOption => {
    this.setState({
      selectedOption,
      selectedCity: selectedOption
    });
    console.log(`Option selected:`, selectedOption);
    this.props.handleCitySelection(selectedOption.value);
  };
  handleCountryChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    this.setState(
      {
        selectedCountry: selectedOption.value,
        selectedCity: null
      },
      this.props.handleCitySelection(0)
    );
    this.selectCity(selectedOption.value);
  };
  componentDidMount() {
    axios
      .get(
        "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/cities"
      )
      .then(response => {
        let temp = response.data.recordset;
        //Had to filter it because if allowed all cities app will crash
        let citiesObjects = temp.filter(city => city.Country);
        //This is for the form to be able to render the city
        let countries = citiesObjects.map(city => city.Country);
        let uniqCountries = [...new Set(countries)];
        let final = uniqCountries.map(country => {
          return { label: country, value: country };
        });
        //console.log(final);
        this.setState({ countries: final });
      })
      .catch(error => {
        console.log(error);
      });
  }

  selectCity = country => {
    axios
      .get(
        "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/cities"
      )
      .then(response => {
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
        //console.log(cities);
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
      <Form onSubmit={this.props.handleSubmit}>
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
            onChange={this.handleCountryChange}
            options={this.state.countries}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label className="required">Job city</Form.Label>

          <Select
            value={this.state.selectedCity}
            onChange={this.handleCityChange}
            options={cities}
          />
        </Form.Group>
        {/* <div hidden={!values.name || !values.cityid}> */}
        <Button show={false} variant="danger">
          Switch to YEARLY amounts
        </Button>{" "}
        <p />
        <Button variant="danger">Switch to MONTHLY amounts</Button> <p />
        <strong>
          *Averages for Costs per City are Given if Applicable, Based on Your
          Preferences; Please change Values as Needed*
        </strong>
        <p />
        <Row>
          <Col>
            <Form.Group controlId="income">
              <Form.Label className="required">Income</Form.Label>
              <Form.Control
                required
                type="number"
                min="0"
                step="1"
                placeholder="Income"
                onChange={this.props.handleChange("Components", "Income", 1)}
                defaultValue={0}
              />
            </Form.Group>
          </Col>
        </Row>
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
            value={values.Components["Mandatory Costs"].camt || 0}
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
            value={values.Components["Consumable Costs"].camt || 0}
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
            value={values.Components["Entertainment Expenses"].camt || 0}
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
        <Button
          variant="primary"
          type="submit"
          disabled={!values.name || !values.cityid || !values.Components}
        >
          Submit
        </Button>
        {/* </div> */}
      </Form>
    );
  }
}

let cities = [{ label: "Please Select A Country" }];

export default JobOfferDetails;
