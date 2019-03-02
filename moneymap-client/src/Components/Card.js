import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currModal: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
            <Button
              variant="primary"
              onClick={e => this.openModal(e, this.props.key)}
            >
              Go somewhere
            </Button>
          </Card.Body>

          <Modal
            id={this.props.key}
            show={this.state.currModal === this.props.key}
            onHide={this.closeModal}
          >
            <Modal.Header closeButton={false}>
              <Modal.Title>{this.props.info}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Info</Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Card>
      </div>
    );
  }

  openModal(e, index) {
    this.setState({ currModal: index });
  }

  closeModal = () => {
    this.setState({ currModal: null });
  };
}
export default CardArray;
