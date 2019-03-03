import React, { Component } from "react";
import CardArray from "../Components/CardArray/CardArray.js";
import Sidebar from "../Components/Sidebar/Sidebar.js";
import { JobOfferCard } from "../Components/JobOfferCard";
import { Modal, Button } from "react-bootstrap";
import "./Dashboard.css";
<<<<<<< HEAD
=======
import myData from "./test.json";
>>>>>>> Cris2

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
<<<<<<< HEAD
      companies: ["Google", "Facebook", "Apple", "Microsoft", "Airbnb"]
=======
      companies: myData
>>>>>>> Cris2
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    //When the Add JOC button is clicked it adds 'Uber' the the company list currently in the state
    //using the spread operator. Just for tesing purposes, will be reworked.
    let updateCompanies = () => {
<<<<<<< HEAD
      this.handleShow();
      this.setState({
        companies: [...this.state.companies, "Uber"]
      });
=======
      this.setState({
        companies: {}
      });
      console.log(myData);
>>>>>>> Cris2
    };

    return (
      <div className="Dashboard">
        {/*Need to tuen this into a component to update depending on the currently logged in user's info */}
        <Sidebar className="Sidebar" />
        <Button className="AddJOC" onClick={() => updateCompanies()}>
          Add New JOC
        </Button>
        {/*When this.state.companies changes with the addJOC button the state is mutated which causes new props to be passed and rerenders the CARDARRAY*/}
<<<<<<< HEAD

=======
>>>>>>> Cris2
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>
            <Modal.Title>New JobOfferCard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JobOfferCard />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        <CardArray companies={this.state.companies} />
      </div>
    );
  }
<<<<<<< HEAD
  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }
=======
>>>>>>> Cris2
}
export default Dashboard;
