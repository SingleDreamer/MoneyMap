import React, { Component } from "react";
import { Form, Button, Row, Col, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
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
    let toggle;
    if (this.props.monthly) {
      toggle = (
        <Button
          variant="danger"
          onClick={this.props.handleMonthly}
          style={{ margin: "10px" }}
        >
          Switch income to YEARLY amounts
        </Button>
      );
    } else {
      toggle = (
        <Button
          variant="danger"
          onClick={this.props.handleMonthly}
          style={{ margin: "10px" }}
        >
          Switch income to MONTHLY amounts
        </Button>
      );
    }

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
        <div hidden={!values.name || !values.cityid}>
          <p />
          <br />
          <strong>
            *Averages for costs per city are given if applicable, based on your
            Basket of Goods; Please change values as needed*
          </strong>
          <p />

          <Form.Group controlId="income">
            <Form.Label className="required">Income</Form.Label>
            {toggle}
            <Row>
              <Col sm="10">
                <Form.Control
                  required
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Income"
                  onChange={this.props.handleChange("Components", "Income", 1)}
                  value={Math.round(values.Components["Income"].camt) || 0}
                />
              </Col>
              <Form.Label column sm="2">
                {!this.props.monthly ? "/Year" : "/Month"}
              </Form.Label>
            </Row>
          </Form.Group>

          <Form.Group controlId="Mandatory Costs">
            <Form.Label className="required">Mandatory Costs</Form.Label>
            <Row>
              <Col sm="10">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id={"right"}>
                    This is your total spent on rent and transportation costs.
                  </Tooltip>
                }
              >
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
                  value={
                    Math.round(values.Components["Mandatory Costs"].camt) || 0
                  }
                />
                </OverlayTrigger>
              </Col>
              <Form.Label column sm="2">
                /Month
              </Form.Label>
            </Row>
          </Form.Group>
          <Form.Group controlId="Consumable Costs">
            <Form.Label className="required">Consumable Costs</Form.Label>
            <Row>
              <Col sm="10">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id={"right"}>
                    This is your total spent on food and restaurants.
                  </Tooltip>
                }
              >
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
                  value={
                    Math.round(values.Components["Consumable Costs"].camt) || 0
                  }
                />
              </OverlayTrigger>
              </Col>
              <Form.Label column sm="2">
                /Month
              </Form.Label>
            </Row>
          </Form.Group>
          <Form.Group controlId="Entertainment Expenses">
            <Form.Label className="required">Entertainment Expenses</Form.Label>
            <Row>
              <Col sm="10">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id={"right"}>
                    This is your total spent on entertainment, such as movies, activities, etc.
                  </Tooltip>
                }
              >
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
                  value={
                    Math.round(
                      values.Components["Entertainment Expenses"].camt
                    ) || 0
                  }
                />
              </OverlayTrigger>
              </Col>
              <Form.Label column sm="2">
                /Month
              </Form.Label>
            </Row>
          </Form.Group>
          {/* <Form.Group controlId="Debt">
            <Form.Label className="required">Debt</Form.Label>
            <Form.Control
              required
              type="number"
              min="0"
              step="1"
              placeholder="Debt"
              onChange={this.props.handleChange("Components", "Debt", 5)}
              value={Math.round(values.Components["Debt"].camt) || 0}
            />
          </Form.Group> */}
          <Row>
          <Col>
          <Button
            variant="primary"
            type="submit"
            disabled={!values.name || !values.cityid || !values.Components}
          >
            Submit
          </Button>
          </Col>
          <Col>
          <div
            className="buttons"
            style={{position:"absolute", right: "10px" }}
          >
            <Button href="/FAQs#BasketofGoods">
              <i
                className="fas fa-question-circle"
                width="30"
                height="30"
                alt="?"
              />
            </Button>
            </div>
            </Col>
            </Row>
        </div>
      </Form>
    );
  }
}

let cities = [{ label: "Please Select A Country" }];

export default JobOfferDetails;
