import React, { Component } from "react";
import PODSContainer from './PODSContainer';
import DrillContainer from './DrillContainer';
import GraphContainer from './GraphContainer';
import ButtonContainer from './ButtonContainer';
import sendXHR from "../../lib/sendXHR";

class ContainerDisplay extends Component {
    onXHRSend = (endpoint, data) => {
        if (this.props.connectIP !== "") {
            alert("ERROR: Missing ESP IP Address.");
        } else {
            sendXHR(this.props.connectIP, endpoint, data, (res) => {
                res = JSON.parse(res);
                console.log(`result ${res.message}`);
            });
        }
    };
    render() {
        const container = this.props.container;

        switch (container) {
            case 0:
                return (
                    <ButtonContainer
                        handlePodsButton={this.props.handlePodsButton}
                        handleDrillButton={this.props.handleDrillButton}
                        handleGeigerButton={this.props.handleGeigerButton}
                    />
                );
            case 1:
                return (
                    <DrillContainer
                        handleBackButton={this.props.handleBackButton}
                    />
                );
            case 2:
                return (
                    <GraphContainer
                        handleBackButton={this.props.handleBackButton}
                    />
                );
            case 3:
                return (
                    <PODSContainer
                        handleBackButton={this.props.handleBackButton}
                        connectIP={this.props.connectIP}
                        onXHRSend={this.onXHRSend}
                    />
                );
            default:
                return;
        }
    }
};

export default ContainerDisplay;