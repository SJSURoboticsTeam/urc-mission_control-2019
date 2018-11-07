const Delay = require('../delay');
const system = require('../system');

// State
let state = false;

// Arm API
const intelligent_systems = new system.System('intelligent_systems');

intelligent_systems.addXHR('/toggle_autonomy', (req, res) => {
    state = !state;

    res.send({
        message:`Autonomy is ${state ? "ON" : "OFF"}`, //can be printed directly
        autonomy_state: state //used for logic
    });
});

intelligent_systems.addOnConnectSSE('timestamp',  makeTimestamp);
intelligent_systems.addSSE('timestamp', 1000, makeTimestamp);

function makeTimestamp() {
    return JSON.stringify({
        timestamp: Date.now()
    });
}