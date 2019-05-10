import React, { Component } from "react";
// import PrefrenceDetails1 from "./PrefrenceDetails1.js";
// import PrefrenceDetails2 from "./PrefrenceDetails2.js";
import { Form, Col, Row } from "react-bootstrap";
import AuthService from "../../AuthService/AuthService";

class PreferenceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      prefrences: []
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    let temp = this.props.items;
    console.log("temp: ", temp);
    if (this.props.profilePrefs.recordset.length) {
      for (var i = 0; i < temp.length; i++) {
        for (var j = 0; j < this.props.profilePrefs.recordset.length; j++) {
          if (temp[i].Name === this.props.profilePrefs.recordset[j].Name) {
            this.props.addToItems(
              temp[i].Item_ID,
              temp[i].Name,
              this.props.profilePrefs.recordset[j].Amount
            );
            break;
          } else if (j === this.props.profilePrefs.recordset.length - 1) {
            this.props.addToItems(temp[i].Item_ID, temp[i].Name, 0);
          }
        }
      }
    } else {
      temp.forEach(item => this.props.addToItems(item.Item_ID, item.Name, 0));
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.items.map((item, index) => {
            console.log(item);
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
                    onChange={this.props.addToList(item.itemid, item.name)}
                    defaultValue={item.amount || 0}
                  />
                </Col>
              </Form.Group>
            );
          })}
        </ul>
      </Form>
      
    );
  }
}

export default PreferenceDetails;
