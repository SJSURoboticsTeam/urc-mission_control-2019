import React, { Component } from "react";
import TextInput from "./TextInput";
import sendXHR from "../../lib/sendXHR";
import { Container } from "reactstrap";
import IPSet from "./IPSet";

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
    console.log(this.state.espIP);
    console.log(data);
    sendXHR(this.state.espIP, "Arm", data, (res) => {
      res = JSON.parse(res);
      console.log(`result: ${res.message}`);
    });
  }

  setIP = (val) => {
    console.log(val);
    this.setState({
      espIP: val
    }, console.log("\n\nlaskjdfasljk\n\n"))
  }

  toggle = () => {
    this.setState({
      ipSetOpen: !this.state.ipSetOpen
    });
  };

  displayIP = () => {
    if (this.state.espIP && !this.state.ipSetOpen) {
      return <h5 style={{ display: "inline", padding: "5px" }}>Current ESP IP: {this.state.espIP} </h5>
    } else {
      return <React.Fragment />
    }
  }

  renderInput = () => {
    if (!this.state.ipSetOpen) {
      return <TextInput handleXHR={this.handleXHR} />;
    } else {
      return <React.Fragment />
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
