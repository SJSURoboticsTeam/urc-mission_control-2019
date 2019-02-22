import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Col, Row, Button, ButtonGroup } from "reactstrap";
import Presets from "./Presets";
import "./ArmStyle.css";

class SliderView extends Component {
  state = {
    armInputs: [
      { name: "Rotunda", id: "target", value: null },
      { name: "Elbow", id: "target", value: null },
      { name: "Shoulder", id: "target", value: null },
    ],
    wristInputs: [
      { name: "Dimension", id: "wrist", type: "" },
      { name: "Delta", id: "wrist", type: "" },
    ]
  };

  handleKeyPress = (e) => {
    if (e.target.id === "target") {
      let jeff = `${e.target.name}Target`;
      if (e.key === "Enter") {
        this.props.handleXHR({ [jeff]: e.target.value });
      }
    }
  }

  render() {
    return (
      <div id="controls">
        <Row>
          <Col>
            {this.state.armInputs.map((input) => {
              return (
                <React.Fragment key={input.id}>
                  <InputGroup key={input.id}>
                    <InputGroupAddon key={input.id} addonType="append">
                      {input.name}
                    </InputGroupAddon>
                    <Input
                      onKeyPress={this.handleKeyPress}
                      id={input.id}
                      name={input.name}
                      type="number"
                      step="0.01"
                      placeholder="Input Servo Here..."
                    />
                  </InputGroup>
                </React.Fragment>
              );
            })}
          </Col>
          <Col>
            <h3>Wrist</h3>
            {this.state.wristInputs.map((element) => {
              return (
                <React.Fragment key={element.id}>
                  <p>{element.name}</p>
                  <Row>
                    <ButtonGroup>
                      <Button color="primary" id={element.id} value={0} /*onClick={} active={}*/>0</Button>
                      <Button color="primary" value={1}/*onClick={} active={}*/>1</Button>
                    </ButtonGroup>
                  </Row>
                </React.Fragment>
              );
            })}
          </Col>
        </Row>
        <Presets handleXHR={this.props.handleXHR} />
      </div>
    );
  }
}

export default SliderView;
