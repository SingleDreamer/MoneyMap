import React, { Component } from "react";
import Card from "../Card/Card.js";
import "./CardArray.css";
import "../Card/Card.css";
import logo from "./addJOC2.png";
import { Button, Modal, Col, Row } from "react-bootstrap";
// import Chart from "react-apexcharts";
// import JobOfferCard from "../JobOfferCard/JobOfferCard";
import CompareCharts from "../Card/CompareChart";
import Preferences from "../PreferencesWorksheet/PreferencesWorksheet";

let amountSelected = 0;

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: {},
      companies: [],
      compareCompanies: [],
      show: false
      // showProfile: false,
      // showPrefs: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // Whenever the CardArray component receives new props from the Dashboard
  // it will rerender with the new list of Cards
  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile,
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
    this.setState({ show: false, showProfile: false, showPrefs: false });
  }

  handleShow = e => {
    e.preventDefault();
    this.setState({
      show: true
    });
  };

  // handleShowProfile = () => {
  //   this.setState({ showProfile: !this.state.showProfile });
  // };
  // handleShowPrefs = () => {
  //   this.setState({ showPrefs: true });
  // };
  test = rfs => {
    let optionsRadial = {
      colors: ["#000000"],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          dataLabels: {
            name: {
              offsetY: -50,
              show: false,
              color: "#888",
              fontSize: "15px"
            },
            value: {
              formatter: function(val) {
                return val - 10000;
              },
              offsetY: 5,
              color: "#111",
              fontSize: "20px",
              show: true
            }
          }
        }
      },
      labels: ["RFS"]
    };
    if (rfs >= 30 && rfs <= 50) {
      optionsRadial.colors = ["#dbf400"];
    } else if (rfs > 50) {
      optionsRadial.colors = ["#35ff53"];
    } else {
      //rfs < 30
      optionsRadial.colors = ["#f45042"];
    }
    return optionsRadial;
  };

  render() {
    var cards = [];

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
            profile={this.props.profile}
            selectCard={this.selectCard}
            test={this.test}
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
            profile={this.props.profile}
            selectCard={this.selectCard}
            test={this.test}
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
        {cards.length === 1 ? (
          <div className="array">
            {cards}
            <h1
              style={{
                color: "#45a29e",
                position: "relative",
                top: "200px"
              }}
            >
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: "20px" }}
              />
              Add A Job Offer
            </h1>
          </div>
        ) : (
          <div className="array">{cards}</div>
        )}

        <Modal size="lg" show={this.state.showPrefs} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Edit Basket of Goods</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>
                Add your estimated monthly quantity for each category in order
                to get a more accurate report. If a field is left blank we will
                use the averages for that city.
              </strong>
            </p>
            <Preferences
              items={this.props.items}
              profCity={this.props.profCity}
              profilePrefs={this.props.profilePrefs}
              close={this.handleClose}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

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
            <CompareCharts companies={this.state.compareCompanies} />
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
