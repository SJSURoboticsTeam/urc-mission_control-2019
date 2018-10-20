import React, { Component } from "react";
import "./CindyStyle.css";

class CindyModule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1 className="header">This is the CindyModule!</h1>
        <p>Copy/Paste this folder and create your own stuff!</p>
      </div>
    );
  }
}

export default CindyModule;
