import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import sendXHR from "../../lib/sendXHR";
import "./XHRTestStyle.css";

class XHRTestModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key_value_pair_count: 1,
      value_data_types: []
    };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.generateRadioButtons = this.generateRadioButtons.bind(this)
    this.generateKeyOrValueInputs = this.generateKeyOrValueInputs.bind(this);
    this.addKeyValuePair = this.addKeyValuePair.bind(this);
    this.getKeyValuePairs = this.getKeyValuePairs.bind(this);
    this.onXHRSend = this.onXHRSend.bind(this);
  }

  // Adds strings to the textarea element in my module
  printToConsole(string_out) {
    let text_console = document.getElementById("console");
    text_console.value += `${string_out} \n`;
  }

  /* 
    Updates value_data type, a array storing the data type of each value
    value_type = 1: int
    value_type = 2: string

    This data will be used when generating the object passed to sendXHR
      by formatting the key to be a string or int. Makes control systems
      easier.
  */
  onRadioBtnClick(pair_index, value_type) {
    //copy array from state, since you can't modify it directly
    let value_data_types_temp = this.state.value_data_types;
    value_data_types_temp[pair_index] = value_type;

    this.setState({
      value_data_types: value_data_types_temp
    });
  }

  /*
    is_key is a boolean. If 1, for the keys column. 
    If 0, for value column.
  */
  generateKeyOrValueInputs(is_key) {
    let input_type = (is_key ? "key" : "value");
    let input_elements = [];

    for (let i = 0; i < this.state.key_value_pair_count; i++) {
      input_elements.push(<Input placeholder={`${input_type} ${i}`} id={`${input_type}-${i}`}></Input>);
    }

    return input_elements;
  }

  //Radio buttons are used to specify if key is a int or string.
  generateRadioButtons() {
    let radio_button_elements = [];

    for (let i = 0; i < this.state.key_value_pair_count; i++) {
      //generate UI elements
      radio_button_elements.push(
        <Row>
          <ButtonGroup>
            <Button color="primary" onClick={() => this.onRadioBtnClick(i, 1)} active={this.state.value_data_types[i] === 1}>Int</Button>
            <Button color="primary" onClick={() => this.onRadioBtnClick(i, 2)} active={this.state.value_data_types[i] === 2}>String</Button>
          </ButtonGroup>
        </Row>
      );
    }

    return radio_button_elements;
  }

  addKeyValuePair() {
    let radio_state_temp_arr = []; //will store value of each button
    for (let i = 0; i < this.state.key_value_pair_count + 1; i++) {
      //initialize radio state arr. All values are initially int's (AKA value_data_types = 1)
      radio_state_temp_arr.push(1);
    }

    //increment # of k-v pairs in state
    this.setState({
      key_value_pair_count: this.state.key_value_pair_count + 1,
      value_data_types: radio_state_temp_arr
    });
  }

  getKeyValuePairs() {
    let return_obj = {};
    let key_temp;
    let value_temp;

    for (let i = 0; i < this.state.key_value_pair_count; i++) {
      key_temp = document.getElementById(`key-${i}`).value;
      value_temp = document.getElementById(`value-${i}`).value;

      //parseInt if value_type is specified as int, if not, leave as string
      if (this.state.value_data_types[i] === 1) {
        value_temp = parseInt(value_temp);
      }

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
      res = JSON.parse(res)
      this.printToConsole(`result: ${res.message}`);
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
          <Col>
            {this.generateRadioButtons()}
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
