import {
	connectESPClicked,
	connectVideoClicked,

	powerOnClicked,
	powerOffClicked,

	carModeClicked,
	crabModeClicked,
	spinModeClicked,
	debugModeClicked,
	tankModeClicked,

	lockHeadingClicked,
	resetHeadingClicked,

	modelUpClicked,
	modelDownClicked,
	modelLeftCLicked,
	modelRightClicked,

	dialMoved
} from './handlers.js';

import {
	setupSSE
} from './dispatcher.js';

import {
	state,
	WHEEL_POSITIONS
} from './model.js';

import {
	rerender
} from './rendering.js';

import sensor_data from './sensor_data.js';

import speed_sliders from'./speed_sliders.js';
import joystick from './joystick.js';
// import rover_model from './3D_rover.js';
import scrollable_console from '../../../Core/js/scrollableConsole.js';



function addButtonListener(selector, listener) {
	document.querySelector(selector).addEventListener('click', listener);
}

function main() {
	speed_sliders.init();
	joystick.init();
	// rover_model.init();
	setupSSE();
	// scrollable_console.init();

	addButtonListener("#connect-ESP", connectESPClicked);
	addButtonListener("#connect-video", connectVideoClicked);

	// addButtonListener('#power-on', powerOnClicked);
	// addButtonListener('#power-off', powerOffClicked);

	addButtonListener('#tank-mode', tankModeClicked);
	// addButtonListener('#crab-mode', crabModeClicked);
	addButtonListener('#spin-mode', spinModeClicked);
	addButtonListener('#debug-mode', debugModeClicked);
	
	
	// addButtonListener('#lock-heading', lockHeadingClicked);
	// addButtonListener('#reset-heading', resetHeadingClicked);

	// addButtonListener("#model-up", modelUpClicked);
	// addButtonListener("#model-down", modelDownClicked);
	// addButtonListener("#model-left", modelLeftCLicked);
	// addButtonListener("#model-right", modelRightClicked);

	
	state.dialWheelTL = new Dial({ container: '#wheel-top-left', min: 0, max: 360});
	state.dialWheelTL.addEventListener('move', dialMoved);
	state.dialWheelTL.disabled = false;

	state.dialWheelTR = new Dial({ container: '#wheel-top-right', min: 0, max: 360});
	state.dialWheelTR.addEventListener('move', dialMoved);
	state.dialWheelTR.disabled = false;

	state.dialWheelBL = new Dial({ container: '#wheel-bottom-left', min: 0, max: 360});
	state.dialWheelBL.addEventListener('move', dialMoved);
	state.dialWheelBL.disabled = false;

	state.dialWheelBR = new Dial({ container: '#wheel-bottom-right', min: 0, max: 360});
	state.dialWheelBR.addEventListener('move', dialMoved);
	state.dialWheelBR.disabled = false;

	//init compass
	var compass = new Vue({
		el: '#compass',
		components: {
			circleslider: VueCircleSlider.VueCircleSlider
		},
		data: {
			val0: 0
		}
	});

	sensor_data.init();
	  
	rerender();
}

document.addEventListener('DOMContentLoaded', main);