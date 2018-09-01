import handlers from './event_handlers.js';

//global variable
var GPS_latitude;
var GPS_longitude;
var Point_latitude;
var Point_longitude;
var Point_counter;

var drive_data = {
      MS1:0,
      MS2:0,
      MS3:0,
      MS4:0,
      SA1:0,
      SA2:0,
      SA3:0,
      SA4:0,
      M:  1,
      DW: 0,
      BRAKE: 0,
      PIEZO: 0,
      timestamp:0
    };

function main() {
    addButtonListener('connect-esp', handlers.connectESP);
    addButtonListener('connect-video', handlers.connectVideo);
    addButtonListener('read-from-file', handlers.readFromFile);
    addButtonListener('lat-lng', handlers.latLng);
    addButtonListener('autonomy-switch', handlers.toggleAutonomy);
    addButtonListener('computer-vision-switch', handlers.toggleComputerVision);
    addButtonListener('depth-perception-toggle', handlers.toggleDepthPerception);

    initVideoStream();
    readSSE();
}

function addButtonListener(button_id, callbackFunction) {
    document.getElementById(button_id).addEventListener('click', callbackFunction);
}

function initVideoStream() {
    var video = document.getElementById('video');
    var vendorUrl = window.URL || window.webkitURL;

    navigator.getMedia = navigator.getUserMedia|| navigator.getUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;


    navigator.getMedia({
        video: true,
        audio: false
    }, function (stream){
        video.src = vendorUrl.createObjectURL(stream);
        video.play();
    }, function(error){
        console.log(error);
    });
};
//End Camera

//Map
// var onlineMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// });

var offlinemap = L.tileLayer('../../../APIs_Frameworks/leaflet/static_map/{z}/{x}/{y}.png', {
    maxNativeZoom: 18,
    maxZoom: 22
})

var mymap = L.map('mapid',{
    center: [38.4064092, -110.791895],
    zoom: 10,
    layers: offlinemap
});
//End Map

var destinationMarkers = new Array();

function userInput(coordinates){
    // var a = parseFloat(coordinates[0]);
    // var b = parseFloat(coordinates[1]);
    
    var a = DegtoDec(coordinates[0]);
    var b = DegtoDec(coordinates[1]);
    Point_longitude = b;
    Point_latitude  = a;
    
    var userMarker = L.marker([a, b]);
    mymap.addLayer(userMarker);
    //destinationMarkers[userMarker._leaflet_id] = userMarker;   
    destinationMarkers.push(userMarker); 
    userMarker.bindPopup("I am at " + userMarker.getLatLng().toString());
}

//convert Degree to Decimal GPS
function DegtoDec(coordinate){
    console.log("coordinate " + coordinate);
    var buffer = coordinate.split("-");
    var result = parseInt(buffer[0])+(parseInt(buffer[1])/60)+(parseInt(buffer[2])/3600);
    return result;
}

//Getting GPS Coordinates of Destination Markers
mymap.on('click', onMapClick);
function onMapClick(e) {
    var marker = new L.Marker(e.latlng, {draggable:true}); 
    mymap.addLayer(marker);
    //destinationMarkers[marker._leaflet_id] = marker;
    destinationMarkers.push(marker);
    var latlng = marker.getLatLng().toString();
    
    marker.bindPopup("You dropped me at " + latlng + " " +
    "<input type='button' value='Delete' class='marker-delete-button'/>").openPopup();
    
    marker.on('dragend', function (e) {
        latlng = marker.getLatLng().toString();
        marker._popup.setContent("You dragged me to " + latlng + " " +
    "<input type='button' value='Delete' class='marker-delete-button'/>")
        //destinationMarkers[marker._leaflet_id] = marker;
        destinationMarkers.push(marker);
    }); 
    marker.on("popupopen", deletingMarker);
}

