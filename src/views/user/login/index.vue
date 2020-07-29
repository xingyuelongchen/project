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
export default {
  name: "Login",
  data() {
    return {
      userinfo: {
        id: 1,
        name: "测试",
        theme: "#ffffff",
        pic:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        role: [...Array(320)].map((e, i) => i + 1),
        dateTime: Date.now() + 1000 * 60 * 60 * 24
      }
    };
  },
  created() {
    localStorage.removeItem("userinfo");
    this.$store.commit("setClear");
  },
  methods: {
    setRoutes() {
      let userinfo = this.userinfo;
      localStorage.setItem("userinfo", JSON.stringify(userinfo));
      this.$store.commit("setUserinfo", userinfo);
      if (userinfo) {
        this.$router.setRoles();
        let path = sessionStorage.getItem("xitong") || "crm";
        this.$router.replace("/" + path + "/" + this.$store.state.menu[0].path);
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>