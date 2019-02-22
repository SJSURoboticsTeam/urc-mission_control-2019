import React, { Component } from "react";
import {
  Button, ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
import "./ArmStyle.css";

class SliderView extends Component {
  state = {
    dropdownOpen: false,
    buttons: [
      { id: "claw", name: "Open/Close Claw" },
      { id: "laser", name: "Toggle Laser" },
    ]
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  handleClick = (e) => {
    console.log("SQUAD " + e.target.id);
    this.props.handleXHR(`set_${e.target.id}`, { angle: e.target.value });
  }

  render() {
    return (
      <div id="controls">
        <br />
        {this.state.buttons.map((button) => {
          return (
            <Button key={button.id} onClick={this.handleClick} id={button.id}>{button.name}</Button>
          )
        })}
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="presetSelect"
          onChange={this.changeValue}
        >
          <DropdownToggle caret>Preset Select</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.onChange} key="1" value="1">
              Preset 1
          </DropdownItem>
            <DropdownItem onClick={this.onChange} key="2" value="2">
              Preset 2
          </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

export default SliderView;