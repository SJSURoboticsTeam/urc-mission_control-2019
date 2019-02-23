const system = require("../system");

// Arm API
const arm = new system.System("arm");

arm.addXHR("/Arm", (req, res) => {
  let resText = "";
  //uncomment this for testing..
  // let new_req = req.query;
  // if (new_req.ShoulderTarget) {
  //   resText += `shoulder set to ${new_req.ShoulderTarget}\n`;
  // }
  // if (new_req.RotundaTarget) {
  //   resText += `rotunda set to ${new_req.RotundaTarget}\n`;
  // }
  // if (new_req.ElbowTarget) {
  //   resText += `elbow set to ${new_req.ElbowTarget}\n`;
  // }
  // if (new_req.command) {
  //   resText += `command set to ${new_req.command}\n`;
  // }
  // if (new_req.dimension) {
  //   resText += `dimensoin set to ${new_req.dimension}\n`;
  // }

  res.send({
    message: resText
  });
});
