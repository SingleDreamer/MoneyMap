import React, { Component } from "react";
import {
  Card,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
  ProgressBar
} from "react-bootstrap";
import "./Card.css";
import Chart from "react-apexcharts";
import Charts from "./AnalysisCharts.js";
import axios from "axios";
import AuthService from "../../AuthService/AuthService";

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      cityAverages: {
        0: {
          0: {
            ComponentTypeID: 2,
            ComponentTypeDescription: "Mandatory Costs",
            Amount: 0
          },
          1: {
            ComponentTypeID: 3,
            ComponentTypeDescription: "Consumable Costs",
            Amount: 0
          },
          2: {
            ComponentTypeID: 4,
            ComponentTypeDescription: "Entertainment Expenses",
            Amount: 0
          },
          3: {
            ComponentTypeID: 1,
            ComponentTypeDescription: "Income",
            Amount: 0
          }
        }
      },
      jobOfferCardID: 0,
      optionsRadial: {
        colors: ["#111111"],
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
    this.Auth = new AuthService();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  deleteJOC = jocid => {
    console.log(jocid);
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios
      .delete(
        "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/" +
          jocid,
        config
      )
      .then(res => this.props.getCards("Deleted Cards"))
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  componentDidMount() {
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios
      .get(
        "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/cities/" +
          this.props.info.joccityid +
          "/averages/" +
          this.Auth.getUser(),
        config
      )
      .then(res => {
        // console.log("City averages:", res.data.recordsets);
        if (
          (res.data.recordsets[0].length > 0 &&
            res.data.recordsets[0].length < 4) ||
          res.data.recordsets[0].length > 4
        ) {
          this.setState(
            {
              cityAverages: {
                0: {
                  ...this.state.cityAverages[0],
                  0: !!res.data.recordsets[0].find(amount => {
                    return amount.ComponentTypeID === 2;
                  })
                    ? res.data.recordsets[0].find(amount => {
                        return amount.ComponentTypeID === 2;
                      })
                    : { ...this.state.cityAverages[0][0] },
                  1: !!res.data.recordsets[0].find(amount => {
                    return amount.ComponentTypeID === 3;
                  })
                    ? res.data.recordsets[0].find(amount => {
                        return amount.ComponentTypeID === 3;
                      })
                    : { ...this.state.cityAverages[0][1] },
                  2: !!res.data.recordsets[0].find(amount => {
                    return amount.ComponentTypeID === 4;
                  })
                    ? res.data.recordsets[0].find(amount => {
                        return amount.ComponentTypeID === 4;
                      })
                    : { ...this.state.cityAverages[0][2] },
                  3: !!res.data.recordsets[0].find(amount => {
                    return amount.ComponentTypeID === 1;
                  })
                    ? res.data.recordsets[0].find(amount => {
                        return amount.ComponentTypeID === 1;
                      })
                    : { ...this.state.cityAverages[0][3] }
                }
              }
            }
            // () => console.log("This is the state ::: ", this.state.cityAverages)
          );
        } else if (res.data.recordsets[0].length === 4) {
          this.setState({ cityAverages: res.data.recordsets });
          // console.log(this.state.cityAverages[0][0].Amount);
        } else {
          this.setState({
            cityAverages: {
              0: {
                0: { Amount: 0 },
                1: { Amount: 0 },
                2: { Amount: 0 },
                3: { Amount: 0 }
              }
            }
          });
          // console.log(this.state.cityAverages[0][0].Amount);
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
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
              <Card.Title>
                <img
                  src={this.props.image}
                  alt={"no logo"}
                  width={"30px"}
                  style={{ marginRight: "5px" }}
                />
                {this.props.info.jocname}
              </Card.Title>
              <button
                type="button"
                className="close"
                aria-label="Close"
                style={{ position: "absolute", top: "5px", left: "270px" }}
                onClick={() => this.deleteJOC(this.props.info.jocid)}
              >
                <span aria-hidden="true">×</span>
              </button>

              <div className="chart">
                <Chart
                  options={this.props.test(this.props.info.jocrfc)} //{this.state.optionsRadial}
                  series={[Math.ceil(this.props.info.jocrfc)]}
                  type="radialBar"
                  width="100"
                  height="130"
                />
              </div>
            </div>
            <Card.Text>{this.props.info.city.City}</Card.Text>
            <strong>Yearly Values</strong>

            {this.props.info.components.length ? (
              this.props.info.components.map((component, index) => (
                <Card.Text key={index}>
                  {`${component.ComponentDescription}: $${
                    component.ComponentAmount
                  }`}
                  {/*Testing this out maybe? <ProgressBar now={Math.random() * 100} key={index} />*/}
                </Card.Text>
              ))
            ) : (
              <Card.Text>Empty Card</Card.Text>
            )}
            <Card.Text>
              Savings: ${Math.round(this.props.info.savings)}
            </Card.Text>

            <div className="buttons">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id={"right"}>
                    Select two Job Offers to Compare
                  </Tooltip>
                }
              >
                <Button
                  variant="primary"
                  onClick={() => this.props.selectCard(this.props.info)}
                >
                  Compare
                </Button>
              </OverlayTrigger>

              <Button
                variant="secondary"
                onClick={e => this.openModal(e, this.props.id)}
              >
                Analysis
              </Button>
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
              <Modal.Title>Job offer analysis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Charts
                company={this.props.info}
                cityAverages={this.state.cityAverages}
                profile={this.props.profile}
              />
              {/* get profile info */}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Card>
      </div>
    );
  }

  openModal = (e, index) => {
    // console.log("Card profile: ", this.props.profile);
    console.log("openModal");
    //this.getCityAverages();
    this.setState({ currModal: index });
  };

  closeModal = () => {
    console.log("closeModal");
    this.setState({ show: false });
    this.setState({ currModal: null });
  };

  handleShow = e => {
    console.log("handleShow");

    e.preventDefault();
    this.setState({
      show: true
    });
  };

  handleClose() {
    console.log("handleClose");
    this.setState({ currModal: null });
    this.setState({ show: false });
  }
}
export default CardArray;
