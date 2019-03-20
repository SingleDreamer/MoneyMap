import React, { Component } from "react";
import Card from "../Card/Card.js";
import "./CardArray.css";
import { Button, Modal } from "react-bootstrap";
import CompareCharts from "../Card/CompareChart";

let amountSelected = 0;
class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      companies: [],
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
    console.log("heheh");
    console.log(company);
    let temp = this.state.companies;
    temp[temp.indexOf(company)].selected = !temp[temp.indexOf(company)]
      .selected;

    temp[temp.indexOf(company)].selected ? amountSelected++ : amountSelected--;

    amountSelected === 2
      ? this.setState({ companies: temp, show: true })
      : this.setState({ companies: temp });
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
    let cards = [];
    cards = this.state.companies.map((company, index) => {
      if (company.selected === false) {
        return (
          <div key={index} onClick={() => this.selectCard(company)}>
            <Card cardType="joc" id={index} info={company} />
          </div>
        );
      } else {
        return (
          <div key={index} onClick={() => this.selectCard(company)}>
            <Card cardType="jocSelected" id={index} info={company} />
          </div>
        );
      }
    });

    //console.log(cards);
    return (
      <div>
        <div className="array">{cards}</div>
        <Modal
          show={this.state.show}
          onHide={this.closeModal}
          centered
          size="lg"
        >
          <Modal.Header closeButton={false}>
            <Modal.Title>Compare</Modal.Title>
          </Modal.Header>
          <Modal.Body>Job offer analysis</Modal.Body>
          <Modal.Body>
            <CompareCharts info={50} />
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
