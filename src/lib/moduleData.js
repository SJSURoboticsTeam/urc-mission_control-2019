/**
 * GIT WORKFLOW
 * git checkout master
 * git fetch origin master
 * git pull origin master
 * 
 * go to other branches
 * git rebase master
 */

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
    "map-module": { id: "map-module", value: "map" },
    "camera-module": { id: "camera-module", value: "Camera" },
    "proto-module": { id: "proto-module", value: "ProtoModule" },
    "intelligent-systems-module": { id: "intelligent-systems-module", value: "IntelligentSystems" },
    "xhr-test-module": { id: "xhr-test-module", value: "XHRTest" }
  },

  windowOrder: ["window-1", "window-2", "window-3", "window-4"],
  componentOrder: [
    "science-module",
    "power-module",
    "arm-module",
    "drive-module",
    "map-module",
    "camera-module",
    "proto-module",
    "intelligent-systems-module",
    "xhr-test-module"
  ]
};

export default moduleData;
