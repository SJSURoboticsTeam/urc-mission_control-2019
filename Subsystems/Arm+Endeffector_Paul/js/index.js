import {
    connectClicked,
    powerOnClicked,
    powerOffClicked,
    camNoneClicked,
    camElbowClicked,
    camWristClicked,
    ctrlMouseClicked,
    ctrlPreviewClicked,
    ctrlMimicClicked,
    ctrlGimbalOffClicked,
    ctrlGimbalOnClicked,
    ctrlResetClicked,
    dialCamMoved,
    dialArmMoved
} from "./handlers.js";

import {
    state
} from "./model.js";

import {
    rerender
} from "./rendering.js";



function addButtonListener(selector, listener) {
    document.querySelector(selector).addEventListener('click', listener);
}

function initializeCurrent() {
    state.currentChart = Highcharts.chart('graph', {
        title: {
            text: undefined
        },

        yAxis: {
            title: {
                text: 'mA'
            }
        },

        series: [{
            name: 'mA',
            data: []
        }],
    });
}

function main() {
    // Connection
    addButtonListener('#connect', connectClicked);

    document.getElementById('host').value = sessionStorage.getItem('host');

    // Power
    addButtonListener('#power-off', powerOffClicked);
    addButtonListener('#power-on', powerOnClicked);

    addButtonListener('#cam-id-none', camNoneClicked);
    addButtonListener('#cam-id-elbow', camElbowClicked);
    addButtonListener('#cam-id-wrist', camWristClicked);

    state.dialCamShoulder = new Dial({ container: '#dial-cam-shoulder', min: 0, max: 90 });
    state.dialCamShoulder.addEventListener('move', dialCamMoved);

    state.dialCamElbow = new Dial({ container: '#dial-cam-elbow', min: 0, max: 90 });
    state.dialCamElbow.addEventListener('move', dialCamMoved);

    // Health
    initializeCurrent();

    // Control
    addButtonListener('#ctrl-mouse', ctrlMouseClicked);
    addButtonListener('#ctrl-preview', ctrlPreviewClicked);
    addButtonListener('#ctrl-mimic', ctrlMimicClicked);

    addButtonListener('#ctrl-gimbal-off', ctrlGimbalOffClicked);
    addButtonListener('#ctrl-gimbal-on', ctrlGimbalOnClicked);

    addButtonListener('#ctrl-reset', ctrlResetClicked);

    state.dialBase = new Dial({ container: '#dial-base', min: -150, max: 150 });
    state.dialBase.addEventListener('move', dialArmMoved);

    state.dialShoulder = new Dial({ container: '#dial-shoulder', min: 0, max: 180 });
    state.dialShoulder.addEventListener('move', dialArmMoved);

    state.dialElbow = new Dial({ container: '#dial-elbow', min: -150, max: 150 });
    state.dialElbow.addEventListener('move', dialArmMoved);

    state.dialWrist = new Dial({ container: '#dial-wrist', min: -130, max: 130 });
    state.dialWrist.addEventListener('move', dialArmMoved);

    state.dialWristRot = new Dial({ container: '#dial-wrist-rot', min: 0, max: 360 });
    state.dialWristRot.addEventListener('move', dialArmMoved);

    rerender();
}

document.addEventListener('DOMContentLoaded', main);
