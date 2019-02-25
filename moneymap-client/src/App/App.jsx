import React, { Component } from "react";
import "./App.css";
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import { Switch, Route } from "react-router-dom";
import withAuth from "../AuthService/WithAuth";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

// export default App;
export default withAuth(App);
