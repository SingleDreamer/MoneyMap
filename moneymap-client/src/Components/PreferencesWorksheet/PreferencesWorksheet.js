import React, { Component } from "react";
import { Tab, Tabs, Row, Col } from "react-bootstrap";
import AuthService from "../../AuthService/AuthService";
import { Button } from "react-bootstrap";
import axios from "axios";
import PreferenceDetails from "./PrefrenceDetails.js";

class Preference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      prefrences: [],
      payload: []
    };
    this.Auth = new AuthService();
  }

  sendRequest = e => {
    e.preventDefault();
    let payload = [];
    for (let key in this.state.prefrences) {
      payload.push(this.state.prefrences[key]);
    }

    console.log("pay", payload);
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
          "user"
        )}/preferences`,
        payload,
        config
      )
      .then(response => this.props.close())
      .catch(error => {
        console.log(error);
      });
  };

  addToList = (id, name) => event => {
    console.log(this.state.prefrences);
    this.setState(
      {
        prefrences: {
          ...this.state.prefrences,
          [name]: { itemid: id, amount: Number(event.target.value) }
        }
      },
      () => {
        console.log("Item: ", id);
      }
    );
  };

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="Market">
          <Tab eventKey="Market" title="Groceries">
            <PreferenceDetails
              items={this.props.items["MarketItems"]}
              category="Groceries"
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
            />
          </Tab>
          <Tab eventKey="Transportation" title="Transportation">
            <PreferenceDetails
              items={this.props.items["TransportationItems"]}
              category="Transportation"
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
            />
          </Tab>
          <Tab eventKey="Housing and Utilities" title="Housing and Utilities">
            <PreferenceDetails
              items={this.props.items["HousingItems"]}
              category="Housing and Utilities"
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
            />
          </Tab>
          <Tab eventKey="Restaurants" title="Restaurants">
            <PreferenceDetails
              items={this.props.items["RestuartantItems"]}
              category="Restaurants"
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
            />
          </Tab>
          <Tab eventKey="Leisure and Entertainment" title="Entertainment">
            <PreferenceDetails
              items={this.props.items["EntertainmentItems"]}
              category="Leisure and Entertainment"
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
            />
          </Tab>
        </Tabs>
        <Row>
        <Col>
        <Button onClick={this.sendRequest}>Submit</Button>
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
    );
  }
}

export default Preference;
