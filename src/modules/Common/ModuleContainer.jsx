import React, { Component } from "react";
import Cookies from "universal-cookie";
import ModuleSelect from "./ModuleSelect.jsx";
import "../../lib/css/ModuleContainer.css";
import ProtoModule from "../ProtoModule/ProtoModule.jsx";
import ScienceModule from "../Science/ScienceModule.jsx";
import PowerModule from "../Power/PowerModule.jsx";
import IntelligentSystemsModule from "../IntelligentSystems/IntelligentSystemsModule.jsx";
import XHRTestModule from "../XHRTest/XHRTestModule.jsx";

class ModuleContainer extends Component {
  constructor(props) {
    super(props);
    this.moduleCookie = new Cookies();
    this.state = {
      id: this.props.id,
      currentModule: this.checkCookie()
    };
  }

  checkCookie = () => {
    let cookie = this.moduleCookie.get(`${this.props.id}-choice`);
    return typeof cookie !== "undefined" ? cookie : "proto-module";
  }

  onChange = (e) => {
    this.setState({
      currentModule: e.target.value
    });
    //console.log(e.target.value);
  };

  chooseModule(moduleName) {
    this.moduleCookie.set(`${this.props.id}-choice`, moduleName, { path: "/" });
    switch (moduleName) {
      case "proto-module":
        return <ProtoModule />;
      case "science-module":
        return <ScienceModule />;
      case "power-module":
        return <PowerModule />;
      case "intelligent-systems-module":
        return <IntelligentSystemsModule />;
      case "xhr-test-module":
        return <XHRTestModule />;
      default:
        return <p>{moduleName} does not exist</p>;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div key={this.state.id} className="ariWorld" id={this.state.id}>
          <ModuleSelect
            key={`${this.state.id}-select`}
            onChange={this.onChange}
          />
          {this.chooseModule(this.state.currentModule)}
        </div>
      </React.Fragment>
    );
  }
}

export default ModuleContainer;
