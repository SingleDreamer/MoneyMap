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
      <div >
        <Card className={this.props.cardType} draggable="true">
          <Card.Body>
            <div className="header">
              <Card.Title>{this.props.info.jocname}</Card.Title>
              <div className="chart">
                {/*Series needs to change to the actual RFS score*/}
                <Chart
                  options={this.state.optionsRadial}
                  series={[Math.floor(Math.random() * 101)]}
                  type="radialBar"
                  width="100"
                  height="130"
                />
              </div>
            </div>
            {this.props.info.components.length ? this.props.info.components.map((component, index)=>
              <Card.Text>
              {`${component.ComponentDescription}: $${component.ComponentAmount}`}
              </Card.Text>
            ) : <Card.Text>
                  Empty Card
                </Card.Text>}
            <div className="buttons">
              <Button
                variant="primary"
                onClick={e => this.openModal(e, this.props.id)}
              >
                Analyze
              </Button>
              <Button variant="danger">Delete</Button>
            </div>
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
              <Charts info={50} />
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
