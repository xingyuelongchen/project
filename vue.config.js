
const config = require('./src/config');
if (process.env.NODE_ENV != 'development') {
    // builder时，更新版本号
    const json = require('./package.json');
    const fs = require('fs');
    let version = json.version.split('.');
    version[version.length - 1] = version[version.length - 1] * 1 + 1;
    json.version = version.join('.');
    fs.writeFileSync('./package.json', JSON.stringify(json, null, 4));
}
module.exports = {
    productionSourceMap: false, // 不生成.map映射文件
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].minify = false;
            return args;
        });
    },
    publicPath: config.routePath,
    devServer: {
        // open: true, //自动弹出浏览器页面
        // host: "192.168.101.102",
        // host: 'localhost',
        // port: '8080',
        // https: true,   //是否使用https协议
        // hotOnly: true, //是否开启热更新
        proxy: {
            "/adminapi": {
                target: config.baseUrl,
                ws: true,
                changeOrigin: true
                // pathRewrite: {
                //     '^/api': '/homes'
                // }
            },
            "/uploads": {
                target: config.baseUrl,
                ws: true,
                changeOrigin: true
            },
            "/admin": {
                target: config.baseUrl,
                ws: true,
                changeOrigin: true
            },
            "/studyapi": {
                target: 'http://www.guangyizhou.cn',
                ws: true,
                changeOrigin: true
            }
        }
    }
};
