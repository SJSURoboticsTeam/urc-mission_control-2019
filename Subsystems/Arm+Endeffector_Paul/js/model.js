//
// Constants
//

export const CS_DISCONNECTED = 0;
export const CS_CONNECTING = 1;
export const CS_CONNECTED = 2;

export const PS_OFF = 0;
export const PS_ON = 1;

export const CI_NONE = 0;
export const CI_ELBOW = 1;
export const CI_WRIST = 2;

export const MAX_CURRENT_HISTORIES = 10;
export const MAX_PRINT_MESSAGES = 1000;

export const CM_MOUSE = 0;
export const CM_PREVIEW = 1;
export const CM_MIMIC = 2;

export const GS_OFF = 0;
export const GS_ON = 1;



//
// State
//

export const state = {
    rerendering: false,

    // Connection
    host: null,
    robotConnectionState: CS_DISCONNECTED,
    mimicConnectionState: CS_DISCONNECTED,
    eventSource: null,
    robotConnectionErrored: false,

    // Power
    powerState: PS_OFF,
    camId: CI_NONE,
    dialCamShoulder: null,
    dialCamElbow: null,

    // Health
    currentHistories: [],
    printMessages: [],
    currentChart: null,

    // Control
    ctrlMode: CM_MOUSE,
    gimbalState: GS_OFF,
    dialBase: null,
    dialShoulder: null,
    dialElbow: null,
    dialWrist: null,
    dialWristRot: null,
    sliderClaw: null,
    sliderClawTorque: null
};


export function appendCurrentHistory(mA) {
    state.currentHistories.push(mA);

    if (state.currentHistories.length > MAX_CURRENT_HISTORIES) {
        state.currentHistories.shift();
    }
}

export function appendPrintMessage(msg) {
    state.printMessages.push(msg);

    if (state.printMessages.length > MAX_PRINT_MESSAGES) {
        state.printMessages.shift();
    }
}
