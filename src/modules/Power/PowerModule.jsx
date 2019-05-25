import React, { Component } from "react";
import "./PowerStyle.css";

class ProtoModule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="power">
        <p>Nhat is tasked with power module</p>
        <p>Control:</p>
        <ul>
          <li>Main Power on/off</li>
          <li>Individual Component Power on/off</li>
        </ul>
        <p>Feedback:</p>
        <ul>
          <li>Current Levels of Individual Output Channels</li>
          <li>Battery Voltage</li>
        </ul>
      </div>
    );
  }
}

export default ProtoModule;
