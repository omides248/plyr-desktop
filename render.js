var player_el = document.getElementById("player");
player_el.addEventListener("loadedmetadata", getMetaData);

if (player_el.readyState >= 2) {
    getMetaData(player_el);
}

function getMetaData() {
    window.electronAPI.initSize(player_el.videoWidth, player_el.videoHeight)
}
