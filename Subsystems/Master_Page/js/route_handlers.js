const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

var handler_map = {};

handler_map.rootHandler = function(req,res) {
    res.set("Content-Type", "text/html");
    res.sendFile(path.resolve(__dirname + '/../index.html'));
}

handler_map.trackerZoomHandler = function(req, res) {
    let zoomLevel = parseInt(req.query.data[12]);
    let ssh_param;
    
    switch(zoomLevel) {
        case 1:
            ssh_param = 0;
            break;
        case 2:
            ssh_param = 1;
            break;
        case 4:
            ssh_param = 2;
            break;
    }

    exec("ssh root@192.168.0.101 'python /usr/bin/camera_switcher/camera_switcher.py '" + ssh_param, (error, stdout, stderr) => {
        //nothing happening
        // console.log(error, stdout, stderr);
    });
}

handler_map.readFromFileHandler = function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');

    fs.readFile(__dirname + "/../../Intelligence_Tien/autonomy/testfile.txt", function(err,data) {
        if(err)
            res.send(err);
        else
            res.send(data.toString());
    });
}

module.exports = handler_map;