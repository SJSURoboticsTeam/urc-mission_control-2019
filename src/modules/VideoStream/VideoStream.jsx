import React, { Component } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import {
  IoIosRefresh
} from "react-icons/io";
import {
  FaCheck,
  FaExclamationTriangle
} from "react-icons/fa"

import "./VideoStreamStyle.css";

import default_stream_src from './assets/images/default_stream_src.jpg';

class VideoStreamModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
  }

  componentDidMount = () => {
    let video_component = document.getElementById("video");
    video_component.src = default_stream_src;
  }

  updateSource = () => {
    let ip_input = document.getElementById("ip-input");
    let video_component = document.getElementById("video");
    
    if ( ip_input.value === "" ) {
      alert("ERROR: Must enter a IP address.");
      return;
    }
    
    video_component.src = ip_input.value;

    this.setState({
      src_url: ip_input.value,
      connected: true
    });
  }

  defaultSource = () => {
    alert("ERROR: Connection IP address was unsuccessful. Defaulting source.");

    let video_component = document.getElementById("video");
    video_component.src = default_stream_src;

    this.setState({
      connected: false
    });
  }

  refreshSource = () => {
    if (this.state.src_url == null) {
      alert("ERROR: Must enter video IP address first.");
      return;
    }
    let video_component = document.getElementById("video");
    video_component.src = `${this.state.src_url}?timestamp=${new Date().getTime()}`;
    
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
          <InputGroupAddon addonType="prepend" >
            Camera IP: 
          </InputGroupAddon>

          <Input id="ip-input" placeholder="192.168.4.1" />

          <InputGroupAddon addonType="append">
            <Button onClick={this.updateSource} color="success">Connect</Button>
          </InputGroupAddon>
          <InputGroupAddon addonType="append"> 
            <Button onClick={this.refreshSource} color="warning"> <IoIosRefresh/> </Button> 
          </InputGroupAddon>
        </InputGroup>
        <img onError={this.defaultSource} id="video" src="" class="img-fluid"/>
      </div>
    );
  }
}

export default VideoStreamModule;
