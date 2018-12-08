const Delay = require("../delay");
const system = require("../system");

// State
let state = [];
state.length = 7;

// Arm API
const science_systems = new system.System("science_systems");

science_systems.addXHR("/toggle_pod", (req, res) => {

  let response = "";
  let pod = req.query.pod;

  if (parseInt(pod) > 0 && parseInt(pod) < 8) {
    response = `${pod < 7 ? `POD #${pod}` : `STERILIZED POD`} IS ${state[pod - 1] !== true ? "ON" : "OFF"}`;
    state[pod - 1] = !state[pod - 1];
  } else {
    response = "INVALID POD NUMBER ENTERED";
  }

  res.send({
    message: response, //can be printed directly
  });
});


science_systems.addXHR("/stop_all", (req, res) => {
  state = false;

  res.send({
    message: "All Pods stopped.", //can be printed directly
  });
});

function makeTimestamp() {
  return JSON.stringify({
    timestamp: Date.now()
  });
}

function simulatePodExecution() {
  let status = "";
  let podActive = false;
  for (let i = 0; i < state.length; i++) {
    if (state[i] === true) {
      status = `${i + 1 < 7 ? `Pod ${i + 1}` : "Sterilized Pod"} executing...\n`;
      status += `done!`;
      state[i] = false;
      podActive = true;
    }
  }
  if (podActive) {
    return JSON.stringify({
      podStatus: status
    });
  }
}

science_systems.addOnConnectSSE("timestamp", makeTimestamp);

science_systems.addSSE("timestamp", 1000, makeTimestamp);

science_systems.addSSE("executePod", 1000, simulatePodExecution);