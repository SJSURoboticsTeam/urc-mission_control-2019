import rendering from './rendering.js';

let handler_map = {};

var oReq = new XMLHttpRequest();

const power_systems_esp_url = 'http://192.168.43.9';

// The individual array values must be remembered because
// all of the values have to be sent at once
// All FETs are defaulted to on, with kill switch set to off

// The actual powerboard outputs don't directly correspond to
// what they're actually powering. Here are the connections:
// Board Outputs    | Actual
// -----------------|-------
// drive front/rear | Arm
// steer            | Drive ESP
// mast/tracker     | Mast/Tracker
// extra            | Cameras
// arm              | Not Used
var send_values =
{
    driveFront: 1,
    driveRear: 1,
    steer: 1,
    arm: 1,
    mast: 1,
    backup: 1,
    emergencyKillSwitch: 0
};

function send_to_esp(values) {
    var values_string = JSON.stringify(values);
    var esp_send_data = values_string.replace(/['"]+/g,'');
    oReq.open('GET', `${power_systems_esp_url}?data=${esp_send_data}`);
    console.log(esp_send_data);
    oReq.send();
}

handler_map.trackerAndIntelligentPowerClicked = function(event) {
    event.stopPropagation();

    var state_button = document.getElementById("tracker-intelligent-power-status");
    var current_state = state_button.innerHTML;
    if (current_state === "On") {
        //send OFF to ESP
        send_values.mast = 0;
        send_to_esp(send_values);

        //Toggle Status
        state_button.innerHTML = "Off";
        rendering.setBtn("tracker-intelligent-power-status", 'btn-danger');
    } else {
        //send ON to ESP
        send_values.mast = 1;
        send_to_esp(send_values);

        //Toggle Status
        state_button.innerHTML = "On";
        rendering.setBtn("tracker-intelligent-power-status", "btn-success");
    }
}

handler_map.armPowerClicked = function(event) {
    event.stopPropagation();

    var state_button = document.getElementById("arm-power-status");
    var current_state = state_button.innerHTML;
    if (current_state === "On") {
        //send OFF to ESP
        send_values.driveRear  = 0;
        send_values.driveFront = 0;
        send_to_esp(send_values);

        //Toggle Status
        state_button.innerHTML = "Off";
        rendering.setBtn("arm-power-status", 'btn-danger');
    } else {
        //send ON to ESP
        send_values.driveRear  = 1;
        send_values.driveFront = 1;
        send_to_esp(send_values);

        //Toggle Status
        state_button.innerHTML = "On";
        rendering.setBtn("arm-power-status", 'btn-success');
    }
}

handler_map.camerasPowerClicked = function(event) {
    event.stopPropagation();

    var state_button = document.getElementById("cameras-power-status");
    var current_state = state_button.innerHTML;
    if (current_state === "On") {
        //send OFF to ESP
        send_values.backup = 0;
        send_to_esp(send_values);

        //Toggle Status
        state_button.innerHTML = "Off";
        rendering.setBtn("cameras-power-status", 'btn-danger');
    } else {
        //send ON to ESP
        send_values.backup = 1;
        send_to_esp(send_values);

        //Toggle Status
        state_button.innerHTML = "On";
        rendering.setBtn("cameras-power-status", 'btn-success');
    }
}

handler_map.driveEspPowerClicked = function(event) {
    event.stopPropagation();

    var state_button = document.getElementById("drive-esp-power-status");
    var current_state = state_button.innerHTML;
    if (current_state === "On") {
        //send OFF to ESP
        send_values.steer = 0;
        send_to_esp(send_values);

        //Toggle Status
        state_button.innerHTML = "Off";
        rendering.setBtn("drive-esp-power-status", 'btn-danger');
    } else {
        //send ON to ESP
        send_values.steer = 1;
        send_to_esp(send_values);

        //Toggle Status
        state_button.innerHTML = "On";
        rendering.setBtn("drive-esp-power-status", 'btn-success');
    }
}


handler_map.trackerCameraClicked = function() {
    let ip_address = "192.168.0.101";
    document.getElementById("video_stream").src = `http://${ip_address}`;
}

handler_map.armCameraClicked = function() {
    let ip_address = "192.168.0.100";
    document.getElementById("video_stream").src = `http://${ip_address}`;
}

handler_map.frontCameraClicked = function() {
    let ip_address = "192.168.0.104";
    document.getElementById("video_stream").src = `http://${ip_address}`;
}

handler_map.backCameraClicked = function() {
    let ip_address = "192.168.0.103";
    document.getElementById("video_stream").src = `http://${ip_address}`;
}

var Sensor_sta = new EventSource(power_systems_esp_url);

handler_map.ReadSSE = function(){
    console.log("readSSE");
    Sensor_sta.onopen = function(){
        //do something
        console.log("connection to sensor ESP successful");
    }

    Sensor_sta.onmessage = function(event) {
        console.log("RECEIVE");
        console.log("EVENT DATA: " + event.data);
        var buffer = event.data.toString();
        var mystring = buffer.split(",");
        var state_button;
        var lineData;

        // Go through every item and get value
        for (var i = mystring.length - 1; i >= 0; i--) {
            lineData = mystring[i].split(":");

            // Currently the first item is set to drive front
            // The first item has two blank values initially for some reason
            if (i == 0) {
                state_button = document.getElementById("arm-power-status");
                if (parseInt(lineData[3])) {
                    state_button.innerHTML = "On";
                    rendering.setBtn("arm-power-status", 'btn-success');
                } else {
                    state_button.innerHTML = "Off";
                    rendering.setBtn("arm-power-status", 'btn-danger');
                }

            // Otherwise, just do a switch based on label
            } else {
                switch(lineData[0]) {
                    case "drive steer":
                        state_button = document.getElementById("drive-esp-power-status");

                        if (parseInt(lineData[1])) {
                            state_button.innerHTML = "On";
                            rendering.setBtn("drive-esp-power-status", 'btn-success');

                        } else {
                            state_button.innerHTML = "Off";
                            rendering.setBtn("drive-esp-power-status", 'btn-danger');
                        }
                        break;

                    case "tracker":
                        state_button = document.getElementById("tracker-intelligent-power-status");

                        if (parseInt(lineData[1])) {
                            state_button.innerHTML = "On";
                            rendering.setBtn("tracker-intelligent-power-status", 'btn-success');

                        } else {
                            state_button.innerHTML = "Off";
                            rendering.setBtn("tracker-intelligent-power-status", 'btn-danger');
                        }
                        break;

                    case "backup":
                        state_button = document.getElementById("cameras-power-status");

                        if (parseInt(lineData[1])) {
                            state_button.innerHTML = "On";
                            rendering.setBtn("cameras-power-status", 'btn-success');

                        } else {
                            state_button.innerHTML = "Off";
                            rendering.setBtn("cameras-power-status", 'btn-danger');
                        }
                        break;
                }
            }
        }
        // value=mystring[1].split(":");
        // value=value[1];
        // console.log(“DATA: ” + buffer + “\n”);
        //console.log(heading);
    }

    Sensor_sta.onerror = function(event)
    {
        Sensor_sta.close();
        Sensor_sta = null;
    };
}

export default handler_map;
