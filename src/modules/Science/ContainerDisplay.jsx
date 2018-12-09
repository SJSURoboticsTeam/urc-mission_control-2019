import React, { Component } from "react";
import PODSContainer from './PODSContainer';
import DrillContainer from './DrillContainer';
import GraphContainer from './GraphContainer';
import ButtonContainer from './ButtonContainer';

class ContainerDisplay extends Component {
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
                        handlePodClick={this.props.handlePodClick}
                        handleBackButton={this.props.handleBackButton}
                        handleStopAllButton={this.props.handleStopAllButton}
                    />
                );
            default:
                return;
        }
    }
};

export default ContainerDisplay;