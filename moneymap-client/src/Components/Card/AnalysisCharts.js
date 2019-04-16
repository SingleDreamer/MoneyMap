import React, { Component } from "react";
import Chart from "react-apexcharts";

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "Income",
            "Rent",
            "Consumables",
            "Entertainment",
            "Debt",
            "Savings"
          ]
        },
        yaxis: {
          title: {
            text: "$"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              // return "$ " + val + " thousands";
              return val;
            }
          }
        }
      },
      series: [
        {
          name: "User Values", //from profile
          data: [44, 55, 57, 56, 61, 58]
        },
        {
          name: "City Average Values",
          data: [
            this.props.cityAverages[0][3].Amount,
            this.props.cityAverages[0][0].Amount,
            this.props.cityAverages[0][1].Amount,
            this.props.cityAverages[0][2].Amount,
            0,
            0
          ]
        },
        {
          name: "JOC Values",
          data: [
            this.props.company.components[0].ComponentAmount / 10,
            this.props.company.components[1].ComponentAmount,
            this.props.company.components[2].ComponentAmount,
            this.props.company.components[3].ComponentAmount,
            this.props.company.components[4].ComponentAmount,
            this.props.company.jocrfc
          ]
        }
      ]
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="350"
        />
      </div>
    );
  }
}

export default Charts;
