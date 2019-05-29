import React, { Component } from "react";
import "./MastStyle.css";
import {
  Button,
  ButtonGroup,
  Col,
  Row
} from "reactstrap";
import sendXHR from "../../lib/sendXHR";

class MastModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectIP: "0",
      inputToggled: false,
      buttons: [
        { name: "up", id: 1 },
        { name: "center", id: 0 },
        { name: "down", id: 2 }
      ],
      powerLabel: "off"
    };
  }
  onPress = (e) => {
    sendXHR(this.state.connectIP, "pitch_update", { mode: "manual", manual_move: e.target.id }, (res) => {
      console.log(`result: ${res}`);
    });
  };
  sendIMU = (e) => {
    if (e.which === 13) {
      sendXHR(this.state.connectIP, "imu_update", {imu_mode: e.target.value}, (res) => {
        console.log(`result: ${res}`);
      });
    }
  };
  onPressTogglePower = (e) => {
    let powerLabel = this.state.powerLabel === "off" ? "on" : "off";
    sendXHR(this.state.connectIP, "pitch_update", { mode: powerLabel });
    this.setState({ powerLabel });
  };
  toggleInput = () => {
    this.setState({
      inputToggled: !this.state.inputToggled
    })
  };
  connectESP = (e) => {
    if (e.which === 13) {
      this.setState(
        {
          connectIP: e.target.value,
        }
      , (res) => {
        console.log(`Successfully connected to ${this.state.connectIP}`);
      });

    }
  };
  render() {
    return (
      <div>
        <div
          className="mast-button-container"
        >
          <ButtonGroup
            className="mast-button-group"
          >
            {this.state.buttons.map((button) => {
              return (
                <Button
                  key={button.id}
                  id={button.id}
                  className="mast-button"
                  onClick={this.onPress}
                >
                  {button.name}
                </Button>
              );
            })}
          </ButtonGroup>
          <br></br>
          <Button
            key="3"
            id="3"
            className="mast-stop-btn"
            color="danger"
            onClick={this.onPress}
          >
            Stop
          </Button>
        </div>

        <Row>
        <span className="input-group-text">
            Enter ESP
          </span>
        <input
            onKeyDown={this.connectESP}
        >
        </input>
        <Col>
          <Button
            key="togglePowerGimbal"
            onClick={this.onPressTogglePower}
          >
            Toggle Gimbal Power
          </Button>
        </Col>
        </Row>
        <Row>
          <span className="input-group-text">
            Enter IMU
          </span>
          <input
            key="imuInput"
            onKeyDown={this.sendIMU}
          >
          </input>
        </Row>
      </div>
    );
  }
}

export default MastModule;
