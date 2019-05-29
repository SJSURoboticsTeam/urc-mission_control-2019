import React, { Component } from "react";
import TextInput from "./TextInput";
import sendXHR from "../../lib/sendXHR";
import { Alert, Container, Row, Col } from "reactstrap";
import IPSet from "./IPSet";
import Presets from "./Presets";
import joystick from "../Drive/joystick";

class ArmModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipSetOpen: false,
      currentModule: "nothing",
      joystickConnected: false,
      espIP: "",
      views: [
        { name: "Set ESP IP", value: "home" },
        { name: "Input Values", value: "input" }
      ]
    };

    this.getArmState = this.getArmState.bind(this);
    joystick.initArm(this.getArmState);
  }

  onChange = ((e) => {
    this.setState({
      currentModule: e.target.value
    });
  });
  
  getArmState() {
    return this.state;
  }

  componentWillMount() {
    window.addEventListener("gamepadconnected", this.onJoystickConnect);
    window.addEventListener("gamepaddisconnected", this.onJoystickDisconnect);
  }


  onJoystickConnect = () => {
    this.setState({ 
      joystickConnected: true 
    });
  }

  onJoystickDisconnect = () => {
    this.setState({
      joystickConnected: false,
    });
  }

  getArmState = () => {
    return this.state;
  }

  handleXHR = (data) => {
    sendXHR(this.state.espIP, "Arm", data, (res) => {
      //uncomment for module testing.
      // res = JSON.parse(res);
      // console.log(`result: ${res.message}`);
    });
  }

  setIP = (val) => {
    this.setState({
      espIP: val
    });
  }

  toggle = () => {
    this.setState({
      ipSetOpen: !this.state.ipSetOpen
    });
  };

  renderJoystickStatus() {
    switch(this.state.joystickConnected) {
      case true:
        return <Alert color="success"> Joystick is connected! </Alert>;
      case false:
        return <Alert color="danger"> Joystick is disconnected! </Alert>;
      default:
        return <Alert color="primary">WHAT</Alert>;
    }
  }

  displayIP = () => {
    if (this.state.espIP && !this.state.ipSetOpen) {
      return (
        <h5 
          style={{ display: "inline", padding: "5px" }}>
          Current ESP IP: {this.state.espIP} 
        </h5>
      );
    } else {
      return <React.Fragment />;
    }
  }

  renderInput = () => {
    if (!this.state.ipSetOpen) {
      return (
        <React.Fragment>
            <Row>
              <TextInput handleXHR={this.handleXHR} />
            </Row>
            <Row>
              <Presets handleXHR={this.handleXHR} />
            </Row>
        </React.Fragment>
      );
    } else {
      return <React.Fragment />;
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>{this.renderJoystickStatus()}</Col>
        </Row>
        <IPSet setIP={this.setIP} handleXHR={this.handleXHR} toggle={this.toggle} />
        {this.displayIP()}
        {this.renderInput()}
      </Container>
    );
  }
}

export default ArmModule;
