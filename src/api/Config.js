
module.exports = {
    location: {
        routeMode: "history",                   // 路由模式 (history | hash ) 
        routePath: '/',                         // 项目编译地址
        port: 8080,                             // 本地启动端口 
        https: false,                           // 是否开启HTTPS
        publicPath: '/',
        url: 'http://127.0.0.1'
    },
    axios: {                                    // axios 请求配置
        timeout: 6 * 60 * 1000,                       // 默认6分钟超时, 单位（毫秒）
        baseUrl: 'http://118.31.186.172:81',
        baseUrlDev: 'http://192.168.32.194:8081',
        socket: 'ws://118.31.186.172:82',
        update: 'http://bcrm.beilabei.com',
    },
    store: {                                    // 本地储存配置 （localstorage,sessionstorage,cookie）
        storeKey: 'sokepid',                    // 本地缓存前缀信息
        namespaced: false,                      // 是否开启命名空间， vuex 配置
        maxage: 1 * 24 * 60 * 60,               // 缓存有效期, 单位（秒） 
        // doamin: '.youzhemei.cn',               // 设置有效域名
        doamin: '.beilabei.com',               // 设置有效域名
    }
}