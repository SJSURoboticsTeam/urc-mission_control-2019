import React, { Component } from "react";
import TextInput from "./TextInput";
import sendXHR from "../../lib/sendXHR";
import { Container, Row, Col } from "reactstrap";
import IPSet from "./IPSet";
import Presets from "./Presets";

class ArmModule extends Component {
  state = {
    ipSetOpen: false,
    currentModule: "nothing",
    espIP: "",
    views: [
      { name: "Set ESP IP", value: "home" },
      { name: "Input Values", value: "input" }
    ]
  };

  onChange = ((e) => {
    this.setState({
      currentModule: e.target.value
    });
  });

  handleXHR = (data) => {
    sendXHR(this.state.espIP, "Arm", data, (res) => {
      //uncomment for module testing.
      //res = JSON.parse(res);
      //console.log(`result: ${res.message}`);
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
      <Row>
          <Col>
            <TextInput handleXHR={this.handleXHR} />
          </Col>
          <Col>
            <Presets handleXHR={this.handleXHR} />
          </Col>
        </Row>
      );
    } else {
      return <React.Fragment />;
    }
  }

  render() {
    return (
      <Container>
        <h1>Arm Module</h1>
        <IPSet setIP={this.setIP} handleXHR={this.handleXHR} toggle={this.toggle} />
        {this.displayIP()}
        {this.renderInput()}
      </Container>
    );
  }
}

export default ArmModule;
