var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');
server.listen(3000, () => {
    console.log('启动成功，端口号：3000');
});
var user = {};
io.on('connection', function (socket) {
    socket.on('init', function (data) {
        data = JSON.parse(data);
        data.socketEvent = socket;
        user[data.id] = data;
    });
    socket.on('disconnect', () => {
        let obj = {}
        Object.keys(user).forEach(e => {
            if (user[e].socketEvent.id !== socket.id) obj[e] = user[e]
        });
        user = obj
    })
});




// 路由接口
app.use('/favicon.ico', (req, res) => {
    res.send('ok')
});
app.use(formidableMiddleware());//formdata解析模块 
// 发送给全部
app.use('/all', (req, res) => {
    if (!req.fields) { res.send('no'); return }
    let data = req.fields.data;
    if (data) {
        Object.keys(user).forEach(e => {
            user[e].socketEvent.emit('message', data);
        })
    }
    res.send('ok')
});
// 指定用户
app.use('/user', (req, res) => {
    if (!req.fields) { res.send('no'); return }
    let id = req.fields.uid;
    let data = req.fields.data;
    if (id && data && user[id]) {
        user[id].socketEvent.emit('message', data);
        res.send('ok')
    } else {
        res.send('no')
    }
});
// 指定部门
app.use('/dept', (req, res) => {
    if (!req.fields) { res.send('no'); return }
    let id = req.fields.department;
    let data = req.fields.data;
    if (id && data) {
        Object.keys(user).forEach(e => {
            if (user[e].department == id) {
                user[e].socketEvent.emit('message', data);
            }
        })
        res.send('ok')
    } else {
        res.send('no')
    }
});
app.use('*', (req, res) => {
    res.status(404).send('非法请求！')
})