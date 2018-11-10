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
    dropdownOpen: false
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <div id="controls">
        <br />
        <Button>Toggle Laser</Button>
        <Button>Open/Close Claw</Button>
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