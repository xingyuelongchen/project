import IO from 'socket.io-client';
import { axios } from './Config';
import { getStore } from './Storage';
export default function () {
    let userinfo = getStore('userinfo');
    const socket = IO(axios.socket);
    if (userinfo) {
        let msg = {
            type: "crm",
            data: null,
            create_time: userinfo.dateTime,
            uid: userinfo.id,
            department: userinfo.department || 0
        };
        socket.emit("init", JSON.stringify(msg));
    }
    return socket
}