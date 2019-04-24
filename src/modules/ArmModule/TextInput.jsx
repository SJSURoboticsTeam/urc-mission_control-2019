import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Col, Row } from "reactstrap";
import "./ArmStyle.css";

class SliderView extends Component {
  state = {
    armInputs: ["Rotunda", "Elbow", "Shoulder"],
    wristInputs: [
      { name: "Pitch", id: "wrist" },
      { name: "Roll", id: "wrist" }
    ]
  };

  handleArmKeyPress = (e) => {
    if(e.key === "Enter") {
      if(e.target.id !== "wrist") {
        let jeff = `${e.target.name}Target`;
        this.props.handleXHR({ [jeff]: e.target.value });
        console.log(`${jeff} = ${e.target.value}`)
      } else {
        let jeff = `Wrist${e.target.name}`;
        this.props.handleXHR({ [jeff]: e.target.value });
        console.log(`${jeff} = ${e.target.value}`)
      }
    }
  }

  render() {
    return (
      <div id="controls">
        <Row>
          <Col>
            <p>Arm Inputs</p>
              {this.state.armInputs.map((input) => {
                return (
                  <React.Fragment key={input}>
                    <InputGroup key={input}>
                      <InputGroupAddon key={input} addonType="append">
                        {input}
                      </InputGroupAddon>
                      <Input
                        onKeyPress={this.handleArmKeyPress}
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
          <Col>
          <p>Wrist Inputs</p>
            {this.state.wristInputs.map((input) => {
              return (
                <React.Fragment key={input.name}>
                  <InputGroup key={input.name}>
                    <InputGroupAddon key={input} addonType="append">
                      {input.name}
                    </InputGroupAddon>
                    <Input
                      onKeyPress={this.handleArmKeyPress}
                      id="wrist"
                      name={input.name}
                      type="number"
                      step="0.01"
                      placeholder="Input Value Here..."
                    />
                  </InputGroup>
                </React.Fragment>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SliderView;