//Getting Laptop GPS coordinate
// mymap.locate({setView: true, maxZoom: 16});
// function onLocationFound(e) {
//     var radius = e.accuracy / 2;

//     L.marker(e.latlng).addTo(mymap)
//         .bindPopup("You are within " + radius + " meters from this point").openPopup();

//     L.circle(e.latlng, radius).addTo(mymap);
// }

// mymap.on('locationfound', onLocationFound);
// function onLocationError(e) {
//     alert(e.message);
// }

// mymap.on('locationerror', onLocationError);
//End Getting Laptop GPS coordinate

//Removing Marker Function
function deletingMarker(e){
    console.log(destinationMarkers);
    var tempMarker = this;
    $(".marker-delete-button:visible").click(function () {
        delete destinationMarkers[tempMarker._leaflet_id];
            console.log(destinationMarkers);
        destinationMarkers.splice( destinationMarkers.indexOf(tempMarker), 1 );
        mymap.removeLayer(tempMarker);
            console.log(destinationMarkers);

    });
}
//End Removing Marker Function


//Rover Starting Point
var roverMarker = L.marker([38.406409,-110.791895], {draggable: true}).addTo(mymap);
var roverLocation = roverMarker.getLatLng();
roverMarker.bindPopup("Rover's coordinates: " + roverLocation.toString());
//End Rover Starting Point

//Rover Moving
roverMarker.on('dragend', function(e){
    roverLocation = roverMarker.getLatLng();
    roverMarker._popup.setContent("Rover's coordinates: " + roverLocation.toString());
    
    document.getElementById("roverGPS").value = roverLocation.toString();
    for (var i = 0; i < destinationMarkers.length; i++){
        if (destinationMarkers[i]){
            elementLatLng = destinationMarkers[i].getLatLng().toString();
            var distance = roverLocation.distanceTo(destinationMarkers[i].getLatLng());
            destinationMarkers[i]._popup.setContent("My location is " + elementLatLng + ". My Distance from Rover is " + distance
            + " meters " + "<input type='button' value='Delete' class='marker-delete-button'/>")
            destinationMarkers[i].on("popupopen", deletingMarker);
        }        
    }
    for (var i = 0 ; i < destinationMarkers.length; i ++){
        if (destinationMarkers[i]){
            document.getElementById('destinationGPS').value = destinationMarkers[i].getLatLng().toString();
            document.getElementById('distance').value = roverLocation.distanceTo(destinationMarkers[i].getLatLng()) + " meters";
            break;
        }
    };
});

document.getElementById("roverGPS").value = roverLocation.toString();

//Autonomy Section ///////////////////////
var buffer;
var GPS_Heading = 0;
var Sensor_Heading = 0;
var Distance_differential = 0;
var Finish = "No";
var Vision_Detect = true;
const URL = 'http://192.168.0.2';

var source_ap =new EventSource(URL);
function readSSE() {
    //console.log("readSSE");
    source_ap.onopen = function(){
        //do something
    };
    source_ap.onmessage = function(event)
    {
        //console.log("RECEIVE");
        //console.log(" EVENT DATA: " + event.data);
       buffer = event.data.toString();
       buffer = buffer.split(",");
       //console.log("DATA: " + buffer[1]);
       GPS_latitude = buffer[1].split(":");
       GPS_latitude = parseFloat(GPS_latitude[1])/10000;
       GPS_longitude = buffer[2].split(":");
       GPS_longitude = parseFloat(GPS_longitude[1])/10000;
       Sensor_Heading = buffer[4].split(":");
       Sensor_Heading = parseFloat(Sensor_Heading[1]);
       console.log("Lat " + GPS_latitude + " " + GPS_longitude);
       //L.marker([GPS_latitude,GPS_longitude], {draggable: true}).addTo(mymap);
       roverMarker.setLatLng([GPS_latitude,GPS_longitude]).update();
    };
    source_ap.onerror = function(event)
    {
        source_ap.close();
        source_ap = null;
    };    
}

