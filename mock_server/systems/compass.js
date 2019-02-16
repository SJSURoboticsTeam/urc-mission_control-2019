const Delay = require("../delay");
const system = require("../system");

// State
let state = false;
let heading = 0;

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

compass.addXHR("/set_angle_dec", (req, res) => {
  let response = "";
  if (state) {
    response = `Angle of declination set to ${req.query.angle_dec}`;
  } else {
    response = "Compass isn't on!";
  }
  res.send({
    message: response
  });
});


//SENDING TO COMPASS RESPONSE
function getHeading() {
    // let response = Math.floor(Math.random() * Math.floor(360));
    heading += 5;
    return JSON.stringify({
      heading
    });
}

compass.addOnConnectSSE("getHeading", getHeading);

compass.addSSE("getHeading", 500, getHeading);