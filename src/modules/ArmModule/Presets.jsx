import React, { Component } from "react";
import {
  Button, ButtonGroup
} from "reactstrap";
import "./ArmStyle.css";

class Presets extends Component {

  renderCommands = () => {
    let commandOptions = ["close", "open","stop"];
    return(
      <ButtonGroup>
        {commandOptions.map((el) => {
          return(
            <Button
              key={`${el}-option`} 
              color="primary" 
              id="command" 
              onClick={this.handleXHR} 
              value={el}>
              {el}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }

  handleXHR = (e) => {
    if(e.target.id === "command"){
      this.props.handleXHR({command: e.target.value});
    }
  }

  render() {
    return (
      <div id="controls">
        <p>Commands</p>
          {this.renderCommands()}
      </div>
    );
  }
}

export default Presets;