import React, { Component } from "react";
import "./DriveStyle.css";
import joystick from './joystick.js';
import {
  DM_SPIN,
  DM_CRAB,
  DM_DRIVE,
  DM_DEBUG,
  DRIVE_MODES
} from './model.js';
import { 
  Alert,
  Badge,
  Button, 
  ButtonGroup,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from "reactstrap";

class DriveModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joystick_connected: false, 
      esp_connected: false,
      drive_mode: null,
      esp_ip: "192.168.4.1",
      
      speed: 0,
      heading: 0
    };

    this.onJoystickConnect = this.onJoystickConnect.bind(this);
    this.onJoystickDisconnect = this.onJoystickDisconnect.bind(this);
    this.getDriveState = this.getDriveState.bind(this);
    this.driveModeClicked = this.driveModeClicked.bind(this);
    this.joystickButtonPressed = this.joystickButtonPressed.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);
    this.updateHeading = this.updateHeading.bind(this);
    this.updateESPIP = this.updateESPIP.bind(this);

    joystick.init(this.getDriveState, this.joystickButtonPressed, this.updateSpeed, this.updateHeading);
  }

  componentWillMount() {
    window.addEventListener("gamepadconnected", this.onJoystickConnect);
    window.addEventListener("gamepaddisconnected", this.onJoystickDisconnect);
  }

  onJoystickConnect() {
    this.setState({ 
      joystick_connected: true 
    });
  }

  onJoystickDisconnect() {
    this.setState({
      joystick_connected: false,
      drive_mode: null
    });
  }

  joystickButtonPressed(newDriveMode) {
    this.setState({
      drive_mode: newDriveMode
    });
  }

  updateSpeed(newSpeed) {
    this.setState({
      speed: newSpeed
    });
  }

  updateHeading(newHeading) {
    newHeading = (newHeading === undefined ? 0 : newHeading);

    this.setState({
      heading: newHeading
    });
  }

  getDriveState() {
    return this.state;
  }

  driveModeClicked(e) {
    this.setState({
      drive_mode: parseInt(e.target.value)
    });
  }

  modeButtonColor(mode) {
    if(this.state.drive_mode != null && this.state.drive_mode === mode){
      return "primary";
    } else{
      return "secondary"
    }
  }

  renderDriveModes() {
    return (
      <ButtonGroup>
        {DRIVE_MODES.map((mode) => {
          return (
            <Button onClick={this.driveModeClicked} id={mode.id} value={mode.value} color={this.modeButtonColor(mode.value)} >{mode.name}</Button>
          );
        })}
      </ButtonGroup>
    );
  }

  renderJoystickStatus() {
    switch(this.state.joystick_connected) {
      case true:
        return <Alert color="success"> Joystick is connected! </Alert>
      case false:
        return <Alert color="danger"> Joystick is disconnected! </Alert>
    }
  }

  updateESPIP() {
    this.setState({
      esp_ip: document.getElementById("esp_ip_input").value
    });
  }

  render() {
    return (
      <div>
        <h1 className="header">Drive Module</h1>
        <Row>
            <h2>ESP IP</h2>
            <InputGroup >
              <Input id="esp_ip_input" placeholder="192.168.4.1"/>
              <InputGroupAddon addonType="append"> <Button onClick={ this.updateESPIP }>Click me</Button> </InputGroupAddon>
            </InputGroup>
        </Row>
        
        <Row>
          <Col>
            <Row>
              <h2>Mode</h2>
            </Row>
            <Row>
              { this.renderDriveModes() }
            </Row>
          </Col>
          
          <Col>
            <Row>
              <h2>Joystick Status</h2>
            </Row>
            <Row>
              { this.renderJoystickStatus() }
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <h2>Speed</h2>
            </Row>
            <Row>
              <Badge color="secondary">{this.state.speed}</Badge>
            </Row>
          </Col>

          <Col>
            <Row>
              <h2>Heading</h2>
            </Row>
            <Row>
              <Badge color="secondary">{this.state.heading}°</Badge>
            </Row>
          </Col>
          
        </Row>
        
      </div>
    );
  }
}

export default DriveModule;
