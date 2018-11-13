import React from 'react';
import ButtonContainer from './ButtonContainer';
import DrillContainer from './DrillContainer';
import GraphContainer from './GraphContainer';

const ContainerDisplay = (props) => {
    const container = props.container;
    if (container === 0) {
        return (
            <ButtonContainer
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
    }
};

export default ContainerDisplay;