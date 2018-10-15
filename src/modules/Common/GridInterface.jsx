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
      <React.Fragment>
        {this.state.modules.windowOrder.map((window) => (
          <ModuleContainer key={window.id} id={"ok ok ok"} />
        ))}
      </React.Fragment>
    );
  }
}

export default GridInterface;
