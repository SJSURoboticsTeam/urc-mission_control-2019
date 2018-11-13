import React from 'react';
import BackButton from './BackButton';

const DrillContainer = (props) => (
    <div className="science-drill-container">
        <BackButton
            handleBackButton={props.handleBackButton}
        />
        <div className="science-slider-container">
            <div className="science-slider-indiv">
                <input
                    className="science-drill-slider"
                    type="range"
                    orient="vertical"
                >
                </input>
                Input Position
                </div>
            <div className="science-slider-indiv">
                <input
                    className="science-drill-slider"
                    type="range"
                    orient="vertical"
                    disabled="true"
                >
                </input>
                Current Position
                </div>
        </div>
    </div>
);

export default DrillContainer;