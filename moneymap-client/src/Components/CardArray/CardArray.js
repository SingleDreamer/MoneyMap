import React, { Component } from "react";
import Card from "../Card/Card.js";
import "./CardArray.css";
import "../Card/Card.css";
import logo from "./addJOC2.png";
import {
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
  Tabs,
  Tab,
  Card as Ca
} from "react-bootstrap";
import Chart from "react-apexcharts";
import JobOfferCard from "../JobOfferCard/JobOfferCard";
import CompareCharts from "../Card/CompareChart";

let amountSelected = 0;

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: {},
      companies: [],
      compareCompanies: [],
      show: false,
      showProfile: false
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
    console.log("array: ", this.state.profile, this.state.companies);
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
    this.setState({ show: false, showProfile: false });
  }

  handleShow = e => {
    e.preventDefault();
    this.setState({
      show: true
    });
  };

  editProfile = () => {
    this.setState({ showProfile: !this.state.showProfile });
  };
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
                return val;
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
    if (rfs >= 50) {
      optionsRadial.colors = ["#35ff53"];
    } else if (rfs < 50 && rfs >= 0) {
      optionsRadial.colors = ["#f48e00"];
    } else if (rfs < 0 && rfs >= -50) {
      optionsRadial.plotOptions.radialBar.startAngle = 360 * (rfs / 100);
      optionsRadial.colors = ["#ffa434"];
    } else {
      optionsRadial.plotOptions.radialBar.startAngle = 360 * (rfs / 100);
      optionsRadial.colors = ["#f45042"];
    }
    return optionsRadial;
  };

  render() {
    var cards = [];
    // console.log("Prof: ", this.state.profile.length);
    // console.log("Comps: ", this.state.companies);

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
          />
        </div>
      )
    );
    if (Object.keys(this.state.profile).length > 0) {
      console.log("test: ", this.state.profile.city);
      cards.unshift(
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="add" title="Add card">
            <OverlayTrigger
              key={"0"}
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id={"top"}>Click to Create New JobOfferCard</Tooltip>
              }
            >
              <img
                src={logo}
                alt="logo"
                className="add"
                onClick={this.props.handleShow}
              />
            </OverlayTrigger>
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <div>
              <div className="notSelected">
                <i className="fas fa-check" />
              </div>
              <Ca className="joc">
                {" "}
                <Ca.Body>
                  <div className="header">
                    <Ca.Title>
                      <img
                        src={`https://logo.clearbit.com/${
                          this.state.profile.jocname
                        }.com`}
                        alt={"no logo"}
                        width={"30px"}
                        style={{ marginRight: "5px" }}
                      />
                      {this.state.profile.jocname}
                    </Ca.Title>

                    <div className="chart">
                      <Chart
                        options={this.test(this.state.profile.jocrfc)}
                        series={[Math.ceil(this.state.profile.jocrfc)]}
                        type="radialBar"
                        width="100"
                        height="130"
                      />
                    </div>
                  </div>
                  <Ca.Text>{this.state.profile.city.City}</Ca.Text>
                  {this.state.profile.components.length ? (
                    this.state.profile.components.map((component, index) => (
                      <Ca.Text key={index}>
                        {`${component.ComponentDescription}: $${
                          component.ComponentAmount
                        }`}
                      </Ca.Text>
                    ))
                  ) : (
                    <Card.Text>Empty Card</Card.Text>
                  )}
                  <div className="buttons">
                    <Button variant="primary" onClick={this.editProfile}>
                      Replace Profile
                    </Button>
                  </div>
                </Ca.Body>
              </Ca>
              <Modal show={this.state.showProfile} onHide={this.handleClose}>
                <Modal.Header closeButton={false}>
                  <Modal.Title>New Profile Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <JobOfferCard
                    changeProf={true}
                    handleCloseModal={this.handleClose}
                    getCards={this.props.getCards}
                    jocid={this.state.profile.jocid}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>{" "}
          </Tab>

          <Tab eventKey="Preferences" title="Preferences" />
        </Tabs>
      );
    }

    return (
      <div>
        {cards.length === 1 ? (
          <div className="array">
            {cards}
            <h1
              style={{ color: "#45a29e", position: "relative", top: "200px" }}
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
