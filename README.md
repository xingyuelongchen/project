# project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### 启动electron 调试服务
```
"dev": "electron .",
```


### 构建window平台安装包
```
"electron-build": "vue-cli-service build && electron-packager ./dist 广艺舟 --arch=x64 --icon=dist/favicon.ico  --overwrite",
```


### 构建window平台 x32 x64位安装包
```
"dist": "electron-builder"
```





### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
