<!--
Template Name: login
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div class="wrap" @click.self="isHistory=false">
    <div class="login">
      <div @keypress.enter="setRoutes" class="login-box">
        <div class="title">用户{{title}}</div>
        <div class="logo">
          <img src="http://www.guangyizhou.cn/public/home/assets/logo.png" alt />
        </div>
        <el-form :model="ruleForm" status-icon ref="login" label-width="80px" class="demo-ruleForm">
          <el-form-item label="手机号码" prop="mobile" :rules="{required:true,message:'请输入账号'}">
            <el-input clearable v-model="ruleForm.mobile" autocomplete="on" @focus="isHistory=true" @input="isHistory=false"></el-input>
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
              </div>
              <el-input clearable v-model="ruleForm.code" autocomplete="on"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div style="height:40px;display: flex;justify-content:space-between">
              <span>
                <el-checkbox v-model="checkPassword" v-if="isElectron">记住账号</el-checkbox>
              </span>
              <div>
                <el-link :underline="false" type="primary" @click="register" v-if="!isLogin">立即注册</el-link>
                <el-link :underline="false" type="primary" @click="login" v-else>立即登录</el-link>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="setRoutes" style="width:100%">确认{{title}}</el-button>
        <div class="history" v-if="history && isHistory && !isLogin && isElectron ">
          <template v-for="(item,key,index) in history">
            <div class="item" :key="index" @click="check(item)">{{key}} </div>
          </template>
          <div class="item" @click="removerHistory"> 清除历史记录 </div>
        </div>
      </div>
    </div>
    <div class="down" v-if="!isElectron" @click="down">
      下载客户端
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      title: "登录",
      url: "/adminapi/Login/login",
      ruleForm: {},
      isLogin: false,
      code: "",
      userinfo: {},
      history: {},
      isHistory: false,
      checkPassword: true
    };
  },
  created() {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("Store");
    sessionStorage.removeItem("Store");
    sessionStorage.removeItem("xitong");
    this.$store.commit("setClear");
    if (this.isElectron) {
      this.history =
        window.ipcRenderer.sendSync("getStore", "history") || false;
    }
    this.getCode();
  },
  methods: {
    async down() {
      alert("即将上线，敬请期待……");
    },
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
      if (data.code && !this.isLogin) {
        let userinfo = data.data;
        userinfo.dateTime = Date.now() + 1 * 24 * 60 * 60 * 1000;
        window.localStorage.setItem("userinfo", JSON.stringify(userinfo));
        this.$store.commit("setUserinfo", userinfo);
        if (!this.history) this.history = {};
        if (this.checkPassword) {
          this.history[this.ruleForm.mobile] = {
            mobile: this.ruleForm.mobile,
            password: this.ruleForm.password
          };
        } else {
          delete this.history[this.ruleForm.mobile];
        }
        if (this.isElectron) {
          window.ipcRenderer.send("setStore", {
            title: "history",
            data: this.history
          });
        }
        if (userinfo) this.$router.setRoles();
        if (this.isLogin) {
          this.login();
          this.ruleForm = {};
          return;
        }
      }
      this.getCode();
    },
    removerHistory() {
      this.isHistory = false;
      window.ipcRenderer.send("removeStore", "history");
      this.history = false;
    },
    check(item) {
      this.ruleForm = item;
      this.isHistory = false;
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
  .login-box {
    border-radius: 5px;
    padding: 20px 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
    position: relative;
    .history {
      position: absolute;
      width: 250px;
      top: 200px;
      left: 80px;
      right: 0;
      margin: auto;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      max-height: 240px;
      background: #fff;

      .item {
        border-bottom: 1px solid #f3f3f3;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        &:hover {
          background: #f1f1f1;
          cursor: pointer;
        }
      }
    }
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
.down {
  position: fixed;
  right: 20px;
  top: 20px;
}
</style>