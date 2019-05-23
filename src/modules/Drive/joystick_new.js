import {
	DM_SPIN,
	DM_CRAB,
	DM_DRIVE,
	DM_DEBUG,
	BW_A,
	BW_B,
	BW_C
} from "./model.js";

import sendXHR from "../../lib/sendXHR";

class Joystick {

	initArm(getArmState){
		window.setInterval(this.retrieveArmState.bind(this, getArmState), 1000);
	}

	initDrive(getDriveState, driveModeButtonPressed, backWheelButtonPressed, updateSpeed, updateHeading) {
		window.setInterval(this.retrieveDriveState.bind(this, getDriveState, driveModeButtonPressed, backWheelButtonPressed, updateSpeed, updateHeading), 300);
	}

	/*
	The indices of the joystick are operating-system dependent. This function detects the user's OS, and returns an object containing incidices of desired joystick data.

	NOTE: Mappings only account for Linux and Unix systems. Computers running windows are NOT supported.
	*/
	mapJoystickIndices() {
		let joystick_indices = {};
		let OSName = this.getOSName();
		let linuxOrUnix = (OSName === "Linux" || OSName === "UNIX");

		joystick_indices = {
			t_mod_up: 8,
			t_mod_down: 9,
			axis_x: 0,
			axis_y: 1,
			yaw: (linuxOrUnix ? 3 : 5),
			throttle: 2,
			brakes: (linuxOrUnix ? 4 : 6),
			trigger: 0,
			reverse: 3,
			wheel_a: 4,
			wheel_b: 5,
			wheel_c: 6,
			send_XHR: 7,
			
			/*
				Setting Drive Mode w/ Analogue Stick:
				The 8-direction analogue stick is read from differently 
				from mac vs linux machines. 

				Linux: 
				Two indices in the 'axes' array are used for the 
				x (index 5) and y (index 6)	position of	the stick.
				
				Mac:
					Only one index in the 'axes' array (index 9) is used.
			*/
			drive_mode_a: (linuxOrUnix ? 5 : 9), 
			drive_mode_b: (linuxOrUnix ? 6 : null)
		}

		return joystick_indices;
	}

	retrieveArmState(getArmState) {
		let gp = navigator.getGamepads()[0];
		let armState = getArmState();
		let joystickIndeces = this.mapJoystickIndices();

		// Check state, and status of gamepad connection
		if (!armState.joystickConnected) {
			return;
		}
		let axes = gp.axes;
		/**
		 * Wrist Index 0
		 * ElbowTarget 1
		 * ShoulderTarget 2
		 * W Roll 5
		 * RotundaTarget 6
		 */
		let armData = {
			//whateer
			WristPitch: axes[joystickIndeces[0]],
			ElbowTarget: axes[joystickIndeces[1]],
			ShoulderTarget:axes[joystickIndeces[2]],
			WristRoll: axes[joystickIndeces[5]], 
			RotundaTarget: axes[joystickIndeces[6]]
		};
		// Send to ESP
		if (armState.joystickConnected && armState.espIP !== "" && armState.espIP !== "localhost:5001") {
			sendXHR(armState.espIP, "Arm", armData);
		}
	}

	getOSName() {
		let OSName = "Unknown";

		if (window.navigator.userAgent.indexOf("Windows NT 10.0") !==-1) {
			OSName="Windows 10";
		} else if (window.navigator.userAgent.indexOf("Windows NT 6.2") !==-1) {
			OSName="Windows 8";
		} else if (window.navigator.userAgent.indexOf("Windows NT 6.1") !==-1){ 
			OSName="Windows 7";
		} else if (window.navigator.userAgent.indexOf("Windows NT 6.0") !==-1) {
			OSName="Windows Vista";
		} else if (window.navigator.userAgent.indexOf("Windows NT 5.1") !==-1){
			OSName="Windows XP";
		} else if (window.navigator.userAgent.indexOf("Windows NT 5.0") !==-1){ 
			OSName="Windows 2000";
		} else if (window.navigator.userAgent.indexOf("Mac") !==-1){ 
			OSName="Mac";
		} else if (window.navigator.userAgent.indexOf("X11") !==-1){
			OSName="UNIX";
		} else{ 
			OSName="Linux";
		}

		return OSName;
	}

	/*
		Read from all three back wheel buttons, 
		and update the drive_module_state accordingly

		buttons[4,5,6] -> wheels[a,b,c] for both Mac/Linux, however I'm
		using buttons[joystick_indices.wheel_a, ..., ...] for the
		sake of consistency with how handleDriveModeUpdates is written.
	*/
	handleBackWheelUpdates(drive_module_state, backWheelButtonPressed, joystick_indices, buttons, axes) {
		if (
			buttons[ joystick_indices.wheel_a ].value === 1
			&& drive_module_state.back_wheel != BW_A
		) {
			drive_module_state.back_wheel = BW_A;
			backWheelButtonPressed(BW_A);
		} 
		else if (
			buttons[ joystick_indices.wheel_b ].value === 1
			&& drive_module_state.back_wheel != BW_B
		) {
			drive_module_state.back_wheel = BW_B;
			backWheelButtonPressed(BW_B);
		} 
		else if (
			buttons[ joystick_indices.wheel_c ].value === 1
			&& drive_module_state.back_wheel != BW_C
		) {
			drive_module_state.back_wheel = BW_C;
			backWheelButtonPressed(BW_C);
		}
	}

