import handlers from './event_handlers.js';

function main() {
    addButtonListener('render-captains', handlers.renderCaptainsClicked);
    addButtonListener('render-drive', handlers.renderDriveClicked);
    addButtonListener('render-arm', handlers.renderArmClicked);
    addButtonListener('render-intelligent-systems', handlers.renderIntelligentSystemsClicked);
    addButtonListener('render-PODS', handlers.renderPODSClicked);
    addButtonListener('render-power-systems', handlers.renderPowerSystemsClicked);
    addButtonListener('render-tracker', handlers.renderTrackerClicked);

    //Initially render captain's page.
    handlers.renderCaptainsClicked();
}

function addButtonListener(button_id, callbackFunction) {
    document.getElementById(button_id).addEventListener('click', callbackFunction);   
};

document.addEventListener('DOMContentLoaded', main);