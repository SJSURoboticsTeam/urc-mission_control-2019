import React from 'react';
import PODSContainer from './PODSContainer';
import DrillContainer from './DrillContainer';
import GraphContainer from './GraphContainer';
import ButtonContainer from './ButtonContainer';

const ContainerDisplay = (props) => {
    const container = props.container;
    if (container === 0) {
        return (
            <ButtonContainer
                handlePodsButton={props.handlePodsButton}
                handleDrillButton={props.handleDrillButton}
                handleGeigerButton={props.handleGeigerButton}
            />
        );
    } else if (container === 1) {
        return (
            <DrillContainer
                handleBackButton={props.handleBackButton}
            />
        );
    } else if (container === 2) {
        return (
            <GraphContainer
                handleBackButton={props.handleBackButton}
            />
        );
    } else if (container === 3) {
        return (
            <PODSContainer
                handleBackButton={props.handleBackButton}
            />
        );
    }
};

export default ContainerDisplay;