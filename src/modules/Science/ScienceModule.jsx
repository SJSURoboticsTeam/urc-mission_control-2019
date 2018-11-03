import React, { Component } from "react";
import "./ScienceStyle.css";

function ContainerDisplay(props) {
  const container = props.container;
  if (container === 0) {
    return (
      <ButtonContainer
        handleDrillButton={props.handleDrillButton}
        handleGeigerButton={props.handleGeigerButton}
      />
    );
  } else if (container === 1) {
    return <DrillContainer />;
  } else if (container === 2) {
    return <GraphContainer />;
  }
}

class ScienceModule extends Component {
  constructor(props) {
    super(props);
    this.handleDrillButton = this.handleDrillButton.bind(this);
    this.handleGeigerButton = this.handleGeigerButton.bind(this);
    this.state = {
      container: 0
    };
  }
  handleDrillButton() {
    this.setState(() => ({ container: 1 }));
  }
  handleGeigerButton() {
    this.setState(() => ({ container: 2 }));
  }
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
          handleDrillButton={this.handleDrillButton}
          handleGeigerButton={this.handleGeigerButton}
        />
      </div>
    );
  }
}

const ButtonContainer = (props) => {
  return (
    <div className="science-buttons-container">
      <button
        className="btn btn-lg btn-primary science-button-depth"
        onClick={props.handleDrillButton}
      >
        Drill Depth
      </button>
      <button
        className="btn btn-lg btn-secondary science-button-geiger"
        onClick={props.handleGeigerButton}
      >
        Geiger Graph
      </button>
    </div>
  );
}

const DrillContainer = (props) => {
  return (
    <div>
      <div className="science-back-container">
        <button className="btn btn-danger">Back</button>
      </div>
      <div className="science-drill-container">

        <input
          className="science-drill-slider"
          type="range"
          orient="vertical"
        >
        </input>
        <input
          className="science-drill-slider"
          type="range"
          orient="vertical"
        >
        </input>
      </div>
    </div>
  );
}

const GraphContainer = (props) => {
  return (
    <div className="science-graph-container">
      <div className="science-back-container">
        <button className="btn btn-danger">Back</button>
      </div>
      <div className="science-geiger-graph"></div>
    </div>
  )
}

export default ScienceModule;
