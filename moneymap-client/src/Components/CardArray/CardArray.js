import React, { Component } from "react";
import Card from "../Card/Card.js";
import "./CardArray.css";

class CardArray extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      companies: []
    };
  }

  // Whenever the CardArray component receives new props from the Dashboard
  // it will rerender with the new list of Cards
  componentWillReceiveProps(nextProps) {
    this.setState({
      companies: nextProps.companies
    })
  }

  //   async sendRequest(() => {
  //     let url = "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/11111111-1111-1111-1111-111111111111/jocs";

  //     let config = {
  //       headers: {
  //         // Authorization: this.Auth.getToken(),
  //         "Content-Type": "application/json"
  //       }
  //     };

  //     try {
  //       let response = await axios.post(url, config);
  //       console.log("****");
  //       console.log(response);
  //       // if (response.data.message) alert(response.data.message);
  //       return response;
  //     } catch (err) {
  //       this.setState({ error: err });
  //       console.log("####");
  //       console.log(err);
  //       // alert(`Ya got an error boy \n
  //       // ${err}`);
  //   }
  // })
  // }

  render() {
    let cards = [];
    cards = this.state.companies.map((company, index) => {
      if(company.jocrfc < 100){return(
      <div key={index}>
        <Card cardType="joc" id={index} info={company} />
      </div>
      )}else{return(
      <div key={index} className = "container">
        <Card cardType="jocSelected" id={index} info={company} />
      </div>
      )}
    });

    //console.log(cards);
    return (
      <div className="array">
        {/*This will map over the list of companies and provide the data to the CARD component
          -each CARD component will recive a key, and info
          -returns the CARD component at each iteration*/}
        {cards}
      </div>
    );
  }
}
export default CardArray;
