const path = require("path");
const config = {
    root: path.resolve(__dirname, '../../'),
    rootSrc: path.resolve(__dirname, '../../src'),
    server: {
        domain: '0.0.0.0',
        port: 82,
        image: ''
    },
    db: {
        domain: '127.0.0.1',
        port: '27017',
        username: '',
        password: '',
        dbName: 'test',
        table: {
            user: 'user',
            token: 'token',
            uid_id: 'uid_id',
            token: 'token'
        }
    },
    error: {
        401: `400 - 数据有误，请检查请求的数据是否正确. Client error`,
        403: `403 - 无访问权限，请联系管理员获取相关权限后在尝试访问. Client error`,
        404: `404 - 资源未找到，请检查网址输入是否正确. Client error`,
        500: `500 - 服务器错误，处理程序未定义. Server Error`,
        501: `501 - 请求错误，Token 验证失败，非法请求. Server Error`,
        502: '502 - 服务器错误，日志记录写入失败. Server Error',
        503: `503 - 请求错误，没有找到对应的处理程序. Server Error`,
        505: `505 - 服务器错误，数据库处理出错，请联系管理员. Server Error`,
    }

    //   { code: 400, msg: '请求错误' },
    //   { code: 401, msg: '未授权，请登录' },
    //   { code: 403, msg: '拒绝访问' },
    //   { code: 404, msg: '请求地址出错' },
    //   { code: 408, msg: '请求超时' },
    //   { code: 500, msg: '服务器内部错误' },
    //   { code: 501, msg: '服务未实现' },
    //   { code: 502, msg: '网关错误' },
    //   { code: 503, msg: '服务不可用' },
    //   { code: 504, msg: '网关超时' },
    //   { code: 505, msg: 'HTTP版本不受支持' }
}


module.exports = config;