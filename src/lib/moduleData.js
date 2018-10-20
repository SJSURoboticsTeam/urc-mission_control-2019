const moduleData = {
  windows: {
    "window-1": { id: "window-1" },
    "window-2": { id: "window-2" },
    "window-3": { id: "window-3" },
    "window-4": { id: "window-4" }
  },
  components: {
    "science-module": { id: "science-module", value: "Science" },
    "arm-module": { id: "arm-module", value: "Arm" },
    "drive-module": { id: "drive-module", value: "Drive" },
    "map-module": { id: "map-module", value: "map" },
    "camera-module": { id: "camera-module", value: "Camera" },
    "proto-module": { id: "proto-module", value: "ProtoModule" },
    "cindy-module": { id: "cindy-module", value: "CindyModule" }
  },

  windowOrder: ["window-1", "window-2", "window-3", "window-4"],
  componentOrder: [
    "science-module",
    "arm-module",
    "drive-module",
    "map-module",
    "camera-module",
    "proto-module",
    "cindy-module"
  
  ]
};

export default moduleData;
