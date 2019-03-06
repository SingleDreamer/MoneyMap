import React, { Component } from "react";
import JobOfferDetails from "./JobOfferDetails/JobOfferDetails";
import JobOfferDetails2 from "./JobOfferDetails/JobOfferDetails2";
import { Form } from "react-bootstrap";
import { axios } from "axios";

class JobOfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      UID: 1,
      JOCName: "",
      CityID: 1,
      CardImageSrc: "",
      Components: {},
      submit: false,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
  }
  // 1	Income
  // 2	Mandatory Costs
  // 3	Consumable Costs
  // 4	Entertainment Expenses
  // 5	Debt

  /*POST
/JOC_creation
Body
{
	UID: (1) for now
	JOCName: (max 50 chars)
	CityID: (1) for now
	CardImageSrc: “” (empty string for now)
}
Return 
{
	JobOfferCardID
}
 */

  /*POST
/JOC_creation
Body
{
	UID: (1) for now
	JOCName: (max 50 chars)
	CityID: (1) for now
	CardImageSrc: “” (empty string for now)
}
Return 
{
	JobOfferCardID
}
 */

  render() {
    const { step } = this.state;

    let success;
    if (
      this.state.submit === true &&
      !this.state.error &&
      this.state.page === 2
    ) {
      //add other checks for post response
      success = (
        <h6 style={{ marginTop: "10px" }}>
          JobOfferCard Successfully created.!
        </h6>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        {" "}
        <p>Step {step} </p>
        {this.renderSwitch(step)}
        {success}
      </Form>
    );
  }

  renderSwitch(step) {
    switch (step) {
      case 1:
        return (
          <JobOfferDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            JOCName={this.state.JOCName}
            CityID={this.state.CityID}
            Components={this.state.Components}
          />
        );
      case 2:
        return (
          <JobOfferDetails2
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            Components={this.state.Components}
          />
        );
      default:
        return;
    }
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = (input, input2, input3) => event => {
    if (!!input2) {
      this.setState({
        ...this.state,
        Components: {
          ...this.state.Components,
          [input2]: {
            ...this.state.Components[input2],
            ComponentDescription: input2,
            ComponentAmount: event.target.value,
            ComponentTypeID: input3
          }
        }
      });
    } else {
      this.setState({ ...this.state, [input]: event.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleClose();
    this.setState({
      submit: true
    });
    console.log("Components: ", this.state.Components);
    let validation = this.checkInput();
    if (validation) {
      alert(validation.errMsg);
      return;
    }

    return this.sendRequest();
  };

  sendRequest() {
    let url = "http://localhost:8080/JOC_creation";
    let url2 = "http://localhost:8080/JOC_components";

    let config = {
      headers: {
        // Authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    const { UID, JOCName, CityID, CardImageSrc, Components } = this.state;
    let payload1 = { UID, JOCName, CityID, CardImageSrc };

    console.log("Payload1: ", payload1);
    let body = [];
    for (var key in Components) {
      body.push(Components[key]);
    }
    console.log("bodyy: ", body);
    try {
      axios
        .post(url, payload1, config)
        .then(response => {
          //something something response something
          console.log("Response: ", response);
          const body2 = body.map(component => {
            return { ...component, JobOfferCardID: response.data };
          });
          console.log("bodyy2: ", body2);

          axios
            .post(url2, body2, config)
            .then(response2 => {
              //something something response something
              console.log(response2);
              alert(`Successfully submitted`);
            })
            .catch(err => {
              this.setState({ error: err });
              //   console.log("####");
              console.log("Error1: ", err);
              //   alert(`Ya got an error boy reponse2 \n
              // ${err}`);
            });
        })
        .catch(err => {
          this.setState({ error: err });
          //   console.log("####");
          console.log("Error2: ", err);
          //   alert(`Ya got an error boy \n
          // ${err}`);
        });
    } catch (err) {
      this.setState({ error: err });
      console.log("####");
      console.log(err);
      // alert(`Ya got an error boy \n
      // ${err}`);
    }
  }

  checkInput = () => {
    // let inputs = [
    //   { field: "joc_creation.JOCName", errMsg: "Please enter a name" },
    //   {
    //     field: "location",
    //     errMsg: "Please enter location"
    //   },
    //   { field: "income", errMsg: "Please enter your income" }
    // ];
    // for (let input of inputs) {
    //   if (!this.state[input.field]) return input;
    // }
    // return null;
  };
}

export default JobOfferCard;
