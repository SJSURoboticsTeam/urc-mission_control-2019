const moduleData = {
  windows: {
    "window-1": { id: "window-1" },
    "window-2": { id: "window-2" },
    "window-3": { id: "window-3" },
    "window-4": { id: "window-4" }
  },
  components: {
    "science-module": { id: "science-module", value: "Science" },
    "power-module": { id: "power-module", value: "Power" },
    "arm-module": { id: "arm-module", value: "Arm" },
    "drive-module": { id: "drive-module", value: "Drive" },
    "proto-module": { id: "proto-module", value: "Module Dropdown" },
    "intelligent-systems-module": { id: "intelligent-systems-module", value: "Intelligent Systems" },
    "xhr-test-module": { id: "xhr-test-module", value: "XHR Test" },
    "compass-module": { id: "compass-module", value: "Compass Module" },
    "video-stream-module": { id: "video-stream-module", value: "Video Stream"},
    "location-services-module": { id: "location-services-module", value: "Location Services"}
  },

  windowOrder: ["window-1", "window-2", "window-3", "window-4"],
  componentOrder: [
    "science-module",
    "power-module",
    "arm-module",
    "drive-module",
    "proto-module",
    "intelligent-systems-module",
    "xhr-test-module",
    "compass-module",
    "video-stream-module",
    "location-services-module"
  ]
};

export default moduleData;
