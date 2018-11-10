import React, { Component } from "react";
import "./ScienceStyle.css";
// import Plot from 'react-plotly.js';

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
    return (
      <DrillContainer
        handleBackButton={props.handleBackButton}
      />
    );
  } else if (container === 2) {
    return (
      <GraphContainer
        handleBackButton={props.handleBackButton}
      />
    );
  }
}

class ScienceModule extends Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleDrillButton = this.handleDrillButton.bind(this);
    this.handleGeigerButton = this.handleGeigerButton.bind(this);
    this.state = {
      container: 0
    };
  }
  handleBackButton() {
    this.setState(() => ({ container: 0 }));
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
          handleBackButton={this.handleBackButton}
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

    <div className="science-drill-container">
      <BackButton
        handleBackButton={props.handleBackButton}
      />
      <div className="science-slider-container">
        <div className="science-slider-indiv">
          <input
            className="science-drill-slider"
            type="range"
            orient="vertical"
          >
          </input>
          Input Position
        </div>

        <div className="science-slider-indiv">
          <input
            className="science-drill-slider"
            type="range"
            orient="vertical"
            disabled="true"
          >
          </input>
          Current Position
        </div>
      </div>
    </div>
  );
}

const GraphContainer = (props) => {
  return (
    <div className="science-graph-container">
      <BackButton
        handleBackButton={props.handleBackButton}
      />
      {/* <div className="science-geiger-graph"> */}
      {/* <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: 'scatter',
              mode: 'lines+points',
              marker: { color: 'red' },
            },
            { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{ autosize: true, width: 320, height: 200, title: 'A Fancy Plot' }}
        />
      </div> */}
    </div>
  )
}

const BackButton = (props) => {
  return (
    <div className="science-back-container">
      <button
        className="btn btn-danger"
        onClick={props.handleBackButton}
      >
        Back
      </button>
    </div>
  );
}

export default ScienceModule;
