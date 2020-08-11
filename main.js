const { app, BrowserWindow, ipcMain } = require('electron') // ipcMain 主线程
const { autoUpdater } = require('electron-updater')
const path = require('path');
var uploadUrl, feedUrl;
if (app.isPackaged) {
  // 线上地址
  uploadUrl = 'http://192.168.101.27/' // 更新地址
  feedUrl = 'http://192.168.101.27:8080' // 页面地址
} else {
  // 线下地址
  uploadUrl = 'http://192.168.101.27/' // 更新地址
  feedUrl = 'http://192.168.101.27:8080' // 页面地址
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 675,
    width: 1200,
    height: 675,
    webPreferences: {
      nodeIntegration: false, // 使用了预加载之后,即使nodeIntegration为false,也可以使用Node API访问到ipcRenderer
      preload: path.join(__dirname, 'preload.js')
    }
  });
  updateHandle()
  mainWindow.loadURL(feedUrl);
  mainWindow.setMenu(null);
  // 判断当前运行环境
  if (!app.isPackaged) {
    // 打开控制台
    mainWindow.webContents.openDevTools();
    // 菜单
    mainWindow.setMenu(null);
  }
  function updateHandle() {
    let message = {
      error: { status: -1, msg: '检测更新查询异常' },
      checking: { status: 0, msg: '正在检查更新...' },
      updateAva: { status: 1, msg: '检测到新版本,正在下载,请稍后' },
      updateNotAva: { status: 2, msg: '您现在使用的版本为最新版本,无需更新!' },
    }
    let versionInfo = ''
    autoUpdater.setFeedURL(uploadUrl)
    // 检测更新查询异常
    autoUpdater.on('error', function (error) {
      sendUpdateMessage(message.error)
    })
    // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', function () {
      sendUpdateMessage(message.checking)
    })
    // 当发现有可用更新的时候触发，更新包下载会自动开始
    autoUpdater.on('update-available', function (info) {
      sendUpdateMessage(message.updateAva)
    })
    // 当发现版本为最新版本触发
    autoUpdater.on('update-not-available', function (info) {
      sendUpdateMessage(message.updateNotAva)
    })
    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
      mainWindow.webContents.send('downloadProgress', progressObj)
    })
    // 包下载成功时触发
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      // 收到renderer进程确认更新
      ipcMain.on('updateNow', (e, arg) => {
        console.log('开始更新')
        autoUpdater.quitAndInstall() // 包下载完成后，重启当前的应用并且安装更新
      })
      // 主进程向renderer进程发送是否确认更新
      mainWindow.webContents.send('isUpdateNow', versionInfo)
    })

    ipcMain.on('checkForUpdate', () => {
      // 收到renderer进程的检查通知后，执行自动更新检查
      // autoUpdater.checkForUpdates()
      let checkInfo = autoUpdater.checkForUpdates()
      checkInfo.then(function (data) {
        versionInfo = data.versionInfo // 获取更新包版本等信息
      })
    })
  }

  // 通过main进程发送事件给renderer进程，提示更新信息
  function sendUpdateMessage(text) {
    mainWindow.webContents.send('message', text)
  }
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
