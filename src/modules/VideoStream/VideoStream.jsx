import React, { Component } from "react";
import "./VideoStreamStyle.css";

class VideoStreamModule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1 className="header">This is the VideoStreamModule!</h1>
        <p>Copy/Paste this folder and create your own stuff!</p>
      </div>
    );
  }
}

export default VideoStreamModule;
