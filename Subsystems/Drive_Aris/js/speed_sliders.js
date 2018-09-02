import {
	WHEEL_POSITIONS
} from './model.js';

const speed_sliders = {
	init: function() {
		WHEEL_POSITIONS.forEach((position) => {
			$(`#speed_slider_${position}`).slider();
			$(`#speed_slider_${position}`).on("slide", (event) => {
				//Todo: update slider value somewhere on change 
				$(`#speed_${position}`)
				let data = {
					speed: event.value,
					number: undefined
				};
			});
		});
	}
};

export default speed_sliders;