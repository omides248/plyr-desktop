const {contextBridge, ipcRenderer} = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    initSize: (height, width) => ipcRenderer.send('init-resize', height, width)
})


ipcRenderer.on('target', (event, src) => {
    // let p_el = document.getElementById("ptad");
    // console.log(arg)
    // p_el.innerText = arg
    // console.log('message "target" received arg:', arg)


    let video = document.getElementById('player');
    let source = document.getElementById('sourcep');
    console.log(sourcep)
    source.src = src

    // video.requestFullscreen()
    // video.mozRequestFullScreen()
    // video.webkitRequestFullscreen()
    // video.msRequestFullscreen()

    let re = /(?:\.([^.]+))?$/
    let ext = re.exec(src)[1]
    if (ext === "mp4") {
        source.type = 'video/mp4'
        let d = getPictureOfVideoOrAudio(src)
        console.log(d)
        video.setAttribute('poster', d)
        video.load()
    } else if (ext === "mp3") {
        source.type = 'audio/mp3'


        video.load()
    } else {
        console.log("Format not supported")
    }

})

function getPictureOfVideoOrAudio(src) {

    let jsmediatags = require("jsmediatags");

    jsmediatags.read(src, {
        onSuccess: function (tag) {
            console.log(tag);

            const {data, format} = tags.picture
            let base64String = "";
            for (let i = 0; i < data.length; i++) {
                base64String += String.fromCharCode(data[i]);
            }
            img.src = `data:${data.format};base64,${window.btoa(base64String)}`;
        },
        onError: function (error) {
            console.log(':(', error.type, error.info);
        }
    });

    // var tags = ID3.getAllTags(url);
    // console.log(tags);
    // document.getElementById('title').textContent = tags.title || "";
    // document.getElementById('artist').textContent = tags.artist || "";
    // document.getElementById('album').textContent = tags.album || "";
    //
    // var image = tags.picture;
    // if (image) {
    //     var base64String = "";
    //     for (var i = 0; i < image.data.length; i++) {
    //         base64String += String.fromCharCode(image.data[i]);
    //     }
    //     var base64 = "data:" + image.format + ";base64," +
    //         window.btoa(base64String);
    //     document.getElementById('picture').setAttribute('src', base64);
    // } else {
    //     document.getElementById('picture').style.display = "none";
// }
}
