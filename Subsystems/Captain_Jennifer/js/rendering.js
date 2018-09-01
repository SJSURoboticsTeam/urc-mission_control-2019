/*
    File: rendering.js
    Author: Ari Koumis
    Description: This file contains functions relevant to updating the captain page's UI.
*/

let rendering_map = {}

rendering_map.setBtn = function(button_id, new_style) {
    let button = document.getElementById(button_id);

    button.classList.remove('btn-success');
    button.classList.remove('btn-danger');
    button.classList.add(new_style);
}

export default rendering_map;