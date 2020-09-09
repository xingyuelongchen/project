// const db = require('./ApiDb.js/index.js');

// 写入日志
module.exports = {
    setlog,
    getlog
}
function setlog(req, data) {
    console.log(data);
    
    data = {
        createTime: Date.now(),
        content: data,
        ip: req.connection.remoteAddress,
        user_id: this.userInfo._id,
        type: data.type,
        message: data.message
    }
    return new Promise((resolve, reject) => {
        this.ApiDb.insert('log', {
            ...data
        }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
function getlog() {

}