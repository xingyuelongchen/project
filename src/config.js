module.exports = { 
    routeMode: "hash",  
    routePath: './', 
    storeKey: 'myaa',
    port: 80, 
    websocket: 'ws://admin.guangyizhou.cn:3000', 
    websocketDev: 'ws://admin.guangyizhou.cn:3000', 
    baseUrl: 'http://admin.guangyizhou.cn:8083',
    baseUrlDev: 'http://admin.guangyizhou.cn:8083', 
    uploadUrl: 'http://admin.guangyizhou.cn/',
    uploadUrlDev: 'http://admin.guangyizhou.cn/',
    feedUrl: 'http://192.168.32.104:80',
    feedUrlDev: 'http://192.168.32.104:80', 
    error:'\u5f53\u524d\u7a0b\u5e8f\u7248\u672c\u8fc7\u4f4e\uff0c\u8bf7\u5347\u7ea7\uff01',
    get(field) {
        if (process.env.NODE_ENV != 'development') {
            return this[field];
        } else {
            return this[field + "Dev"];
        }
    }
};
