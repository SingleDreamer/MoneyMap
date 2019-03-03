import React, { Component } from "react";
import Card from "../Card/Card.js";
import "./CardArray.css";

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      companies: props.companies
    };
  }

  //Whenever the CardArray component receives new props from the Dashboard
  //it will rerender with the new list of Cards
  componentWillReceiveProps(nextProps) {
    this.setState({
      companies: nextProps.companies
    });
  }

  render() {
    return (
      <div className="array">
        {/*This will map over the list of companies and provide the data to the CARD component
          -each CARD component will recive a key, and info
          -returns the CARD component at each iteration*/}
        {this.state.companies.cards.map((company, index) => (
          <div key={index}>
            <Card className="card" id={index} info={company} />
          </div>
        ))}
      </div>
    );
  }
}
export default CardArray;
