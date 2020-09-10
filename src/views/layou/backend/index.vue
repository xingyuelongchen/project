<!--
Template Name: backend-layou
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div class="app-body user" :key="refreshKey" v-loading="loading" element-loading-text="正在释放缓存……" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="app-header" user="primary">
      <div class="left">
        <div class="item logo" :class="{scale:isCollapse}">
          <img :src="isCollapse?logo1:logo" />
        </div>
        <div class="item icon">
          <el-tooltip effect="dark" :content="isCollapse?'展开侧边栏':'折叠侧边栏'" placement="right-end">
            <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="isCollapse=!isCollapse"></i>
          </el-tooltip>
        </div>
        <template v-for="(item,index) in $store.state.routes">
          <div class="itema" :key="index" :class="{active:targetIndex == item.name}" @click="toggle(item.name)" v-role="item.id">{{item.meta.title}}</div>
        </template>
      </div>
      <div class="center"></div>
      <div class="right">
        <div class="itema">
          <el-tooltip content="修改主题色">
          </el-tooltip>
        </div>
        <div class="itema" @click="refresh">
          <el-tooltip content="刷新缓存">
            <span>
              <i class="el-icon-refresh"></i>刷新
            </span>
          </el-tooltip>
        </div>
        <div class="itema" @click.stop="$router.push('/user/info')">
          <el-tooltip content="修改个人信息">
            <el-avatar :size="40" :src="$store.state.userinfo.pic" @error="()=>true"><img src="http://www.guangyizhou.cn/favicon.ico" /></el-avatar>
          </el-tooltip>
        </div>
        <div class="item">
          {{$store.state.userinfo.nickname}} {{$store.state.userinfo.mobile}}
        </div>
        <div class="itema">
          <el-tooltip content="设置">
            <el-dropdown trigger="click">
              <i class="el-icon-s-tools" style="font-size:18px;cursor: pointer;"></i>
              <el-dropdown-menu slot="dropdown">
                <template v-for="(item,index) in settingList">
                  <el-dropdown-item :key="index" v-if="item.show" @click.native="item.event()">{{item.label}}</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="app-container">
      <div class="app-side">
        <el-scrollbar>
          <el-menu :collapse-transition="false" :default-active="$route.name" :collapse="isCollapse" class="el-menu-vertical-demo" router unique-opened>
            <template v-for="(item,index) in $store.state.menu[0].children">
              <el-submenu :index="item.name" :key="index" :route="item" v-if="item.children && item.children.length">
                <template slot="title">
                  <i :class="['iconfont ',item.icon]"></i>
                  <span slot="title">{{item.title || item.meta.title}}</span>
                </template>
                <template v-for="(k,i) in item.children">
                  <el-menu-item :index="k.name" :key="i" :route="k">
                    <i :class="['iconfont',k.icon]"></i>
                    <span slot="title">{{k.title || k.meta.title}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item :index="item.name" :key="index" :route="item" v-else>
                <i :class="['iconfont',item.icon]"></i>
                <span slot="title">{{item.title || item.meta.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="app-content">
        <div class="top">
          <el-tabs :value="activeName" type="card" @tab-remove="delTab" @tab-click="onTab" user="el-tabs">
            <template v-for="(item,index) in $store.state.tabmenu">
              <el-tab-pane :key="item.fullPath" :label="item.title" :name="item.fullPath" :closable="index>0"></el-tab-pane>
            </template>
          </el-tabs>
        </div>
        <!-- <keep-alive> -->
        <div class="content-body">
          <router-view></router-view>
        </div>
        <!-- </keep-alive> -->
      </div>
    </div>
    <audio src="~@/assets/audio/msg.mp3" preload ref="audio" />
    <audio src="~@/assets/audio/xibao.mp3" preload ref="dialogAudio"></audio>
    <template v-for="item in message">
      <mixMessage :value="item" :key="item.id" v-if="item.show" @input="item.show=false" />
    </template>
    <mixXibao v-model="xibao" />
    <div class="EXEVERSION">Beta：v{{EXEVERSION}}</div>
  </div>
</template>
<script>
import isElectron from "is-electron";
import IO from "@/api/socket-io";
import logo from "@/assets/image/logo.png";
import logo1 from "@/assets/image/logo1.png";
export default {
  name: "Backend",
  data() {
    return {
      logo,
      logo1,
      ws: null,
      loading: false,
      message: [],
      settingList: [
        {
          label: "修改资料",
          event: () => this.$router.push("/user/info"),
          show: true
        },
        { label: "检查更新", event: this.update, show: isElectron() },
        // {
        //   label: "喜报",
        //   event: () => this.onMessage({ type: "dialog", data: {} }),
        //   show: true
        // },
        { label: "退出登录", event: this.logout, show: !isElectron() },
        {
          label: "切换账号",
          event: () => {
            window.ipcRenderer.send("removeStore", "userinfo");
            this.$router.push("/login");
          },
          show: isElectron()
        },
        { label: "退出系统", event: this.logout, show: isElectron() }
      ],
      xibao: { show: false },
      refreshKey: 0,
      // 菜单折叠
      isCollapse: false,
      // 风格主题
      theme: this.$store.state.userinfo.theme,
      // 当前管理系统
      targetIndex: sessionStorage.getItem("xitong") || "crm",
      // 用户信息
      userinfo: JSON.parse(localStorage.getItem("userinfo")) || {}
    };
  },
  computed: {
    activeName() {
      let name = this.$store.state.tabmenu.filter(e => e.active);
      name = name[0];
      return name && name.fullPath;
    }
  },
  created() {
    IO(this.onMessage);
  },
  updated() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    onMessage(data) {
      if (data.type == "message") {
        console.log(data);
        this.$refs.audio.play();
        this.message.push({ ...data.data, show: true });
      }
      if (data.type == "dialog") {
        this.$refs.dialogAudio.play();
        this.$refs.dialogAudio.onended = () => {
          this.xibao.show = false;
        };
        this.xibao.show = true;
        this.xibao.data = data.data;
      }
      if (data.type == "dashboard") {
        console.log("dashboard");
      }
    },
    delTab(name) {
      this.$store.commit("delTabmenu", name);
    },
    onTab(item) {
      this.$router.push(item.name);
    },
    toggle(val) {
      if (this.targetIndex == val) return;
      this.targetIndex = val;
      sessionStorage.setItem("xitong", val);
      // 初始化路由表
      this.$router.setRoles();
      // 初始化tabmenu
      this.$store.commit("removeTabmenu");
      let path = this.$store.state.menu[0].path;
      if (
        this.$store.state.menu[0].children &&
        this.$store.state.menu[0].children[0]
      ) {
        path =
          this.$store.state.menu[0].path +
          "/" +
          this.$store.state.menu[0].children[0].path;
      }
      // console.log(path);
      this.$router.replace(path);
    },
    logout() {
      window.localStorage.removeItem("userinfo");
      if (this.isElectron) window.ipcRenderer.send("close");
      this.$router.replace("/login");
    },
    async refresh() {
      this.loading = true;
      this.refreshKey = Math.random();
      let { data } = await this.axios("/adminapi/User/information", {
        data: { uid: this.userinfo.id }
      });
      if (!data.code) {
        this.$router.replace("/login");
        return;
      }
      this.$store.commit("setUserinfo", data.data);
      this.$router.setRoles();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    update() {
      if (this.isElectron) window.ipcRenderer.send("queryUpdate");
    },
    handerSetting(item) {
      item.event();
    }
  },
  beforeDestroy() {
    this.$store.state.socket.emit("disconnect");
    this.$store.state.socket.destroy();
    this.$store.state.socket.close();
    clearTimeout(this.timer);
  }
};
</script>
<style lang='less' scoped>
.v-enter-active {
  transition: all 0.6s ease;
  transition-delay: 0.6s;
}
.v-leave-active {
  transition: all 0.6s ease;
}
.app-body {
  overflow: hidden;
  width: 100%;
  min-width: 900px;
  height: 100vh;
  .app-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #fff;
    .left {
      flex: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      .logo {
        max-width: 170px;
        width: 170px;
        height: 90%;
        overflow: hidden;
        margin: 0 5px;
        // transition: all 0.6s;
        &.scale {
          max-width: 50px;
          width: 50px;
          // transition: all 0.7s;
          padding: 0 5px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .center {
      flex: auto;
      display: flex;
      justify-content: center;
    }
    .right {
      flex: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .icon {
      font-size: 22px;
      padding: 0 10px;
      overflow: hidden;
      cursor: pointer;
    }
    .item,
    .itema {
      margin: 0 5px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      // transition: all 0.6s;
      position: relative;
      &.active {
        background: rgba(1, 1, 1, 0.2);
      }
    }
    .itema {
      cursor: pointer;
      height: 100%;
    }
  }
  .app-container {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 61px);
    .app-side {
      border-right: 1px solid #e6e6e6;
      box-shadow: 0 10px 10px rgba(1, 1, 1, 0.1);
      height: 100%;
      overflow: hidden;
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-width: 200px;
        min-height: 400px;
      }

      .el-menu {
        border: none;
      }
    }
    .app-content {
      flex: 1;
      height: 100%;
      overflow: hidden;
      .top {
        box-shadow: 0 0 20px rgba(1, 1, 1, 0.1);
        /deep/ .el-tabs__header.is-top {
          margin: 0;
        }
      }
      .bottom {
        overflow: hidden;
        height: calc(100% - 40px);
        padding: 0 20px;
      }
    }
  }
}
.iconfont {
  font-size: 22px;
  margin-right: 8px;
}
.EXEVERSION {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  position: absolute;
  // top: -17px;
  bottom: 0;
  right: 0px;
  white-space: nowrap;
  // transform: scale(0.8);
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 0 5px;
  margin: 5px;
  border-radius: 5px;
  background: #fff;
}
</style>