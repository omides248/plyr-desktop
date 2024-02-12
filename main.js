const {app, BrowserWindow, ipcMain} = require('electron/main')
const path = require('node:path')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'src/javascript/preload.js'),
        }
    })
    mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null)


    ipcMain.on('init-resize', (event, width, height) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        if (width <= 270) {
            width = 270
        }
        if (height <= 480) {
            height = 480
        }
        win.setContentSize(width, height)

    })

    mainWindow.loadFile('index.html')

}


app.whenReady().then(() => {
    createWindow()


    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })


    if (process.platform === "win32" && process.argv.length >= 2) {

        openFilePath = process.argv[1];
        // openFilePath = "D:\\projects\\plyr-desktop\\test\\a.mp4"
        // openFilePath = "D:\\projects\\plyr-desktop\\test\\b.mp4"
        // openFilePath = "D:\\Music and Film and Picture\\new music\\Eminem - Mockingbird [Official Music Video].mp3"
        if (openFilePath) {
            console.log(1111111111111)
            mainWindow.webContents.send('video-src', openFilePath)
            mainWindow.maximize()
        }

        // test_send_data()
    }


})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})


function test_send_data() {
    // win.webContents.send('target', "23123123123123123")
    // ipcMain.send('store-data', "123123213213213");
    // const fs = require('fs');
    // try {
    //     fs.writeFileSync('C:\\Users\\omid.esmaeili\\Desktop\\myfile2321323.txt', openFilePath, 'utf-8');
    // } catch (e) {
    //     alert('Failed to save the file !');
    // }
}