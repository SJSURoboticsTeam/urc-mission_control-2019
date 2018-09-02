import {
	gamepadConnected,
	gamepadDisconnected
} from './handlers.js';

import {
	state,
	CS_CONNECTED,
	DM_TANK,
	DM_SPIN,
	DM_CRAB,
	DM_DEBUG
} from './model.js';

import {
	sendMovement
} from './dispatcher.js';

import sendXHR from '../../../Core/js/sendXHR.js';
import { rerender } from '../../Tracker_Ziyun/rendering.js';
import { renderDriveModes } from './rendering.js';

// M1: Bottom Right
// M2: Bottom Left
// M3: Top Left
// M4: Top Right 

class Joystick {

	init() {
		window.addEventListener("gamepadconnected", gamepadConnected);
		window.addEventListener("gamepaddisconnected", gamepadDisconnected);
		window.setInterval(this.retrieveGamepadState.bind(this), 300);
	}

	/*
	The indices of the joystick are operating-system dependent. This function maps them to consistent indices.
	[x_direction, y_direction, speed_slider]
	*/
	mapJoystickIndices() {
		let joystick_indices = [];
		var OSName = "Unknown";
		if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
		else if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
		else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
		else if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
		else if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
		else if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
		else if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
		else if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
		else if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";

		if (OSName === "Linux" || OSName === "UNIX") {
			joystick_indices = [0, 1, 3];
		} else if (OSName === "Mac/iOS") {
			joystick_indices = [0, 1, 6];

		}

		return joystick_indices;
	}

	retrieveGamepadState() {
		let gp = navigator.getGamepads()[0];
		if (!state.joystick_connected || state.connection_state != CS_CONNECTED || !gp) {
			return;
		}
		
		
		let buttons = gp.buttons;
		let axes = gp.axes;
		let joystick_indices = this.mapJoystickIndices();

		//Remove y-axis inversion, moving joystick forward gives positive value
		let y_direction = -1 * gp.axes[joystick_indices[1]];
		let x_direction = gp.axes[joystick_indices[0]];

		// magnitude: range is -100 -> 100. Should only send if joystick trigger is pressed.
		let magnitude = 0;
		if (gp.buttons[0].pressed) {
			magnitude =  (-1 * gp.axes[joystick_indices[2]] * 100 + 100) / 2;
			if (y_direction <= 0) {
				magnitude *= -1;
			}
		}

		//joystick heading
		let heading = 0;
		if (x_direction) {
			heading = Math.atan(y_direction / x_direction);	
		} else {
			heading = Math.atan(y_direction / .00001);
		}
		const PI = Math.PI;

		/*
		Arctangent does not take into account different quadrants. (ex. arctan(1/1) = arctan(-1/-1))
		This can be addressed by evaluating the individual x and y coordinates.
		*/
		if (y_direction >= 0) {
			if (x_direction >= 0) {
				//quadrant 1
				heading = PI/2 - heading;
			}
			else {
				//quadrant 2
				heading = 3 * PI / 2 - heading;
			}
		}
		else {
			if (x_direction >= 0) {
				//quadrant 4
				heading = PI/2 - heading;
			}
			else {
				//quadrant 3
				heading = 3 * PI/2 - heading;
			}
		}

		/* 
		Servos only have a range of 0-180, so translating joystick heading to servo direciton requires the following actions:
	        - If y_direction is negative, (heading += 180) % 360. Also invert the magnitude.
        Also, servo direction and compass angles differ. Servo angles start on the positive horizontal axis, while compass angles start at the positive vertical axis
        */
        
        //Joystick to servo angle translation
    	if (y_direction <= 0) {
    		heading = (heading + PI) % (2 * PI);
    	}
    	//Offset compass heading to match servo heading.
    	heading = (heading + PI/2) % PI;

    	//Convert from radians to degrees
    	heading *= 180/PI;

    	//Change servo range from 0-180 to 180-0, starting from negative horizontal axis
    	heading = 180 - heading;
    	//console.log(buttons[2].value);
    	if(y_direction == 0 && x_direction == 0)
    	{
    		heading = 90;	
		}

		//Handle Button Presses
		let brake = 0;
		if(buttons[2].value == 1 && state.drive_mode != DM_SPIN) {
			state.drive_mode = DM_SPIN;
			renderDriveModes();
		}
		if (buttons[4].value == 1 && state.drive_mode != DM_TANK) { 
			state.drive_mode = DM_TANK;
			renderDriveModes();
		}

		//if(buttons[3].value == 1 && state.drive_mode != DM_DEBUG)
		//{
			//state.drive_mode = DM_DEBUG;
			//renderDriveModes();
		//}
		var piezo = 0;
		if(buttons[3].value==1)
		{
			piezo = 1;
		}

		if(buttons[1].value == 1) {
			brake = 1;
		}

		//place somewhere else later
		if (Math.abs(axes[0]) >= .80 || Math.abs(axes[1]) >= .80) {
			state.previous_heading = heading;
		} else {
			heading = state.previous_heading;
		}

		let drive_data = this.generateDriveData(magnitude, heading, brake, piezo);

		//Update UI
		// updateDials(heading);
		// updateSliders(magnitude);

		//Send to ESP
		if (state.host != "http://localhost:5001") {
			sendMovement(drive_data);
		}
	}

	generateDriveData(magnitude, heading, brake, piezo) { 
		let drive_data = {
			MS1: magnitude,
			MS2: magnitude,
			MS3: magnitude,
			MS4: magnitude,
			SA1: 0,
			SA2: 0,
			SA3: 0,
			SA4: 0,
			M: state.drive_mode,
			DW:0,
			BRAKE: brake,
			PIEZO:piezo,
			SPEED_DIVIDER: parseInt(document.getElementById("speed-divider").value),
			MAX_RPM: parseInt(document.getElementById("maximum-rpm").value),
			timestamp: state.timestamp++,
		};

		if (state.drive_mode == DM_SPIN) {
			drive_data.SA1 = 45;
			drive_data.SA2 = 135;
			drive_data.SA3 = 45;
			drive_data.SA4 = 135;
		}
		return drive_data;
	}
}

let joystick = new Joystick();
export default joystick;