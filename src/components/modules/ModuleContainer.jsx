import React, { Component } from "react";
import ModuleSelect from "./ModuleSelect";
import moduleData from "./moduleData";
import "./../lib/css/ModuleContainer.css";
import ScienceModule from "./ScienceModule";

class ModuleContainer extends Component {
  state = {
    id: "",
    modules: moduleData,
    scienceActive: false
  };

  constructor(props) {
    super(props);
    const { id } = props;
    this.state = { id };
  }

  onChange = e => {
    e.target.value === "science-module"
      ? this.setState({ scienceActive: true })
      : this.setState({ scienceActive: false });
    console.log(e.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <div key={this.state.id} className="ariWorld" id={this.state.id}>
          {this.state.scienceActive ? <ScienceModule /> : <div />}
          <ModuleSelect
            key={`${this.state.id}-select`}
            onChange={this.onChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ModuleContainer;
