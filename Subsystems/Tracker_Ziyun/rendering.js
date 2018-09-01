import state from "./model.js";

export function rerender() {
    renderSensorData();
}

function renderSensorData() {
    document.getElementById("heading").innerHTML = `Heading: ${state.heading}`;
    document.getElementById("longitude").innerHTML = `Longitude: ${state.longitude}`;
    document.getElementById("latitude").innerHTML = `Latitude: ${state.latitude}`;
}