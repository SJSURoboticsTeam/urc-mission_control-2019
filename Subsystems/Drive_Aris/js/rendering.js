import {
	state,

	WHEEL_POSITIONS,

	CS_DISCONNECTED,
	CS_CONNECTING,
	CS_CONNECTED,

	PS_OFF,
	PS_ON,

    DM_SPIN,
    DM_CRAB,
    DM_DEBUG,
    DM_TANK
} from './model.js';

export const setPrimary = setBtn.bind(null, 'btn-primary');
export const setSecondary = setBtn.bind(null, 'btn-secondary');
export const setDanger = setBtn.bind(null, 'btn-danger');

const setPrimaries = setBtns.bind(null, setPrimary);
const setSecondaries = setBtns.bind(null, setSecondary);
const setDangers = setBtns.bind(null, setDanger);

function setBtns(setter, el) {
    for (const btn of el.querySelectorAll('*[class~=btn')) {
        setter(btn);
    }
}

function setBtn(btnClass, btn) {
    btn.classList.remove('btn-primary');
    btn.classList.remove('btn-secondary');
    btn.classList.remove('btn-danger');
    btn.classList.add(btnClass);
}

function enableBtn(btn) {
    btn.classList.remove('disabled');
    btn.disabled = false;
}

function disableBtn(btn) {
    btn.classList.add('disabled');
    btn.disabled = true;
}

function enableBtns(el) {
    for (const label of el.querySelectorAll('*[class~=btn]')) {
        label.classList.remove('disabled');
    }
    for (const label of el.querySelectorAll('*[type=radio]')) {
        label.disabled = false;
    }
}

function disableBtns(el) {
    for (const label of el.querySelectorAll('*[class~=btn]')) {
        label.classList.add('disabled');
    }
    for (const label of el.querySelectorAll('*[type=radio]')) {
        label.disabled = true;
    }
}

function setConnectionIcon(iconClass) {
    const icon = document.getElementById('connection-icon');
    icon.className = 'icon fa ' + iconClass;
}

function renderConnection() {
    const hostField = document.getElementById('host');
    const connectBtn = document.getElementById('connect-ESP');
    switch (state.connection_state) {
        case CS_DISCONNECTED:
            hostField.disabled = false;
            connectBtn.innerText = 'Connect';
            setSecondaries(connectBtn);
            setConnectionIcon('fa-minus-circle icon-red');
            break;
        case CS_CONNECTING:
            hostField.disabled = true;
            connectBtn.innerText = 'Stop connecting';
            setDanger(connectBtn);
            setConnectionIcon('fa-refresh fa-spin icon-yellow');
            break;
        case CS_CONNECTED:
            hostField.disabled = true;
            connectBtn.innerText = 'Disconnect';
            setDanger(connectBtn);
            setConnectionIcon('fa-check-circle icon-green');
            break;
    }
}

export function renderDriveModes() {
	let driveBtns = document.getElementById("drive-btns");
	disableBtns(driveBtns);
	setSecondaries(driveBtns);

	if (state.connection_state === CS_CONNECTED) {
        enableBtns(driveBtns);

        switch(state.drive_mode) {
            case DM_TANK:
                setPrimary(document.getElementById("tank-mode"));
                break;
            case DM_SPIN:
                setPrimary(document.getElementById("spin-mode"));
                break;
            case DM_DEBUG:
                setPrimary(document.getElementById("debug-mode"));
                break;
        }
	}


    	
}

function renderSpeed() {
	switch (state.connection_state) {
		case CS_DISCONNECTED:
			WHEEL_POSITIONS.forEach((position) => {
				let speed_slider = document.getElementById(`speed_slider_${position}`);
				speed_slider.setAttribute("data-slider-enabled", "false");
			});
			break;
		case CS_CONNECTING:
			WHEEL_POSITIONS.forEach((position) => {
				let speed_slider = document.getElementById(`speed_slider_${position}`);
				speed_slider.setAttribute("data-slider-enabled", "false");
			});
			break;
		case CS_CONNECTED:
			WHEEL_POSITIONS.forEach((position) => {
				let speed_slider = document.getElementById(`speed_slider_${position}`);
				speed_slider.setAttribute("data-slider-enabled", "TRUE");
			});
			break;
	}
}

function renderDirection() {
	// let directionBtns = document.getElementById("direction-btns");
	// disableBtns(directionBtns);
	// setSecondaries(directionBtns);

	// if (state.connection_state === CS_CONNECTED && state.power_state === PS_ON) {
	// 	enableBtns(directionBtns);
	// 	setPrimaries(directionBtns);
	// }	
}

function renderPower() {
    let powerBtns = document.getElementById("power-btns");
    let powerOff = document.getElementById("power-off");
    let powerOn = document.getElementById("power-on");

	switch (state.connection_state) {
        case CS_DISCONNECTED:
            disableBtns(powerBtns);
            setSecondaries(powerBtns);
            break;
        case CS_CONNECTING:
            disableBtns(powerBtns);
            setSecondaries(powerBtns);
            break;
        case CS_CONNECTED:
            enableBtns(powerBtns);
            if (state.power_state == PS_ON) {
                setPrimary(powerOn);
                setSecondary(powerOff);
            } else {
                setDanger(powerOff);
                setSecondary(powerOn);
            }
            break;
	}	
}

// function renderDials() {
//     state.dialWheelTL.render();
//     state.dialWheelTR.render();
//     state.dialWheelBL.render();
//     state.dialWheelBR.render();
// }

function renderSensorData() {
    document.getElementById("longitude").innerHTML = "Longitude: " + state.longitude;
    document.getElementById("latitude").innerHTML = "Latitude: " + state.latitude;
    document.getElementById("heading").value = state.heading;
}

function render() {
	renderConnection();
	renderDriveModes();
	renderSpeed();
    renderDirection();
    renderSensorData();
    // renderPower();
    // renderDials();
}

export function rerender() {
    if (state.rerendering) {
        return;
    }

    state.rerendering = true;

    requestAnimationFrame(() => {
        state.rerendering = false;
        render();
    });
}