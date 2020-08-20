<!--
Template Name: login
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div class="wrap">
    <div class="login">
      <div @keypress.enter="setRoutes">
        <div class="title">用户{{title}}</div>
        <div class="logo">
          <img src="http://www.guangyizhou.cn/public/home/assets/logo.png" alt />
        </div>
        <el-form :model="ruleForm" status-icon ref="login" label-width="80px" class="demo-ruleForm">
          <el-form-item label="手机号码" prop="mobile" :rules="{required:true,message:'请输入账号'}">
            <el-input clearable v-model="ruleForm.mobile" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item label="花名" prop="nickname" :rules="{required:true,message:'请输入账号'}" v-if="isLogin">
            <el-input clearable v-model="ruleForm.nickname" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :rules="{required:true,message:'请输入密码'}">
            <el-input clearable type="password" v-model="ruleForm.password" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password_confirm" :rules="{required:true,message:'请输入密码'}" v-if="isLogin">
            <el-input clearable type="password" v-model="ruleForm.password_confirm" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" :rules="{required:true,message:'请输入验证码'}">
            <div class="yzm">
              <div class="code" @click="getCode">
                <img :src="code" alt='验证码' />
                <!-- <img src="http://192.168.33.10/adminapi/Login/verify" alt /> -->
              </div>
              <el-input clearable v-model="ruleForm.code" autocomplete="on"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div style="height:40px;">
          <div style="display:flex;justify-content:space-between" @click="register" v-if="!isLogin">
            <el-link :underline="false" type="danger">下载客户端</el-link>
            <el-link :underline="false" type="primary">立即注册</el-link>
          </div>
          <div style="display:flex;justify-content:space-between" @click="login" v-else>
            <el-link :underline="false" type="danger">下载客户端</el-link>
            <el-link :underline="false" type="primary">立即登录</el-link>
          </div>
        </div>
        <el-button type="primary" @click="setRoutes" style="width:100%">确认{{title}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import isElectron from "is-electron";
// import request from "request";
export default {
  name: "Login",
  data() {
    return {
      title: "登录",
      url: "/adminapi/Login/login",
      ruleForm: {},
      isLogin: false,
      code: "",
      userinfo: {
        id: 1,
        name: "测试",
        pic:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        role: [...Array(320)].map((e, i) => i + 1),
        dateTime: Date.now() + 1000 * 60 * 60 * 24
      }
    };
  },
  created() {
    if (!isElectron()) {
      localStorage.removeItem("userinfo");
      localStorage.removeItem("Store");
      sessionStorage.removeItem("Store");
      this.$store.commit("setClear");
    }
    this.getCode();
  },
  methods: {
    register() {
      this.url = "/adminapi/Login/register";
      this.title = "注册";
      this.isLogin = true;
      this.ruleForm = {};
    },
    login() {
      this.url = "/adminapi/Login/login";
      this.title = "登录";
      this.isLogin = false;
      this.ruleForm = {};
    },
    async getCode() {
      this.axios
        .get("/adminapi/Login/verify?v=" + Math.random(), {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "image/png; charset=utf-8"
          }
        })
        .then(e => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(e.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(data => {
          this.code = data;
        });
    },
    async setRoutes() {
      let { data } = await this.axios(this.url, {
        data: this.ruleForm
      });
      if (data.code) {
        if (this.isLogin) {
          this.login();
          this.ruleForm = {};
          return;
        }
        let userinfo = data.data;
        window.localStorage.setItem("userinfo", JSON.stringify(userinfo));
        this.$store.commit("setUserinfo", userinfo);
        if (userinfo) this.$router.setRoles();
      }
      this.getCode();
    }
  }
};
</script>
<style lang='less' scoped>
.wrap {
  background: url("~@/assets/image/bg_login.jpg") no-repeat top left / 100%;
  min-height: 100vh;
  height: 100%;
}
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 400px;
  display: flex;
  align-items: center;
  > div {
    border-radius: 5px;
    padding: 20px 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
  }

  .title {
    font-size: 26px;
    text-align: center;
    margin-bottom: 20px;
    color: rgba(125, 125, 125, 1);
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
  .logo {
    height: 60px;
    text-align: center;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    img {
      height: 100%;
      object-fit: contain;
    }
  }
  .yzm {
    overflow: hidden;
    .el-input {
      width: 60%;
      float: left;
    }
    .code {
      width: 100px;
      float: right;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>