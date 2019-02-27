import React, { Component } from "react";
import CardArray from "../Components/CardArray/CardArray.js"
import Button from 'react-bootstrap/Button';
import './Dashboard.css'
class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      companies: ['Google', 'Facebook', 'Apple', 'Microsoft', 'Airbnb']
    };
  }
  render() {
    let updateCompanies = () =>{
      this.setState({
        companies: [...this.state.companies, 'Uber']
      })
    }
    return (
      <div className = 'Dashboard'>
        <h1>Dashboard</h1>
        <Button className = 'AddJOC' onClick = {()=>updateCompanies()}>Add New JOC</Button>
        <CardArray companies = {this.state.companies}/>
      </div>
    );
  }
}
export default Dashboard;
