import React, { Component } from "react";
import {
  Button,
  // Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import {
  IoIosRefresh
} from "react-icons/io";
import {
  FaCheck,
  FaExclamationTriangle
} from "react-icons/fa";

import "./VideoStreamStyle.css";

import defaultStreamSrc from "./assets/images/default_stream_src.jpg";

class VideoStreamModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      srcUrl: "192.168.10.60"
    };
  }

  componentDidMount = () => {
    let videComponent = document.getElementById("video");
    videComponent.src = defaultStreamSrc;
  }

  updateSource = () => {
    let videoComponent = document.getElementById("video");
    
    videoComponent.src = this.state.srcUrl;

    this.setState({
      connected: true
    });
  }

  defaultSource = () => {
    alert("ERROR: Connection IP address was unsuccessful. Defaulting source.");

    let videoComponent = document.getElementById("video");
    videoComponent.src = defaultStreamSrc;

    this.setState({
      connected: false
    });
  }

  refreshSource = () => {
    if (this.state.srcUrl == null) {
      alert("ERROR: Must enter video IP address first.");
      return;
    }
    let videoComponent = document.getElementById("video");
    videoComponent.src = `${this.state.srcUrl}?timestamp=${new Date().getTime()}`;
    
    this.setState({
      connected: true
    });
  }

  renderStatusIcon = () => {
    return (
        <Button color = {this.state.connected ? "primary" : "danger"} disabled>
          { this.state.connected ? <FaCheck /> : <FaExclamationTriangle />}
        </Button>
    );
  }

  render() {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend" >
            {this.renderStatusIcon()} 
          </InputGroupAddon>
          <InputGroupAddon addonType="append" >
            <h3 className="esp-h3">  ESP IP   {this.state.srcUrl}</h3>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button onClick={this.updateSource} color="success">Connect</Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="append"> 
            <Button onClick={this.refreshSource} color="warning"> <IoIosRefresh/> </Button> 
          </InputGroupAddon>
        </InputGroup>
        <img onError={this.defaultSource} id="video" alt="img situations" src="" className="img-fluid"/>
      </div>
    );
  }
}

export default VideoStreamModule;
