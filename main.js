const { app, BrowserWindow, ipcMain, Notification, dialog, Menu, MenuItem, Tray } = require('electron') // ipcMain 主线程
const { autoUpdater } = require('electron-updater');
const path = require('path');
const fs = require('fs');
const { axios, location } = require('./src/api/Config');
const gotTheLock = app.requestSingleInstanceLock();
const filePath = path.join(__dirname, './electron/store.json');
const menu = new Menu();
var mainWindow = null,
  tray = null,
  uploadUrl = null,
  isQuill = true,
  timer = null,
  nextUpdate = false;

if (app.isPackaged) {
  // 线上地址
  uploadUrl = axios.update // 更新地址 
} else {
  // 线下地址 更新地址 
  uploadUrl = axios.update
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
  app.setAppUserModelId('com.xingyuelongchen.pc');
  // 监听事件
  setIpcMainList();
  app.whenReady().then(() => {
    // // 检查更新
    // autoUpdater.checkForUpdates()
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
    minWidth: 1300,
    minHeight: 700,
    width: 1300,
    height: 700,
    frame: true,
    icon: path.join(__dirname, './electron/favicon.ico'),
    webPreferences: {
      nodeIntegration: true, // 使用了预加载之后,即使nodeIntegration为false,也可以使用Node API访问到ipcRenderer
      preload: path.join(__dirname, './electron/preload.js')
    }
  });
  // 更新程序
  updateHandle();
  autoUpdater.checkForUpdates();
  // 初始化系统托盘图标
  closed();
  menu.append(new MenuItem({
    label: '刷新',
    accelerator: 'CmdOrCtrl+r',
    click: () => { mainWindow.webContents.reload(); }
  }))
  menu.append(new MenuItem({
    // label: 'tools',
    accelerator: 'CmdOrCtrl+shift+i',
    click: () => { mainWindow.webContents.openDevTools(); }
  }))
  mainWindow.setMenu(menu);
  // 判断当前运行环境
  if (app.isPackaged) {
    // 线上
    mainWindow.loadFile('./dist/index.html');
  } else {
    // 调试 
    let url = location.port ? location.url + ':' + location.port : location.url
    mainWindow.loadURL(url);
  }

}
// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(message) {
  mainWindow.webContents.send('message', message)
}
// 更新处理器
function updateHandle() {
  let message = {
    error: { status: -1, title: '检测更新异常', msg: '检测更新异常' },
    checking: { status: 0, title: '正在检查更新', msg: '正在检查更新...' },
    updateAva: { status: 1, title: '正在下载更新', msg: '检测到新版本,正在下载,请稍后……' },
    updateNow: { status: 2, title: '下载完成', progress: 100, msg: '安装包准备就绪，是否立即更新？' },
    updateNotAva: { status: 3, title: '检查完成', progress: 100, msg: '您现在使用的版本为最新版本，无需更新!' },
    progress: { status: 4, title: '正在下载更新', msg: '检测到新版本,正在下载,请稍后……', progress: 1 },
  }
  autoUpdater.setFeedURL(axios.update);
  autoUpdater.on('error', (info) => {
    // 更新发生错误
    sendUpdateMessage(message.error)
  });
  autoUpdater.on('checking-for-update', (info) => {
    // 开始检查更新
    sendUpdateMessage(message.checking)
  });
  autoUpdater.on('update-available', (info) => {
    // 自动下载更新
    sendUpdateMessage(message.updateAva)
  });
  autoUpdater.on('download-progress', function (progressObj) {
    // 更新下载进度
    message.progress.progress = progressObj.percent;
    sendUpdateMessage(message.progress)
  })
  autoUpdater.on('update-not-available', (info) => {
    // 当前为最新版本，无需更新
    sendUpdateMessage(message.updateNotAva)
  });
  autoUpdater.on('update-downloaded', (info) => {
    // 更新包下载完成 
    ipcMain.on('updateNow', (e, arg) => {
      // 包下载完成后，重启当前的应用并且安装更新
      autoUpdater.quitAndInstall()
    })
    ipcMain.on('nextUpdate', (e, arg) => {
      // 包下载完成后，重启当前的应用并且安装更新
      nextUpdate = true
    })
    sendUpdateMessage(message.updateNow)
  });
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
        icon: path.join(__dirname, './electron/favicon.ico'),
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
        icon: path.join(__dirname, './electron/favicon.ico'),
        // timeoutType: 'never',
      });
      notification.show();
      notification.on('click', function () {
        mainWindow.show();

      })

    }
  })
  ipcMain.on('close', function () {
    removeStore('userinfo')
    isQuill = false;
    if (nextUpdate) {
      autoUpdater.quitAndInstall()
    } else {
      app.quit();
    }
  })
  ipcMain.on('setStore', function (event, { title, data }) {
    // 保存数据
    setStore(title, data)
  })
  ipcMain.on('getStore', function (event, data) {
    // 获取数据 
    event.returnValue = getStore(data);

  })
  ipcMain.on('removeStore', function (event, data) {
    // 删除信息 
    event.returnValue = removeStore(data);

  })
  ipcMain.on('queryUpdate', function () {
    autoUpdater.checkForUpdates();
  })
}
// 初始化系统图标
function closed() {
  tray = new Tray(path.join(__dirname, './electron/favicon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开窗口', click: mainWindow.show },
    { label: '退出系统', click() { isQuill = false; app.quit() } }
  ]);
  tray.on('click', () => {
    mainWindow.show();
  })
  tray.setToolTip('管理系统');
  tray.setContextMenu(contextMenu);
}
// 托盘图标闪动
function trayFlashing() {
  let msgFlag = true;
  clearInterval(timer);
  timer = setInterval(() => {
    msgFlag = !msgFlag
    if (msgFlag) tray.setImage(path.join(__dirname, './electron/favicon.png'));
    else tray.setImage(path.join(__dirname, './electron/favicon.ico'));
    tray.setToolTip('您有一条新消息!');
  }, 500)
  mainWindow.once('focus', () => {
    mainWindow.flashFrame(false);
    tray.setImage(path.join(__dirname, './electron/favicon.ico'))
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
    return false
  }
}
