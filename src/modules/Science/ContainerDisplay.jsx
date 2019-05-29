import React, { Component } from "react";
import PODSContainer from "./PODSContainer";
import DrillContainer from "./DrillContainer";
import GraphContainer from "./GraphContainer";
import ButtonContainer from "./ButtonContainer";

class ContainerDisplay extends Component {
    constructor(props){
        super(props);
        this.containerOptions = [
            <ButtonContainer
                    handlePodsButton={this.props.handlePodsButton}
                    handleDrillButton={this.props.handleDrillButton}
                    handleGeigerButton={this.props.handleGeigerButton}
            />,
            <DrillContainer
                handleBackButton={this.props.handleBackButton}
            />,
            <GraphContainer
            handleBackButton={this.props.handleBackButton}
            />,
            <PODSContainer
            handlePodClick={this.props.handlePodClick}
            handleBackButton={this.props.handleBackButton}
            handleStopAllButton={this.props.handleStopAllButton}
            />
        ];
    }

    render() {
        const container = this.props.container;
        if(container >= 0 && container < 4){
            return this.containerOptions[container];
        }else{
            return;
        }
    }
}

export default ContainerDisplay;