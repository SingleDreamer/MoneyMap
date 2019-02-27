import React, { Component } from "react";
import CardArray from "../Components/CardArray/CardArray.js"
import Sidebar from "../Components/Sidebar/Sidebar.js"
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
    //When the Add JOC button is clicked it adds 'Uber' the the company list currently in the state
    //using the spread operator. Just for tesing purposes, will be reworked.
    let updateCompanies = () =>{
      this.setState({
        companies: [...this.state.companies, 'Uber']
      })
    }

    return (
      <div className = 'Dashboard'>
        {/*Need to tuen this into a component to update depending on the currently logged in user's info */}
        <Sidebar className = 'Sidebar'/>
        <Button className = 'AddJOC' onClick = {()=>updateCompanies()}>Add New JOC</Button>
        {/*When this.state.companies changes with the addJOC button the state is mutated which causes new props to be passed and rerenders the CARDARRAY*/}
        <CardArray companies = {this.state.companies}/>
      </div>
    );
  }
}
export default Dashboard;
