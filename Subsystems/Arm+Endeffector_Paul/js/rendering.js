import {
    CS_DISCONNECTED,
    CS_CONNECTING,
    CS_CONNECTED,

    PS_OFF,
    PS_ON,

    CI_NONE,
    CI_ELBOW,
    CI_WRIST,

    CM_MOUSE,
    CM_PREVIEW,
    CM_MIMIC,

    GS_OFF,
    GS_ON,

    state
} from "./model.js"



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

const setPrimary = setBtn.bind(null, 'btn-primary');
const setSecondary = setBtn.bind(null, 'btn-secondary');
const setDanger = setBtn.bind(null, 'btn-danger');

const setPrimaries = setBtns.bind(null, setPrimary);
const setSecondaries = setBtns.bind(null, setSecondary);
const setDangers = setBtns.bind(null, setDanger);

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

function focusBtn(el, btn) {
    for (const label of el.querySelectorAll('*[class~=btn]')) {
        label.classList.remove('active');
    }
    btn.classList.add('active');
}

function renderConnection() {
    const hostField = document.getElementById('host');
    const connectBtn = document.getElementById('connect');

    const robotConnectionIcon = document.getElementById('robot-connection-icon');
    const robotConnectionErrorMsg = document.getElementById('robot-connection-error-msg');
    const mimicConnectionIcon = document.getElementById('mimic-connection-icon');

    switch (state.robotConnectionState) {
        case CS_DISCONNECTED:
            hostField.disabled = false;
            connectBtn.innerText = 'Connect';
            setPrimary(connectBtn);
            break;
        case CS_CONNECTING:
            hostField.disabled = true;
            connectBtn.innerText = 'Stop connecting';
            setDanger(connectBtn);
            break;
        case CS_CONNECTED:
            hostField.disabled = true;
            connectBtn.innerText = 'Disconnect';
            setDanger(connectBtn);
            break;
    }

    if (state.robotConnectionErrored) {
        robotConnectionErrorMsg.classList.remove('d-none');
    } else {
        robotConnectionErrorMsg.classList.add('d-none');
    }

    renderConnectionIcon(robotConnectionIcon, state.robotConnectionState);
    renderConnectionIcon(mimicConnectionIcon, state.mimicConnectionState);
}

function renderConnectionIcon(el, state) {
    switch (state) {
        case CS_DISCONNECTED:
            el.className = 'icon fa fa-minus-circle icon-red';
            break;
        case CS_CONNECTING:
            el.className = 'icon fa fa-refresh fa-spin icon-yellow';
            break;
        case CS_CONNECTED:
            el.className = 'icon fa fa-check-circle icon-green';
            break;
    }
}

function renderPower() {
    const powerBtns = document.getElementById('power-btns');
    const powerOffBtn = document.getElementById('power-off');
    const powerOnBtn = document.getElementById('power-on');

    const camIdBtns = document.getElementById('cam-id-btns');
    const camNoneBtn = document.getElementById('cam-id-none');
    const camElbowBtn = document.getElementById('cam-id-elbow');
    const camWristBtn = document.getElementById('cam-id-wrist');

    setSecondaries(powerBtns);
    disableBtns(powerBtns);

    setSecondaries(camIdBtns);
    disableBtns(camIdBtns);

    state.dialCamShoulder.disabled = true;
    state.dialCamElbow.disabled = true;

    state.dialCamShoulder.render();
    state.dialCamElbow.render();

    if (state.robotConnectionState !== CS_CONNECTED) {
        return;
    }

    enableBtns(powerBtns);

    switch (state.powerState) {
        case PS_OFF:
            setPrimaries(powerBtns);
            focusBtn(powerBtns, powerOffBtn);
            break;
        case PS_ON:
            setSecondaries(powerBtns);
            focusBtn(powerBtns, powerOnBtn);
            break;
    }

    if (state.powerState !== PS_ON) {
        return;
    }

    setPrimaries(camIdBtns);
    enableBtns(camIdBtns);

    switch (state.camId) {
        case CI_NONE:
            focusBtn(camIdBtns, camNoneBtn);
            break;
        case CI_ELBOW:
            focusBtn(camIdBtns, camElbowBtn);
            break;
        case CI_WRIST:
            focusBtn(camIdBtns, camWristBtn);
            break;
    }

    state.dialCamShoulder.disabled = false;
    state.dialCamElbow.disabled = false;

    state.dialCamShoulder.render();
    state.dialCamElbow.render();
}

