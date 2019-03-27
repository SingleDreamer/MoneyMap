import React, { Component } from "react";
import Chart from "react-apexcharts";
import Table from "react-bootstrap/Table";
import "./Card.css";
class CompareCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsMixedChart: {
        chart: {
          height: 350,
          type: "line"
        },
        stroke: {
          curve: "smooth"
        },
        fill: {
          type: "solid",
          opacity: [0.35, 1]
        },

        labels: [
          "Income",
          "Rent",
          "Consumables",
          "Entertainment",
          "Debt",
          "Savings",
          "RFS"
        ],
        markers: {
          size: 0
        },
        yaxis: [
          {
            title: {
              text: "Series A"
            }
          },
          {
            opposite: true,
            title: {
              text: "Series B"
            }
          }
        ],
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function(y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
            }
          }
        }
      }
    };
  }

  render() {
    console.log(
      "test 1",
      this.props.companies[0].components[0].ComponentAmount
    );
    let seriesMixedChart = [
      {
        name: this.props.companies[0].jocname,
        type: "area",
        data: [
          this.props.companies[0].components[0].ComponentAmount / 10,
          this.props.companies[0].components[1].ComponentAmount,
          this.props.companies[0].components[2].ComponentAmount,
          this.props.companies[0].components[3].ComponentAmount,
          this.props.companies[0].components[4].ComponentAmount,
          this.props.companies[0].jocrfc
        ]
      },
      {
        name: this.props.companies[1].jocname,
        type: "line",
        data: [
          this.props.companies[1].components[0].ComponentAmount / 10,
          this.props.companies[1].components[1].ComponentAmount,
          this.props.companies[1].components[2].ComponentAmount,
          this.props.companies[1].components[3].ComponentAmount,
          this.props.companies[1].components[4].ComponentAmount,
          this.props.companies[1].jocrfc
        ]
      }
    ];
    return (
      <div className="app">
        <div className="row">
          <div className="col mixed-chart">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>City</th>
                  <th>Income</th>
                  <th>RFS</th>
                  <th>Rent</th>
                  <th>Consumable</th>
                  <th>Entertainment</th>
                  <th>Debt</th>
                  <th>Savings</th>
                </tr>
              </thead>
              <tbody>
                {this.props.companies.map(company => (
                  <tr key={company.jocid}>
                    <td>
                      <strong>{`${company.jocname}`}</strong>
                    </td>
                    <td>NYC</td>
                    <td>{company.components[0].ComponentAmount}</td>
                    <td>{company.jocrfc}</td>
                    <td>{company.components[1].ComponentAmount}</td>
                    <td>{company.components[1].ComponentAmount}</td>
                    <td>{company.components[2].ComponentAmount}</td>
                    <td>{company.components[3].ComponentAmount}</td>
                    <td>{company.components[4].ComponentAmount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Chart
              options={this.state.optionsMixedChart}
              series={seriesMixedChart}
              type="line"
              width="750"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CompareCharts;
