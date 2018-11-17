const Delay = require("../delay");
const system = require("../system");

// State
let state = false;

// Arm API
const science_systems = new system.System("science_systems");

science_systems.addXHR("/set_something", (req, res) => {
  state = !state;

  res.send({
    message: `What goes in science module? is it ${req.query}?`, //can be printed directly
    autonomy_state: state //used for logic
  });
});

function makeTimestamp() {
  return JSON.stringify({
    timestamp: Date.now()
  });
}

science_systems.addOnConnectSSE("timestamp", makeTimestamp);

science_systems.addSSE("timestamp", 1000, makeTimestamp);