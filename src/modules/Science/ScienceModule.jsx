import React, { Component } from "react";
import ContainerDisplay from './ContainerDisplay';
import "./ScienceStyle.css";

class ScienceModule extends Component {
  state = {
    container: 0
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
  render() {
    return (
      <div className="science-container">
        {this.state.container === 0 &&
          <div className="alert alert-warning science-geiger-alert" role="alert">
            A geiger sensor has spiked!
          </div>
        }
        <div className="science-header-container">
          <h1 className="science-header">Science Module</h1>
        </div>
        <ContainerDisplay
          container={this.state.container}
          handleBackButton={this.handleBackButton}
          handlePodsButton={this.handlePodsButton}
          handleDrillButton={this.handleDrillButton}
          handleGeigerButton={this.handleGeigerButton}
        />
      </div>
    );
  }
}

export default ScienceModule;
