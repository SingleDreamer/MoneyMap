import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import axios from "axios";


let cities = [];
var coordinates = [];


class DashboardMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height,
      companies: [],
      cities:[]
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      companies: nextProps.companies
    });
    //console.log("array: ", this.state.companies);
  }

  componentWillMount() {
    axios
      .get("http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/cities")
      .then(response => {
        // handle success
        let citiesObjects = response.data.recordset;
        //This is for the form to be able to render the city
        //let
        cities = citiesObjects.map(city => {
          return {
            value: city.CityID,
            label: city.City + ", " + city.Country,
            latitude: city.Latitude,
            longitude: city.Longitude
          };
        });

        console.log(cities);
        this.setState(
          { cities: cities }
        );


      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    let coordinates = [
      { lat: 40.7128, lng: -73.935242, rfs: -75 },
      { lat: 38, lng: -70, rfs: -3 }
    ];

    console.log("TEST",this.state.companies);
    var cityIDs = [];
    cityIDs = this.state.companies.map((company, index) => {
      return {
        cityid : company.joccityid,
        rfs : company.jocrfc
      };
    });
    console.log(cityIDs);
    console.log(this.state.cities);

    if((this.state.cities).length > 0) {
      coordinates = cityIDs.map(id => {
            var city = (this.state.cities).find(element => element.value === id.cityid);
            console.log("test");
            console.log(city);
            return {
                lat: city.latitude,
                lng: city.longitude,
                rfs: id.rfs
            };
          });
      console.log(coordinates);
  };

    let MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          className="Map"
          defaultZoom={6}
          defaultCenter={{ lat: 40.7128, lng: -73.935242 }}
        >
          {coordinates.map(i => {
            if (i.rfs >= 50)
              return (
                <Marker
                  icon={{
                    url:
                      "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  }}
                  position={{ lat: i.lat, lng: i.lng }}
                />
              );
            if (i.rfs < 50 && i.rfs >= 0)
              return (
                <Marker
                  icon={{
                    url:
                      "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                  }}
                  position={{ lat: i.lat, lng: i.lng }}
                />
              );
            if (i.rfs < 0 && i.rfs >= -50)
              return (
                <Marker
                  icon={{
                    url:
                      "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                  }}
                  position={{ lat: i.lat, lng: i.lng }}
                />
              );
            return (
              <Marker
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }}
                position={{ lat: i.lat, lng: i.lng }}
              />
            );
          })}
        </GoogleMap>
      ))
    );

    // need to make it so it changes when window size changes?
    return (
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBri0VnZME5FkDLJrfYRrqAky6qy5JNXxo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              style={{
                height: window.innerHeight * 0.4 + "px",
                width: "80vw",
                marginLeft: "10vw",
                marginTop: "20px"
              }}
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default DashboardMap;
