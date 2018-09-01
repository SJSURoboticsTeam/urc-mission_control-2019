import sendXHR from '../../../Core/js/sendXHR.js';

let handler_map = {}
let autonomyValue, computerVisionValue, depthPerceptionValue, latlng, coordinates;

handler_map.connectESP = function() {
    var state = null;
	state = "http://" + document.getElementById('host').value;
	//Take server's address and add /sse at the end. This triggers a SSE connection  
    alert("Connection Successful");
};

handler_map.readFromFile = function() {
    sendXHR("http://127.0.0.1:8000/readFromFile", {
        test: 1
    }, handleReadResponse);
}

handler_map.toggleAutonomy = function(){
    if (autonomyValue === 0 )
        autonomyValue = 1;
    else
        autonomyValue = 0;
        console.log(autonomyValue);
}

handler_map.toggleComputerVision = function(){
    if (computerVisionValue === 0)
        computerVisionValue = 1;
    else
        computerVisionValue = 0;
    console.log(computerVisionValue);        
}

handler_map.toggleDepthPerception = function(){
    if (depthPerceptionValue === 0)
        depthPerceptionValue = 1;
    else
        depthPerceptionValue = 0; 
    console.log(depthPerceptionValue);                
}

handler_map.latLng = function(){
    latlng=document.getElementById('latlng').value;
    coordinates = latlng.split(",");
    userInput(coordinates);
}

handler_map.connectVideo = function() {
    let ip_address = document.getElementById("video-address").value;
	document.getElementById("video").src = `http://${ip_address}`;
}

function handleReadResponse(response) {
    console.log(response);
}

export default handler_map;