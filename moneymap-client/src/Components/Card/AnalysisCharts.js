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
            "Mandatory Costs",
            "Consumable Costs",
            "Entertainment Expenses",
            "Debt"
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
      }
    };
  }
  render() {
    const threeBar = [
      {
        name: "User Profile Values", //from profile
        data: [
          this.props.profile.components[0].ComponentAmount.toFixed(2),
          this.props.profile.components[1].ComponentAmount.toFixed(2),
          this.props.profile.components[2].ComponentAmount.toFixed(2),
          this.props.profile.components[3].ComponentAmount.toFixed(2),
          this.props.profile.components[4].ComponentAmount.toFixed(2)
        ]
      },
      {
        name: "City Average Values",
        data: [
          this.props.cityAverages[0][3].Amount.toFixed(2),
          this.props.cityAverages[0][0].Amount.toFixed(2),
          this.props.cityAverages[0][1].Amount.toFixed(2),
          this.props.cityAverages[0][2].Amount.toFixed(2),
          0
        ]
      },
      {
        name: "JOC Values",
        data: [
          (this.props.company.components[0].ComponentAmount / 10).toFixed(2),
          this.props.company.components[1].ComponentAmount.toFixed(2),
          this.props.company.components[2].ComponentAmount.toFixed(2),
          this.props.company.components[3].ComponentAmount.toFixed(2),
          this.props.company.components[4].ComponentAmount.toFixed(2)
        ]
      }
    ];
    const twoBar = [
      {
        name: "User Profile Values", //from profile
        data: [
          this.props.profile.components[0].ComponentAmount.toFixed(2),
          this.props.profile.components[1].ComponentAmount.toFixed(2),
          this.props.profile.components[2].ComponentAmount.toFixed(2),
          this.props.profile.components[3].ComponentAmount.toFixed(2),
          this.props.profile.components[4].ComponentAmount.toFixed(2)
        ]
      },

      {
        name: "JOC Values",
        data: [
          (this.props.company.components[0].ComponentAmount / 10).toFixed(2),
          this.props.company.components[1].ComponentAmount.toFixed(2),
          this.props.company.components[2].ComponentAmount.toFixed(2),
          this.props.company.components[3].ComponentAmount.toFixed(2),
          this.props.company.components[4].ComponentAmount.toFixed(2)
        ]
      }
    ];
    let seriesOption;
    if (
      this.props.cityAverages[0][0].Amount === 0 &&
      this.props.cityAverages[0][1].Amount === 0 &&
      this.props.cityAverages[0][2].Amount === 0 &&
      this.props.cityAverages[0][3].Amount === 0
    ) {
      seriesOption = twoBar;
    } else {
      seriesOption = threeBar;
    }
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={seriesOption}
          type="bar"
          height="350"
        />

        <p>
          **City Average data is not available for all cities and does not
          include debt.{" "}
        </p>
      </div>
    );
  }
}

export default Charts;
