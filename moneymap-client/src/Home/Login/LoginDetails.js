import React, { Component } from "react";
import "../Home.css";
import { Form, Button } from "react-bootstrap";
import AuthService from "../../AuthService/AuthService";
import { withRouter, Redirect } from "react-router-dom";
class LoginDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submit: false,
      hasError: false,
      isAuthed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }
  componentDidMount() {
    if (this.Auth.getToken() !== null) {
      this.setState({ isAuthed: true });
    }
  }

  render() {
    if (this.state.isAuthed) {
      return <Redirect to="/Dashboard" />;
    }
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <p className="required">Required field = </p>
        <Form.Group controlId="email">
          <Form.Label className="required">Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={e => this.handleChange(e)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="required">Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
        </Form.Group>
        <Button id="newPrimary" type="submit">
          Login
        </Button>
      </Form>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.Auth.login(this.state.email, this.state.password).then(res => {
      this.setState({ isAuthed: true });
    });
    // .catch(err => {
    //   console.log(err);
    //   this.setState({ hasError: true });
    // });
  }

  // componentWillMount = () => {
  //   if (this.Auth.loggedIn()) {
  //     this.props.history.replace("/dashboard");
  //   }
  // };
}

export default withRouter(LoginDetails);
