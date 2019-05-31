import React, { Component } from "react";
import ContainerDisplay from "./ContainerDisplay";
import "./ScienceStyle.css";
// import {
//   Button
// } from "reactstrap";
import sendXHR from "../../lib/sendXHR";
import { setData } from "../Science/PODStateManager";

class ScienceModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: 0,
      connectIP: "192.168.10.54",
      inputToggled: false,
      eventSource: null
    };
  };
  onXHRSend = (endpoint, data) => {
    sendXHR(this.state.connectIP, endpoint, data, (res) => {
      // const resObj = JSON.parse(res);
      // console.log(resObj.message);
    });
  };
  setupSSE() {
    //Copy event source, add event onOpen/Close, listeners, call setState()
    let eventSource = Object.assign(this.state.eventSource);
    eventSource.onopen = () => {
      // console.log("Event Source Added!");
    };

    eventSource.onerror = () => {
      eventSource.close();
      eventSource = null;
      // console.log("Event Source Closed.");
    };

    eventSource.addEventListener("executePod", this.onPodEvent);
    eventSource.addEventListener("onGraphChange", this.onGraphEvent);

    this.setState({ eventSource });
  };
  // onPodEvent(evt) {
  //   let podStatus = JSON.parse(evt.data).podStatus;
  //   console.log(`Pod Status: ${podStatus}`);
  // }
  onGraphEvent(evt) {
    setData(JSON.parse(evt.data).graphData);
    // console.log(`Graph Data: ${this.graphData}`);
  }
  toggleInput = () => {
    this.setState({
      inputToggled: !this.state.inputToggled
    });
  };
  connectESP = (e) => {
    if (e.which === 13) {
      let espIpAddress = e.target.value;

      this.setState(
        {
          connectIP: e.target.value,
          eventSource: new EventSource(`http://${espIpAddress}/sse`)
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
        </div>
      </React.Fragment>
    );
  }
}

export default ScienceModule;
