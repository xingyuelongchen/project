const url = require('url')
module.exports = function (req, res, config) {

    try {
        ({ 'post': post, 'get': get }[req.method.toLowerCase()])(req, res, config)
    } catch (error) {
        console.log(error)
        res.info('请求错误')
    }
}
// 退出登录
function get(req, res, config) {

    let token = req.headers.cookie || req.cookies;
    let cookies = {};
    token.split('; ').forEach(e => {
        cookies[e.split('=')[0]] = e.split('=')[1];
    })
    token = cookies.user_token || '';
    if (!token) {
        res.info('user_token参数错误');
        return;
    }
    res.clearCookie("user_token");
    res.ApiDb.del({
        table: config.db.table.token,
        find: { token }
    }, (err, d) => {
        if (!err) {
            res.success({ message: '退出登录' })
        } else {
            res.error(500)
        }
    })

}
// 请求登陆
function post(req, res, config) {
    let { name, password } = req.body;
    if (!(name && password)) {
        res.info('参数传递有误');
        return;
    }
    let find = {
        table: 'user',
        find: { $or: [{ name }, { phone: name }, { email: name }] }
    }
    res.ApiDb.find(find, (err, d, count) => {
        if (d.length > 0) {
            if (d[0].password !== res.ApiMD5(password)) {
                res.info('密码错误'); return
            };
            // 生成token
            let token = res.ApiMD5(res.ApiMD5(d[0].password) + res.ApiMD5(d[0]._id));
            // 不返回敏感信息
            delete d[0].password;
            let user = d[0];

            let data = {
                domain: req.headers.host,
                token,
                maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
                user,
            }
            res.userInfo = user;
            // 向客户端添加用户user_token
            res.cookie('user_token', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

            // 查询当前账户是否已有token信息
            res.ApiDb.find({ table: config.db.table.token, token }, (err, e) => {
                if (err) {
                    res.info('登陆失败')
                    return
                }
                // 未登录，添加当前token
                if (e.length == 0) {
                    res.ApiDb.insert(config.db.table.token, data, (err, data) => {
                        res.success({ message: '登陆成功', content: user, log: { type: 'login', message: '账户登陆' } })
                    })
                }
                // 已登录，更新token
                if (e.length > 0) {
                    let option = {
                        table: config.db.table.token,
                        find: { token },
                        value: data
                    }
                    res.ApiDb.update(option, (err, data) => {
                        if (err) {
                            res.error(500);
                        } else {
                            res.success({ message: '登陆成功', content: user, log: { type: 'login', message: '账户登陆' } })
                        }
                    })
                }
            })
        } else {
            res.info('登陆失败')
        }

    })
}