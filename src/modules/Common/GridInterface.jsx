import React, { Component } from "react";
import ModuleContainer from "./ModuleContainer";
import moduleData from "./../../lib/moduleData";
import "./../../lib/css/ModuleContainer.css";

class GridInterface extends Component {
  state = {
    modules: moduleData
  };

  render() {
    return (
      <div id="window-container">
        {this.state.modules.windowOrder.map((window) => (
          <ModuleContainer key={window} id={window} />
        ))}
      </div>
    );
  }
}

export default GridInterface;
