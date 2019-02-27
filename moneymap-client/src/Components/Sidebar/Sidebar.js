import React, { Component } from "react";
import './Sidebar.css'
class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: {},
    };
  }

  //????
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.userInfo)
    this.setState({
      userInfo: nextProps.userInfo
    });
  }

  render() {
    return (
      <div className = 'Sidebar'>
       <h1> Dashboard </h1>
      </div>
    );
  }
}
export default Sidebar;