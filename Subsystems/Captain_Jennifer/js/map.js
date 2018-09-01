let map_map = {};

map_map.init = function() {
    var offlinemap = L.tileLayer('../../../APIs_Frameworks/leaflet/static_map/{z}/{x}/{y}.png', {
        //maxNativeZoom:11,
        maxNativeZoom:18,
        maxZoom:22
        //maxNativeZoom:18
    })
    
    var mymap = L.map('map',{
        center: [38.4064092, -110.791895],
        zoom: 10,
        layers: offlinemap
    });
}

export default map_map;