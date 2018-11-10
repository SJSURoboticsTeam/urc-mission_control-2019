import React, { Component } from "react";
import Controller from "./Controller"
import "./ArmStyle.css";

class SliderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursors: [{ name: "1", number: 0 }, { name: "2", number: 2 }]
    };
  }

  render() {
    return (
      <div id="controls">
        {this.state.cursors.map((cursor) => (
          <Controller left={cursor.number} name={cursor.name} />
        ))}

      </div>
    );
  }
}

export default SliderView;