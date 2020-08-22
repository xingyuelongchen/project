const { app, BrowserWindow, ipcMain, Notification, dialog, Menu, MenuItem, Tray } = require('electron') // ipcMain 主线程
const { autoUpdater } = require('electron-updater');
const path = require('path');
const fs = require('fs');
const config = require('../src/config');
const gotTheLock = app.requestSingleInstanceLock();
const filePath = path.join(__dirname, 'store.json');
const menu = new Menu();
var mainWindow = null, tray = null, uploadUrl, isQuill = true, timer = null, zhudong = false;

if (app.isPackaged) {
  // 线上地址
  uploadUrl = config.uploadUrl // 更新地址 
} else {
  // 线下地址
  uploadUrl = config.uploadUrlDev // 更新地址 
}
init();
// 初始化主进程
function init() {
  // 是否已经在运行
  if (!gotTheLock) {
    isQuill = false;
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
        mainWindow.show()
      }
    })
  }

  // 初始化主进程
  app.setAppUserModelId('com.guangyizhou.pc');
  // 监听事件
  setIpcMainList();
  app.whenReady().then(() => {
    // 检查更新
    autoUpdater.checkForUpdates()
    // 创建桌面窗口
    createWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();

    });
    app.on('ready', function () {

    })
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
  })
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
      nodeIntegration: true, // 使用了预加载之后,即使nodeIntegration为false,也可以使用Node API访问到ipcRenderer
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 更新程序
  updateHandle();

  // 初始化系统托盘图标
  closed();
  menu.append(new MenuItem({
    // label: 'tools',
    accelerator: 'CmdOrCtrl+shift+i',
    click: () => { mainWindow.webContents.openDevTools(); }
  }))
  mainWindow.setMenu(menu);
  // 判断当前运行环境
  if (app.isPackaged) {
    mainWindow.loadFile('../dist/index.html');
    // mainWindow.loadURL(config.feedUrl);
  } else {
    // mainWindow.loadFile('../dist/index.html'); 
    mainWindow.loadURL(config.feedUrl);
  }

}
// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(message) {
  mainWindow.webContents.send('message', message)
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
    if (zhudong) sendUpdateMessage(message.updateNotAva)

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
  ipcMain.on('checkForUpdate', (event, data) => {
    // 收到renderer进程的检查通知后，执行自动更新检查
    if (data && data.type == 'zhudong') {
      zhudong = true;
    }
    let checkInfo = autoUpdater.checkForUpdates()
    checkInfo.then(function (data) {
      versionInfo = data.versionInfo // 获取更新包版本等信息
    })
  })
}
// 监听渲染事件
function setIpcMainList() {
  ipcMain.on('msg', (event, data) => {
    mainWindow.flashFrame(true);
    trayFlashing();
    if (Notification.isSupported()) {
      let notification = new Notification({
        title: data.data.title,
        sulent: true,
        icon: path.join(__dirname, 'favicon.ico'),
        // timeoutType: 'never',
      });
      notification.show();
      notification.on('click', function () {
        mainWindow.show();

      })

    }
  })
  ipcMain.on('dialog', function (event, data) {
    mainWindow.flashFrame(true);
    trayFlashing();
    if (Notification.isSupported()) {
      let notification = new Notification({
        title: data.data.title,
        sulent: true,
        icon: path.join(__dirname, 'favicon.ico'),
        // timeoutType: 'never',
      });
      notification.show();
      notification.on('click', function () {
        mainWindow.show();

      })

    }
    // dialog.showMessageBox({
    //   type: 'success', //弹出框类型
    //   title: data.title,
    //   message: data.message,
    //   detail: data.detail
    // }).then().catch()
  })
  ipcMain.on('close', function () {
    removeStore('userinfo')
    isQuill = false;
    app.quit();
  })
  ipcMain.on('setUserinfo', function (event, data) {
    // 保存当前登录用户
    setStore('userinfo', data)
  })
  ipcMain.on('getUserinfo', function (event, data) {
    // 获取用户登录信息
    let userinfo = getStore('userinfo');
    event.returnValue = userinfo;

  })
}
// 初始化系统图标
function closed() {
  tray = new Tray(path.join(__dirname, 'favicon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开窗口', click: mainWindow.show },
    { label: '退出系统', click() { isQuill = false; app.quit() } }
  ]);
  tray.on('click', () => {
    mainWindow.show();
  })
  tray.setToolTip('广艺舟');
  tray.setContextMenu(contextMenu);
}
// 托盘图标闪动
function trayFlashing() {
  let msgFlag = true;
  clearInterval(timer);
  timer = setInterval(() => {
    msgFlag = !msgFlag
    if (msgFlag) tray.setImage(path.join(__dirname, './favicon.png'));
    else tray.setImage(path.join(__dirname, './favicon.ico'));
    tray.setToolTip('您有一条新消息!');
  }, 500)
  mainWindow.once('focus', () => {
    mainWindow.flashFrame(false);
    tray.setImage(path.join(__dirname, './favicon.ico'))
    clearInterval(timer);
    timer = null;
  })
}
// 删除信息
function removeStore(type) {
  try {
    let store = fs.readFileSync(filePath, 'utf-8');
    store = JSON.parse(store);
    delete store[type];
    fs.writeFileSync(filePath, JSON.stringify(store, null, 4))
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
// 保存和修改信息
function setStore(type, data = {}) {
  try {
    let store = fs.readFileSync(filePath, 'utf-8');
    store = JSON.parse(store);
    store[type] = data;
    fs.writeFileSync(filePath, JSON.stringify(store, null, 4));
    return true;
  } catch (error) {
    console.log(error);
    return false
  }
}
// 获取信息
function getStore(type) {
  try {
    let store = fs.readFileSync(filePath, 'utf-8');
    store = JSON.parse(store);
    return store[type]
  } catch (error) {
    console.log(error);
    return {}
  }
}