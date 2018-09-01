import {
  consoleBox,
  POD_A_ADDRESS,
  POD_B_ADDRESS,
  POD_C_ADDRESS,
  state,
  podASensorData,
  podBSensorData,
  podCSensorData
} from './model.js'


/* --------------------    Functions    -------------------- */


//Displays text in the console.
export function displayText(string){
	consoleBox.innerHTML += string + '\n';
  if (state.scrollBarLockedToBottom) {
    //If scrollbar is locked to bottom, then this line will
    //scroll to the bottom.
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }
}


//Same thing as displayText(), but only prints if feedback is enabled.
function displayFeedback(data) {
  if (state.printFeedbackEnabled){
    displayText(data);
  }
}


//Switches between scroll bar locked and scroll bar unlocked.
export function changeScrollBarLockStatus() {
  if (state.scrollBarLockedToBottom) {
    //Update the text of the button itself
    $('#lockScrollBarButton').text('Lock Scroll Bar');
    state.scrollBarLockedToBottom = false;
  } else {
    //Update the text of the button itself
    $('#lockScrollBarButton').text('Unlock Scroll Bar');
    state.scrollBarLockedToBottom = true;
  }
}


//Updates ip address based on what is in the input field. Activated
//when update button is pressed on the page.
export function submitIP(){
  if (state.host != document.getElementById('ipInputField').value) {
    //This if statement is so that the connection is only restarted if the
    //IP address was changed. This protects against hitting the submit button
    //when there was no new IP address inputed.
    state.host = document.getElementById('ipInputField').value;
    connectToPod();
    if (state.host != POD_A_ADDRESS && state.host != POD_B_ADDRESS
      && state.host != POD_C_ADDRESS) {
        //This deals with the case that the new IP address is not one that is specified
        //to be one of the pods. Thus, we enable each of the pod buttons and set the
        //currentPod text to custom to indicate it isn't one of the predefined addresses.
        $('#podAButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
    		$('#podBButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
    		$('#podCButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
        $('#currentPod').text('Current: Custom');
        displayText('Connecting to: http://' + state.host);
      }
  }
}


//These three functions change what pod is currently in use.
export function choosePodA(){
	if (!$('#podAButton').hasClass('disabled')) { //This If statement makes sure the button clicked isn't disabled
		$('#podAButton').removeClass('btn btn-primary active').addClass('btn btn-primary disabled');
		$('#podBButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
		$('#podCButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
		$('#currentPod').text('Current: Pod A');
		displayText('Connecting to Pod A...');
    state.host = POD_A_ADDRESS;
    document.getElementById('ipInputField').value = state.host;
    connectToPod();
	}
}
export function choosePodB(){
	if (!$('#podBButton').hasClass('disabled')) { //This If statement makes sure the button clicked isn't disabled
		$('#podBButton').removeClass('btn btn-primary active').addClass('btn btn-primary disabled');
		$('#podAButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
		$('#podCButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
		$('#currentPod').text('Current: Pod B');
		displayText('Connecting to Pod B...');
    state.host = POD_B_ADDRESS;
    document.getElementById('ipInputField').value = state.host;
    connectToPod();
	}
}
export function choosePodC(){
	if (!$('#podCButton').hasClass('disabled')) { //This If statement makes sure the button clicked isn't disabled
		$('#podCButton').removeClass('btn btn-primary active').addClass('btn btn-primary disabled');
		$('#podAButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
		$('#podBButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
		$('#currentPod').text('Current: Pod C');
		displayText('Connecting to Pod C...');
    state.host = POD_C_ADDRESS;
    document.getElementById('ipInputField').value = state.host;
    connectToPod();
	}
}


//This function establishes a pod connection. It runs whenver the ip address is changed,
//or whenever the page is first loaded..
let eventSource;
export function connectToPod() {
  //Each time we connect to a different IP, we reset all of our variables.
  state.drillProcessProgress = 0; state.spinOn = 0; state.moveDrill = 0;
  state.moveServo = 0; state.encoderValue = 0;
  updatePageToDefault();

  eventSource = new EventSource('http://' + state.host);
  eventSource.onopen = function() {
    $('#podConnectionStatus').removeClass('red').addClass('green').text('Status: Connected');
    displayText('Connection to pod established.');
  }
  eventSource.onmessage = function(event) {
    let parsedData = parseIncomingData(event.data);
    manageIncomingData(parsedData);
  }
  eventSource.onerror = function() {
    $('#podConnectionStatus').removeClass('green').addClass('red').text('Status: Disconnected');
    displayText('Connection error');
  }
}


//Function to parse incoming data from the esp32.
//Note that incoming data looks like this: FeedBack: 0(_) :: {sDP:0,sSO:0,sD:0,sS:0,sT:52,sH:48,sEV:0,sSt:259,sDC:1295,sRC:2590,debug:NONE}
function parseIncomingData(str) {
  //Get what's between the braces {}.
  str = str.substr(str.indexOf('{') + 1, str.indexOf('}'));

  //Parse a list of properties separated by commas where key and value
  //have a colon between them.
  const obj = {};

  let properties = str.split(',');
  for (let property of properties) {
    let [key, value] = property.split(':');
    obj[key] = parseInt(value);
  }

  return obj;
}


//Function to manage the incoming data. It manages the data by first parsing it, and then
//handling/updating all of the variables.
function manageIncomingData(parsedDataObject) {
  displayFeedback('Feedback:');
  //Print the current time elapsed. Useful to keep track of feedback messages in the console.
  displayFeedback('Time elapsed: ' + Math.floor((Date.now() - state.start)/1000));
  Object.keys(parsedDataObject).forEach(function(key) { //Loops through each value in object
    let keyString = key;
    if (keyString === 'sDP') { //Key is drillProcessProgress
      if (parsedDataObject[key] > 2 || parsedDataObject[key] < 0) {
        displayText('Error: drillProcess variable received from pod is out of bounds: ' + parsedDataObject[key]);
      } else { //If values are valid, update drillProcessProgress
        state.drillProcessProgress = parsedDataObject[key];
        displayFeedback('drillProcessProgress: ' + state.drillProcessProgress);
      }

    } else if (keyString === 'sSO') { //Key is spinOn
      if (parsedDataObject[key] > 1 || parsedDataObject[key] < 0) {
        displayText('Error: spinOn variable received from pod is out of bounds: ' + parsedDataObject[key]);
      } else { //If values are valid, update spinOn
        state.spinOn = parsedDataObject[key];
        displayFeedback('spinOn: ' + state.spinOn);
      }

    } else if (keyString === 'sD') { //Key is moveDrill
      if (parsedDataObject[key] > 2 || parsedDataObject[key] < 0) {
        displayText('Error: moveDrill variable received from pod is out of bounds: ' + parsedDataObject[key]);
      } else { //If values are valid, update moveDrill
        state.moveDrill = parsedDataObject[key];
        displayFeedback('moveDrill: ' + state.moveDrill);
      }

    } else if (keyString === 'sS') { //Key is moveServo
      if (parsedDataObject[key] > 1 || parsedDataObject[key] < 0) {
        displayText('Error: moveServo variable received from pod is out of bounds: ' + parsedDataObject[key]);
      } else { //If values are valid, update moveServo
        state.moveServo = parsedDataObject[key];
        displayFeedback('moveServo: ' + state.moveServo);
      }

    } else if (keyString === 'sT') { //Key is temperature
      if (parsedDataObject[key] != '0') { //0 is the default, which we don't want
        if (state.host === POD_A_ADDRESS) {
          podASensorData.temp = parsedDataObject[key];
        } else if (state.host === POD_B_ADDRESS) {
          podBSensorData.temp = parsedDataObject[key];
        } else if (state.host === POD_C_ADDRESS) {
          podCSensorData.temp = parsedDataObject[key];
        }
        updateGraphs(); //Update the graph to show the change
      }
      displayFeedback('temp: ' + parsedDataObject[key]);

    } else if (keyString === 'sH') { //Key is humidity
      if (parsedDataObject[key] != '0') { //0 is the default, which we don't want
        if (state.host === POD_A_ADDRESS) {
          podASensorData.hum = parsedDataObject[key];
        } else if (state.host === POD_B_ADDRESS) {
          podBSensorData.hum = parsedDataObject[key];
        } else if (state.host === POD_C_ADDRESS) {
          podCSensorData.hum = parsedDataObject[key];
        }
        updateGraphs(); //Update the graph to show the change
      }
      displayFeedback('humidity: ' + parsedDataObject[key]);

    } else if (keyString === 'sEV') { //Key is encoderValue
      state.encoderValue = parsedDataObject[key]
      displayFeedback('encoderValue: ' + state.encoderValue);

    } else if (keyString === 'sSt') { //Key is St
      if (parsedDataObject[key] != state.St) { //Only print when the value changes
        state.St = parsedDataObject[key];
        displayFeedback(' ');
        if (parsedDataObject[key] == 4) { //4 means drill process is finished
          displayText('Drill Process: Finished.');
          //Update main process:
          $('#drillChangeInHeightStatus').removeClass('green').addClass('red').text('Process Stopped');
          $('#startMainProcessButton').text('Start Drill Process');
          state.drillProcessProgress = 0;
          sendData(); //Need to send data over because state.drillProcessProgress is only updated on the esp32 that way.
          enableManualDrillControl();
        } else if (parsedDataObject[key] == 3) { //3 means drill is coming up
          displayText('Drill Process: Raising.');
        } else if (parsedDataObject[key] == 2) { //2 means drill is at dirt
          displayText('Drill Process: Stopped, Collecting Data.');
        } else if (parsedDataObject[key] == 1) { //1 means drill is lowering
          displayText('Drill Process: Lowering.');
        } else if (parsedDataObject[key] == 0) { //0 means drill process unstarted
          displayText('Drill Process: Stopped.');
        }
      }

    }

    if (state.manualControlEnabled) { //Update encoderValue on the page
      $('#encoderValueText').text(state.encoderValue);
    }
  });
  displayFeedback(' ');
}


//This function simply switches the variable printFeedbackEnabled so that
//the user can switch between printing and not printing the feedback.
export function changePrintFeedbackStatus() {
  if (state.printFeedbackEnabled){
    state.printFeedbackEnabled = false;
    $('#printFeedbackButton').text('Print Pod Feedback');
  } else {
    state.printFeedbackEnabled = true;
    $('#printFeedbackButton').text('Stop Print Feedback');
  }
}


//These two functions are for the automated main drill process
//variable drillProcessProgress -- Equals 0 means process hasn't started and drill
//is in initial position. Equals 1 means process started or resumed. Equals 2 means process paused.
export function startMainProcess() {
	if (state.drillProcessProgress == 0) {
		$('#drillChangeInHeightStatus').removeClass('red').addClass('green').text('Drill Process Started...');
		$('#startMainProcessButton').text('Stop Drill Process');
		state.drillProcessProgress = 1;
		displayText('Main process starting');
    disableManualDrillControl();
	}
	else if (state.drillProcessProgress == 1) {
		$('#drillChangeInHeightStatus').removeClass('green').addClass('red').text('Drill Process Paused');
		$('#startMainProcessButton').text('Resume Drill Process');
		state.drillProcessProgress = 2;
		displayText('Main process pausing');
    enableManualDrillControl();
	}
	else if (state.drillProcessProgress == 2) {
		$('#drillChangeInHeightStatus').removeClass('red').addClass('green').text('Drill Process Resumed...');
		$('#startMainProcessButton').text('Stop Drill Process');
		state.drillProcessProgress = 1;
		displayText('Main process resuming');
    disableManualDrillControl();
	}
  sendData();
}


//Function for the spin button
export function spin() {
  if (state.manualControlEnabled) {
    if (state.spinOn == 1) {
    	$('#spinButton').text('Spin Drill');
    	$('#drillSpinStatus').removeClass('green').addClass('red').text('Drill Stopped');
    	state.spinOn = 0;
    	displayText('Drill stopped spinning');
    }
    else {
    	$('#spinButton').text('Stop Spin');
    	$('#drillSpinStatus').removeClass('red').addClass('green').text('Drill Spinning');
    	state.spinOn = 1;
    	displayText('Drill started spinning');
    }
    sendData();
  }
}


//Functions for the raising and lowering drill buttons
//Currently, the moveDrill variable is being used to control this.
//moveDrill -- 0 means stop, 1 means lower, 2 means raise
export function lowerDrill(){
  if (state.manualControlEnabled) {
    if (state.moveDrill == 1){ //Stops the drill
      state.moveDrill = 0;
      $('#lowerDrillButton').text('Lower Drill');
      $('#drillMovementStatus').removeClass('green').addClass('red').text('Drill Stopped');
      displayText('Drill stopped lowering/raising');
    }
    else { //Lowers the drill
      state.moveDrill = 1;
      $('#lowerDrillButton').text('Stop Drill');
      $('#raiseDrillButton').text('Raise Drill');
      $('#drillMovementStatus').removeClass('red').addClass('green').text('Drill Lowering');
      displayText('Lowering drill');
    }
    sendData();
  }
}
export function raiseDrill(){
  if (state.manualControlEnabled) {
    if (state.moveDrill == 2){ //Stops the drill
      state.moveDrill = 0;
      $('#raiseDrillButton').text('Raise Drill');
      $('#drillMovementStatus').removeClass('green').addClass('red').text('Drill Stopped');
      displayText('Drill stopped lowering/raising');
    }
    else { //Raises the drill
      state.moveDrill = 2;
      $('#raiseDrillButton').text('Stop Drill');
      $('#lowerDrillButton').text('Lower Drill');
      $('#drillMovementStatus').removeClass('red').addClass('green').text('Drill Raising');
      displayText('Raising drill');
    }
    sendData();
  }
}


//Function to move the servo that is the pod door
export function moveTheServo() {
  if (state.manualControlEnabled) {
    if (state.moveServo == 1) { //Servo door is open, we want to close it.
    	$('#moveServoButton').text('Open Servo Door');
      $('#servoStatus').removeClass('green').addClass('red').text('Currently Closed');
    	state.moveServo = 0;
    	displayText('Servo door closed.');
    }
    else { //Servo door is closed, we want to open it.
      $('#moveServoButton').text('Close Servo Door');
      $('#servoStatus').removeClass('red').addClass('green').text('Currently Opened');
    	state.moveServo = 1;
    	displayText('Servo door opened.');
    }
    sendData();
  }
}


//Functions to disable/enable the manual drill control area in the UI
export function disableManualDrillControl(){
  state.manualControlEnabled = false;
  $('#outerDrillControlDiv').css('background-color', 'gray');
  $('#submitHeightButton').removeClass('btn btn-primary active').addClass('btn btn-primary disabled');
  $('#spinButton').removeClass('btn btn-primary active').addClass('btn btn-primary disabled');
  $('#lowerDrillButton').removeClass('btn btn-primary active').addClass('btn btn-primary disabled');
  $('#raiseDrillButton').removeClass('btn btn-primary active').addClass('btn btn-primary disabled');
  $('#moveServoButton').removeClass('btn btn-primary active').addClass('btn btn-primary disabled');
  $('#drillSpinStatus').removeClass('green').addClass('red').text('------------------'); //length for alignment
  $('#drillMovementStatus').removeClass('green').addClass('red').text('------------------');
  $('#servoStatus').removeClass('green').addClass('red').text('------------------');
  $('#encoderValueText').text('---');
}
export function enableManualDrillControl(){
  state.manualControlEnabled = true;
  $('#outerDrillControlDiv').css('background-color', '#98AFC7');
  $('#submitHeightButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
  $('#spinButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
  $('#lowerDrillButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
  $('#raiseDrillButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
  $('#moveServoButton').removeClass('btn btn-primary disabled').addClass('btn btn-primary active');
  $('#drillSpinStatus').text('Drill Stopped');
  $('#drillMovementStatus').text('Drill Stopped');
  $('#servoStatus').text('Currently Closed');
  $('#encoderValueText').text(state.encoderValue);
}


//This function changes all the values on the page to its default, this way, each
//button is reset when a new connection is made.
function updatePageToDefault() {
  enableManualDrillControl();
  //Update main process:
  $('#drillChangeInHeightStatus').removeClass('green').addClass('red').text('Process Stopped');
  $('#startMainProcessButton').text('Start Drill Process');
  //Drill lower/raise:
  $('#raiseDrillButton').text('Raise Drill');
  $('#drillMovementStatus').removeClass('green').addClass('red').text('Drill Stopped');
  $('#lowerDrillButton').text('Lower Drill');
  $('#drillMovementStatus').removeClass('green').addClass('red').text('Drill Stopped');
  //Drill spin and servo door:
  $('#moveServoButton').text('Open Servo Door');
  $('#servoStatus').removeClass('green').addClass('red').text('Currently Closed');
  $('#spinButton').text('Spin Drill');
  $('#drillSpinStatus').removeClass('green').addClass('red').text('Drill Stopped');
}


//Function to download a text file storing all the sensor data. It
//will then be able to easily be exported to a google spreadsheet.
export function downloadTextFile() {
  //NOTE TO SELF: MAYBE ENABLE THIS TO ALSO BE ABLE TO SAVE LOCALSTORAGE VARIABLES, JUST IN CASE
  displayText('Downloading File...');
  //text stores all the data to be written to a text file.
  //all these lines are for filling the file with proper values
  let text = 'PodA\r\nTemperature,Humidity\r\n' +
    podASensorData.temp + ',' + podASensorData.hum +
    '\r\n\r\nPodB\r\nTemperature,Humidity\r\n' +
    podBSensorData.temp + ',' + podBSensorData.hum +
    '\r\n\r\nPodC\r\nTemperature,Humidity\r\n' +
    podCSensorData.temp + ',' + podCSensorData.hum;

  let fileAsBlob = new Blob([text], {type: 'text/plain'});

  let downloadLink = document.createElement('a');
  document.body.appendChild(downloadLink);
  downloadLink.style = 'display: none';

  let textFile = window.URL.createObjectURL(fileAsBlob);
  downloadLink.download = 'SensorData'; //Default name of the text file
  downloadLink.href = textFile; //Specifies the textFile to be downloaded
  downloadLink.click(); //Clicks the element automatically
  window.URL.revokeObjectURL(textFile); //Revokes the newly created text file.
}


//These lines create the charts for the sensor data.
let temperatureChart = Highcharts.chart('temperatureDiv', {
    title: { text: 'Temperature' },
    xAxis: { categories: ['Pod A', 'Pod B', 'Pod C'] },
    yAxis: { title: { text: 'Temperature (°C)' } },
    series: [{
      type: 'column',
      colorByPoint: true,
      showInLegend: false
    }]
});
let humidityChart = Highcharts.chart('humidityDiv', {
    title: { text: 'Humidity' },
    xAxis: { categories: ['Pod A', 'Pod B', 'Pod C'] },
    yAxis: { title: { text: 'Humidity (%)' } },
    series: [{
      type: 'column',
      colorByPoint: true,
      showInLegend: false
    }]
});
//This function updates the graphs with the values that have come in.
function updateGraphs() {
  temperatureChart.update({
    series: [{ data: [podASensorData.temp, podBSensorData.temp, podCSensorData.temp]
    }]
  }, false);
  humidityChart.update({
    series: [{ data: [podASensorData.hum, podBSensorData.hum, podCSensorData.hum]
    }]
  }, false);
}


//Function to send an XHR to the esp32 server.
//Normally, I'd import from Core/js/sendXHR.js, but that wasn't working for
//some reason. So I implement it myself, which has been working fine.
//import sendXHR from '../../../Core/js/sendXHR.js';
function sendData() {
  //data stores all the data to send to esp32
  let data = { drillProcessProgress:state.drillProcessProgress, spinOn:state.spinOn,
               moveDrill:state.moveDrill, moveServo:state.moveServo };

  //This line below should be uncommented if I could correctly import from '../../../Core/js/sendXHR.js'
  //sendXHR('http://' + host, data)

  //This block should be commented out if I could correctly import from '../../../Core/js/sendXHR.js'
  let request = new XMLHttpRequest();
  let jsonData = JSON.stringify(data);
  let finalData = jsonData.replace(/['']+/g,'');//Gets rid of quotes...Example: {'var1':1,'var2':2} --> {var1:1,var2:2}
  request.open('GET', `http://${state.host}?data=${finalData}`);
  request.send();
}
