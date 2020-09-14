var pingpp = require('pingpp-js');
module.exports = function (req, res, config) {
    try {
        ({ 'get': get, 'post': post, 'delete': del, 'put': put }[req.method.toLowerCase()])(req, res, config)
    } catch (error) {
        res.error(500)
    }
}
function get(req, res, config) {
    pingpp.createPayment(object, function (result, err) {
        // object 需是 Charge/Order/Recharge 的 JSON 字符串
        // 可按需使用 alert 方法弹出 log
        //console.log(JSON.stringify(object));
        console.log("result:" + result);
        console.log("err.msg:" + err.msg);
        console.log("err.extra:" + err.extra);
        if (result == "success") {
            // 只有微信JSAPI (wx_pub)、微信小程序（wx_lite）、QQ 公众号 (qpay_pub)、支付宝小程序（alipay_lite）支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
        } else if (result == "fail") {
            // Ping++ 对象 object 不正确或者微信JSAPI/微信小程序/QQ公众号支付失败时会在此处返回
        } else if (result == "cancel") {
            // 微信JSAPI、微信小程序、QQ 公众号、支付宝小程序支付取消支付
        }
    });
    // res.send('v2-index - get')
}
function post(req, res, config) {
    res.send('v2-index - post')
}
function del(req, res, config) {
    res.send('v2-index - del')

}
function put(req, res, config) {
    res.send('v2-index - put')
}