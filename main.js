// Modules to control application life and create native browser window
const { app, BrowserWindow} = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

autoUpdater.checkForUpdatesAndNotify()
function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 675,
    width: 1200,
    height: 675,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.setMenu(null);
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://192.168.101.27:8080')

}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
