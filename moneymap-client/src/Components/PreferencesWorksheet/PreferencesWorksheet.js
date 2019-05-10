import React, { Component } from "react";
import { Form, Col, Row } from "react-bootstrap";
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
      payload: [],
      step: 1
    };
    this.Auth = new AuthService();
  }
  componentWillMount() {
    console.log("prop items: ", this.props);
  }

  addToItems = (id, name, amount) => {
    let newItems = this.state.items;
    newItems.push({ itemid: id, name: name, amount: amount });
    this.setState(
      {
        ...this.state,
        items: newItems
      },
      () => {
        // console.log("Item: ", name);
      }
    );
  };

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
    this.setState(
      {
        ...this.state,
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

  renderSwitch(step, items) {
    switch (step) {
      case 1:
        return (
          <Form onSubmit={this.handleSubmit}>
            <PreferenceDetails
              items={this.props.items}
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
              addToItems={this.addToItems}
            />
            <Button onClick={this.nextStep}>Next</Button>
          </Form>
        );
      case 2:
        return (
          <Form onSubmit={this.handleSubmit}>
            <PreferenceDetails
              items={this.props.items}
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
              addToItems={this.addToItems}
            />
            <Button onClick={this.nextStep}>Next</Button>
            <Button onClick={this.prevStep}>Back</Button>
          </Form>
        );
      case 3:
        return (
          <Form onSubmit={this.handleSubmit}>
            <PreferenceDetails
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              items={this.props.items}
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
              addToItems={this.addToItems}
            />
            <Button onClick={this.nextStep}>Next</Button>
            <Button onClick={this.prevStep}>Back</Button>
          </Form>
        );
      case 4:
        return (
          <Form onSubmit={this.handleSubmit}>
            <PreferenceDetails
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              items={this.props.items}
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
              addToItems={this.addToItems}
            />
            <Button onClick={this.nextStep}>Next</Button>
            <Button onClick={this.prevStep}>Back</Button>
          </Form>
        );
      case 5:
        return (
          <Form onSubmit={this.handleSubmit}>
            <PreferenceDetails
              prevStep={this.prevStep}
              items={this.props.items}
              profilePrefs={this.props.profilePrefs}
              addToList={this.addToList}
              addToItems={this.addToItems}
            />
            <Button onClick={this.prevStep}>Back</Button>
            <Button onClick={this.sendRequest}>Submit</Button>
          </Form>
        );
      default:
        return;
    }
  }

  nextStep = () => {
    console.log("Values: ", this.state.Components);
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  render() {
    const { step, items } = this.state;

    return this.renderSwitch(step, items);
  }
}

export default Preference;
