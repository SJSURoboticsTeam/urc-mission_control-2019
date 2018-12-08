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
  let response = Math.floor(Math.random() * Math.floor(360));
  return JSON.stringify({
    voltage: response.toString()
  });
}

power_systems.addOnConnectSSE("sendVoltage", setVoltage);

power_systems.addSSE("sendVoltage", 1000, setVoltage);