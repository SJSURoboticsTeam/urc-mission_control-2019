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
  ButtonGroup 
} from "reactstrap";

class DriveModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joystick_connected: false, 
      esp_connected: false,
      drive_mode: null,
      
      speed: 0
    };

    this.onJoystickConnect = this.onJoystickConnect.bind(this);
    this.onJoystickDisconnect = this.onJoystickDisconnect.bind(this);
    this.getDriveState = this.getDriveState.bind(this);
    this.driveModeClicked = this.driveModeClicked.bind(this);
    this.joystickButtonPressed = this.joystickButtonPressed.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);

    joystick.init(this.getDriveState, this.joystickButtonPressed, this.updateSpeed);
  }

  componentWillMount() {
    window.addEventListener("gamepadconnected", this.onJoystickConnect);
    window.addEventListener("gamepaddisconnected", this.onJoystickDisconnect);
  }

  onJoystickConnect() {
    this.setState({ 
      joystick_connected: true 
    });
    console.log(this.state);
  }

  onJoystickDisconnect() {
    this.setState({
      joystick_connected: false,
      drive_mode: null
    });
    console.log(this.state);
    
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

  getDriveState() {
    return this.state;
  }

  driveModeClicked(e) {
    this.setState({
      drive_mode: parseInt(e.target.value)
    })
  }

  modeButtonColor(mode) {
    if(this.state.drive_mode != null && this.state.drive_mode === mode){
      return "primary";
    }else{
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

  render() {
    return (
      <div>
        <h1 className="header">This is the DriveModule!</h1>
        { this.renderJoystickStatus() }
        <Badge color="success">{this.state.speed}</Badge>
        <br/>
        { this.renderDriveModes() }
        
      </div>
    );
  }
}

export default DriveModule;
