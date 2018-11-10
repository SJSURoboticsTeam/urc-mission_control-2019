import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import SliderView from "./SliderView";
import TextInput from "./TextInput";
import Presets from "./Presets"

class ArmModule extends Component {
  state = {
    dropdownOpen: false,
    currentModule: "nothing"
  }

  onChange = (e) => {
    this.setState({
      currentModule: e.target.value
    });
    console.log(this.state.currentModule);
  };

  chooseModule(moduleName) {
    switch (moduleName) {
      case "slider":
        return <SliderView />;
      case "input":
        return <TextInput />;
      case "preset":
        return <Presets />
      default:
        return <h1>Arm Module!</h1>;
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <div>
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="controlSelect"
          onChange={this.changeValue}
        >
          <DropdownToggle caret>Control Select</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.onChange} key="slider" value="slider">
              Sliders
          </DropdownItem>
            <DropdownItem onClick={this.onChange} key="input" value="input">
              Input Values
          </DropdownItem>
            <DropdownItem onClick={this.onChange} key="preset" value="preset">
              Buttons + Presets
          </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        {this.chooseModule(this.state.currentModule)}
      </div>);
  }
}

export default ArmModule;