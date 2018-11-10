import React, { Component } from "react";

class Controller extends Component {
  state = this.props;
  render() {
    return (
      <div className="controller" id={"slider" + this.state.name}>
        <p className="desc">{this.state.name}</p>
        <div className="drag-area elbow" id="y">
          <div className="cursor" />
        </div>
      </div>
    );
  }
}

export default Controller;