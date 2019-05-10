import React, { Component } from "react";
import JobOfferDetails from "./JobOfferDetails/JobOfferDetails";
import AuthService from "../../AuthService/AuthService";
import axios from "axios";

class JobOfferCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      uid: sessionStorage.getItem("user"),
      name: "",
      cityid: 0,
      image: "",
      Components: {
        Income: {
          cdesc: "Income",
          camt: 0,
          ctype: 1
        },
        "Mandatory Costs": {
          cdesc: "Mandatory Costs",
          camt: 0,
          ctype: 2
        },
        "Consumable Costs": {
          cdesc: "Consumable Costs",
          camt: 0,
          ctype: 3
        },
        "Entertainment Expenses": {
          cdesc: "Entertainment Expenses",
          camt: 0,
          ctype: 4
        },
        Debt: {
          cdesc: "Debt",
          camt: 0,
          ctype: 5
        }
      },
      cityAvgs: {},
      profSubmit: false,
      edit: false,
      submit: false,
      error: null
    };
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      profSubmit: nextProps.profSubmit
    });
  }
  render() {
    const { name, cityid, image, Components } = this.state;
    const values = { name, cityid, image, Components };

    return (
      <JobOfferDetails
        handleChange={this.handleChange}
        handleCitySelection={this.handleCitySelection}
        handleSubmit={this.handleSubmit}
        values={values}
        cityid={this.state.cityid}
      />
    );
  }

  handleCitySelection = cityid => {
    this.setState({
      cityid: cityid
    });
    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };

    axios
      .get(
        `http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/${sessionStorage.getItem(
          "user"
        )}/preferences/costs/${cityid}`,
        config
      )
      .then(response => {
        let avgs = response.data.recordset;
        this.setState({
          cityAvgs: avgs
        });
        if (avgs.length === 0) {
          this.setState({
            ...this.state,
            Components: {
              ...this.state.Components,
              "Mandatory Costs": {
                ...this.state.Components["Mandatory Costs"],
                camt: 0
              },
              "Consumable Costs": {
                ...this.state.Components["Consumable Costs"],
                camt: 0
              },
              "Entertainment Expenses": {
                ...this.state.Components["Entertainment Expenses"],
                camt: 0
              }
            }
          });
        } else {
          for (var i = 0; i < this.state.cityAvgs.length; i++) {
            if (this.state.cityAvgs[i].ComponentTypeID === 2) {
              this.setState({
                ...this.state,
                Components: {
                  ...this.state.Components,
                  "Mandatory Costs": {
                    ...this.state.Components["Mandatory Costs"],
                    camt: Math.round(this.state.cityAvgs[i].Cost)
                  }
                }
              });
              break;
            }
          }
          for (var j = 0; j < this.state.cityAvgs.length; j++) {
            if (this.state.cityAvgs[j].ComponentTypeID === 3) {
              this.setState({
                ...this.state,
                Components: {
                  ...this.state.Components,
                  "Consumable Costs": {
                    ...this.state.Components["Consumable Costs"],
                    camt: Math.round(this.state.cityAvgs[j].Cost)
                  }
                }
              });
              break;
            }
          }
          for (var k = 0; k < this.state.cityAvgs.length; k++) {
            if (this.state.cityAvgs[k].ComponentTypeID === 4) {
              this.setState({
                ...this.state,
                Components: {
                  ...this.state.Components,
                  "Entertainment Expenses": {
                    ...this.state.Components["Entertainment Expenses"],
                    camt: Math.round(this.state.cityAvgs[k].Cost)
                  }
                }
              });
              break;
            }
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = (input, input2, input3) => event => {
    if (!!input2 && !!this.state.Components[input2]) {
      this.setState({
        ...this.state,
        Components: {
          ...this.state.Components,
          [input2]: {
            cdesc: input2,
            camt: event.target.value,
            ctype: input3
          }
        }
      });
    } else if (!!input2) {
      this.setState({
        ...this.state,
        Components: {
          ...this.state.Components,
          [input2]: {
            ...this.state.Components[input2],
            cdesc: input2,
            camt: event.target.value,
            ctype: input3
          }
        }
      });
    } else {
      this.setState({ ...this.state, [input]: event.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.edit === false) {
      this.props.handleClose();
      return this.sendRequest();
    } else {
      this.props.handleCloseModal();
      return this.editJoc();
    }
  };

  editJoc = () => {
    const { name, cityid, image, Components } = this.state;
    let body = [];
    for (var key in Components) {
      body.push(Components[key]);
    }
    const components = body.map(component => {
      return {
        ...component
      };
    });
    let payload = { name, cityid, image, components };
    console.log("body: ", payload);
    let url =
      "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/" +
      this.props.jocid;

    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios.post(url, payload, config).then(res => console.log(res));
  };

  sendRequest = () => {
    let url =
      "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc";

    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };

    const { uid, name, cityid, image, Components } = this.state;
    let payload1 = { uid, name, cityid, image };

    let body = [];
    for (var key in Components) {
      body.push(Components[key]);
    }
    try {
      axios
        .post(url, payload1, config)
        .then(response => {
          console.log("Response: ", response.data);
          let url2 =
            "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/" +
            response.data.JobOfferCardID +
            "/components";
          const body2 = body.map(component => {
            return { ...component, JobOfferCardID: response.data };
          });

          axios
            .post(url2, body2, config)
            .then(response2 => {
              this.props.getCards("Created New Profile");
            })
            .catch(err => {
              this.setState({ error: err });
              console.log("Error1: ", err);
            });
        })
        .catch(err => {
          this.setState({ error: err });
          console.log("Error2: ", err);
        });
    } catch (err) {
      this.setState({ error: err });
      console.log(err);
    }
  };
}

export default JobOfferCard;
