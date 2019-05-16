import React, { Component } from "react";
import { Modal, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "@material/react-drawer/dist/drawer.css";
import Navbar from "react-bootstrap/Navbar";
import Preferences from "../PreferencesWorksheet/PreferencesWorksheet";
import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { showPrefs: false };
    this.handleClose = this.handleClose.bind(this);
  }

  clearSession = () => {
    this.props.history.replace("/");
    sessionStorage.clear();
  };

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     userInfo: nextProps.user
  //   });
  // }
  handleShowPrefs = () => {
    this.setState({ showPrefs: true });
  };
  handleClose() {
    this.setState({
      showPrefs: false
    });
  }

  render() {
    return (
      <div>
        <Navbar className="justify-content-between">
          <i className="fas fa-map-signs navIcon" onClick={this.toggleDrawer} />
          <div className="title">Money Map</div>
          <ButtonGroup>
            <Button variant="primary" onClick={this.handleShowPrefs}>
              Edit Basket of Goods
            </Button>
            <Button variant="danger" onClick={this.clearSession}>
              Log Out
            </Button>
          </ButtonGroup>
        </Navbar>
        <Modal size="lg" show={this.state.showPrefs} onHide={this.handleClose}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Edit Basket of Goods</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>
                Add your estimated monthly amounts for each Cardtegory in order
                to get a more accurate report. If a field is left blank we will
                use the averages for that city.
              </strong>
            </p>
            <Preferences
              items={this.props.items}
              profCity={this.props.profCity}
              profilePrefs={this.props.profilePrefs}
              close={this.handleClose}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default withRouter(Sidebar);
