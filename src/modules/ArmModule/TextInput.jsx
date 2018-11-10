import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon } from "reactstrap"
import "./ArmStyle.css";

class SliderView extends Component {
  state = {
    cursors: [{ name: "1", number: 0 }, { name: "2", number: 2 }]
  };

  render() {
    return (
      <div id="controls">
        <div class="input-group input-group-sm mb-3">
          <InputGroup>
            <InputGroupAddon addonType="append">Arm</InputGroupAddon>
            <Input placeholder="Input Servo Here..." />
          </InputGroup>
        </div>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="append">Shoulder</InputGroupAddon>
          <Input placeholder="Input Servo Here..." />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="append">Wrist</InputGroupAddon>
          <Input placeholder="Input Servo Here..." />
        </InputGroup>
      </div>
    );
  }
}

export default SliderView;