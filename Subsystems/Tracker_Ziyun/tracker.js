import formatObject from '../../Core/js/format.js';
import sendXHR from '../../Core/js/sendXHR.js';
import sensor_data from './sensor_data.js';
import state from './model.js';

//variables
var currentcamera = 0;
var zoomnumber = 2;
var speednumber = 1;
var yawnumber = 0;
var pitchnumber = 0;

var xhr = null;
var espIPAddr;

let eventSource;

sensor_data.init();

//set up yaw circle slider 
var app1 = new Vue({
  el: '#app1',
  components: {
    circleslider: VueCircleSlider.VueCircleSlider
  },
  data: {
   val0: 0
  }
});

//set up pitch circle slider
var app2 = new Vue({
  el: '#app2',
  components: {
    circleslider: VueCircleSlider.VueCircleSlider
  },
  data: {
   val0: 0
  }
});

// 'connectesp' button clicked, 'espIPAddr' will be stored with esp32 ip address
// eventSource will be created with address
$("#connectesp").click(function() {
  espIPAddr = "http://" + $("#espIP").val();
  eventSource = new EventSource(espIPAddr);
});

// 'connectcamera' button clicked, 'cameraIPAddr' will be stored with camera address
$("#connectcamera").click(function() {
  document.getElementById("video").src = `http://${$("#cameraIP").val()}:8081`;
});

$("#latlng-dms").click(function() {
  let lat_degrees = parseInt(document.getElementById("lat-degrees").value);
  let lat_minutes = parseInt(document.getElementById("lat-minutes").value);
  let lat_seconds = parseInt(document.getElementById("lat-seconds").value);
  let lat_hemisphere = document.getElementById("lat-hemisphere").value;

  let lat_decimal = convertDMSToDD(lat_degrees, lat_minutes, lat_seconds, lat_hemisphere);

  let lng_degrees = parseInt(document.getElementById("lng-degrees").value);
  let lng_minutes = parseInt(document.getElementById("lng-minutes").value);
  let lng_seconds = parseInt(document.getElementById("lng-seconds").value);
  let lng_hemisphere = document.getElementById("lng-hemisphere").value;

  let lng_decimal = convertDMSToDD(lng_degrees, lng_minutes, lng_seconds, lng_hemisphere);
  
  //Flipped, IDK
  state.longitude = lat_decimal;
  state.latitude = lng_decimal;

  updateCurrentPosition();
});

// Ziyun's XHR. Ari is using core's version of it.
function sendXHRLocal(path, data) {
    xhr = new XMLHttpRequest();
    const body = data ? formatObject(data) : undefined;
    xhr.open('POST', espIPAddr + "/?data=" + body);
    xhr.send(body);
}

//current camera selection
// if camera1 is clicked, command 3 & currentcamera = 1 will be sent
// if camera2 is clicked, command 3 & currentcamera = 2 will be sent
$( "#camera1" ).click(function() {
  $('#currentcamera').text('Current Camera is # 1');
  currentcamera = 1;
  sendXHRLocal(null, {
    command: 3,
    number: currentcamera
  });
});
$( "#camera2" ).click(function() {
  $('#currentcamera').text('Current Camera is # 2');
  currentcamera = 2;
  sendXHRLocal(null, {
    command: 3,
    number: currentcamera
  });
});

//zoom
// command 4 & slider value will be sent
$('#slider').slider();
$("#slider").on("slide", function(slideEvt) {
  $("#sliderVal").text(slideEvt.value);
  sendXHRLocal(null, {
    command: 4,
    number: slideEvt.value
  });
});

// yaw
// on click of send button, command 2 & yaw slider value will be sent
$( "#yawSend" ).click(function() {
  yawnumber = app1.val0;
  sendXHRLocal(null, {
    command: 2,
    number: yawnumber
  });
});

// pitch
// on click of send button, command 1 & pitch slider value will be sent
$( "#pitchSend" ).click(function() {
  //console.log($( "#pitchBox" ).val());
  pitchnumber = app2.val0;
  sendXHRLocal(null, {
    command: 1,
    number: pitchnumber
  });
});

