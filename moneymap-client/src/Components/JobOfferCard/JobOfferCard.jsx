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
        }
      },
      cityAvgs: {},
      profSubmit: false,
      edit: false,
      submit: false,
      monthly: false,
      error: null
    };
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.state.edit !== prevProps.edit) {
      if (prevProps.edit !== undefined) {
        this.setState({
          edit: prevProps.edit
        });
      }
    }
    if (this.state.profSubmit !== prevProps.profSubmit) {
      if (prevProps.profSubmit !== undefined) {
        this.setState({
          profSubmit: prevProps.profSubmit
        });
      }
    }
  }

  render() {
    const { name, cityid, image, Components } = this.state;
    const values = { name, cityid, image, Components };
    // console.log("or", this.state.edit, this.state.profSubmit);
    return (
      <JobOfferDetails
        handleChange={this.handleChange}
        handleMonthly={this.handleMonthly}
        handleCitySelection={this.handleCitySelection}
        handleSubmit={this.handleSubmit}
        values={values}
        cityid={this.state.cityid}
        monthly={this.state.monthly}
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
  handleMonthly = e => {
    e.preventDefault();
    this.setState(
      {
        monthly: !this.state.monthly
      },
      () => {
        this.toggle();
      }
    );
  };

  changeToMonthly = (inc, man, con, ent) => {
    this.setState({
      ...this.state,
      Components: {
        ...this.state.Components,
        Income: {
          ...this.state.Components["Income"],
          camt: inc / 12
        },
        "Mandatory Costs": {
          ...this.state.Components["Mandatory Costs"],
          camt: man /// 12
        },
        "Consumable Costs": {
          ...this.state.Components["Consumable Costs"],
          camt: con /// 12
        },
        "Entertainment Expenses": {
          ...this.state.Components["Entertainment Expenses"],
          camt: ent /// 12
        }
      }
    });
  };

  changeToYearly = (inc, man, con, ent) => {
    this.setState(
      {
        ...this.state,
        Components: {
          ...this.state.Components,
          Income: {
            ...this.state.Components["Income"],
            camt: inc * 12
          },
          "Mandatory Costs": {
            ...this.state.Components["Mandatory Costs"],
            camt: man // * 12
          },
          "Consumable Costs": {
            ...this.state.Components["Consumable Costs"],
            camt: con //* 12
          },
          "Entertainment Expenses": {
            ...this.state.Components["Entertainment Expenses"],
            camt: ent //* 12
          }
        }
      }
      // () => console.log("change to year: ", this.state.Components)
    );
  };

  toggle = () => {
    let inc = this.state.Components["Income"].camt;
    let man = this.state.Components["Mandatory Costs"].camt;
    let con = this.state.Components["Consumable Costs"].camt;
    let ent = this.state.Components["Entertainment Expenses"].camt;
    if (this.state.monthly) {
      this.changeToMonthly(inc, man, con, ent);
    } else {
      this.changeToYearly(inc, man, con, ent);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.monthly) {
      let inc = this.state.Components["Income"].camt;
      let man = this.state.Components["Mandatory Costs"].camt;
      let con = this.state.Components["Consumable Costs"].camt;
      let ent = this.state.Components["Entertainment Expenses"].camt;

      this.setState(
        {
          ...this.state,
          Components: {
            ...this.state.Components,
            Income: {
              ...this.state.Components["Income"],
              camt: inc * 12
            },
            "Mandatory Costs": {
              ...this.state.Components["Mandatory Costs"],
              camt: man
            },
            "Consumable Costs": {
              ...this.state.Components["Consumable Costs"],
              camt: con
            },
            "Entertainment Expenses": {
              ...this.state.Components["Entertainment Expenses"],
              camt: ent
            }
          }
        },
        () => {
          if (this.state.edit === false) {
            this.props.handleClose();
            return this.sendRequest();
          } else {
            this.props.handleCloseModal();
            return this.editJoc();
          }
        }
      );
    } else {
      if (this.state.edit === false) {
        this.props.handleClose();
        return this.sendRequest();
      } else {
        this.props.handleCloseModal();
        return this.editJoc();
      }
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
    //console.log("body: ", payload);
    let url =
      "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/" +
      this.props.jocid;

    let config = {
      headers: {
        authorization: this.Auth.getToken(),
        "Content-Type": "application/json"
      }
    };
    axios.post(url, payload, config);
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
          //console.log("Response: ", response.data);
          let url2 =
            "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/joc/" +
            response.data.JobOfferCardID +
            "/components";
          const body2 = body.map(component => {
            return { ...component, JobOfferCardID: response.data };
          });
          //console.log("Create JOC Components: ", body2);
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
