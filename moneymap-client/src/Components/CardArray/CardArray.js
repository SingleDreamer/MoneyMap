import React, { Component } from "react";
import Card from "../Card/Card.js";
//import { Card as Bscard } from "react-bootstrap";
import "./CardArray.css";
import "../Card/Card.css";
import logo from "./addJOC2.png";
import { Button, Modal } from "react-bootstrap";
import CompareCharts from "../Card/CompareChart";

let amountSelected = 0;
class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      companies: [],
      compareCompanies: [],
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // Whenever the CardArray component receives new props from the Dashboard
  // it will rerender with the new list of Cards
  componentWillReceiveProps(nextProps) {
    this.setState({
      companies: nextProps.companies
    });
  }

  selectCard = company => {
    console.log(company);
    let temp = this.state.companies;
    temp[temp.indexOf(company)].selected = !temp[temp.indexOf(company)]
      .selected;

    temp[temp.indexOf(company)].selected
      ? this.addToCompare(company)
      : this.removeFromCompare(company);

    amountSelected === 2
      ? this.setState({ companies: temp, show: true })
      : this.setState({ companies: temp });
  };
  addToCompare = company => {
    console.log("added", company);
    amountSelected++;
    this.setState({
      compareCompanies: [...this.state.compareCompanies, company]
    });
  };

  removeFromCompare = company => {
    console.log("removed", company);
    amountSelected--;
    let newCompanies = this.state.compareCompanies;
    newCompanies.splice(newCompanies.indexOf(company), 1);
    this.setState({
      compareCompanies: newCompanies
    });
  };

  handleClose() {
    this.setState({ show: false });
  }
  handleShow = e => {
    e.preventDefault();
    this.setState({
      show: true
    });
  };
  render() {
    var cards = [];
    console.log(this.state.companies);
    cards = this.state.companies.map((company, index) =>
      company.selected ? (
        <div
          key={company.jocid}
          id={company.jocid}
          //onClick={() => this.selectCard(company)}
        >
          <Card
            getCards={this.props.getCards}
            key={company.jocid}
            cardType="selected"
            image={`https://logo.clearbit.com/${company.jocname}.com`}
            id={index}
            info={company}
            selectCard={this.selectCard}
          />
        </div>
      ) : (
        <div
          key={company.jocid}
          id={company.jocid}
          //onClick={() => this.selectCard(company)}
        >
          <Card
            getCards={this.props.getCards}
            key={company.jocid}
            cardType="notSelected"
            image={`https://logo.clearbit.com/${company.jocname}.com`}
            id={index}
            info={company}
            selectCard={this.selectCard}
          />
        </div>
      )
    );

    cards.unshift(
      <img
        key={"0"}
        src={logo}
        alt="logo"
        className="add"
        onClick={this.props.handleShow}
      />
    );

    return (
      <div>
        <div className="array">{cards}</div>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          centered
          size="lg"
        >
          <Modal.Header closeButton={false}>
            <Modal.Title>Compare Job Offers</Modal.Title>
          </Modal.Header>
          <Modal.Body>Job offer comparison</Modal.Body>
          <Modal.Body>
            <CompareCharts info={50} companies={this.state.compareCompanies} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default CardArray;
