import React, { Component } from "react";
import Card from "../Card.js"
import './CardArray.css'

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      companies: props.companies
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.companies)
    this.setState({
      companies: nextProps.companies
    });
  }
  render() {
    return (
      <div className = 'array'>
        {this.state.companies.map(
          (company, index) => 
            <Card className = 'card' key = {index}  info = {company}/>
          )}
      </div>
    );
  }
}
export default CardArray;