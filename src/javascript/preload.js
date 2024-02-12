const {contextBridge, ipcRenderer} = require("electron/renderer")

contextBridge.exposeInMainWorld("electronAPI", {
    initSize: (height, width) => ipcRenderer.send("init-resize", height, width)
})


ipcRenderer.on("video-src", (event, src) => {

    let video = document.getElementById("player");
    let source = document.getElementById("source-video");
    source.src = src

    let re = /(?:\.([^.]+))?$/
    let ext = re.exec(src)[1]
    if (ext === "mp4") {
        source.type = 'video/mp4'
        // video.load()
    } else if (ext === "mp3") {
        source.type = 'audio/mp3'
        // video.load()
    } else {
        console.log("Format not supported")
    }
})
