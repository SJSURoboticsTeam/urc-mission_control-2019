const Delay = require("../delay");
const system = require("../system");

// State
let state = false;

// Arm API
const drive_systems = new system.System("drive_systems");

drive_systems.addXHR("/drive_mode", (req, res) => {
  state = !state;

  res.send({
    message: `Drive Mode is ${req.query.driveMode}`, //can be printed directly
    autonomy_state: state //used for logic
  });
});


function makeTimestamp() {
  return JSON.stringify({
    timestamp: Date.now()
  });
}

drive_systems.addOnConnectSSE("timestamp", makeTimestamp);

drive_systems.addSSE("timestamp", 1000, makeTimestamp);