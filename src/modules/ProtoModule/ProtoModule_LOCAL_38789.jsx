import React, { Component } from "react";
import "./ProtoStyle.css";

class ProtoModule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1 className="header">This is the ProtoModule!</h1>
        <p>Copy/Paste this folder and create your own stuff!</p>
      </div>
    );
  }
}

export default ProtoModule;
