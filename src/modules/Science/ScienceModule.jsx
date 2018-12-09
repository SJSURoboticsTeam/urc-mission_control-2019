import React, { Component } from "react";
import ContainerDisplay from './ContainerDisplay';
import "./ScienceStyle.css";
import {
  Button
} from 'reactstrap';
import sendXHR from '../../lib/sendXHR';

class ScienceModule extends Component {
  state = {
    container: 0,
    connectIP: "0",
    inputToggled: false
  };
  onXHRSend = (endpoint, data) => {
    sendXHR(this.state.connectIP, endpoint, data, (res) => {
      const res_obj = JSON.parse(res);
      console.log(res_obj.message);
    }); 
  };
  toggleInput = () => {
    this.setState({
      inputToggled: !this.state.inputToggled
    })
  };
  connectESP = (e) => {
    if (e.which === 13) {
      alert(`You entered: ${this.state.connectIP}`);
    }
  };
  handleChange = (e) => {
    this.setState({
      connectIP: e.target.value
    });
  };
  handleBackButton = () => {
    this.setState(() => ({ container: 0 }));
    console.log("Back Button clicked");
  };
  handleDrillButton = () => {
    this.setState(() => ({ container: 1 }));
  };
  handleGeigerButton = () => {
    this.setState(() => ({ container: 2 }));
    console.log("Geiger Button clicked");
  };
  handlePodsButton = () => {
    this.setState(() => ({ container: 3 }));
    console.log("PODS button clicked");
  };
  handleStopAllButton = () => {
    this.onXHRSend("stop_all", {});
  };
  handlePodClick = (podId) => {
    this.onXHRSend("toggle_pod", { pod: podId });
  };
  render() {
    return (
      <React.Fragment>
        <div className="science-container">
          {/* {this.state.container === 0 &&
          <div className="alert alert-warning science-geiger-alert" role="alert">
            A geiger sensor has spiked!
          </div>
        } */}
          {/* <div className="science-header-container">
        </div> */}
          <ContainerDisplay
            connectIP={this.state.connectIP}
            container={this.state.container}
            handlePodClick={this.handlePodClick}
            handleBackButton={this.handleBackButton}
            handlePodsButton={this.handlePodsButton}
            handleDrillButton={this.handleDrillButton}
            handleGeigerButton={this.handleGeigerButton}
            handleStopAllButton={this.handleStopAllButton}
          />

        </div>
        <div
          style={{ float: "right", position: "absolute", top: 50, left: "78%" }}
        >
          <Button
            onClick={this.toggleInput}
            color="success"

          >
            Hey
          </Button>
          <div>
            {this.state.inputToggled ?
              <input
                onChange={this.handleChange}
                onKeyDown={this.connectESP}
              ></input> :
              <p>yes</p>
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ScienceModule;
