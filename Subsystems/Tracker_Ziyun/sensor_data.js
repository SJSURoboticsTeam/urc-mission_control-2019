const Sensor_URL_sta = 'http://192.168.0.2';
var buffer;
var Sensor_data = {
    date:0,
    longitude:0,
    latitude:0,
    heading:0,
    pitch:0,
    roll:0
};

import state from './model.js';
import { rerender } from './rendering.js';
import { updateCurrentPosition } from './tracker.js';

var sensor_map = {};

sensor_map.init = function() {
    console.log("bando")
    var Sensor_sta = new EventSource(Sensor_URL_sta);


    //console.log("readSSE");
    Sensor_sta.onopen = function(){
        //do something
        console.log("connection to sensor ESP successful");
    }

    Sensor_sta.onmessage = function(event) {
        console.log("RECEIVE");
        //console.log(" EVENT DATA: " + event.data);
        buffer  = event.data.toString();
        var string    = buffer.split(",");
        var date      = string[0].split(":");
        var longitude = string[1].split(":");
        var latitude  = string[2].split(":");
        var heading   = string[4].split(":");
        var roll      = string[5].split(":");
        var pitch     = string[6].split(":");  
        Sensor_data.date      = date[3];
        Sensor_data.longitude = longitude[1];
        Sensor_data.latitude  = latitude[1];
        Sensor_data.heading   = heading[1];
        Sensor_data.roll      = roll[1];
        Sensor_data.pitch     = pitch[1];
        console.log("DATA: " + buffer + "\n");
        //console.log(heading);

        state.longitude = Sensor_data.longitude / 10000;
        state.latitude = Sensor_data.latitude / 10000;
        state.heading = Sensor_data.heading;

        updateCurrentPosition();

        rerender();
    }

    Sensor_sta.onerror = function(event)
    {
        Sensor_sta.close();
        Sensor_sta = null;
    }; 
}

export default sensor_map;