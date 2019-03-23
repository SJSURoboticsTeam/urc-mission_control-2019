const system = require("../system");

let powerState = [
  { name: "main", isOn: false },
  { name: "wheels", isOn: false },
  { name: "hi", isOn: false },
  { name: "nhat", isOn: false },
  { name: "how r ya", isOn: false },
];

// Arm API
const power_systems = new system.System("power_systems");

power_systems.addXHR("/toggle_power", (req, res) => {

  let type = req.query.type;
  powerState[type].isOn = !powerState[type].isOn;

  res.send({
    message: `Main Power is ${powerState[type].isOn ? "ON" : "OFF"}`, //can be printed directly
  });
});

function setVoltage() {
  let voltage = {
    armVoltage:         Math.floor(Math.random() * Math.floor(5)),
    driveVoltage:       Math.floor(Math.random() * Math.floor(5)),
    mastVoltage:        Math.floor(Math.random() * Math.floor(5)),
    controlVoltage:     Math.floor(Math.random() * Math.floor(5)),
    intelligentVoltage: Math.floor(Math.random() * Math.floor(5))
  }
  // console.log(response.toString());
  return JSON.stringify(
    voltage
  );
}

power_systems.addOnConnectSSE("sendVoltage", setVoltage);

power_systems.addSSE("sendVoltage", 1000, setVoltage);