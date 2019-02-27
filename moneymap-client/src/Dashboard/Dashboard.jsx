import React, { Component } from "react";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }

  componentWillMount = () => {
    document.body.classList.add("DashBg");
  };

  componentWillUnmount = () => {
    document.body.classList.remove("DashBg");
  };
}
export default Dashboard;
