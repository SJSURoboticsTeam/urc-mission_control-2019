import {
  submitIP,

  choosePodA,
  choosePodB,
  choosePodC,

  startMainProcess,

  spin,
  lowerDrill,
  raiseDrill,
  moveTheServo,

  connectToPod,

  changeScrollBarLockStatus,
  changePrintFeedbackStatus,
  downloadTextFile,

  displayText
} from './handlers.js';

import {
  state,
  POD_A_ADDRESS
} from './model.js';


/* --------------------    Initializations    -------------------- */
//Sets the ip address box value to default value, which is host
document.getElementById("ipInputField").value = state.host;
//Enables debugger
debugger;
//These lines display what the page is trying to connect to.
//It is either trying to connect to Pod A or to a specified ip.
if (document.getElementById('ipInputField').value == POD_A_ADDRESS) {
  $('#currentPod').text('Current: Pod A');
} else {
  $('#currentPod').text('Current: Custom');
}

//Initiate a connection to pod
connectToPod();

//Copied from an example... this assigns a function to a button
function addButtonListener(selector, listener) {
    document.querySelector(selector).addEventListener('click', listener);
}
//function runs when the page is loaded, it assigns an event listener to each button
function main() {
  addButtonListener('#submitIPButton', submitIP);

  addButtonListener('#podAButton', choosePodA);
  addButtonListener('#podBButton', choosePodB);
  addButtonListener('#podCButton', choosePodC);

  addButtonListener('#startMainProcessButton', startMainProcess);

  addButtonListener('#raiseDrillButton', raiseDrill);
  addButtonListener('#lowerDrillButton', lowerDrill);
  addButtonListener('#spinButton', spin);
  addButtonListener('#moveServoButton', moveTheServo);

  addButtonListener('#lockScrollBarButton', changeScrollBarLockStatus);
  addButtonListener('#printFeedbackButton', changePrintFeedbackStatus);
  addButtonListener('#downloadDataButton', downloadTextFile);
}
//Runs main() when page is loaded
document.addEventListener('DOMContentLoaded', main);


/*
//This is for SSE's, works on mock server
let eventSource = new EventSource('http://localhost:5002/sse');
eventSource.addEventListener('ping', pingRecieved);
function pingRecieved(message) { displayText(message.data); }
*/



/*
Note To Self (To Do List):
Put all updating elements within the manageIncomingData function;
*/