	handleDriveModeUpdates(drive_module_state, driveModeButtonPressed, joystick_indices, buttons, axes) {
		let OSName = this.getOSName();
		if (OSName == "Linux" || OSName == "UNIX") {
			/*
				evaluate state left/right axis before top/bottom - may cause some precedence issues

				Axis 5: 
					left(-1) - crab
					right(1) - drive
				Axis 6: 
					up(-1) - drive
					down(1) - debug
			*/
			if (axes[ joystick_indices.drive_mode_a ] === -1 && 
				drive_module_state.drive_mode !== DM_CRAB) {

					drive_module_state.drive_mode = DM_CRAB;
					driveModeButtonPressed(DM_CRAB);
			} else if (axes[ joystick_indices.drive_mode_a ] === 1 &&
				drive_module_state.drive_mode != DM_SPIN) {

					drive_module_state.drive_mode = DM_SPIN;
					driveModeButtonPressed(DM_SPIN);
			} else if (axes[ joystick_indices.drive_mode_b ] === -1 &&
				drive_module_state.drive_mode != DM_DRIVE) {

					drive_module_state.drive_mode = DM_DRIVE;
					driveModeButtonPressed(DM_DRIVE)
			} else if (axes[ joystick_indices.drive_mode_b ] === 1 &&
				drive_module_state.drive_mode != DM_DEBUG) {

					drive_module_state.drive_mode = DM_DEBUG;
					driveModeButtonPressed(DM_DEBUG);
			}	
		} else if (OSName == "Mac") {
			/* 
				one button handles the drive mode.
				Axis 9 (aka joystick_indices[drive_mode_a] ): 
					left(.71) - crab
					right(-.43) - spin
					up(-1) - drive
					down(.14) - debug
			*/
			let dpad_val = this.toPrecision2( axes[ joystick_indices.drive_mode_a ] );
			if (dpad_val === .71 && 
				drive_module_state.drive_mode !== DM_CRAB) {
					drive_module_state.drive_mode = DM_CRAB;
					driveModeButtonPressed(DM_CRAB);
			} else if (dpad_val === -.43 &&
				drive_module_state.drive_mode != DM_SPIN) {
					drive_module_state.drive_mode = DM_SPIN;
					driveModeButtonPressed(DM_SPIN);
			} else if (dpad_val === -1 &&
				drive_module_state.drive_mode != DM_DRIVE) {
					drive_module_state.drive_mode = DM_DRIVE;
					driveModeButtonPressed(DM_DRIVE)
			} else if (dpad_val === .14 &&
				drive_module_state.drive_mode != DM_DEBUG) {
					drive_module_state.drive_mode = DM_DEBUG;
					driveModeButtonPressed(DM_DEBUG);
			}		
		} else {
			alert("ERROR: Must be on linux or unix system!" + OSName);
			return;
		}
	}

	toPrecision2(val) {
		return parseFloat(val.toPrecision(2));
	}

	retrieveDriveState(getDriveState, driveModeButtonPressed, backWheelButtonPressed, updateSpeed, updateHeading) {
		let gp = navigator.getGamepads()[0];
		let drive_module_state = getDriveState();

		// Check state, and status of gamepad connection
		if (!drive_module_state.joystick_connected || !gp) {
			return;
		}
		
		let buttons = gp.buttons;
		let axes = gp.axes;
		let joystick_indices = this.mapJoystickIndices();

		/* 
			Check if user is pressing buttons to 
			update drive mode or the back wheel 
		*/
		this.handleDriveModeUpdates(drive_module_state, driveModeButtonPressed, joystick_indices, buttons, axes);
		this.handleBackWheelUpdates(drive_module_state, backWheelButtonPressed, joystick_indices, buttons, axes);
		
		// Package drive data 
		let drive_data = {
			MODE: drive_module_state.drive_mode,
			// T_MAX: drive_module_state.throttle_max,
			T_MAX: 20,
			AXIS_X: axes[ joystick_indices.axis_x ],
			AXIS_Y: axes[ joystick_indices.axis_y ],
			YAW: axes[ joystick_indices.yaw ],
			THROTTLE: axes[ joystick_indices.throttle ],
			BRAKES: axes[ joystick_indices.brakes ],
			MAST_POSITION: 0, // temporary
			TRIGGER: buttons[ joystick_indices.trigger ].value,
			REVERSE: buttons[ joystick_indices.reverse ].value,
			WHEEL_A: (drive_module_state.back_wheel === BW_A ? 1 : 0),
			WHEEL_B: (drive_module_state.back_wheel === BW_B ? 1 : 0),
			WHEEL_C: (drive_module_state.back_wheel === BW_C ? 1 : 0)
		};

		console.log(drive_data);

		//Send to ESP
		if (
			(drive_module_state.esp_ip !== null || drive_module_state.esp_ip !== "localhost:5001") 
			&& buttons[ joystick_indices.send_XHR ].value === 1) 
		{
			sendXHR(drive_module_state.esp_ip, "handle_update", drive_data);
		}
	}
}

let joystick = new Joystick();
export default joystick;