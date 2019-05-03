import React, { Component } from "react";
// import PrefrenceDetails1 from "./PrefrenceDetails1.js";
// import PrefrenceDetails2 from "./PrefrenceDetails2.js";
import { Form, Col, Row } from "react-bootstrap";
import AuthService from "../../AuthService/AuthService";
import { Button } from "react-bootstrap";
import axios from "axios";
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
  componentDidMount() {
    this.getPrefilledPrefrences();
    let temp = this.props.items.filter(
      item => item.Category !== "Salaries And Financing"
    );

    this.setState({
      items: temp
    });
  }

  getPrefilledPrefrences = () => {
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
          "user"
        )}/preferences/city/${this.props.profCity}`,
        config
      )
      .then(response => {
        console.log("City preferences: ", response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendRequest = () => {
    console.log("pay", this.state.payload);
    console.log("stringify", JSON.stringify(this.state.payload));
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    //console.log(config);
    axios
      .post(
        `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
          "user"
        )}/preferences`,
        this.state.payload,
        config
      )
      .then(response => console.log("Preferences: ", response))
      .catch(error => {
        console.log(error);
      });
  };

  addToList = (id, name) => event => {
    this.setState({
      prefrences: {
        ...this.state.prefrences,
        [name]: { itemid: id, amount: Number(event.target.value) }
      }
    });
    let payload = [];
    for (let key in this.state.prefrences) {
      //console.log(key);
      payload.push(this.state.prefrences[key]);
    }
    this.setState({ payload: payload });
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.items.map((item, index) => {
            //console.log(item);
            return (
              <Form.Group
                key={index}
                as={Row}
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="10">
                  {item.Name}
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    placeholder={0}
                    onChange={this.addToList(item.Item_ID, item.Name)}
                  />
                </Col>
              </Form.Group>
            );
          })}
        </ul>
        <Button onClick={this.sendRequest}>Submit</Button>
      </Form>
    );
  }
}

export default Preference;
