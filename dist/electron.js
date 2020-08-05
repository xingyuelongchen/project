//主进程
// Modules to control application life and create native browser window
const {app, protocol, Menu, BrowserWindow } = require('electron')
const path = require('path')
const { readFile } = require ('fs')
const { URL } =  require ('url')

// 处理文件打包之后的访问路径为 app的相对路径,
function createProtocol(scheme) {
  protocol.registerBufferProtocol(
    scheme,
    (request, respond) => {
      let pathName = new URL(request.url).pathname
      pathName = decodeURI(pathName) // Needed in case URL contains spaces

      readFile(path.join(__dirname, pathName), (error, data) => {
        if (error) {
          console.error(`Failed to read ${pathName} on ${scheme} protocol`, error)
        }
        const extension = path.extname(pathName).toLowerCase()
        let mimeType = ''

        if (extension === '.js') {
          mimeType = 'text/javascript'
        } else if (extension === '.html') {
          mimeType = 'text/html'
        } else if (extension === '.css') {
          mimeType = 'text/css'
        } else if (extension === '.svg' || extension === '.svgz') {
          mimeType = 'image/svg+xml'
        } else if (extension === '.json') {
          mimeType = 'application/json'
        }
        respond({ mimeType, data })
      })
    },
    error => {
      if (error) {
        console.error(`Failed to register ${scheme} protocol`, error)
      }
    }
  )
}
// 防止 localStorage 不可访问
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let template = []  //顶部菜单模板
function createWindow () {
  // Create the browser window. 桌面应用的初始宽度、高度
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    
  })

  // and load the index.html of the app.
  createProtocol('app')  // 创建一个应用，访问路径的初始化
  mainWindow.loadURL('app://./index.html')  // 入口文件， 窗口指向 index.html 文件作为首页，这里可以是vue,react,angular 的打包之后的dist目录内部的index.html文件。

  //   Open the DevTools.
  //   mainWindow.webContents.openDevTools()
  let menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu) // 重新设置桌面应用的顶部菜单
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.