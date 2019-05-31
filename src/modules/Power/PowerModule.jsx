import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Row,
  Col,
  Container
} from 'reactstrap';
import RadioButtonGroup from '../Common/RadioButtonGroup';
import "./PowerStyle.css";
import sendXHR from "../../lib/sendXHR";


class ProtoModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batteries: [0, 0, 0, 0, 0],
      channels: [0, 0, 0, 0, 0],
      espIP: '192.168.10.50'
    };
  }

  buttonValUpdated = (type, index, newVal) => {
    switch(type) {
      case "output-channel":
        let channels = this.state.channels;
        channels[index - 1] = newVal
        this.setState({channels: channels});
        break;
      case "input-channel":
        let batteries = this.state.batteries;
        batteries[index - 1] = newVal;
        this.setState({batteries: batteries});
        break;
      default:
        break;
    }

    console.log(this.state)

  }

  updateControlVals = () => {
    let data = {
      input1: this.state.batteries[0],
      input2: this.state.batteries[1],
      input3: this.state.batteries[2],
      input4: this.state.batteries[3], 
      input5: this.state.batteries[4],
      output1: this.state.channels[0],
      output2: this.state.channels[1],
      output3: this.state.channels[2],
      output4: this.state.channels[3],
      output5: this.state.channels[4]
    }

    //this expects "OK" or "ERR" as its response.
    sendXHR(this.state.espIP, 'updateControlVals', data, (res) => {
      console.log(res);
      if (res.status == "OK") {
        console.log("Power Systems Update Successful");
      } else if (res.status == "ERR") {
        console.log("ERROR: Power Systems Update Unuccessful");
      } else {
        console.log(`Result: ${res}`);
      }
    });

    console.log("sending...")
  }

  getFeedbackData = () => {
    //expects an object of power feedback. not sure what to do with it yet.
    sendXHR(this.state.espIP, 'requestFeedbackData', null, (res) => {
      if (res.status == "OK") {
        this.setState({
          powerFeedback: res.obj
        });
      } else {
        alert("Error fetching power data.")
      }
    });

    console.log("fetching...");
  }

  
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h2>
              Feedback
            </h2>
            <p>Will be populated once Nate and Colin finalize what we're reading from.</p>
            <Button color="success" onClick={this.getFeedbackData}>Fetch feedback data</Button>
          </Col>
          <Col>
            <h2>
              Control
            </h2>
            <Row>
              <Col>
                <Row>
                  <RadioButtonGroup type="output-channel" channel="1" buttonValUpdated={this.buttonValUpdated}/>  1. Drive / Science
                </Row>
                <Row>
                  <RadioButtonGroup type="output-channel" channel="2" buttonValUpdated={this.buttonValUpdated}/>  2. Arm
                </Row>
                <Row>
                  <RadioButtonGroup type="output-channel" channel="3" buttonValUpdated={this.buttonValUpdated}/>  3. Motor Hub A
                </Row>
                <Row>
                  <RadioButtonGroup type="output-channel" channel="4" buttonValUpdated={this.buttonValUpdated}/>  4. Motor Hub B
                </Row>
                <Row>
                  <RadioButtonGroup type="output-channel" channel="5" buttonValUpdated={this.buttonValUpdated}/>  5. Motor Hub C
                </Row>
                
              </Col>
            </Row>
            <Row><Button onClick={this.updateControlVals} color="success">Update Values</Button></Row>

            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProtoModule;
