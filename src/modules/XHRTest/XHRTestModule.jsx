import React, { Component } from "react";
import { Row, Col, Label, Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import sendXHR from "../../lib/sendXHR";
import "./XHRTestStyle.css";

class XHRTestModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key_value_pair_count: 1
    };

    this.onXHRSend = this.onXHRSend.bind(this);
    this.addKeyValuePair = this.addKeyValuePair.bind(this);
    this.generateKeyOrValueInputs = this.generateKeyOrValueInputs.bind(this);
    this.getKeyValuePairs = this.getKeyValuePairs.bind(this);
  }

  // Adds strings to the textarea element in my module
  printToConsole(string_out) {
    let text_console = document.getElementById("console");
    text_console.value += `${string_out} \n`;
  }

  /*
    is_key is a boolean. If 1, for the keys column. 
    If 0, for value column.
  */
  generateKeyOrValueInputs(is_key) {
    let input_type = (is_key ? "key" : "value");
    let input_elements = [];

    for (let i=0; i<this.state.key_value_pair_count; i++) {
      input_elements.push(<Input placeholder={`${input_type} ${i}`} id={`${input_type}-${i}`}></Input>);
    }

    return input_elements;
  }

  addKeyValuePair() {
    this.setState({
      key_value_pair_count: this.state.key_value_pair_count + 1
    });
  }

  getKeyValuePairs() {
    let return_obj = {};
    let key_temp;
    let value_temp;

    for (let i=0; i<this.state.key_value_pair_count; i++) {
      key_temp = document.getElementById(`key-${i}`).value;
      value_temp = document.getElementById(`value-${i}`).value;
      return_obj[key_temp] = value_temp;
    }

    return return_obj;
  }

  onXHRSend() {
    if (document.getElementById("esp-ip-address").value === "") {
      this.printToConsole("ERROR: Missing ESP IP Address.");
      return;
    }

    
    let esp_ip_addr = document.getElementById("esp-ip-address").value;
    let endpoint = document.getElementById("endpoint").value;

    this.printToConsole(`Sending XHR to http://${esp_ip_addr}/${endpoint}`);

    sendXHR(esp_ip_addr, endpoint, this.getKeyValuePairs(), (res) => {
      this.printToConsole(`result: ${res}`);
    });
  }

  render() {
    return (
      <div>
        <h1 className="header">This is the XHR Test Module!</h1>
        <Row>
          <Col>
            <h2>Communication</h2>
            <InputGroup>
              <InputGroupAddon addOnType="prepend">ESP IP Address</InputGroupAddon>
              <Input id="esp-ip-address" addonType="prepend" placeholder="192.168.4.1"></Input>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addOnType="prepend">Endpoint</InputGroupAddon>
              <Input id="endpoint" addonType="prepend" placeholder="setDriveMode"></Input>
            </InputGroup>
          </Col>
          <Col>
            <h2>Console</h2>
            <textarea id="console"></textarea>    
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Data</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.generateKeyOrValueInputs(1)}
          </Col>
          <Col>
            {this.generateKeyOrValueInputs(0)}
          </Col>
        </Row>
        <Row>
          <Button onClick={this.addKeyValuePair} color="primary">Add Key-Value Pair</Button>
          <Button onClick={this.onXHRSend} color="success">Send XHR</Button>
        </Row>
      </div>
    );
  }
}

export default XHRTestModule;
