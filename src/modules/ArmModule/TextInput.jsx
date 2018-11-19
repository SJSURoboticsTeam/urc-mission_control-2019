import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon } from "reactstrap";
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

  handleXHR = (param) => {
    if (param === "rotunda") {
      //what data to send?
      sendXHR("localhost:5000", `set_${param}`, /*"data",*/(res) => {
        res = JSON.parse(res);
        console.log(`result: ${res.message}`);
      });
    }
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("SQUAD " + e.target.id);
      this.handleXHR(e.target.id);
    }
  }

  render() {
    return (
      <div id="controls">
        {this.state.inputs.map((input) => {
          return (
            <InputGroup key={input.value}>
              <InputGroupAddon key={input.value} addonType="append">
                {input.name}
              </InputGroupAddon>
              <Input
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                id={input.value}
                placeholder="Input Servo Here..."
              />
            </InputGroup>
          );
        })}
      </div>
    );
  }
}

export default SliderView;
