/**
	* @param {string} address_and_port The address and port of your ESP32/Mock Server. Example: address_and_port="127.0.0.1:8000"
	* @param {object} data The data to be sent.
*/
import formatObject from "./format.js";

export default function sendXHR(address_and_port, endpoint, data, callbackFunction = blankFunction) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("error", xhrError);
    const body = data ? formatObject(data) : undefined;
    xhr.open("POST", `http://${address_and_port}/${endpoint}?data=${body}`);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            callbackFunction(xhr.responseText);
        }
    }

    xhr.send();
}

function xhrError() {
	//Placeholder error function. To be replaced eventually.
	console.log("Error: sending XHR Failed.");
}

//Blank function, in case use of XHR does not require response.
function blankFunction(param) {
    //
}