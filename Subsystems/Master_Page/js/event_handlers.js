var handler_map = {};

handler_map.renderCaptainsClicked = function() {
    document.getElementById('master-container').innerHTML = "<object class='html-file' type='text/html' data='../Subsystems/Captain_Jennifer/index.html' style='width:100%'></object>";
}

handler_map.renderArmClicked = function() {
    document.getElementById('master-container').innerHTML = "<object class='html-file' type='text/html' data='../Subsystems/Arm+Endeffector_Paul/index.html' style='width:100%'></object>";
}

handler_map.renderDriveClicked = function() {
    document.getElementById('master-container').innerHTML = "<object class='html-file' type='text/html' data='../Subsystems/Drive_Aris/index.html' style='width:100%'></object>";
}

handler_map.renderIntelligentSystemsClicked = function() {
    document.getElementById('master-container').innerHTML = "<object class='html-file' type='text/html' data='../Subsystems/Intelligence_Tien/index.html' style='width:100%'></object>";
}

handler_map.renderPODSClicked = function() {
    document.getElementById('master-container').innerHTML = "<object class='html-file' type='text/html' data='../Subsystems/PODS_Aaron/index.html' style='width:100%'></object>";
}

handler_map.renderPowerSystemsClicked = function() {
    document.getElementById('master-container').innerHTML = "<object class='html-file' type='text/html' data='../Subsystems/Drive_Aris/index.html' style='width:100%'></object>";
}

handler_map.renderTrackerClicked = function() {
    document.getElementById('master-container').innerHTML = "<object class='html-file' type='text/html' data='../Subsystems/Tracker_Ziyun/index.html' style='width:100%'></object>";
}


export default handler_map;