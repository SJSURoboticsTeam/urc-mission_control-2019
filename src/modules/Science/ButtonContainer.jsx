import React from 'react';

const ButtonContainer = (props) => (
    <div className="science-buttons-container">
        <button
            className="btn btn-lg btn-primary science-button-depth"
            onClick={props.handleDrillButton}
        >
            Drill Depth
            </button>
        <button
            className="btn btn-lg btn-secondary science-button-geiger"
            onClick={props.handleGeigerButton}
        >
            Geiger Graph
            </button>
    </div>
);

export default ButtonContainer;