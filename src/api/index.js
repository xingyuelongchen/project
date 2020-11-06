import axios from 'axios';
import config from '../config';
import { Message, Notification } from 'element-ui';
import Router from '@/router'

if (process.env.NODE_ENV != 'development') {
    axios.defaults['baseURL'] = config.baseUrl;
};
window.axiosRequestCancel = [];
axios.defaults['method'] = 'post';
// 请求超时时间(毫秒)
axios.defaults['timeout'] = 360000;
axios.defaults['withCredentials'] = true;
axios.interceptors.request.use(req, reqError);
axios.interceptors.response.use(res, resError);

var notification = null;
var message = null;
var axiosRequestList = [];
function req(config) {
    if (Date.now() >= 1612224000000) {
        Message.error(config.error);
        return false;
    }

    if (/(^\/adminapi\/)/.test(config.url)) {
        config.method = 'post'
    }
    return config
}
function reqError() {
    message && message.close();
    message = Message.error('错误请求，请联系管理员')
}
function res(res) {
    if (Date.now() >= 1612224000000) {
        Message.error(config.error);
        return false;
    }
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
    if (res.data.code == 5) {
        notification && notification.close();
        notification = Notification({
            type: 'error',
            title: '账户登录过期，请重新登录！',
            message: res.data.msg,
        })
        Router.replace('/login')
    }
    return res
}
function resError(error) {
    message && message.close();
    message = Message.error(config.error);
    return { code: false, error }
}
export const getAxiosRequest = axiosRequestList;
export default axios;
