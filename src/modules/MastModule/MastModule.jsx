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
      connectIP: "192.168.10.53",
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
      // console.log(`result: ${res}`);
    });
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
        // console.log(`Successfully connected to ${this.state.connectIP}`);
      });

    }
  };
  render() {
    return (
      <div>
        <h2>ESP IP {this.state.connectIP}</h2>
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
        <Col>
        <Button
          key="togglePowerGimbal"
          onClick={this.onPressTogglePower}
          color="primary"
          className="gimbal-power-btn"
        >
          Toggle Gimbal Power
        </Button>
        </Col>
        </Row>
      </div>
    );
  }
}

export default MastModule;
