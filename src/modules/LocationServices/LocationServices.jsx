import L from "leaflet";
import React, { Component } from "react";
import { CircleSlider } from "react-circle-slider";
import {
  IoIosRefresh
} from "react-icons/io";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import {
  Button,
  Container,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import sendXHR from "../../lib/sendXHR";

// css
import "leaflet/dist/leaflet.css";
import "./LocationServicesStyle.css";

//random stuff to get markers to work.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

class LocationServicesModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHeading: 0,
      espIP: null,
      markers: [
        L.latLng(37.337064, -121.881747)
      ],
      zoom: 15
    };
  }

  manuallyAddMarker = () => {
    let lat = document.getElementById("latitude-input").value;
    let lng = document.getElementById("longitude-input").value;

    /* 
      To avoid redudant code, create temp object that wrapts latLng coordinates
      This allows us to call addMarker, the callback used when the map is clicked.
    */
    let e = {
      latlng: L.latLng(lat, lng)
    };
    this.addMarker(e);
  }

  addMarker = (e) => {
    let markersTmp = this.state.markers;

    // Add new marker to state
    markersTmp.push(e.latlng);
    this.setState({
      markers: markersTmp 
    });

    //Populate text inputs with coordinates.
    document.getElementById("latitude-input").value = e.latlng.lat;
    document.getElementById("longitude-input").value = e.latlng.lng;
  }

  markerClicked = (e) => {
    //Populate text inputs with coordinates.
    document.getElementById("latitude-input").value = e.latlng.lat;
    document.getElementById("longitude-input").value = e.latlng.lng;
  } 
  
  requestCurrentHeading = () => {
    if (this.state.espIP === null) {
      let espIpInput = prompt("Please enter IP address of the Intelligent Systems ESP", "192.168.4.1");

      if (espIpInput === null || espIpInput === "") {
        return;
      }

      let newHeading = null;
      sendXHR(espIpInput, "request_heading", {}, (res) => {
        newHeading = res;
      });
      
      this.setState({
        espIP: espIpInput,
        currentHeading: newHeading
      });
    }
  }

  headingManuallyUpdated = (e) => {
    this.setState({
      currentHeading: e
    });
  }

  requestRoverPosition() {
    if (this.state.espIP === null) {
      let espIpInput = prompt("Please enter IP address of the Intelligent Systems ESP", "192.168.4.1");

      if (espIpInput === null || espIpInput === "") {
        return;
      }

      sendXHR(this.state.espIpInput, "getPositionalData", {}, (res) => {
        let arr = res.split(",");
        this.setState({
          rover_longitude: arr[0],
          rover_latitude: arr[1],
          gps_timestamp: arr[2]
        });
        console.log(this.state)
      });
      
      this.setState({
        espIP: espIpInput
      });
    }
  }

  render() {
    const position = this.state.markers[0];
    return (
      <Container className="container">
        <Row className="container">
          <Col className="col-7">
            <Row>
              <h2>Map</h2>  
            </Row>
            <Row>
              
              <Button onClick={this.requestRoverPosition}>Request Rover Position</Button>
            </Row>
            <Row className="row-7">
              
              <Map 
                onClick={this.addMarker}
                className="map-container" 
                center={position} 
                zoom={this.state.zoom}>
              <TileLayer
                attribution='&amp;copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {this.state.markers.map((position, idx) => 
                <Marker onClick={this.markerClicked} key={`marker-${idx}`} position={position}>
                <Popup>
                  <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                </Popup>
              </Marker>
              )}
            </Map>
            </Row>
            <Row className="row-3">
              <InputGroup>
                <Input id="latitude-input" placeholder="Latitude"></Input>
                <Input id="longitude-input" placeholder="Longitude"></Input>
                <InputGroupAddon type="append"> <Button onClick={this.manuallyAddMarker}>Set Marker</Button> </InputGroupAddon>
              </InputGroup>
            </Row>
            
          </Col>
          <Col className="col-3">
            <h2>Compass</h2>
            <Row>
              <CircleSlider 
                onChange={this.headingManuallyUpdated} 
                value={this.state.currentHeading} 
                progressColor="#e9eaee"
                max={359} 
                />
            </Row>
            <Row>
              <InputGroup>
                  <Input disabled value={this.state.currentHeading + " degrees"}></Input>
                  <InputGroupAddon type="append">
                    <Button onClick={this.requestCurrentHeading} color="warning"><IoIosRefresh/></Button>
                  </InputGroupAddon>
              </InputGroup>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LocationServicesModule;
