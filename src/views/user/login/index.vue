<!--
Template Name: login
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div>
    <el-button @click="setRoutes" type="primary">登录</el-button>
  </div>
</template>
<script>
import backend from "@/router/backend";
export default {
  name: "Login",
  data() {
    return { userinfo: {} };
  },
  methods: {
    setRoutes() {
      let userinfo = {
        id: 1,
        name: "测试",
        theme: "#409EFF",
        pic:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        role: [10, 11, 111],
        dateTime: Date.now() + 1000 * 60 * 60 * 24
      };
      localStorage.setItem("userinfo", JSON.stringify(userinfo));
      this.$store.commit("setUserinfo", userinfo);
      if (userinfo) {
        this.$router.setRoles(userinfo, backend);
        this.$router.replace("/backend/home");
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>