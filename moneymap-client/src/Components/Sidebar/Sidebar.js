import React, { Component } from "react";
import "./Sidebar.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "@material/react-drawer/dist/drawer.css";
import Drawer, { DrawerSubtitle } from "@material/react-drawer";

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {
        firstName: "FirstName",
        lastName: "LastName",
        relativeScore: 84,
        currentCity: "Seattle, WA",
        monthlyIncome: 10950,
        familySize: 2,
        expenses: 8750,
        savings: 2200
      },
      open: false
    };
  }

  //what props will this recieve????
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.userInfo);
  //   this.setState({
  //     userInfo: nextProps.userInfo
  //   });
  // }
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div>
        <Drawer
          dismissible={false}
          modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className = "content">
            <h2 className="header">
              <span className="icon">
                <i class="fas fa-user-circle" />
              </span>
              {`${this.state.userInfo.firstName}
          ${this.state.userInfo.lastName}`}
            </h2>
            <br />
            <br />
            <DrawerSubtitle>Relative Finance Score</DrawerSubtitle>
            <div className="content">{`${
              this.state.userInfo.relativeScore
            }`}</div>
            <br />
            <DrawerSubtitle>Curent City</DrawerSubtitle>
            <div className="content">{`${this.state.userInfo.currentCity}`}</div>
            <br />
            <DrawerSubtitle>Monthly Income</DrawerSubtitle>
            <div className="content">{`$${
              this.state.userInfo.monthlyIncome
            }`}</div>
            <br />
            <DrawerSubtitle>Family Size</DrawerSubtitle>
            <div className="content">{`${this.state.userInfo.familySize}`}</div>
            <br />
            <DrawerSubtitle>Monthly Expenses</DrawerSubtitle>
            <div className="content">{`$${this.state.userInfo.expenses}`}</div>
            <br />
            <DrawerSubtitle>Monthly Savings</DrawerSubtitle>
            <div className="content">{`$${this.state.userInfo.savings}`}</div>
            <br />
            <Link to="/">
              <Button variant="danger">Log Out</Button>
            </Link>
          </div>
        </Drawer>

        <span className="icon">
          <i
            class="fas fa-chevron-circle-right"
            onClick={() => this.setState({ open: !this.state.open })}
          />
        </span>
      </div>
    );
  }
}
export default Sidebar;
