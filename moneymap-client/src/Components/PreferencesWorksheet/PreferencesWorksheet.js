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
    let temp = this.props.items.filter(
      item => item.Category !== "Salaries And Financing"
    );
    console.log("temp: ", temp);
    if (this.props.profilePrefs.recordset.length) {
      for (var i = 0; i < temp.length; i++) {
        for (var j = 0; j < this.props.profilePrefs.recordset.length; j++) {
          if (temp[i].Name === this.props.profilePrefs.recordset[j].Name) {
            this.addToItems(
              temp[i].Item_ID,
              temp[i].Name,
              this.props.profilePrefs.recordset[j].Amount
            );
            break;
          } else if (j === this.props.profilePrefs.recordset.length - 1) {
            this.addToItems(temp[i].Item_ID, temp[i].Name, 0);
          }
        }
      }
    } else {
      temp.forEach(item => this.addToItems(item.Item_ID, item.Name, 0));
    }
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
    //console.log(config);
    axios
      .post(
        `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
          "user"
        )}/preferences`,
        payload,
        config
      )
      .then(response => console.log("Preferences: ", response))
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
                  {item.name}
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    onChange={this.addToList(item.itemid, item.name)}
                    defaultValue={item.amount || 0}
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
