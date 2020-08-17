import config from '@/config.js';
import isElectron from "is-electron";
// import diaolog from '../components/diaolog';
class WS {
    constructor(options) {
        this.options = {
            hander() {
                console.log('websocket');
            }, ...options
        };
        this.ipcRenderer = window.ipcRenderer;
        this.ws = new WebSocket(config.websocket);
        this.send = (obj = '初始化链接') => {
            let msg = {
                type: null,
                data: null,
                create_time: Date.now(),
                id: JSON.parse(window.localStorage.getItem('userinfo')).id
            }
            if (typeof obj == 'object') msg.data = { msg, data: obj };
            if (typeof obj == 'string') msg.data = obj;
            msg.type = typeof obj;
            msg = JSON.stringify(msg)
            this.ws.send(msg);
        };
        this.onMessage = (data) => {
            data = JSON.parse(data.data);
            if (isElectron()) {
                this.ipcRenderer.send('notification', data);
                // this.ipcRenderer.send('dialog', data);
            }
            this.options.hander(data)
            // 弹系统信息
            if (!window.Notification) return;
            let options = { dir: "ltr", icon: '/favicon.ico', data:data.msg };
            let notification = new window.Notification(data.title, options);
            notification.onclick = function () {
                //可直接打开通知notification相关联的tab窗口
                window.focus();
            };

        };
        this.ws.onopen = () => {
            this.send('初始化链接')
            setInterval(this.send, 180000)
        };
        this.ws.onmessage = (data) => {
            this.onMessage(data)
        };
        this.ws.onerror = () => {
            console.error("连接错误");
            this.onMessage('错误信息', '连接错误，请刷新重试！')
        };
    }
}
export default WS 
