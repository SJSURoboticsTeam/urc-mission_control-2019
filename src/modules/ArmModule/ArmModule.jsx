import React, { Component } from "react";
import TextInput from "./TextInput";
import sendXHR from "../../lib/sendXHR"
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
    console.log(e.target.value);
  });

  handleXHR = (endpoint, data) => {
    sendXHR("localhost:5000", endpoint, data, (res) => {
      res = JSON.parse(res);
      console.log(`result: ${res.message}`);
    });
  }

  setIP = (val) => {
    this.setState({
      espIP: val
    })
  }

  toggle = () => {
    this.setState({
      ipSetOpen: !this.state.ipSetOpen
    });
  };

  renderInput = () => {
    if (!this.state.ipSetOpen) {
      return <TextInput handleXHR={this.handleXHR} />;
    } else {
      return <React.Fragment />
    }
  }

  render() {
    return (
      <div>
        <IPSet setIP={this.setIP} handleXHR={this.handleXHR} toggle={this.toggle} />
        {this.renderInput()}
      </div>
    );
  }
}

export default ArmModule;
