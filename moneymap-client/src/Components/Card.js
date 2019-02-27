import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
		<Card style={{ width: '18rem' }}>
		  <Card.Body>
		    <Card.Title>{this.props.info}</Card.Title>
		    <Card.Text>
		      Some quick example text to build on the card title and make up the bulk of
		      the card's content.
		    </Card.Text>
		    <Button variant="primary">Go somewhere</Button>
		  </Card.Body>
		</Card>
      </div>
    );
  }
}
export default CardArray;




