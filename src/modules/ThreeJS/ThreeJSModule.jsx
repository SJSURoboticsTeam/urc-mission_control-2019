
import React, { Component } from "react";
import RoverModel from "./3D_Rover.jsx";
import "./ThreeJSStyle.css";

class ThreeJSModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model_div_name: "3D-model"
    };
  }

  render() {
    return (
      <div>
        <h1 className="header">This is the ThreeJS!</h1>
        <p>Copy/Paste this folder and create your own stuff!</p>
        <RoverModel/>
      </div>
    );
  }
}

export default ThreeJSModule;
