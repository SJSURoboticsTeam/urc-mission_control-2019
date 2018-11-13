import React from 'react';

const BackButton = (props) => (
    <div className="science-back-container">
        <button
            className="btn btn-danger"
            onClick={props.handleBackButton}
        >
            Back
            </button>
    </div>
);

export default BackButton;