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
    this.state = { height: props.height };
  }

  render() {
    let coordinates = [{ lat: 40.7128, lng: -73.935242, rfs: -75 }];
    let MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          className="Map"
          defaultZoom={6}
          defaultCenter={{ lat: 40.7128, lng: -73.935242 }}
        >
          {coordinates.map((i, index) => {
            if (i.rfs >= 50)
              return (
                <Marker
                  key={index}
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
                  key={index}
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
                  key={index}
                  icon={{
                    url:
                      "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                  }}
                  position={{ lat: i.lat, lng: i.lng }}
                />
              );
            return (
              <Marker
                key={index}
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
      <div className="map">
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBri0VnZME5FkDLJrfYRrqAky6qy5JNXxo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              style={{
                height: window.innerHeight * 0.45 + "px",
                marginTop: "20px",
                width: "80vw"
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
