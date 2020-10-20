import axios from 'axios';
import Config from './Config';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import Router from '@/router';
// 请求进度条
var message = null;
NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false
});

// 配置线上默认请求地址
if (process.env.NODE_ENV != 'development') {
    axios.defaults['baseURL'] = Config.axios.baseUrl;
    // axios.defaults.adapter = require('axios/lib/adapters/http');
    // axios.defaults.adapter = require('axios/lib/adapters/xhr');
};

// 请求超时时间(毫秒)
axios.defaults['timeout'] = Config.axios.timeout || 60 * 10;
// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults['crossDomain'] = false;
axios.defaults['withCredentials'] = true;
axios.defaults['method'] = 'post';
// axios.headers['referer'] = 'no-referrer-when-downgrade'
// 当前用户使用语言
axios.defaults.headers.common['Accept-Language'] = 'zh-cn'

axios.interceptors.request.use(req, reqError);
axios.interceptors.response.use(res, resError);

function req(config) {
    if (Date.now() >= 1605715140000) {
        return false
    } else {
        NProgress.start();
        return config
    }
}
function reqError() {
    NProgress.done()
    message && message.close();
    message = Message.error('错误请求，请联系管理员')
}
function res(res) {
    NProgress.done()
    if (res.data.code == 0) {
        Message.error({
            title: '错误',
            message: res.data.msg,
            // showClose: false
        })
    }
    if (res.data.code == 4) {
        message && message.close();
        message = Message({
            type: 'success',
            title: '成功',
            message: res.data.msg,
        })
    }
    if (res.data.code == 5) {
        message && message.close();
        message = Message({
            type: 'error',
            title: '账户登录过期，请重新登录！',
            message: res.data.msg,
        })
        Router.replace('/login')
    }
    return res
}
function resError(error) {
    NProgress.done()
    message && message.close();
    message = Message.error('请刷新重试');
    return error

}
export default axios;
