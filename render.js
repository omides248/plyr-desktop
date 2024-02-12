var player_el = document.getElementById("player");
player_el.addEventListener("loadedmetadata", getMetaData);
// import Plyr from 'plyr';
// const player = new Plyr(player_el, {'seekTime': 2})

if (player_el.readyState >= 2) {
    getMetaData(player_el);
}

function getMetaData() {
    window.electronAPI.initSize(player_el.videoWidth, player_el.videoHeight)
}
