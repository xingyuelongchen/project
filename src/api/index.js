import axios from 'axios';
import config from '../config';
import { Message, Notification } from 'element-ui';
if (process.env.NODE_ENV != 'development') {
    axios.defaults['baseURL'] = config.baseUrl;
    // axios.defaults.adapter = require('axios/lib/adapters/http');
    // axios.defaults.adapter = require('axios/lib/adapters/xhr');
};

axios.defaults['withCredentials'] = true;
axios.interceptors.request.use(req, reqError);
axios.interceptors.response.use(res, resError);

var notification = null;
var message = null;
function req(config) {
    config.method = config.url.indexOf('/verify') >= 0 ? config.method : 'post'
    return config
}
function reqError() {
    message && message.close();
    message = Message.error('错误请求，请联系管理员')
}
function res(res) {
    if (res.data.code == 0) {
        Notification.error({
            title: '错误',
            message: res.data.msg,
            // showClose: false
        })
    }
    if (res.data.code == 4) {
        notification && notification.close();
        notification = Notification({
            type: 'success',
            title: '成功',
            message: res.data.msg,
        })
    }
    return res
}
function resError(error) {
    message && message.close();
    message = Message.error('服务器响应错误，请联系管理员');
    return error

}

export default axios;
