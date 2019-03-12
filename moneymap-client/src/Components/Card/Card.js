import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./Card.css";
import Chart from "react-apexcharts";
import { axios } from "axios";
import Charts from "./Charts.js";

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      jobOfferCardID: 0,
      jocDetails: {
        UID: 1,
        JOCName: "",
        CityID: 1,
        CardImageSrc: ""
      },
      optionsRadial: {
        plotOptions: {
          radialBar: {
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
      }
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    return (
      <div>
        <Card className="card">
          <Card.Body>
            <div className="header">
              <Card.Title>{this.props.info.name}</Card.Title>
              <div className="chart">
                <Chart
                  options={this.state.optionsRadial}
                  series={[this.props.info.score]}
                  type="radialBar"
                  width="100"
                  height="130"
                />
              </div>
            </div>

            <Card.Title>
              {this.props.info.city} {`$${this.props.info.income}`}
            </Card.Title>
            <Card.Text>
              {`Mandatory Costs: $${this.props.info.mandatory_costs}`}
            </Card.Text>
            <Card.Text>
              {`Consumable Costs: $${this.props.info.comsumable_costs}`}
            </Card.Text>
            <Card.Text>
              {`Entertainment Costs: $${this.props.info.entertainment_cost}`}
            </Card.Text>
            <Card.Text>{`Monthly Debt: $${this.props.info.debt}`}</Card.Text>
            <Card.Text>
              {`Monthly Savings: $${this.props.info.savings}`}
            </Card.Text>
            <Button
              variant="primary"
              onClick={e => this.openModal(e, this.props.id)}
            >
              Analyze
            </Button>
          </Card.Body>
          {/*Maybe make this modal into it's own component*/}
          <Modal
            id={this.props.id}
            show={this.state.currModal === this.props.id}
            onHide={this.closeModal}
            centered
            size="lg"
          >
            <Modal.Header closeButton={false}>
              <Modal.Title>{this.props.info.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Job offer analysis</Modal.Body>
            <Modal.Body>
              <Charts info={this.props.info} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Card>
      </div>
    );
  }

  // handleShow() {
  //   this.setState({ show: true });
  // }
    openModal(e, index) {
    this.setState({ currModal: index });
  }

  closeModal = () => {
    this.setState({ currModal: null });
  };

  handleShow = e => {
    e.preventDefault();
    this.setState(
      {
        show: true,
        jocDetails: {
          UID: 1,
          JOCName: this.props.info.name,
          CityID: 1,
          CardImageSrc: ""
        }
      },
      () => {
        return this.sendRequest();
      }
    );
  };

  async sendRequest() {
    let url = "http://localhost:3000/test";

    let config = {
      headers: {
        // Authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };

    let payload = this.state.jocDetails;

    console.log(payload);

    try {
      let response = await axios.post(url, payload, config);
      console.log("****");
      console.log(response);
      // if (response.data.message) alert(response.data.message);
      const { jocDetails } = this.state;
      this.setState({ jobOfferCardID: response.data });
      console.log("jobOfferCardID: " + this.state.jobOfferCardID);
      alert(`Your job: \n
      Job UID: ${jocDetails.UID} \n
      Job JOCName: ${jocDetails.JOCName}\n
      Job CityID: ${jocDetails.CityID}\n
      Job CardImageSrc: ${jocDetails.CardImageSrc}
  `);
      return response;
    } catch (err) {
      this.setState({ error: err });
      console.log("####");
      console.log(err);
      // alert(`Ya got an error boy \n
      // ${err}`);
    }
  }

  handleClose() {
    this.setState({ show: false });
  }
}
export default CardArray;
