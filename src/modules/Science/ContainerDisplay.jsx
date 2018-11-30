import React from 'react';
import PODSContainer from './PODSContainer';
import DrillContainer from './DrillContainer';
import GraphContainer from './GraphContainer';
import ButtonContainer from './ButtonContainer';

const ContainerDisplay = (props) => {
    const container = props.container;
    switch (container) {
        case 0:
            return (
                <ButtonContainer
                    handlePodsButton={props.handlePodsButton}
                    handleDrillButton={props.handleDrillButton}
                    handleGeigerButton={props.handleGeigerButton}
                />
            );
        case 1:
            return (
                <DrillContainer
                    handleBackButton={props.handleBackButton}
                />
            );
        case 2:
            return (
                <GraphContainer
                    handleBackButton={props.handleBackButton}
                />
            );
        case 3:
            return (
                <PODSContainer
                    handleBackButton={props.handleBackButton}
                />
            );
        default:
            return;
    }
};

export default ContainerDisplay;