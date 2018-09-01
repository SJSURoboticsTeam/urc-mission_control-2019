/*
    File: dispatcher.js
    Author: Ari Koumis
    Description: This file contains functions relevant to communication with the ESP.
*/

let dispatcher_map = {}

dispatcher_map.retrievePowerStates = function() {
    //Currently blank.
    //Would update state variable?

    console.log("Fetching power states");
}

dispatcher_map.retrieveBatteryVoltages = function() {
    //Currently blank.
    //Would update state variable?

    console.log("Fetching battery voltages");
}

dispatcher_map.retrieveHeadingAndGPS = function() {
    //Currently blank.
    //Would update state variable?

    console.log("Fetching heading and GPS coordinates");
}

export default dispatcher_map;