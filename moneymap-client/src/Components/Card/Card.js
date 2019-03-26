import React, { Component } from "react";
import {
  Card,
  Button,
  Modal,
  OverlayTrigger,
  Popover,
  Tooltip
} from "react-bootstrap";
import "./Card.css";
import Chart from "react-apexcharts";
// import axios from "axios";
import Charts from "./Charts.js";

const popover = (
  <Popover id="popover-basic" title="Analysis">
    Click on the score to see a detailed breakdown
  </Popover>
);

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
        <div className={this.props.cardType}>
          <i className="fas fa-check" />
        </div>
        <Card className="joc">
          <Card.Body>
            <div className="header">
              <Card.Title>{this.props.info.jocname}</Card.Title>
              <OverlayTrigger
                trigger="hover"
                placement="right"
                overlay={popover}
              >
                <div className="chart">
                  <Chart
                    options={this.state.optionsRadial}
                    series={[this.props.info.jocrfc]}
                    type="radialBar"
                    width="100"
                    height="130"
                    onClick={e => this.openModal(e, this.props.id)}
                  />
                </div>
              </OverlayTrigger>
            </div>
            {this.props.info.components.length ? (
              this.props.info.components.map((component, index) => (
                <Card.Text key={index}>
                  {`${component.ComponentDescription}: $${
                    component.ComponentAmount
                  }`}
                </Card.Text>
              ))
            ) : (
              <Card.Text>Empty Card</Card.Text>
            )}
            <div className="buttons">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id={"top"}>Select two Job Offers to Compare</Tooltip>
                }
              >
                <Button
                  variant="primary"
                  onClick={() => this.props.selectCard(this.props.info)}
                >
                  Compare
                </Button>
              </OverlayTrigger>

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
    console.log("openModal");
    this.setState({ currModal: index });
  }

  closeModal = () => {
    console.log("closeModal");

    this.setState({ currModal: null });
  };

  handleShow = e => {
    console.log("handleShow");

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
        // return this.sendRequest();
      }
    );
  };

  // async sendRequest() {
  //   let url = "http://localhost:3000/test";

  //   let config = {
  //     headers: {
  //       // Authorization: this.Auth.getToken(),
  //       "Content-Type": "application/json"
  //     }
  //   };

  //   let payload = this.state.jocDetails;

  //   console.log(payload);

  //   try {
  //     let response = await axios.post(url, payload, config);
  //     console.log("****");
  //     console.log(response);
  //     // if (response.data.message) alert(response.data.message);
  //     const { jocDetails } = this.state;
  //     this.setState({ jobOfferCardID: response.data });
  //     console.log("jobOfferCardID: " + this.state.jobOfferCardID);
  //     alert(`Your job: \n
  //     Job UID: ${jocDetails.UID} \n
  //     Job JOCName: ${jocDetails.JOCName}\n
  //     Job CityID: ${jocDetails.CityID}\n
  //     Job CardImageSrc: ${jocDetails.CardImageSrc}
  // `);
  //     return response;
  //   } catch (err) {
  //     this.setState({ error: err });
  //     console.log("####");
  //     console.log(err);
  //     // alert(`Ya got an error boy \n
  //     // ${err}`);
  //   }
  // }

  handleClose() {
    console.log("handleClose");

    this.setState({ show: false });
  }
}
export default CardArray;
