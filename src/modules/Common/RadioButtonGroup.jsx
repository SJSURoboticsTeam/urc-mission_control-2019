import React, { Component } from "react";
import {
    Button,
    ButtonGroup
} from 'reactstrap';

export default class RadioButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rSelected: 0
        }
    }

    onRadioButtonClick(val) {
        this.setState({ rSelected: val }, () => {
            this.props.buttonValUpdated(this.props.type, this.props.channel, this.state.rSelected);
        });
        
    }

    render() {
        return(
            <ButtonGroup>
                <Button onClick={() => this.onRadioButtonClick(0)} active={this.state.rSelected === 0} color={this.state.rSelected === 0 ? "primary" : "secondary"}>Off</Button>
                <Button onClick={() => this.onRadioButtonClick(1)} active={this.state.rSelected === 1} color={this.state.rSelected === 1 ? "primary" : "secondary"}>On</Button>
            </ButtonGroup>
        );
    }
}