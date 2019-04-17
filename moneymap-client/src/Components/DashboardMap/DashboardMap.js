import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class DashboardMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height,
      companies: []
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      companies: nextProps.companies
    });
    //console.log("array: ", this.state.companies);
  }

  render() {
    let coordinates = [
      { lat: 40.7128, lng: -73.935242, rfs: -75 },
      { lat: 38, lng: -70, rfs: -3 }
    ];

    console.log("TEST",this.state.companies);
    var cityIDs = [];
    cityIDs = this.state.companies.map((company, index) =>
      company.joccityid
    );
    console.log(cityIDs);


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
