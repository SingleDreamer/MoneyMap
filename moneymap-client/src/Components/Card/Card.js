import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./Card.css";
import Chart from "react-apexcharts";
import Charts from "./Charts.js";
class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currModal: null,
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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
              <Button onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Card>
      </div>
    );
  }

  openModal(e, index) {
    this.setState({ currModal: index });
  }

  closeModal = () => {
    this.setState({ currModal: null });
  };
}
export default CardArray;
