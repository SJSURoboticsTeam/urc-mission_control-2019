const express = require('express');
const path = require('path');
const exec = require('child_process').exec;
const app = express();

const handlers = require('./route_handlers.js');

app.get('/', handlers.rootHandler);

app.post('/changeTrackerZoom', handlers.trackerZoomHandler);

app.post('/readFromFile', handlers.readFromFileHandler);

app.use(express.static(path.join(__dirname, '../../..')));

app.listen(8000, () => console.log("MC Hosted on Port 8000"));