function renderHealth() {
    const log = document.getElementById('log');

    const isAtBottom = log.scrollTop + log.clientHeight === log.scrollHeight;

    log.value = state.printMessages.join('\n');

    if (isAtBottom) {
        log.scrollTop = 999999;
    }

    state.currentChart.update({
        series: [{
            name: 'mA',
            data: state.currentHistories
        }]
    });
}

function renderControl() {
    const ctrlModeBtns = document.getElementById('ctrl-mode-btns');
    const ctrlMouseBtn = document.getElementById('ctrl-mouse');
    const ctrlPreviewBtn = document.getElementById('ctrl-preview');
    const ctrlMimicBtn = document.getElementById('ctrl-mimic');

    const ctrlGimbalBtns = document.getElementById('ctrl-gimbal-btns');
    const ctrlGimbalOffBtn = document.getElementById('ctrl-gimbal-off');
    const ctrlGimbalOnBtn = document.getElementById('ctrl-gimbal-on');

    const ctrlResetBtn = document.getElementById('ctrl-reset');

    setSecondaries(ctrlModeBtns);
    disableBtns(ctrlModeBtns);

    setSecondaries(ctrlGimbalBtns);
    disableBtns(ctrlGimbalBtns);

    setSecondary(ctrlResetBtn);
    disableBtn(ctrlResetBtn);

    state.dialBase.disabled = true;
    state.dialShoulder.disabled = true;
    state.dialElbow.disabled = true;
    state.dialWrist.disabled = true;
    state.dialWristRot.disabled = true;

    state.dialBase.render();
    state.dialShoulder.render();
    state.dialElbow.render();
    state.dialWrist.render();
    state.dialWristRot.render();

    if (state.robotConnectionState !== CS_CONNECTED) {
        return;
    }

    if (state.powerState !== PS_ON) {
        return;
    }

    setPrimaries(ctrlModeBtns);
    enableBtns(ctrlModeBtns);

    setPrimaries(ctrlGimbalBtns);
    enableBtns(ctrlGimbalBtns);

    switch (state.ctrlMode) {
        case CM_MOUSE:
            focusBtn(ctrlModeBtns, ctrlMouseBtn);

            setPrimary(ctrlResetBtn);
            enableBtn(ctrlResetBtn);

            state.dialBase.disabled = false;
            state.dialShoulder.disabled = false;
            state.dialElbow.disabled = false;
            state.dialWrist.disabled = false;
            state.dialWristRot.disabled = false;
            break;
        case CM_PREVIEW:
            focusBtn(ctrlModeBtns, ctrlPreviewBtn);
            break;
        case CM_MIMIC:
            focusBtn(ctrlModeBtns, ctrlMimicBtn);
            break;
    }

    switch (state.gimbalState) {
        case GS_OFF:
            focusBtn(ctrlGimbalBtns, ctrlGimbalOffBtn);
            break;
        case GS_ON:
            focusBtn(ctrlGimbalBtns, ctrlGimbalOnBtn);
            state.dialWrist.disabled = true;
            break;
    }

    state.dialBase.render();
    state.dialShoulder.render();
    state.dialElbow.render();
    state.dialWrist.render();
    state.dialWristRot.render();
}

function render() {
    renderConnection();
    renderPower();
    renderHealth();
    renderControl();
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