// clear console
$( "#clear" ).click(function() {
  $('#log').val('');
});


//leaflet section
// max zoom is 18, beyond 18 picture will still be zoomed up to 22 with expanding same pixel, no more new layer
var offlinemap = L.tileLayer('../../APIs_Frameworks/leaflet/static_map/{z}/{x}/{y}.png', {
    maxNativeZoom:18,
    maxZoom:22
})

// center to 38 & -110 position
var mymap = L.map('mapid',{
    center: [38.4064092, -110.791895],
    zoom: 10,
    layers: offlinemap
});

//type in latlng to add marker
$( "#latlng" ).click(function() {
  let latlng = L.latLng($('#lat').val(), $('#lng').val());
  var marker = L.marker(latlng,{
    draggable: true
  }).addTo(mymap);

  var popup = L.popup().setContent("" + latlng + "<br>"
      + "<input type='button' value='Delete marker' class='marker-delete'/>");

  marker.bindPopup(popup);

  marker.on("popupopen", deleteMarker);
});

//add marker by click on 
mymap.on('click', function(e) {
  var marker = L.marker(e.latlng,{
    draggable: true
  }).addTo(mymap);

  var popup = L.popup().setContent("" + e.latlng + "<br>"
      + "<input type='button' value='Delete marker' class='marker-delete'/>");

  marker.bindPopup(popup);

  marker.on("popupopen", deleteMarker);
});

 //remove marker on click of delete
 function deleteMarker() {
    var tempM = this;
    $(".marker-delete:visible").click(function () {
      mymap.removeLayer(tempM);
    });
 }

//compass map
mymap.addControl( new L.Control.Compass() );

//sse receiver
var myVar = setInterval(function() {debugRecieved()}, 1000);

export function updateCurrentPosition() {
  document.getElementById("lat").value = state.longitude;
  document.getElementById("lng").value = state.latitude;
  document.getElementById("latlng").click();
  $
}

function convertDMSToDD(degrees, minutes, seconds, direction) {
  console.log("degrees", degrees);
  console.log("minutes", minutes);
  console.log("seconds", seconds);
  console.log("Direction", direction);
  var dd = degrees + (minutes/60) + seconds/(60*60);
  dd = parseFloat(dd);
  if (direction == "S" || direction == "W") {
      dd *= -1;
  } // Don't do anything for N or E
  return dd;
}

function debugRecieved(message)
{
  if (eventSource != null) {
    eventSource.onmessage = function(event) {
      console.log("event " + event.data);
      $( "#log" ).val($( "#log" ).val() + "" + event.data + "\n");
      //stays at bottom
      $("#log").scrollTop($("#log").prop('scrollHeight'));
    }
  }
}

//Event listeners for zoom level buttons
$("#zoom1x").click(() => {
  sendXHR("http://127.0.0.1:8000/changeTrackerZoom", {
    "zoom_level": 1
  }, function() {});
  flipVideo(0);
});

$("#zoom2x").click(() => {
  sendXHR("http://127.0.0.1:8000/changeTrackerZoom", {
    "zoom_level": 2
  }, function() {});
  flipVideo(1);
});

$("#zoom4x").click(() => {
  sendXHR("http://127.0.0.1:8000/changeTrackerZoom", {
    "zoom_level": 4
  }, function() {});
  flipVideo(0);
});

function flipVideo(flip_bool) {
  let video = document.getElementById('video');
  
  if (flip_bool) {
    video.style.cssText = "-moz-transform: scale(1, -1); \
      -webkit-transform: scale(1, -1); -o-transform: scale(1, -1); \
      transform: scale(1, -1);";
  } else {
    video.style.cssText = "-moz-transform: scale(1, 1); \
    -webkit-transform: scale(1, 1); -o-transform: scale(1, 1); \
    transform: scale(1, 1);";
  }
}