import React from 'react';
import BackButton from './BackButton';

const logger = () => console.log("POD 1 clicked");

const PODSContainer = (props) => (
    <div className="science-pods-container">
        <div className="science-pods-header">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {/* <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a> */}
                </div>
            </div>
            <BackButton
                handleBackButton={props.handleBackButton}
            />
        </div>

        <div className="science-pod-container">
            <button 
                onClick={logger}
                className="btn btn-info"
            >POD 1</button>
        </div>
    </div>
);

export default PODSContainer;