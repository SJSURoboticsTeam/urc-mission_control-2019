import React, { Component } from "react";
import { 
// Button,
   Input,
   Alert,
   InputGroup
} from "reactstrap";

class IPSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputToggled: false,
      ip: "",
      IPEntered: false
    };
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.setState({
        ip: e.target.value,
        IPEntered: true
      }, this.props.setIP(e.target.value));
    }
  }

  showIPEntered = () => {
    if (this.state.IPEntered && this.state.inputToggled) {
      return (
        <Alert
          color="success"
          style={{ width: "50%" }}
        >
          IP Logged! It's {this.state.ip}
        </Alert>
      );
    } else {
      return (
        <p>Enter an IP, and hit enter</p>
      );
    }
  }

  renderInput = () => {
    if (this.state.inputToggled) {
      return (
        <React.Fragment>
          {this.showIPEntered()}
          <InputGroup style={{ width: "50%" }}>
            <Input
              placeholder="Enter ESP IP here..."
              onKeyPress={this.handleKeyPress}
            />
          </InputGroup>
        </React.Fragment>
      );
    }
  }

  toggleInput = () => {
    this.props.toggle();
    this.setState({
      inputToggled: !this.state.inputToggled
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.renderInput()}
      </React.Fragment>
    );
  }
}

export default IPSet;