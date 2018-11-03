import React, { Component } from "react";
import "./ScienceStyle.css";

class ScienceModule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="science-container">
        <div class="alert alert-warning science-geiger-alert" role="alert">
          A geiger sensor has spiked!
        </div>
        <div className="science-header-container">
          <h1 className="science-header">Science Module</h1>
        </div>
        <div className="science-buttons-container">
          <button className="btn btn-lg btn-primary science-button-depth">Drill Depth</button>
          <button className="btn btn-lg btn-secondary science-button-geiger">Geiger Graph</button>
        </div>
      </div>
    );
  }
}

export default ScienceModule;
