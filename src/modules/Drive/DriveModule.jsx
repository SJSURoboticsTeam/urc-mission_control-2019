import React, { Component } from "react";
import "./DriveStyle.css";
import { Alert } from "reactstrap";

class DriveModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joystick_connected: false
    };

    this.onJoystickConnect = this.onJoystickConnect.bind(this);
    this.onJoystickDisconnect = this.onJoystickDisconnect.bind(this);
  }

  componentWillMount() {
    alert("hey")
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
      joystick_connected: false
    });
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
        <p>Copy/Paste this  your own stuff!</p>
      </div>
    );
  }
}

export default DriveModule;
