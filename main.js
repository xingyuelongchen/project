const { app, BrowserWindow, ipcMain, Notification, dialog, Menu, Tray } = require('electron') // ipcMain 主线程
const { autoUpdater } = require('electron-updater')
const path = require('path');
const config = require('./src/config');
var mainWindow = null, tray = null, uploadUrl, isQuill = true;

if (app.isPackaged) {
  // 线上地址
  uploadUrl = config.uploadUrl // 更新地址 
} else {
  // 线下地址
  uploadUrl = config.uploadUrlDev // 更新地址 
}
// 初始化主进程
function init() { 
  app.whenReady().then(() => {
    // 创建桌面窗口
    createWindow();
    // 点击关闭按钮最小化到系统托盘
    mainWindow.on('close', function (event) {
      if (isQuill) {
        // 最小化到系统托盘
        mainWindow.hide();
        event.preventDefault();
      } else {
        // 右键系统托盘图标退出
        app.quit()
      }
    })
    setIpcMainList();
  });
}
// 初始化渲染进程
function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 675,
    width: 1250,
    height: 700,
    frame: true,
    webPreferences: {
      nodeIntegration: false, // 使用了预加载之后,即使nodeIntegration为false,也可以使用Node API访问到ipcRenderer
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // 更新程序
  updateHandle();
  // 初始化系统托盘图标
  closed();
  // 判断当前运行环境
  if (!app.isPackaged) {
    // 控制台
    mainWindow.webContents.openDevTools();
    // 菜单
    mainWindow.setMenu(null);
    // 在线地址
    mainWindow.loadURL(config.feedUrl);
  } else {
    mainWindow.loadFile('./dist/index.html');
  }

}
// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
  mainWindow.webContents.send('message', text)
}
// 更新处理器
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
      // 包下载完成后，重启当前的应用并且安装更新
      autoUpdater.quitAndInstall()
    })
    // 主进程向renderer进程发送是否确认更新
    mainWindow.webContents.send('isUpdateNow', versionInfo)
  })
  ipcMain.on('checkForUpdate', () => {
    // 收到renderer进程的检查通知后，执行自动更新检查 
    let checkInfo = autoUpdater.checkForUpdates()
    checkInfo.then(function (data) {
      versionInfo = data.versionInfo // 获取更新包版本等信息
    })
  })
}
// 初始化系统图标
function closed(event) {
  tray = new Tray('./favicon.ico');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开主窗口', click() {
        mainWindow.show();
      }
    },
    { label: '关闭', click() { isQuill = false; app.quit() } }
  ]);
  tray.setToolTip('广艺舟');
  tray.setContextMenu(contextMenu);
}
// 注册监听渲染进程事件
function setIpcMainList() {
  let ipcMainList = [
    {
      event: 'notification', hander(event, data) {
        mainWindow.once('focus', () => mainWindow.flashFrame(false))
        mainWindow.flashFrame(true)
        if (Notification.isSupported()) {
          let notification = new Notification({
            //标题
            title: data.data.title,
            //副标题
            subtitle: data.data.subtitle || '',
            //主题内容
            // body: data.data.message,
            //系统音
            sulent: true,
            icon: './favicon.ico',
            // 展示时间
            timeoutType: 'never',
          });
          notification.show()
        }
      }
    },
    {
      event: 'dialog', hander(data) {

        dialog.showMessageBox({
          type: 'warning', //弹出框类型
          title: '弹出框标题',
          message: '弹出框内容',
          detail: '弹出框附加内容,字体大小小一号',
          buttons: ['按钮名字1', '按钮名字2', '按钮名字3'],
        }).then(res => {
          console.log(
            res.response
          );
          // 选择按钮的索引 
        });
      }
    }
  ];
  ipcMainList.forEach(e => {
    ipcMain.on(e.event, e.hander)
  })
}
init();