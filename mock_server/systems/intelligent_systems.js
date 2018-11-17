const Delay = require("../delay");
const system = require("../system");

// State
let state = false;

// Arm API
const intelligent_systems = new system.System("intelligent_systems");

intelligent_systems.addXHR("/toggle_autonomy", (req, res) => {
  state = !state;

  res.send({
    message: `Autonomy is ${state ? "ON" : "OFF"}`, //can be printed directly
    autonomy_state: state //used for logic
  });
});

intelligent_systems.addXHR("/xhr_comms_test", (req, res) => {
  let new_req = req.query;
  // console.log(new_req);
  // console.log(typeof new_req);
  // console.log(parseInt(new_req.val_1) + parseInt(new_req.val_2) + parseInt(new_req.val_3));

  res.send({
    message: parseInt(new_req.val_1) + parseInt(new_req.val_2) + parseInt(new_req.val_3)
  });
});

function makeTimestamp() {
  return JSON.stringify({
    timestamp: Date.now()
  });
}

intelligent_systems.addOnConnectSSE("timestamp", makeTimestamp);

intelligent_systems.addSSE("timestamp", 1000, makeTimestamp);