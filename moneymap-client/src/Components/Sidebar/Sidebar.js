import React, { Component } from "react";
import "./Sidebar.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {}
    };
  }

  //what props will this recieve????
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.userInfo);
    this.setState({
      userInfo: nextProps.userInfo
    });
  }

  render() {
    return (
      <div className="Sidebar">
        <h1> Dashboard </h1>
        <Link to="/">
          <Button variant="primary" type="submit">
            Log Out
          </Button>
        </Link>
      </div>
    );
  }
}
export default Sidebar;
