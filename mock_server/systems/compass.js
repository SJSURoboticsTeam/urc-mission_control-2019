const Delay = require("../delay");
const system = require("../system");

// State
let state = false;

// Arm API
const compass = new system.System("compass");

compass.addXHR("/heading", (req, res) => {
  state = !state;

  res.send({
    message: `Heading set to ${req.query.heading}`, //can be printed directly
  });
});


function getHeading() {
  return JSON.stringify({
    heading: Math.floor(Math.random() * Math.floor(360))
  });
}

compass.addOnConnectSSE("getHeading", getHeading);

compass.addSSE("getHeading", 1000, getHeading);