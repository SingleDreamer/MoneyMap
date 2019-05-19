import React, { Component } from "react";
import Chart from "react-apexcharts";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import "./Card.css";

let newSeries = [];

class CompareCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsRadial: {
        colors: ["#45a29e"],
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
      },
      optionsBarChart: {
        chart: {
          height: 350,
          type: "bar"
        },
        seriesMixedChart: [
          {
            name: this.props.companies[0].jocname,
            type: "bar",
            data: [
              this.props.companies[0].components[0].ComponentAmount / 12,
              this.props.companies[0].components[1].ComponentAmount,
              this.props.companies[0].components[2].ComponentAmount,
              this.props.companies[0].components[3].ComponentAmount,
              this.props.companies[1].savings,
              this.props.companies[0].jocrfc
            ]
          },
          {
            name: this.props.companies[1].jocname,
            type: "bar",
            data: [
              this.props.companies[1].components[0].ComponentAmount / 12,
              this.props.companies[1].components[1].ComponentAmount,
              this.props.companies[1].components[2].ComponentAmount,
              this.props.companies[1].components[3].ComponentAmount,
              this.props.companies[1].savings,
              this.props.companies[1].jocrfc
            ]
          }
        ],
        stroke: {
          curve: "smooth"
        },
        fill: {
          type: "solid",
          opacity: [1, 1]
        },
        labels: [
          "Net Income",
          "Mandatory",
          "Consumables",
          "Entertainment",
          "Savings",
          "RFS"
        ],
        markers: {
          size: 0
        },
        // yaxis: [
        //   {
        //     title: {
        //       text: "Series A"
        //     }
        //   },
        //   {
        //     opposite: true,
        //     title: {
        //       text: "Series B"
        //     }
        //   }
        // ],
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function(y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0);
              }
              return y;
            }
          }
        }
      },
      optionsPerksChart: {
        series: []
      }
    };
  }

  componentDidMount() {
    console.log(this.props.companies);
    if (
      typeof this.props.companies[0].perks !== "undefined" &&
      typeof this.props.companies[1].perks !== "undefined"
    ) {
      let keys = Object.keys(this.props.companies[0].perks);
      let series1 = Object.values(this.props.companies[0].perks);
      let series2 = Object.values(this.props.companies[1].perks);
      console.log(keys, series1, series2);
      for (let i = 0; i < keys.length; i++) {
        newSeries.push({
          name: keys[i],
          data: [series1[i].Score + 1, series2[i].Score + 1],
          desc: [series1[i].Description, series2[i].Description],
          Rating: [series1[i].Rating, series2[i].Rating]
        });
      }
      console.log(newSeries);
      this.setState({
        optionsPerksChart: {
          ...this.state.optionsPerksChart,
          series: newSeries
        }
      });
    }
  }

  componentWillUnmount() {
    newSeries = [];
    this.setState({
      optionsPerksChart: {
        ...this.state.optionsPerksChart,
        series: newSeries
      }
    });
  }
  getBadge = Rating => {
    if (Rating === "Excellent") {
      return (
        <Badge pill variant="success">
          {Rating}
        </Badge>
      );
    } else if (Rating === "Horrible" || Rating === "Bad") {
      return (
        <Badge pill variant="danger">
          {Rating}
        </Badge>
      );
    } else {
      return (
        <Badge pill variant="warning">
          {Rating}
        </Badge>
      );
    }
  };

  render() {
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
                    <td>{company.city.City}</td>
                    <td>{company.components[0].ComponentAmount}</td>
                    <td>{Math.round(company.jocrfc)}</td>
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
              options={this.state.optionsBarChart}
              series={this.state.optionsBarChart.seriesMixedChart}
              type="bar"
              height="auto"
            />
            <Chart
              options={this.state.optionsRadial} //{this.state.optionsRadial}
              series={[23]}
              type="radialBar"
              width="100"
              height="130"
            />
            <h2>Benefits Breakdown</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Benefit</th>
                  <th>
                    {/* {this.props.companies[0].jocname} */}
                    <img
                      src={`https://logo.clearbit.com/${
                        this.props.companies[0].jocname
                      }.com`}
                      alt={this.props.companies[0].jocname}
                    />
                  </th>
                  <th>
                    {/* {this.props.companies[1].jocname} */}
                    <img
                      src={`https://logo.clearbit.com/${
                        this.props.companies[1].jocname
                      }.com`}
                      alt={this.props.companies[1].jocname}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.optionsPerksChart.series.length > 0 ? (
                  this.state.optionsPerksChart.series.map((benefit, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{`${benefit.name}`}</strong>
                      </td>
                      <td>
                        {this.getBadge(benefit.Rating[0])}
                        <br />
                        {benefit.desc[0]}
                      </td>
                      <td>
                        {this.getBadge(benefit.Rating[1])}
                        <br />
                        {benefit.desc[1]}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key={0}>
                    <td>
                      <strong>{`Benefit info isnt available for one of the selected companies`}</strong>
                    </td>
                    <td />
                    <td />
                  </tr>
                )}
              </tbody>
            </Table>
            {typeof this.props.companies[0].perks !== "undefined" &&
            typeof this.props.companies[1].perks !== "undefined" ? (
              console.log(
                "THIS",
                this.state.optionsPerksChart.series,
                this.props.companies
              )
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CompareCharts;
