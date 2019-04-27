import React, { Component } from "react";
import Cookies from "universal-cookie";
import ModuleSelect from "./ModuleSelect.jsx";
import "../../lib/css/ModuleContainer.css";
import ProtoModule from "../ProtoModule/ProtoModule.jsx";
import MastModule from "../MastModule/MastModule.jsx";
import ArmModule from "../ArmModule/ArmModule.jsx";
import ScienceModule from "../Science/ScienceModule.jsx";
import PowerModule from "../Power/PowerModule.jsx";
import IntelligentSystemsModule from "../IntelligentSystems/IntelligentSystemsModule.jsx";
import XHRTestModule from "../XHRTest/XHRTestModule.jsx";
import CompassModule from "../CompassModule/CompassModule.jsx";
import DriveModule from "../Drive/DriveModule.jsx";
import LocationServicesModule from "../LocationServices/LocationServices.jsx";
import VideoStreamModule from "../VideoStream/VideoStream.jsx";

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

  setCookie = (cookieName, value) => {
    let d = new Date();
    d.setDate(d.getDate() + 30);
    this.moduleCookie.set(cookieName, value, 
      { path: "/",  expires: d });
  }

  onChange = (e) => {
    this.setState({
      currentModule: e.target.value
    });
    //console.log(e.target.value);
  };

  chooseModule(moduleName) {
    this.setCookie(`${this.props.id}-choice`, moduleName);
    switch (moduleName) {
      case "proto-module":
        return <ProtoModule />;
      case "mast-module":
        return <MastModule />;
      case "arm-module":
        return <ArmModule />;
      case "science-module":
        return <ScienceModule />;
      case "power-module":
        return <PowerModule />;
      case "intelligent-systems-module":
        return <IntelligentSystemsModule />;
      case "xhr-test-module":
        return <XHRTestModule />;
      case "compass-module":
        return <CompassModule />;
      case "drive-module":
        return <DriveModule />;
      case "video-stream-module":
        return <VideoStreamModule />;
      case "location-services-module":
        return <LocationServicesModule />;
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
            currentModule={this.state.currentModule}
          />
          {this.chooseModule(this.state.currentModule)}
        </div>
      </React.Fragment>
    );
  }
}

export default ModuleContainer;
