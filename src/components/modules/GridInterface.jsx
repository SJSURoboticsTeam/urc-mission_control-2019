import React, { Component } from "react";
import ModuleContainer from "./ModuleContainer";
import moduleData from "./moduleData";
import "./../lib/css/ModuleContainer.css";

class ModuleContainer extends Component {
  state = {
    modules: moduleData
  };

  render() {
    return (
      <React.Fragment>
        {this.state.modules.modules.map(id => (
          <ModuleContainer key={id} id={id} />
        ))}
      </React.Fragment>
    );
  }
}

export default ModuleContainer;
