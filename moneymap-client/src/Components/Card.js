import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.props.info}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary" onClick={this.handleShow}>
              Go somewhere
            </Button>
          </Card.Body>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton={false}>
              <Modal.Title>{this.props.info}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Info</Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Card>
      </div>
    );
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }
}
export default CardArray;
