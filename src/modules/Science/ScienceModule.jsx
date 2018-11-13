import React, { Component } from "react";
import ContainerDisplay from './ContainerDisplay';
import "./ScienceStyle.css";

class ScienceModule extends Component {
  state = {
    container: 0
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
          handleDrillButton={this.handleDrillButton}
          handleGeigerButton={this.handleGeigerButton}
        />
      </div>
    );
  }
}

export default ScienceModule;
