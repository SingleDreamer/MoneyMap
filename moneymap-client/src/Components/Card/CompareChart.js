import React, { Component } from "react";
import Chart from "react-apexcharts";
import Table from "react-bootstrap/Table";
import "./Card.css";
let newSeries = [];

class CompareCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsBarChart: {
        chart: {
          height: 350,
          type: "line"
        },
        seriesMixedChart: [
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
        ],
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
      },
      optionsPerksChart: {
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true
          }
        },
        responsive: [
          {
            breakpoint: 400,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        tooltip: {
          custom: function({ seriesIndex, dataPointIndex }) {
            let string = newSeries[seriesIndex].desc[dataPointIndex];

            string = string.replace(/.{30}/g, "$&" + "<br>");

            return (
              '<div class="arrow_box">' +
              "<strong>" +
              newSeries[seriesIndex].name +
              "<br>" +
              newSeries[seriesIndex].Rating[dataPointIndex] +
              "</strong>" +
              " <br> " +
              string +
              "</div>"
            );
          }
        },
        xaxis: {
          categories: [
            this.props.companies[0].jocname,
            this.props.companies[1].jocname
          ]
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        },
        series: []
      }
    };
  }

  // series: [{
  //   name: 'PRODUCT A',
  //   data: [44, 55, 41, 67, 22, 43]
  // }, {
  //   name: 'PRODUCT B',
  //   data: [13, 23, 20, 8, 13, 27]
  // }, {
  //   name: 'PRODUCT C',
  //   data: [11, 17, 15, 15, 21, 14]
  // }, {
  //   name: 'PRODUCT D',
  //   data: [21, 7, 25, 13, 22, 8]
  // }],
  componentDidMount() {
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
              options={this.state.optionsBarChart}
              series={this.state.optionsBarChart.seriesMixedChart}
              type="line"
              height="auto"
            />
            {typeof this.props.companies[0].perks !== "undefined" &&
            typeof this.props.companies[1].perks !== "undefined" ? (
              <Chart
                options={this.state.optionsPerksChart}
                series={this.state.optionsPerksChart.series}
                type="bar"
                height="auto"
              />
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
