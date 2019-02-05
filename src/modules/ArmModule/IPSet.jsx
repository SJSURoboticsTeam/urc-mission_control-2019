import React, { Component } from "react";
import { Button, Input, Alert } from "reactstrap";

class IPSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputToggled: false,
      ip: "",
      IPEntered: false
    }
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.setIP(e.target.value);
      this.setState({
        ip: e.target.value,
        IPEntered: true
      })
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
      )
    } else {
      <p>Enter an IP, and hit enter</p>
    }
  }

  renderInput = () => {
    if (this.state.inputToggled) {
      return (
        <React.Fragment>
          {this.showIPEntered()}
          <Input
            placeholder="Enter ESP IP here..."
            onKeyPress={this.handleKeyPress}
            style={{ width: "50%" }}
          />
        </React.Fragment>
      );
    }
  }

  toggleInput = () => {
    this.props.toggle();
    this.setState({
      inputToggled: !this.state.inputToggled
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Arm Module</h1>
        <Button onClick={this.toggleInput}> Set ESP IP </Button>
        {this.renderInput()}
      </React.Fragment>
    );
  }
}

export default IPSet;