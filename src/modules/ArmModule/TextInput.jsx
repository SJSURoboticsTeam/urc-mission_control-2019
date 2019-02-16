import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon } from "reactstrap";
import Presets from "./Presets";
import "./ArmStyle.css";

class SliderView extends Component {
  state = {
    inputs: [
      { name: "Rotunda", value: "rotunda" },
      { name: "Elbow", value: "elbow" },
      { name: "Shoulder", value: "shoulder" },
    ],
    rotunda: 0,
    shoulder: 0,
    wrist: 0
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.handleXHR(`${e.target.id}Target`, { angle: e.target.value });
    }
  }

  render() {
    return (
      <div id="controls">
        {this.state.inputs.map((input) => {
          return (
            <React.Fragment>
              <InputGroup key={input.value}>
                <InputGroupAddon key={input.value} addonType="append">
                  {input.name}
                </InputGroupAddon>
                <Input
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  id={input.name}
                  type="number"
                  step="0.01"
                  placeholder="Input Servo Here..."
                />
              </InputGroup>
            </React.Fragment>
          );
        })}
        <Presets handleXHR={this.props.handleXHR} />
      </div>
    );
  }
}

export default SliderView;
