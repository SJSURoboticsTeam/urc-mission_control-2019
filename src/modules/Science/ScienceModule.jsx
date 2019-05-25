import React, { Component } from "react";
import ContainerDisplay from "./ContainerDisplay";
import "./ScienceStyle.css";
import {
  Button
} from "reactstrap";
import sendXHR from "../../lib/sendXHR";
import { setData } from '../Science/PODStateManager';

class ScienceModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: 0,
      connectIP: "0",
      inputToggled: false,
      event_source: null
    };
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
    event_source.addEventListener("onGraphChange", this.onGraphEvent);

    this.setState({ event_source });
  };
  onPodEvent(evt) {
    let podStatus = JSON.parse(evt.data).podStatus;
    console.log(`Pod Status: ${podStatus}`);
  };
  onGraphEvent(evt) {
    setData(JSON.parse(evt.data).graphData);
    // console.log(`Graph Data: ${this.graphData}`);
  }
  toggleInput = () => {
    this.setState({
      inputToggled: !this.state.inputToggled
    })
  };
  connectESP = (e) => {
    if (e.which === 13) {
      let espIpAddress = e.target.value;

      this.setState(
        {
          connectIP: e.target.value,
          event_source: new EventSource(`http://${espIpAddress}/sse`)
        },

        this.setupSSE.bind(this)
      );

      setTimeout(() => alert(`You entered: ${this.state.connectIP}`), 1500);

      this.setupSSE.bind(this);
    }
  };
  handleBackButton = () => {
    this.setState(() => ({ container: 0 }));
  };
  handleDrillButton = () => {
    this.setState(() => ({ container: 1 }));
  };
  handleGeigerButton = () => {
    this.setState(() => ({ container: 2 }));
  };
  handlePodsButton = () => {
    if(this.state.connectIP === "0") {
      alert("go to hell");
    } else {
      this.setState(() => ({ container: 3 }));
    }
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
            Enter ESP
          </Button>
          <div>
            {this.state.inputToggled ?
              <input
                // onChange={this.handleChange}
                onKeyDown={this.connectESP}
              ></input> :
              <p></p>
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ScienceModule;
