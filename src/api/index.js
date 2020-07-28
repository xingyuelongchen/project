import axios from 'axios';
import config from '../config';
import { Message, Notification } from 'element-ui';
axios.defaults['baseURL'] = config.baseUrl;
axios.defaults['withCredentials'] = true;
axios.interceptors.request.use(req, reqError);
axios.interceptors.response.use(res, resError);
export default axios;
function req(config) {
    // console.log(config);
    config.method = 'post'
    return config
}
function reqError(error) {
    console.log(error);
    Message.error('错误请求，请联系管理员')
}
function res(res) {
    // console.log(res);
    if (!res.data.code) { 
        Notification.error({
            title: '错误',
            message: res.data.msg,
            // showClose: false
        })
    }
    return res
}
function resError(error) {
    Message.error('服务器响应错误，请联系管理员')
    console.log('Server Error:', error);
}

