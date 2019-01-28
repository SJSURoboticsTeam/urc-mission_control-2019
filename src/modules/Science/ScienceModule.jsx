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
    inputToggled: false,
    event_source: null
  };
  onXHRSend = (endpoint, data) => {
    sendXHR(this.state.connectIP, endpoint, data, (res) => {
      const res_obj = JSON.parse(res);
      console.log(res_obj.message);
    });
  };
  setupSSE() {
    //Copy event source, add event onOpen/Close, listeners, call setState()
    let event_source = Object.assign(this.state.event_source);
    event_source.onopen = () => {
      console.log("Event Source Added!");
    };

    event_source.onerror = () => {
      event_source.close();
      event_source = null;
      console.log("Event Source Closed.");
    };

    event_source.addEventListener("executePod", this.onPodEvent);

    this.setState({ event_source });
  };
  onPodEvent(evt) {
    let podStatus = JSON.parse(evt.data).podStatus;
    console.log(`Pod Status: ${podStatus}`);
    console.log(this.state);
  };
  toggleInput = () => {
    this.setState({
      inputToggled: !this.state.inputToggled
    })
  };
  connectESP = (e) => {
    if (e.which === 13) {
      let esp_ip_address = e.target.value;

      this.setState(
        {
          connectIP: e.target.value,
          event_source: new EventSource(`http://${esp_ip_address}/sse`)
        },

        this.setupSSE.bind(this)
      );

      alert(`You entered: ${this.state.connectIP}`);

      this.setupSSE.bind(this)
    }
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
                // onChange={this.handleChange}
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
