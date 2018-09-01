//
// Constants
//

//CS = Connection State
export const CS_DISCONNECTED = 0;
export const CS_CONNECTING = 1;
export const CS_CONNECTED = 2;

export const MAX_PRINT_MESSAGES = 1000;

//PS = Power State
export const PS_OFF = 0;
export const PS_ON = 1;

//This enumeration starts from 1 instead of 0 because of a formatting choice on the control system end.
//DM = Drive Mode
export const DM_TANK = 1;
export const DM_SPIN = 2;
export const DM_CRAB = 3;
export const DM_DEBUG = 4;


//RM = Rover Model
export const RM_UP = 0;
export const RM_DOWN = 1;
export const RM_LEFT = 2;
export const RM_RIGHT = 3;

export const WHEEL_POSITIONS = ["TL", "TR", "BL", "BR"];

//
// State
//

export const state = {
    host: null,
    timestamp: 0,
    
    connection_state: CS_DISCONNECTED,
    joystick_connected: false,
    power_state: PS_OFF,
    drive_mode: DM_TANK,

    rerendering: false,
    first_ping: false,

    print_messages: [],

    event_source: null,

    dialWheelTL: null,
    dialWheelTR: null,
    dialWheelBL: null,
    dialWheelBR: null,

    previous_heading: null,

    longitude: null,
    latitude: null,
    heading: null
};

export function appendPrintMessage(msg) {
    state.printMessages.push(msg);

    if (state.printMessages.length > MAX_PRINT_MESSAGES) {
        state.printMessages.shift();
    }
}
