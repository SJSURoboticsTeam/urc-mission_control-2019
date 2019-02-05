import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon } from "reactstrap";
import Presets from "./Presets";
import IPSet from "./IPSet";
import sendXHR from "../../lib/sendXHR";
import "./ArmStyle.css";

class SliderView extends Component {
  state = {
    inputs: [
      { name: "Rotunda", value: "rotunda" },
      { name: "Shoulder", value: "shoulder" },
      { name: "Wrist", value: "wrist" }
    ],
    rotunda: 0,
    shoulder: 0,
    wrist: 0
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value);
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("SQUAD " + e.target.id);
      this.props.handleXHR(`set_${e.target.id}`, { angle: e.target.value });
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
                  id={input.value}
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
