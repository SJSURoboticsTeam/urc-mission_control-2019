/*
    constants
*/

//CS = Connection State
export const CS_DISCONNECTED = 0;
export const CS_CONNECTING = 1;
export const CS_CONNECTED = 2;

//DM = Drive Mode
export const DM_DEBUG = 0;
export const DM_CRAB = 1;
export const DM_SPIN = 2;
export const DM_DRIVE = 3;

//BW = Back Wheel
export const BW_A = 0;
export const BW_B = 1;
export const BW_C = 2;

export const DRIVE_MODES = [ 
    {name: "Spin", id:"spin", value: DM_SPIN}, 
    {name: "Crab", id: "crab", value: DM_CRAB}, 
    {name: "Drive", id: "drive", value: DM_DRIVE},
    {name: "Debug", id: "debug", value: DM_DEBUG}
];

export const BACK_WHEELS = [ 
    {name: "A", id: `${BW_A}`, value: BW_A}, 
    {name: "B", id: `${BW_B}`, value: BW_B}, 
    {name: "C", id: `${BW_C}`, value: BW_C}
];