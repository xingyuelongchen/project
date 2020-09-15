<!--
Template Name: web管理
Create author: qinglong
Create Time  : 2020-07-24
-->
<template>
  <div class="content">功能筹备中
    <el-button @click="getPay">

    </el-button>
    <img :src="src" alt="" srcset="">
  </div>
</template>
<script>
import pingpp from "pingpp-js";
export default {
  name: "Extendweb",
  data() {
    return { src: null };
  },
  methods: {
    async getPay() {
      console.log(0);
      let { data } = await this.axios("/adminapi/Analysis/list");
      pingpp.createPayment(data.data, function(result, err) {
        // object 需是 Charge/Order/Recharge 的 JSON 字符串
        // 可按需使用 alert 方法弹出 log
        // console.log(JSON.stringify(data));
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
    }
  }
};
</script>
<style lang='less' scoped>
</style>