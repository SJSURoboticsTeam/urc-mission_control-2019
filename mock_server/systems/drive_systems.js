const Delay = require("../delay");
const system = require("../system");

let xVal = 0;
let yVal = 0;
let angle = 0;
var oldX, oldY;


// Arm API
const drive_systems = new system.System("drive_systems");

drive_systems.addXHR("/joystick_values", (req, res) => {
  let response = "";
  if (req.query.xVal) {
    xVal = req.query.xVal;
    response += `X value set to ${xVal}\n`;
  }

  if (req.query.yVal) {
    yVal = req.query.yVal;
    response += `Y value set to ${yVal}\n`;
  }

  if (req.query.angle) {
    angle = req.query.angle;
    response += `Angle value set to ${angle}\n`;
  }

  res.send({
    message: response, //can be printed directly
  });
});

drive_systems.addXHR("/drive_mode", (req, res) => {
  let mode = req.query.driveMode;
  if (mode === "drive" || mode === "rotate" || mode === "translate") {
    res.send({
      message: `Drive Mode is ${mode}`, //can be printed directly
    });
  } else {
    res.send({
      message: `"${mode}" is an invalid drive mode!`
    });
  }
});


function sendUnits() {
  let message;
  if (oldX !== xVal && oldY !== yVal) {
    oldX = xVal;
    oldY = yVal;
    message = `Speed is ${Math.sqrt(Math.exp(xVal, 2) + Math.exp(yVal, 2))}\n`;
    message += `Angle is ${angle}`;

    return JSON.stringify({
      units: message
    });
  }
}

drive_systems.addOnConnectSSE("sendUnits", sendUnits);

drive_systems.addSSE("sendUnits", 1000, sendUnits);