import React, { Component } from "react";
import Home from "../Home/Home.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withAuth from "../Components/AuthService/WithAuth.js";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
