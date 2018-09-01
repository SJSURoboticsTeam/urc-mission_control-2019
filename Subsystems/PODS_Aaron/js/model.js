/* --------------------    Variables    -------------------- */
//Constant used in order to fill the console box
export const consoleBox = document.getElementById("consoleBox");
//IP addresses of the pods
export const POD_A_ADDRESS = '192.168.0.51';
export const POD_B_ADDRESS = '192.168.0.52';
export const POD_C_ADDRESS = '192.168.0.53';

//State stores most all the variables for the page
export const state = {

  //Controls what state the pod is in during the drill process
  //0 means process hasn't started and drill is in initial position.
  //1 means process started or resumed. 2 means process paused.
  drillProcessProgress: 0,

  //State of whether or not drill is spinning
  //0 means not spinning, 1 means spinning
  spinOn: 0,

  //State of whether or not the drill is lowering, raising, or stopped.
  //0 means stop, 1 means lower, 2 means raise
  moveDrill: 0,

  //State of the door/servo at the bottom of the pod
  //0 means closed, 1 means open
  moveServo: 0,

  //Encoder values for the drill, supposed to represent the current height.
  //0 means all the way up, 10 means all the way down
  encoderValue: 0,

  //This is a variable that comes in from the esp32 that represents the
  //current progress of the main drill process. 0 means not started, 1 means lowering,
  //2 means stopped at the bottom, 3 means raising, 4 means finished.
  St: 0,

  //IP address, used to send and receive XHR's. Each pod has a different one.
  host: POD_A_ADDRESS, //Default should be POD_A_ADDRESS.

  //Keeps track of whether or not manual drill control is enabled
  //Manual drill control is disabled whenever the automated process is running,
  //i.e. when drillProcessProgress != 0
  manualControlEnabled: true,

  //Keeps track of whether or not to print the feedback from the pod
  //to the console. Controlled by printFeedbackButton
  printFeedbackEnabled: true,

  //This forces the scoll bar of the console box to lock to the bottom
  //when true, and to do nothing when false. The value is adjusted by
  //scrollBarLockButton
  scrollBarLockedToBottom: true,

  //This records the time that the website is loaded. Used to print a timestamp
  //to the console on the page
  start: Date.now()
};

//These store sensor data variables for each pod.
export const podASensorData = {
  temp: null,
  hum: null
};
export const podBSensorData = {
  temp: null,
  hum: null
};
export const podCSensorData = {
  temp: null,
  hum: null
};
