module.exports = {
    // hash
    routeMode: "history",
    //打包路径
    routePath: '/',
    // 本地缓存前缀
    storeKey: 'myaa',
    // 接口URL
    baseUrl: process.env.NODE_ENV == 'development' ? '' : ''
}