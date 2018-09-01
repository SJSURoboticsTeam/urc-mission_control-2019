import handlers from './event_handlers.js';
import dispatcher from './dispatcher.js';
import map from './map.js';

function main() {
    //Add Event Listeners to Buttons
    addButtonListener("tracker-and-intelligent-power", handlers.trackerAndIntelligentPowerClicked);
    addButtonListener("arm-power", handlers.armPowerClicked);
    addButtonListener("cameras-power", handlers.camerasPowerClicked);
    addButtonListener("drive-esp-power", handlers.driveEspPowerClicked);
    // addButtonListener("top-left-power", handlers.topLeftPowerClicked);
    // addButtonListener("top-right-power", handlers.topRightPowerClicked);
    // addButtonListener("bottom-left-power", handlers.bottomLeftPowerClicked);
    // addButtonListener("bottom-right-power", handlers.bottomRightPowerClicked);

    addButtonListener("tracker-camera", handlers.trackerCameraClicked);
    addButtonListener("arm-camera", handlers.armCameraClicked);
    addButtonListener("front-camera", handlers.frontCameraClicked);
    addButtonListener("back-camera", handlers.backCameraClicked);

    // dispatcher.retrievePowerStates();
    handlers.ReadSSE();
    dispatcher.retrieveBatteryVoltages();
    dispatcher.retrieveHeadingAndGPS();

    map.init();
}

function addButtonListener(button_id, callbackFunction) {
    document.getElementById(button_id).addEventListener('click', callbackFunction);
}

document.addEventListener('DOMContentLoaded', main);
