const system = require("../system");

// State
let state = false;

// Arm API
const power_systems = new system.System("power_systems");

power_systems.addXHR("/toggle_power", (req, res) => {
  state = !state;

  res.send({
    message: `Main Power is ${state ? "ON" : "OFF"}`, //can be printed directly
  });
});

function makeTimestamp() {
  return JSON.stringify({
    timestamp: Date.now()
  });
}

power_systems.addOnConnectSSE("timestamp", makeTimestamp);

power_systems.addSSE("timestamp", 1000, makeTimestamp);