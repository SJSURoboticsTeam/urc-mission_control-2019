import React, { Component } from "react";
import "./DriveStyle.css";
import joystick from "./joystick_new.js";
import {
  DM_DRIVE,
  BW_A,
  DRIVE_MODES,
  BACK_WHEELS
} from "./model.js";
import { 
  Alert,
  Badge,
  Button, 
  ButtonGroup,
  Col,
  Container,
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
      drive_mode: DM_DRIVE,
      back_wheel: BW_A,
      esp_ip: "192.168.4.1",
      
      speed: 0,
      heading: 0
    };

    this.onJoystickConnect = this.onJoystickConnect.bind(this);
    this.onJoystickDisconnect = this.onJoystickDisconnect.bind(this);
    this.getDriveState = this.getDriveState.bind(this);
    this.updateDriveMode = this.updateDriveMode.bind(this);
    this.driveModeClicked = this.driveModeClicked.bind(this);
    this.updateBackWheel = this.updateBackWheel.bind(this);
    this.backWheelClicked = this.backWheelClicked.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);
    this.updateHeading = this.updateHeading.bind(this);
    this.updateESPIP = this.updateESPIP.bind(this);
    this.renderBackWheelOptions = this.renderBackWheelOptions.bind(this);

    joystick.initDrive(this.getDriveState, this.updateDriveMode, this.updateBackWheel, this.updateSpeed, this.updateHeading);
  }

  componentWillMount() {
    window.addEventListener("gamepadconnected", this.onJoystickConnect);
    window.addEventListener("gamepaddisconnected", this.onJoystickDisconnect);
  }

  getDriveState() {
    return this.state;
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

  updateDriveMode(newDriveMode) {
    this.setState({
      drive_mode: newDriveMode
    });
  }

  driveModeClicked(e) {
    this.updateDriveMode( parseInt(e.target.value) );
  }
  
  updateBackWheel(newBackWheel) {
    this.setState({
      back_wheel: newBackWheel
    });
  }

  backWheelClicked(e) {
    this.updateBackWheel( parseInt(e.target.value) );
  }

  updateSpeed(newSpeed) {
    this.setState({
      speed: newSpeed
    });
  }

  updateHeading(newHeading) {
    newHeading = (typeof newHeading === "undefined" ? 0 : newHeading);

    this.setState({
      heading: newHeading
    });
  }

  decideButtonColor(current_val, state_val) {
    if(state_val != null && state_val === current_val){
      return "primary";
    } else{
      return "secondary";
    }
  }

  renderDriveModes() {
    return (
      <ButtonGroup>
        {DRIVE_MODES.map((mode) => {
          return (
            <Button 
              onClick={this.driveModeClicked} 
              id={mode.id} 
              value={mode.value} 
              color={this.decideButtonColor(mode.value, this.state.drive_mode)} 
            >
              {mode.name}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }

  renderBackWheelOptions() {
    return (
      <ButtonGroup>
        {BACK_WHEELS.map((wheel) => {
          return (
            <Button 
              onClick={this.backWheelClicked} 
              id={wheel.name} 
              value={wheel.value} 
              color={this.decideButtonColor(wheel.value, this.state.back_wheel)}
            >
              {wheel.name}
            </Button>
          );
        })}
      </ButtonGroup>
    );
    
  }

  renderJoystickStatus() {
    switch(this.state.joystick_connected) {
      case true:
        return <Alert color="success"> Joystick is connected! </Alert>;
      case false:
        return <Alert color="danger"> Joystick is disconnected! </Alert>;
      default:
        return <Alert color="primary">WHAT</Alert>;
    }
  }

  updateESPIP() {
    this.setState({
      esp_ip: document.getElementById("esp_ip_input").value
    });
  }

  render() {
    return (
      <Container>
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
              <h2>Back Wheel</h2>
            </Row>
            <Row>
              { this.renderBackWheelOptions() }
            </Row>
          </Col>
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
        
      </Container>
    );
  }
}

export default DriveModule;
