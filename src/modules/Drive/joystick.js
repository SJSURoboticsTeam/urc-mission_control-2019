import {
	CS_CONNECTED,
	DM_SPIN,
	DM_CRAB,
	DM_DRIVE,
	DM_DEBUG,
	BW_A,
	BW_B,
	BW_C
} from './model.js';

import sendXHR from "../../lib/sendXHR";

class Joystick {

	init(getDriveState, joyStickButtonPressed, updateSpeed, updateHeading) {
		window.setInterval(this.retrieveGamepadState.bind(this, getDriveState, joyStickButtonPressed, updateSpeed, updateHeading), 300);
	}

	/*
	The indices of the joystick are operating-system dependent. This function maps them to consistent indices.
	[x_direction, y_direction, speed_slider]
	*/
	mapJoystickIndices() {
		let joystick_indices = [];
		var OSName = "Unknown";
		if (window.navigator.userAgent.indexOf("Windows NT 10.0")!==-1) OSName="Windows 10";
		else if (window.navigator.userAgent.indexOf("Windows NT 6.2") !==-1) OSName="Windows 8";
		else if (window.navigator.userAgent.indexOf("Windows NT 6.1") !==-1) OSName="Windows 7";
		else if (window.navigator.userAgent.indexOf("Windows NT 6.0") !==-1) OSName="Windows Vista";
		else if (window.navigator.userAgent.indexOf("Windows NT 5.1") !==-1) OSName="Windows XP";
		else if (window.navigator.userAgent.indexOf("Windows NT 5.0") !==-1) OSName="Windows 2000";
		else if (window.navigator.userAgent.indexOf("Mac")            !==-1) OSName="Mac/iOS";
		else if (window.navigator.userAgent.indexOf("X11")            !==-1) OSName="UNIX";
		else if (window.navigator.userAgent.indexOf("Linux")          !==-1) OSName="Linux";

		if (OSName === "Linux" || OSName === "UNIX") {
			joystick_indices = [0, 1, 3];
		} else if (OSName === "Mac/iOS") {
			joystick_indices = [0, 1, 6];

		}

		return joystick_indices;
	}

	retrieveGamepadState(getDriveState, joystickButtonPressed, updateSpeed, updateHeading) {
		let gp = navigator.getGamepads()[0];
		let drive_module_state = getDriveState();

		if (!drive_module_state.joystick_connected || !gp) {
			return;
		}
		
		let buttons = gp.buttons;
		let axes = gp.axes;
		let joystick_indices = this.mapJoystickIndices();
		
		// Handle drive mode changes from joystick
		if (buttons[2].value === 1 && drive_module_state.drive_mode !== DM_CRAB) { 
			drive_module_state.drive_mode = DM_CRAB;
			joystickButtonPressed(DM_CRAB);
		} else if (buttons[3].value === 1 && drive_module_state.drive_mode !== DM_DEBUG) { 
			drive_module_state.drive_mode = DM_DEBUG;
			joystickButtonPressed(DM_DEBUG);
		} else if(buttons[4].value === 1 && drive_module_state.drive_mode !== DM_SPIN) {
			drive_module_state.drive_mode = DM_SPIN;
			joystickButtonPressed(DM_SPIN);
		} else if(buttons[5].value === 1 && drive_module_state.drive_mode !== DM_DRIVE) {
			drive_module_state.drive_mode = DM_DRIVE;
			joystickButtonPressed(DM_DRIVE);
		}
		
		// Package drive data 
		let drive_data = {
			mode: drive_module_state.drive_mode,
			AXIS_0: axes[joystick_indices[0]],
			AXIS_1: axes[joystick_indices[1]],
			AXIS_3: axes[joystick_indices[2]],
			button_0: buttons[0].value,
			wheel_A: (drive_module_state.back_wheel === BW_A ? 1 : 0),
			wheel_B: (drive_module_state.back_wheel === BW_B ? 1 : 0),
			wheel_C: (drive_module_state.back_wheel === BW_C ? 1 : 0),
			mast_position: 0
		};
		// console.log(drive_data);
		console.log(drive_module_state);

		//Update UI
		// updateSpeed(magnitude);
		// updateHeading(heading);
		// updateDials(heading);
		// updateSliders(magnitude);
		// updateDials(heading);
		// updateSliders(magnitude);

		//Send to ESP
		if (drive_module_state.esp_ip !== null || drive_module_state.esp_ip !== "localhost:5001") {
			sendXHR(drive_module_state.esp_ip, "handle_update", drive_data);
		}
	}
}

let joystick = new Joystick();
export default joystick;