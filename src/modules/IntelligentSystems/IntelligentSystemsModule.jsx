import React, { Component } from "react";
import { Row, Col, Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import sendXHR from "../../lib/sendXHR";
import "./IntelligentSystemsStyle.css";


class IntelligentSystemsModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esp_ip: null,
      autonomy_state: false,
      event_source: null
    };

    /*
      In the functions below, if you try to use the state variable
      (e.g. this.state.esp_ip), it will have no idea what you're 
      talking about.  
    */

    this.toggleAutonomy = this.toggleAutonomy.bind(this);
    this.connect = this.connect.bind(this);
    this.setupSSE = this.setupSSE.bind(this);
    this.onTimestampEvent = this.onTimestampEvent.bind(this);
    this.onHeadingEvent = this.onHeadingEvent.bind(this);
  }

  //Invoked when the radio button is clicked
  toggleAutonomy() {
    //Verify that the user has already connected to a server.
    if (this.state.esp_ip === null) {
      this.printToConsole("Error. Not connected to an ESP!");

      let radio_button = document.getElementById("toggle-autonomy");
      radio_button.checked = !radio_button.checked;
      return;
    }

    //toggle autonomy state.
    this.setState({
      autonomy_state: !this.state.autonomy_state
    });

    /*
      send XHR to /toggle_autonomy endpoint.
      see missioncontrol2019/mock_server/systems/intelligent_systems.js
      to see how this is handled
    */
    sendXHR(this.state.esp_ip, "toggle_autonomy", {}, (res, url) => {
      let res_obj = JSON.parse(res);
      this.printToConsole(`URL: ${url}`);
      this.printToConsole(res_obj.message);
    });
  }

  // simple ternary operatory
  stateToText(state_bool) {
    return (state_bool ? "ON" : "OFF");
  }

  //establishes event source with ip address in the corresponding input box
  connect() {
    let esp_ip_address = document.getElementById("esp-ip-address").value;
    this.setState(
      //first parameter of setState is an obj with state values you'd like updated
      {
        esp_ip: document.getElementById("esp-ip-address").value,
        event_source: new EventSource(`http://${esp_ip_address}/sse`)
      },

      /* 
        this second parameter is the callback function you want to invoke after
        the state has been updated. If you instead just try to call the function
        after setState() without doing this, the state object may not be updated
        in time, causing for some wonkiness.
      */
      this.setupSSE.bind(this)
    );
  }

  /*
    Does 2 things
    1. Event handlers onopen/onclose. What do we do when we open/close 
    2. Custom Event listeners. You make one of these for each event the ESP might
      throw at you. This example only has the timestamp event though.
  */
  setupSSE() {
    //Copy event source, add event onOpen/Close, listeners, call setState()
    let event_source = Object.assign(this.state.event_source);
    event_source.onopen = () => {
      this.printToConsole("Event Source Added!");
    };

    event_source.onerror = () => {
      event_source.close();
      event_source = null;
      this.printToConsole("Event Source Closed.");
    };

    event_source.addEventListener("timestamp", this.onTimestampEvent);
    event_source.addEventListener("getHeading", this.onTimestampEvent);

    this.setState({ event_source });
  }

  // Adds strings to the textarea element in my module
  printToConsole(string_out) {
    let text_console = document.getElementById("console");
    text_console.value += `${string_out} \n`;
  }

  /* 
    Event handler called every time the sever sends throws 'timestamp' event
    This happens every 1000ms. see 
    missioncontrol2019/mock_server/systems/intelligent_systems.js
    to see how this works.
  */
  onTimestampEvent(evt) {
    let timestamp = JSON.parse(evt.data).timestamp;
    this.printToConsole(`Time: ${timestamp}`);
    console.log(this.state);
  }

  onHeadingEvent(evt) {
    let heading = JSON.parse(evt.data);
    this.printToConsole(`Heading: ${heading}`);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1>Intelligent Systems</h1>
        <h2>Communication</h2>
        <InputGroup>
          <InputGroupAddon addOnType="prepend">ESP IP Address + Port</InputGroupAddon>
          <Input id="esp-ip-address" addonType="prepend append"></Input>
          <InputGroupAddon addOnType="append"><Button onClick={this.connect} color="primary">Connect</Button></InputGroupAddon>
        </InputGroup>
        <Row>
          <Col>
            <h2>Autonomy is {this.stateToText(this.state.autonomy_state)}</h2>
            <span>Toggle Autonomy: <input type="radio" id="toggle-autonomy" onClick={this.toggleAutonomy} /></span>
          </Col>
          <Col>
            <h2>Console</h2>
            <textarea id="console"></textarea>
          </Col>
        </Row>
      </div>
    );
  }
}

export default IntelligentSystemsModule;
