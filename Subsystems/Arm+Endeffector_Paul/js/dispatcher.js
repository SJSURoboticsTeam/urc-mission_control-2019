import {
    state,

    appendPrintMessage
} from "./model.js";



//
// Arm XHRs
//

function xhrError() {
    appendPrintMessage('Mission Control: Failed sending command to Control Systems');
}

function sendXHR(path, data) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('error', xhrError);
    xhr.open('POST', state.host + path);
    const body = data ? formatObject(data) : undefined;
    xhr.send(body);
}

export function sendPowerOff() {
    sendXHR('/power/off');
}

export function sendPowerOn() {
    sendXHR('/power/on');
}

export function sendCamSelect() {
    sendXHR('/camera/select', {
        id: state.camId,
    });
}

export function sendCamMove() {
    sendXHR('/camera/move', {
        camera_shoulder: state.dialCamShoulder.local,
        camera_elbow: state.dialCamElbow.local
    });
}

export function sendGimbalOff() {
    sendXHR('/arm/gimbal/off');
}

export function sendGimbalOn() {
    sendXHR('/arm/gimbal/on');
}

export function sendMove() {
    sendXHR('/arm/move', {
        base: state.dialBase.local,
        shoulder: state.dialShoulder.local,
        elbow: state.dialElbow.local,
        wrist: state.dialWrist.local,
        wrist_rot: state.dialWristRot.local,
    });
}



//
// Mimic commands
//

export function sendStuck() {
}
