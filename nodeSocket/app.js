const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const router = require('./bin/router');
const config = require('./bin/config');
const bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');
server.listen(config.server.port, config.server.domain, () => {
    console.log('server ', 'http://' + config.server.domain + ':' + config.server.port)
});
// 挂载 请求解析模块
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ type: 'text/plain' }));
// app.use(bodyParser.json({ type: 'application/json' }));
// app.use(bodyParser.json());

var user = {};
io.on('connection', function (socket) {
    // 初始化连接，保存连接数据
    let data = socket.handshake.query || {};
    user[socket.id] = { ...data, socketEvent: socket };
    socket.on('disconnect', () => {
        let obj = {}
        Object.keys(user).forEach(e => {
            if (e !== socket.id) obj[e] = user[e]
        });
        user = obj
    })
});
app.use(formidableMiddleware());//formdata解析模块
app.use('/favicon.ico', function () {
    return
})
app.use(express.static('src'));
app.use((req, res, next) => {
    req.socketUser = user;
    next()
})
app.use(router)
