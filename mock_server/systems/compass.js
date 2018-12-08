const Delay = require("../delay");
const system = require("../system");

// State
let state = false;

// Arm API
const compass = new system.System("compass");

compass.addXHR("/toggle_compass", (req, res) => {
  state = !state;

  res.send({
    message: `Compass is ${state ? "ON" : "OFF"}`, //can be printed directly
  });
});

compass.addXHR("/heading", (req, res) => {
  let response = "";
  if (state) {
    response = `Heading set to ${req.query.heading}`; //can be printed directly
  } else {
    response = "Compass isn't on!";
  }
  res.send({
    message: response, //can be printed directly
  });
});


//SENDING TO COMPASS RESPONSE
function getHeading() {
  if (state) {
    let response = Math.floor(Math.random() * Math.floor(360));
    return JSON.stringify({
      heading: response.toString()
    });
  } else {
    return;
  }
}

compass.addOnConnectSSE("getHeading", getHeading);

compass.addSSE("getHeading", 1000, getHeading);