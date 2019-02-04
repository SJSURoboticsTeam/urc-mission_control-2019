/*
    constants
*/

//CS = Connection State
export const CS_DISCONNECTED = 0;
export const CS_CONNECTING = 1;
export const CS_CONNECTED = 2;

//DM = Drive Mode
export const DM_SPIN = 0;
export const DM_CRAB = 1;
export const DM_DRIVE = 2;
export const DM_DEBUG = 3;

export const DRIVE_MODES = [ 
    {name: "Spin", id:"spin", value: DM_SPIN}, 
    {name: "Crab", id: "crab", value: DM_CRAB}, 
    {name: "Drive", id: "drive", value: DM_DRIVE},
    {name: "Debug", id: "debug", value: DM_DEBUG}
];