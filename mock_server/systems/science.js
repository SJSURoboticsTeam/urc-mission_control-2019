const Delay = require("../delay");
const system = require("../system");

// State
let state = [];
state.length = 7;

// Arm API
const sciSystems = new system.System("science_systems");

sciSystems.addXHR("/toggle_pod", (req, res) => {

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


sciSystems.addXHR("/stop_all", (req, res) => {
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

function getGraphData() {
  let value = Math.floor(Math.random() * (29 - 21 + 1));
  let data = {
    pod1: Math.floor(Math.random() * (29 - value)),
    pod2: Math.floor(Math.random() * (23 - value)),
    pod3: Math.floor(Math.random() * (18 - value)),
    pod4: Math.floor(Math.random() * (13 - value)),
    pod5: Math.floor(Math.random() * (9 - value)),
    pod6: Math.floor(Math.random() * (4 - value)),
    sterilizedPod: Math.floor(Math.random() * value),
  };
  return JSON.stringify({
    graphData: data
  });
}

sciSystems.addOnConnectSSE("timestamp", makeTimestamp);

sciSystems.addSSE("timestamp", 1000, makeTimestamp);

sciSystems.addSSE("executePod", 1000, simulatePodExecution);

sciSystems.addSSE("onGraphChange", 500, getGraphData);