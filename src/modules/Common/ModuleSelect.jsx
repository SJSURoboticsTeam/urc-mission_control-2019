import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import moduleData from "../../lib/moduleData.js";

export default class ModuleSelect extends React.Component {
  state = {
    dropdownOpen: false,
    modules: moduleData
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  currentModuleName = (currentModule) => {
    if (typeof moduleData.components[currentModule] !== "undefined") {
      return (moduleData.components[currentModule].value);
    } else {
      return currentModule;
    }
  }

  render() {
    return (
      <ButtonDropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="moduleSelect"
        onChange={this.changeValue}
      >
        <DropdownToggle caret>{ this.currentModuleName(this.props.currentModule) }</DropdownToggle>
        <DropdownMenu>
          {this.state.modules.componentOrder.map((id, value) => (
            <DropdownItem onClick={this.props.onChange} key={id} value={id}>
              {this.state.modules.componentOrder[value]}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
