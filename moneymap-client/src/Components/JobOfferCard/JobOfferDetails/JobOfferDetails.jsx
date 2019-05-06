import React, { Component } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
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
        //console.log(final);
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
            // isClearable //handle this; breaks
            value={this.state.selectedCity}
            onChange={this.handleCityChange}
            options={cities}
          />
        </Form.Group>

        <div hidden={!values.name || !values.cityid}>
          <strong>*Please Enter Monthly Value for each Field*</strong>
          <p>
            *Averages for Costs per City are Given if Applicable, Based on Your
            Preferences; Please change Values as Needed*
          </p>
          <p />
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id={"top"}>Please Enter Monthly Income</Tooltip>}
          >
            <Form.Group controlId="income">
              <Form.Label className="required">Income</Form.Label>
              <Form.Control
                required
                type="number"
                min="1"
                step="1"
                placeholder="Income"
                onChange={this.props.handleChange("Components", "Income", 1)}
                defaultValue={0}
              />
            </Form.Group>
          </OverlayTrigger>

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
        </div>
        {/* <ButtonToolbar>
          <Button variant="secondary" onClick={this.prev}>
            Previous
          </Button> */}
        <Button
          variant="primary"
          type="submit"
          disabled={!values.name || !values.cityid || !values.Components}
        >
          Submit
        </Button>
        {/* </ButtonToolbar>
        <Button variant="primary" type="submit" onClick={this.next}>
          Next
        </Button> */}
      </Form>
    );
  }

  // next = e => {
  //   e.preventDefault();
  //   var name = document.getElementById("name");
  //   // var country = document.getElementById("country");
  //   // var city = document.getElementById("city");
  //   var income = document.getElementById("income");

  //   // if (!name.validity.valid) {
  //   //   console.log("Name invalid");
  //   //   name.setCustomValidity("Please enter company name.");
  //   // } else if (
  //   //   !(
  //   //     name.validity.valid &&
  //   //     // country.validity.valid &&
  //   //     // city.validity.valid &&
  //   //     income.validity.valid &&
  //   //     this.props.cityid !== 0
  //   //   )
  //   // ) {
  //   //   console.log("Validation false");
  //   //   console.log("City id: ", this.props.cityid);

  //   //   // city.setCustomValidity("Please enter valid city.");
  //   //   // country.setCustomValidity("Please enter valid country.");
  //   // } else {
  //   //   console.log("City id: ", this.props.cityid);
  //   //   // city.setCustomValidity("");
  //   // country.setCustomValidity("");
  //   this.props.nextStep();
  //   // }
  // };
}

let cities = [{ label: "Please Select A Country" }];

export default JobOfferDetails;
