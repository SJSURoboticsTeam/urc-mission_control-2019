import {
	state,

	CS_DISCONNECTED,
	CS_CONNECTING,
	CS_CONNECTED,

	PS_OFF,
	PS_ON,

	DM_SPIN,
	DM_CRAB,
	DM_DEBUG,
	DM_TANK,

	RM_UP,
	RM_DOWN,
	RM_LEFT,
	RM_RIGHT
} from './model.js';

import {
	rerender,
	setDanger,
	setPrimary,
	setSecondary
} from './rendering.js';

// import rover_model from './3D_rover.js';

function connect() {
	state.host = "http://" + document.getElementById('host').value;
	//Take server's address and add /sse at the end. This triggers a SSE connection  
	state.event_source = new EventSource(state.host + "/sse");
	state.event_source.addEventListener('ping', ping);
	state.event_source.addEventListener('print', print);
	state.event_source.addEventListener('open', connectionOpened);

	state.connection_state = CS_CONNECTING;
	state.first_ping = true;
	rerender();
}

function ping() {
	if (state.first_ping) {
		state.connection_state = CS_CONNECTED;
		state.first_ping = false;
		rerender();
	}
}

function print() {
	// document.getElementById("log").value += "print message\n";
}

function connectionOpened() {
	state.connection_state = CS_CONNECTED;
	rerender();
}

export function connectESPClicked() {
	//If not connected
	if (state.connection_state == CS_DISCONNECTED) {
		connect();
	} else {
		state.connection_state = CS_DISCONNECTED;
		state.power_state = PS_OFF;
	}

	rerender();
}

export function connectVideoClicked() {
	let ip_address = document.getElementById("video-server").value;
	document.getElementById("video").src = `http://${ip_address}`;
}

export function powerOnClicked() {
	state.power_state = PS_ON;
	rerender();
}

export function powerOffClicked() {
	state.power_state = PS_OFF;
	rerender();
}

export function carModeClicked() {
	state.drive_mode = DM_CAR;
	rerender();
}

export function crabModeClicked() {
	state.drive_mode = DM_CRAB;
	rerender();
}

export function spinModeClicked() {
	state.drive_mode = DM_SPIN;
	rerender();
}

export function debugModeClicked() {
	state.drive_mode = DM_DEBUG;
	rerender();
}

export function tankModeClicked() {
	state.drive_mode = DM_TANK;
	rerender();
}

export function lockHeadingClicked() {
	console.log("lockHeadingClicked");
}

export function resetHeadingClicked() {
	console.log("resetHeadingClicked");
}

export function gamepadConnected(e) {
	let joystick_status = document.getElementById("joystick-status");
	joystick_status.innerText = "Connected";
	setPrimary(joystick_status);

	state.joystick_connected = true;
}

export function gamepadDisconnected(e) {
	let joystick_status = document.getElementById("joystick-status");
	joystick_status.innerText = "Disconnected";
	setDanger(joystick_status);
	
	state.joystick_connected = false;
}

export function modelUpClicked() {
	rover_model.rotateModel(RM_UP);
}

export function modelDownClicked() {
	rover_model.rotateModel(RM_DOWN);
}

export function modelLeftCLicked() {
	rover_model.rotateModel(RM_LEFT);
}

export function modelRightClicked() {
	rover_model.rotateModel(RM_RIGHT);
}

export function dialMoved() {
	state.dialWheelTL.render();
	console.log("state.dialWheelTL", state.dialWheelTL.local)
	state.dialWheelTR.render();
	console.log("state.dialWheelTR", state.dialWheelTR.local)
	state.dialWheelBL.render();
	console.log("state.dialWheelBL", state.dialWheelBL.local)
	state.dialWheelBR.render();
	console.log("state.dialWheelBR", state.dialWheelBR.local)
}