import {
	state,
} from './model.js';

import sendXHR from '../../../Core/js/sendXHR.js';

export function sendMovement(drive_data) {
	console.log(drive_data);
	//var data = readSSE();
	//console.log("SSE " + data);
	if (state.host !== null) {
		sendXHR(state.host, drive_data);
	}
}

export function setupSSE() {
	const URL = 'http://192.168.4.1';
	var buffer;
	var source_ap = new EventSource(URL);
	

	//console.log("readSSE");
	source_ap.onopen = function(){
		//do something
	};

	source_ap.onmessage = function(event) {
		//console.log("RECEIVE");
		//console.log(" EVENT DATA: " + event.data);
		buffer = event.data.toString();
		console.log("DATA: " + buffer);
	};

	source_ap.onerror = function(event)
	{
		source_ap.close();
		source_ap = null;
	};    
}