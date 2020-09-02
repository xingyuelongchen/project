import IO from 'socket.io-client';
import config from '@/config.js';
import isElectron from "is-electron";
import Store from '@/store';
export default function (callback) {
    let socketUrl = config.get('websocket')
    let msg = {
        type: 'init',
        data: null,
        create_time: Date.now(),
        id: JSON.parse(window.localStorage.getItem('userinfo')).id,
        department: JSON.parse(window.localStorage.getItem('userinfo')).department || 0,
    }
    // msg.type = typeof obj;
    msg = JSON.stringify(msg);
    const socket = IO(socketUrl);
    socket.emit('init', msg);
    socket.on('message', data => {
        data = JSON.parse(data);
        if (data.type == 'message') {
            Store.commit('updateMessage', true)
            // 桌面应用端
            if (isElectron()) {
                this.ipcRenderer.send('msg', data);
            } else {

                // 浏览器端 系统信息
                if (!window.Notification) return;
                let options = { dir: "ltr", icon: 'favicon.ico', data: data.data.msg, timeoutType: 'never', };
                let notification = new window.Notification(data.data.title, options);
                notification.onclick = window.focus;
            }

        }
        if (data.type == 'dialog' && isElectron()) {
            // 桌面应用端 dialog通知
            this.ipcRenderer.send('dialog', data);
        }
        callback(data)
    })
}