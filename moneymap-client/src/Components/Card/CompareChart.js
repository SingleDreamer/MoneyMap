import React, { Component } from "react";
import Chart from "react-apexcharts";

class CompareCharts extends Component {
  constructor(props) {
    super(props);

    this.updateCharts = this.updateCharts.bind(this);

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
        }

        // labels: [
        //   "Dec 01",
        //   "Dec 02",
        //   "Dec 03",
        //   "Dec 04",
        //   "Dec 05",
        //   "Dec 06",
        //   "Dec 07",
        //   "Dec 08",
        //   "Dec 09 ",
        //   "Dec 10",
        //   "Dec 11"
        // ],
        // markers: {
        //   size: 0
        // },
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
        // tooltip: {
        //   shared: true,
        //   intersect: false,
        //   y: {
        //     formatter: function(y) {
        //       if (typeof y !== "undefined") {
        //         return y.toFixed(0) + " points";
        //       }
        //       return y;
        //     }
        //   }
        // }
      },
      seriesMixedChart: [
        {
          name: "TEAM A",
          type: "area",
          data: [44, 55, 31, 47, 31, 43, 26, 41, 31, 47, 33]
        },
        {
          name: "TEAM B",
          type: "line",
          data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43]
        }
      ],
      optionsRadial: {
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              showOn: "always",
              name: {
                offsetY: -20,
                show: true,
                color: "#888",
                fontSize: "13px"
              },
              value: {
                formatter: function(val) {
                  return val;
                },
                color: "#111",
                fontSize: "30px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Percent"]
      },
      seriesRadial: [this.props.info],
      optionsBar: {
        chart: {
          stacked: true,
          stackType: "100%",
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        tooltip: {
          custom: function({ seriesIndex, dataPointIndex }) {
            let string = newSeries[seriesIndex].desc[dataPointIndex];
            string = string.replace(/.{30}/g, "$&<br>");

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
        stroke: {
          width: 0
        },
        xaxis: {
          categories: ["Fav Color"],
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        fill: {
          opacity: 1,
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.35,
            gradientToColors: undefined,
            inverseColors: false,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [90, 0, 100]
          }
        },

        legend: {
          position: "bottom",
          horizontalAlign: "right"
        }
      },
      seriesBar: [
        {
          name: "blue",
          data: [32]
        },
        {
          name: "green",
          data: [41]
        },
        {
          name: "yellow",
          data: [12]
        },
        {
          name: "red",
          data: [65]
        }
      ]
    };
  }

  updateCharts() {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];
    const newBarSeries = [];
    // eslint-disable-next-line
    this.state.seriesMixedChart.map(s => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      newMixedSeries.push({ data: data, type: s.type });
    });
    // eslint-disable-next-line
    this.state.seriesBar.map(s => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (180 - min + 1)) + min;
      });
      newBarSeries.push({ data, name: s.name });
    });

    this.setState({
      seriesMixedChart: newMixedSeries,
      seriesBar: newBarSeries,
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50]
    });
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col mixed-chart">
            <Chart
              options={this.state.optionsMixedChart}
              series={this.state.seriesMixedChart}
              type="line"
              width="500"
            />
          </div>

          {/*<div className="col radial-chart">
            <Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type="radialBar"
              width="280"
            />
          </div>
        </div>

        <div className="row">
          <div className="col percentage-chart">
            <Chart
              options={this.state.optionsBar}
              height={140}
              series={this.state.seriesBar}
              type="bar"
              width={500}
            />
          </div>

          <p className="col">
            <button onClick={this.updateCharts}>Update!</button>
    </p>*/}
        </div>
      </div>
    );
  }
}

export default CompareCharts;
