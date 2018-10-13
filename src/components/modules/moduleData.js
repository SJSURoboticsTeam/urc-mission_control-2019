const moduleData = {
  modules: {
    "module-1": { id: "module-1" },
    "module-2": { id: "module-2" },
    "module-3": { id: "module-3" },
    "module-4": { id: "module-4" }
  },
  components: {
    "science-module": { id: "science-module", value: "Science" },
    "arm-module": { id: "arm-module", value: "Arm" },
    "drive-module": { id: "drive-module", value: "Drive" },
    "map-module": { id: "map-module", value: "map" },
    "camera-module": { id: "camera-module", value: "Camera" }
  },

  moduleOrder: ["module-1", "module-2", "module-3", "module-4"],
  componentOrder: [
    "science-module",
    "arm-module",
    "drive-module",
    "map-module",
    "camera-module"
  ]
};

export default moduleData;
