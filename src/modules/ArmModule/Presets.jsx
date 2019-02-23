import React, { Component } from "react";
import {
  Button, ButtonGroup,
} from "reactstrap";
import "./ArmStyle.css";

class Presets extends Component {
  state = {
    wristInputs: [
      { name: "Dimension", id: "wrist", type: "" },
      { name: "Command", id: "command", type: "" },
    ],
  };

  determineButtonInput = (e) => {
    if(e.id === "command"){
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
    }else{
      let dimensions = [0,1];
      return (
        <ButtonGroup>
          {dimensions.map((el) => {
            return( 
              <Button
                key={`${el}-option`}
                color="primary"
                onClick={this.handleXHR} 
                id="dimension"
                value={el}>
                {el}
              </Button>);
          })}
        </ButtonGroup>
      );
    }
  }

  handleXHR = (e) => {
    if(e.target.id === "command"){
      this.props.handleXHR({command: e.target.value});
    }else{
      this.props.handleXHR({dimension: e.target.value});
    }
  }

  render() {
    return (
      <div id="controls">
        <h3>Wrist</h3>
            {this.state.wristInputs.map((element) => {
              return (
                <React.Fragment key={element.id}>
                  <p>{element.name}</p>
                  {this.determineButtonInput(element)}
                </React.Fragment>
              );
            })}
      </div>
    );
  }
}

export default Presets;