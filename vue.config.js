
const config = require('./src/config');
module.exports = {
    productionSourceMap: false, // 不生成.map映射文件
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].minify = false;
            return args;
        });
    },
    // publicPath: "/",
    devServer: {
        // open: true, //是否自动弹出浏览器页面
        // host: "192.168.101.102",
        // host: 'localhost',
        // port: '8080',
        // https: true,   //是否使用https协议
        // hotOnly: true, //是否开启热更新
        proxy: {
            "/api": {
                target: "http://192.168.33.10",
                ws: true,
                changeOrigin: true
                // pathRewrite: {
                //     '^/api': '/homes'
                // }
            }
        }
    }
};
