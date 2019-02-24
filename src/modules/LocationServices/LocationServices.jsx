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

class LocationServicesModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -121.883081,
      lat: 37.337258,
      zoom: 15,
    };
  }
  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Container className="container">
        <Row className="row-7">
          <Map className="map-container" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
        </Row>
        <Row className="row-3">
          <InputGroup>
            <Input placeholder="Longitude"></Input>
            <Input placeholder="Latitude"></Input>
            <InputGroupAddon type="append"> <Button>Set Marker</Button> </InputGroupAddon>
          </InputGroup>
        </Row>
      </Container>
    );
  }
}

export default LocationServicesModule;
