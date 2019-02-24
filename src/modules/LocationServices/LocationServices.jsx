import L from 'leaflet';
import React, { Component } from "react";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import {
  Button,
  Container,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

// css
import "leaflet/dist/leaflet.css";
import "./LocationServicesStyle.css";

//random stuff to get markers to work.
import icon from "leaflet/dist/images/marker-icon.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class LocationServicesModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 15,
      markers: [
        L.latLng(37.337064, -121.881747)
      ]
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
    }
    this.addMarker(e);
  }

  addMarker = (e) => {
    let markers_tmp = this.state.markers;

    // Add new marker to state
    markers_tmp.push(e.latlng);
    this.setState({
      markers: markers_tmp 
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

  render() {
    const position = this.state.markers[0];
    return (
      <Container className="container">
        <Col className="col-7">
          <Row className="row-7">
            <Map 
              onClick={this.addMarker}
              className="map-container" 
              center={position} 
              zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
      </Container>
    );
  }
}

export default LocationServicesModule;
