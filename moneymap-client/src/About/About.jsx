import React, { Component } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AuthService from "../AuthService/AuthService";
import Collapse from "react-bootstrap/Collapse";
import "./About.css";

class About extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRegister: false,
      showLogin: false,
      open: false
    };
    this.Auth = new AuthService();
  }

  clearSession = () => {
    this.props.history.replace("/");
    sessionStorage.clear();
  };

  redirectToDashboard = () => {
    this.props.history.replace("/Dashboard");
  };

  render() {
    const { open } = this.state;
    let navbarButton = "";
    let returnbutton = "";
    if (this.Auth.loggedIn()) {
      navbarButton = (
        <Button
          variant="danger"
          onClick={this.clearSession}
          style={{ marginRight: "10px" }}
        >
          Log Out
        </Button>
      );

      returnbutton = (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="3">
              <Button
                id="newPrimary"
                size="lg"
                style={{
                  margin: "10px",
                  marginTop: "60px"
                }}
                href = "/Dashboard"
                block
              >
                Return to Dashboard
              </Button>
            </Col>
          </Row>
        </Container>
      );
    } else {
      navbarButton = (
        <Button
          variant="info"
          onClick={this.redirectToDashboard}
          style={{ marginRight: "10px" }}
        >
          {" "}
          Log in{" "}
        </Button>
      );
    }
    return (
      <div className="about">
        <Navbar variant="dark" className="justify-content-between">
          <Navbar.Brand href="/Dashboard">
            <div className="title">
              <i className="fas fa-map-signs navIcon" />
              {" MoneyMap"}
            </div>
          </Navbar.Brand>
          <Nav>
            <Nav.Link>{navbarButton}</Nav.Link>
          </Nav>
        </Navbar>

        <div>
          <h1 className="pagetitle">FAQs</h1>
        </div>

        <div
          style={{
            marginTop: "90px",
            marginRight: "200px",
            marginLeft: "200px"
          }}
        >
          <p className="heading" id="RFS">
            What is this number in the circle? That's the RFS!
          </p>
          <p className="text">
            The Relative Financial Score (RFS) is MoneyMap’s unique performance
            score that shows the financial standing of the Job Offer Card
            relative to averages in the city, that is, how “good” this job offer
            is for the city it is being offered in, based on the user’s
            expenses, savings, the job offer and the city’s cost of living.
          </p>
          <p className="text">
            Based on our current equation, a good score would then be somewhere
            in the range of 30-50 and a great score would be anything larger. An
            RFS in the range of 0-30 is passable, and anything lower than 0 is
            considered unsustainable.
          </p>
        </div>

        <div
          style={{
            marginTop: "90px",
            marginRight: "200px",
            marginLeft: "200px"
          }}
        >
          <p className="heading" id="BasketofGoods">
            What is the Basket of Goods?
          </p>
          <p className="text">
            The Basket of Goods is our way of assisting you the user in figuring
            out your costs in a city. If you have never lived in a city before,
            figuring out how much you will be spending on groceries, rent,
            utilities etc. may be quite daunting. As such, the Basket of Goods
            is a way for you to specify your general spending habits, and allow
            us to determine the actual costs of those habits in the city of
            choice.
          </p>
          <p className="text">
            By designating the type of apartment you plan to live in, and your
            expected mode of transportation, the Basket of Goods determines the
            Mandatory Expense for the cities in which you have job offers. By
            designating the amount of food you family eats, and the number of
            times your family goes to restaurants, we determine the Consumable
            Expenses. And lastly, by designating the shopping habits, sports
            memberships, and your frequency of cinema visits, we determine the
            Entertainment Expenses for your family.
          </p>
          <p className="text">
            This way by providing information that is relatively well known to
            you, we can assist you in the daunting task of tracking your monthly
            expenses in uncharted territory.
          </p>
        </div>

        <div
          style={{
            marginTop: "90px",
            marginRight: "200px",
            marginLeft: "200px"
          }}
        >
          <p className="heading" id="UserDetails">
            What are my User Details used for?
          </p>
          <p className="text">
            While some of the information we ask of you for User Details may
            touch on the personal side, their provision greatly increases the
            accuracy of the information that we can provide to you.
          </p>
          <p className="text">
            By specifying the number of adults and children in your family, we
            can show you how your projected costs compare with city averages for
            families of similar sizes. Additionally, this information along with
            your marital status, can help us provide you with your realistic
            income after taxes, so that you can properly budget yourself. When
            you are presented with a job offer, it may be difficult to gauge how
            much money you will have left after taxes, and with the number of
            adults, children, and marital status, we provide you with an
            accurate comparison of the deductions you will be facing from city
            to city.
          </p>
          <p className="text">
            Lastly by letting us know the number of adults in your family, we
            can further scale your RFS off of the number of contributing earners
            in the family.
          </p>
        </div>

        {returnbutton}

      </div>
    );
  }
}
export default About;