//orientation, roverGPS, destinationGPS, speed, distance

//End 

// Installed npm packages: jquery underscore request express
// jade shelljs passport http sys lodash async mocha chai sinon
// sinon-chai moment connect validator restify ejs ws co when
// helmet wrench brain mustache should backbone forever debug jsdom


function autoTraversal()
{
  Distance_differential = distanceGPS
  (
            GPS_latitude,
            GPS_longitude,
            Point_latitude,
            Point_longitude,
         
  );

  let autonomyValue = document.getElementById('autonomy-switch').value;
  console.log(autonomyValue);

  if(autonomyValue && !isNaN(Distance_differential))
  {

        
        console.log(GPS_longitude+" " +Point_longitude);
        console.log("Distance_differential " + Distance_differential);
        if (Distance_differential < 1.5 )
        {
          //clearAutoGPS(); //clear the interval
          Finish = "Yes";
          console.log("Finish");
          autonomyValue=0;
          Drive_Finish();
        }
        else
        {
          if(computerVisionValue == 1 && Vision_Detect == true)
          {
            pathVision();
          }
          else
          {
            pathGPS();
          }
          console.log("calling path")
          Finish = "No";
        }

  }

  else
  {
    //drive_action = "N";
    console.log("STOP");
    Drive_Stop();
  }

}

function pathGPS()
{
    var GPS_heading = headingGPS(
        GPS_latitude,
        GPS_latitude,
        Point_latitude,
        Point_longitude
    );
    //Get Tracker Headind
    var heading_differential = GPS_heading - Sensor_Heading;
    heading_differential = Math.abs(heading_differential);
    if ( heading_differential >= 20 )
    {
      console.log("Spin Right");
      Drive_Spin();
    }
    else
    {
      console.log("Go Center");
      Drive_Forward();
    }
}


function headingGPS(lat1, lng1, lat2, lng2) {
    try {
        var dLon = toRad(lng2 - lng1);
        var y = Math.sin(dLon) * Math.cos(toRad(lat2));
        var x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
            Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
        var heading = toDeg(Math.atan2(y, x));
        heading = ((heading + 360) % 360);
        heading = Math.round(heading * 1000) / 1000;
        return heading;
    } catch (e) {
        console.log(e);
        return -1;
    }
}

function distanceGPS(lat1, lng1, lat2, lng2)
{
  try
  {
    var E_radius = 6378137; //Earth radius in meter
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = E_radius * c;
    distance = Math.round(distance * 1000) / 1000;
    return distance;
  }
  catch (err)
  {
    console.log(err);
    return false;
  }
}

function pathVision()
{
  //todo
}


function toRad(deg)
{
  return deg * Math.PI / 180;
}
/*
 * conversion to degree
 */
function toDeg(rad)
{
  return rad * 180 / Math.PI;

} 

function Drive_Forward()
{
  drive_data.MS1 = 50;
  drive_data.M = 1; 
  timestamp++;
  dive_data.PIEZO = 0;

  //sendData(drive_data);
}

function Drive_Spin()
{
  drive_data.MS1 = 70;
  drive_data.M=2;
  drive_data.timestamp++;
  drive_data.PIEZO = 0;

  //sendData(drive_data);
}

function Drive_Stop()
{
  drive_data.MS1= 0;
  drive_data.M = 1;
  drive_data.PIEZO = 0;
  drive_data.timestamp++;
  //sendData(drive_data);
}

function Drive_Finish()
{
  drive_data.MS1= 0;
  drive_data.M = 1;
  drive_data.PIEZO = 1;
  drive_data.timestamp++;
}

function sendData(value)
{
  var oReq = new XMLHttpRequest();
  const URL = 'http://192.168.4.1';
  console.log(value);
  oReq.open('POST', `${URL}?data=${value}`);
  oReq.send();
}

document.addEventListener('DOMContentLoaded', main);
