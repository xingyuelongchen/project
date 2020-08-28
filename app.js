const express = require('express');
const app = express();
app.listen(80, '0.0.0.0', () => {
    console.log('server ')
});
// 挂载 请求解析模块
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ type: 'text/plain' }));
// app.use(bodyParser.json({ type: 'application/json' }));
// app.use(bodyParser.json());
// app.use(formidableMiddleware());//formdata解析模块
app.use('/favicon.ico', function () {
    return
})
app.use(express.static('dist'));
// app.use(cors({ credentials: true, origin: true }));
// app.use(router)