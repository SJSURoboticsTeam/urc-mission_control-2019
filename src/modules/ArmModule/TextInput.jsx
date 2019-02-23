import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Col } from "reactstrap";
import "./ArmStyle.css";

class SliderView extends Component {
  state = {
    armInputs: ["Rotunda", "Elbow", "Shoulder"],
    wristInputs: [
      { name: "Dimension", id: "wrist", type: "" },
      { name: "Delta", id: "wrist", type: "" },
    ]
  };

  handleKeyPress = (e) => {
    let jeff = `${e.target.name}Target`;
    if (e.key === "Enter") {
      this.props.handleXHR({ [jeff]: e.target.value });
    }
  }

  render() {
    return (
      <div id="controls">
          <Col>
            {this.state.armInputs.map((input) => {
              return (
                <React.Fragment key={input}>
                  <InputGroup key={input}>
                    <InputGroupAddon key={input} addonType="append">
                      {input}
                    </InputGroupAddon>
                    <Input
                      onKeyPress={this.handleKeyPress}
                      id={input}
                      name={input}
                      type="number"
                      step="0.01"
                      placeholder="Input Value Here..."
                    />
                  </InputGroup>
                </React.Fragment>
              );
            })}
          </Col>
      </div>
    );
  }
}

export default SliderView;
