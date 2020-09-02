module.exports = {
    // 路由模式
    routeMode: "hash", //history ,hash
    //打包路径
    routePath: './',
    // 本地缓存前缀
    storeKey: 'myaa',
    port: 80,
    // websocket
    websocket: 'ws://admin.guangyizhou.cn:3000',
    // websocketDev: 'ws://192.168.32.194:2346',
    websocketDev: 'ws://192.168.32.240:3000',
    // 接口URL
    baseUrl: 'http://admin.guangyizhou.cn:8083',
    baseUrlDev: 'http://192.168.32.194',
    // 更新地址 
    uploadUrl: 'http://admin.guangyizhou.cn/',
    uploadUrlDev: 'http://192.168.32.240',
    feedUrl: 'http://192.168.32.240',
    feedUrlDev: 'http://192.168.32.240',
    get(field) {
        if (process.env.NODE_ENV != 'development') {
            return this[field]
        } else {
            return this[field + 'Dev']
        }
    }
}