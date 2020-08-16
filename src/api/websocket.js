import config from '@/config.js';
const ws = new WebSocket(config.websocket);
const send = function (obj) {
    let msg = {
        type: null,
        data: null,
        create_time: Date.now(),
        uid: JSON.parse(window.localStorage.getItem('userinfo'))
    }


    if (typeof obj == 'object') msg.data = JSON.stringify({ msg, data: obj });
    if (typeof obj == 'string') msg.data = obj;

    msg.type = typeof obj
    ws.send(msg)
}
ws.onopen(() => {
    send()
})
