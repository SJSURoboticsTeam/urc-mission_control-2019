import React, { Component } from "react";
import "./DriveStyle.css";
import joystick from './joystick.js';
import {
  DM_SPIN,
  DM_CRAB,
  DM_DRIVE,
  DM_DEBUG
} from './model.js';
import { 
  Alert,
  Button, 
  ButtonGroup } from "reactstrap";

class DriveModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joystick_connected: false, 
      esp_connected: false,
      drive_mode: null,
      drive_modes: [ 
        {name: "Spin", id:"spin", value: DM_SPIN}, 
        {name: "Crab", id: "crab", value: DM_CRAB}, 
        {name: "Drive", id: "drive", value: DM_DRIVE},
        {name: "Debug", id: "debug", value: DM_DEBUG}
      ]
    };

    this.onJoystickConnect = this.onJoystickConnect.bind(this);
    this.onJoystickDisconnect = this.onJoystickDisconnect.bind(this);
    this.getDriveState = this.getDriveState.bind(this);
    this.driveModeClicked = this.driveModeClicked.bind(this);
    this.joystickButtonPressed = this.joystickButtonPressed.bind(this);

    joystick.init(this.getDriveState, this.joystickButtonPressed);
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
        {this.state.drive_modes.map((mode) => {
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
        { this.renderDriveModes() }
        <p>Copy/Paste this  your own stuff!</p>
      </div>
    );
  }
}

export default DriveModule;
