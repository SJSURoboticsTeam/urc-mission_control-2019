import {
    sendPowerOn,
    sendPowerOff,
    sendCamSelect,
    sendCamMove,
    sendGimbalOff,
    sendGimbalOn,
    sendMove
} from "./dispatcher.js";

import {
    CS_DISCONNECTED,
    CS_CONNECTING,
    CS_CONNECTED,

    PS_OFF,
    PS_ON,

    CI_NONE,
    CI_ELBOW,
    CI_WRIST,

    CM_MOUSE,
    CM_PREVIEW,
    CM_MIMIC,

    GS_OFF,
    GS_ON,

    state,

    appendCurrentHistory,
    appendPrintMessage
} from "./model.js";

import {
    rerender
} from "./rendering.js";



//
// Network event handlers
//

export function connectionOpened() {
    state.robotConnectionState = CS_CONNECTED;
    state.robotConnectionErrored = false;
    rerender();
}

export function connectionErrored() {
    state.robotConnectionState = CS_DISCONNECTED;
    state.robotConnectionErrored = true;
    rerender();
}

export function ping(msg) {
    const obj = parseObject(msg.data);

    const {
        timestamp,
        power,
        current,
    } = obj;

    state.powerState = power;
    appendCurrentHistory(current);

    if (power === PS_ON) {
        const {
            camera_id,
            camera_shoulder,
            camera_elbow,

            camera_shoulder_desired,
            camera_elbow_desired,

            gimbal,

            base,
            shoulder,
            elbow,
            wrist,
            wrist_rot,
            claw,
            claw_torque,

            base_desired,
            shoulder_desired,
            elbow_desired,
            wrist_desired,
            wrist_rot_desired,
            claw_desired,

            stuck
        } = obj;

        state.camId = camera_id;
        state.dialCamShoulder.remote = camera_shoulder;
        state.dialCamElbow.remote = camera_elbow;

        state.dialCamShoulder.local = camera_shoulder_desired;
        state.dialCamElbow.local = camera_elbow_desired;

        state.gimbalState = gimbal;

        state.dialBase.remote = base;
        state.dialShoulder.remote = shoulder;
        state.dialElbow.remote = elbow;
        state.dialWrist.remote = wrist;
        state.dialWristRot.remote = wrist_rot;

        if (state.ctrlMode === CM_MOUSE) {
            state.dialBase.local = base_desired;
            state.dialShoulder.local = shoulder_desired;
            state.dialElbow.local = elbow_desired;
            state.dialWrist.local = wrist_desired;
            state.dialWristRot.local = wrist_rot_desired;
        }
    }

    rerender();
}

export function print(msg) {
    appendPrintMessage(msg.data);
    rerender();
}

export function mimic(msg) {
    if (state.ctrlMode === CM_MOUSE) {
        return;
    }

    const {
        base,
        shoulder,
        elbow,
        wrist,
        wrist_rot,
        claw,
        claw_torque,

        gimbal
    } = JSON.parse(msg.data);

    state.dialBase.local = base;
    state.dialShoulder.local = shoulder;
    state.dialElbow.local = elbow;
    state.dialWrist.local = wrist;
    state.dialWristRot.local = wrist_rot;

    if (state.ctrlMode === CM_MIMIC) {
        sendMove();
    }

    rerender();
}


//
// UI event handlers
//

export function connect() {
    disconnect();

    sessionStorage.setItem('host', document.getElementById('host').value);

    state.host = 'http://' + document.getElementById('host').value;

    state.eventSource = new EventSource(state.host + '/sse');
    state.eventSource.addEventListener('open', connectionOpened);
    state.eventSource.addEventListener('error', connectionErrored);
    state.eventSource.addEventListener('ping', ping);
    state.eventSource.addEventListener('print', print);

    state.robotConnectionState = CS_CONNECTING;
    state.firstPing = true;
    rerender();
}

export function disconnect() {
    if (state.eventSource !== null) {
        state.eventSource.close();
        state.eventSource = null;
    }

    state.robotConnectionState = CS_DISCONNECTED;
    rerender();
}

export function connectClicked() {
    switch (state.robotConnectionState) {
        case CS_DISCONNECTED:
            connect();
            break;
        case CS_CONNECTING:
            disconnect();
            break;
        case CS_CONNECTED:
            disconnect();
            break;
    }
}

export function powerOffClicked() {
    state.powerState = PS_OFF;
    rerender();

    sendPowerOff();
}

export function powerOnClicked() {
    state.powerState = PS_ON;
    rerender();

    sendPowerOn();
}

export function camNoneClicked() {
    state.camId = CI_NONE;
    rerender();

    sendCamSelect();
}

export function camElbowClicked() {
    state.camId = CI_ELBOW;
    rerender();

    sendCamSelect();
}

export function camWristClicked() {
    state.camId = CI_WRIST;
    rerender();

    sendCamSelect();
}

export function ctrlMouseClicked() {
    state.ctrlMode = CM_MOUSE;
    rerender();
}

export function ctrlPreviewClicked() {
    state.ctrlMode = CM_PREVIEW;
    rerender();
}

export function ctrlMimicClicked() {
    state.ctrlMode = CM_MIMIC;
    rerender();
}

export function ctrlGimbalOffClicked() {
    state.gimbalState = GS_OFF;
    rerender();

    sendGimbalOff();
}

export function ctrlGimbalOnClicked() {
    state.gimbalState = GS_ON;
    rerender();

    sendGimbalOn();
}

export function ctrlResetClicked() {
    state.dialBase.local = 0;
    state.dialShoulder.local = 0;
    state.dialElbow.local = 0;
    state.dialWrist.local = 0;
    state.dialWristRot.local = 0;

    rerender();

    sendMove();
}

export function dialCamMoved() {
    rerender();

    sendCamMove();
}

export function dialArmMoved() {
    rerender();

    sendMove();
}
