<!--
Template Name: backend-layou
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div class="app-body user" :key="refreshKey">
    <div class="app-header" user="primary">
      <div class="left">
        <div class="item logo" :class="{scale:isCollapse}">
          <img :src="isCollapse?'http://www.guangyizhou.cn/public/home/assets/logo.png':'http://www.guangyizhou.cn/public/home/assets/logo.png'" />
        </div>
        <div class="item icon">
          <el-tooltip effect="dark" :content="isCollapse?'展开侧边栏':'折叠侧边栏'" placement="right-end">
            <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="isCollapse=!isCollapse"></i>
          </el-tooltip>
        </div>
        <div class="itema" :class="{active:targetIndex == 'crm'}" @click="toggle('crm')" v-role="1">管理系统</div>
        <div class="itema" :class="{active:targetIndex == 'app'}" @click="toggle('app')" v-role="24">应用程序</div>
        <div class="itema" :class="{active:targetIndex == 'web'}" @click="toggle('web')" v-role="3">官网管理</div>
        <div class="itema" :class="{active:targetIndex == 'MinApp'}" @click="toggle('MinApp')" v-role="22">小程序</div>
      </div>
      <div class="center"></div>
      <div class="right">
        <div class="itema">
          <i class="el-icon-refresh" @click="refresh"></i>
        </div>
        <div class="itema">主题色</div>
        <div class="item">
          <el-avatar :size="40" :src="$store.state.userinfo.pic">{{$store.state.userinfo.name}}</el-avatar>
        </div>
        <div class="item">{{$store.state.userinfo.name}}</div>
        <div class="itema">
          <el-dropdown trigger="click">
            <i class="el-icon-s-tools" style="font-size:18px;cursor: pointer;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.stop.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.title || item.meta.title}}</span>
                </template>
                <template v-if="item.children">
                  <template v-for="(k,i) in item.children">
                    <el-menu-item :index="k.name" :key="i" :route="k">
                      <i :class="k.icon"></i>
                      <span slot="title">{{k.title || k.meta.title}}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-submenu>
              <el-menu-item :index="item.name" :key="index" :route="item" v-else>
                <i :class="item.icon"></i>
                <span slot="title">{{item.title || item.meta.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="app-content">
        <div class="top">
          <el-tabs :value="activeName" :key="key" type="card" @tab-remove="delTab" @tab-click="onTab" user="el-tabs">
            <template v-for="(item,index) in $store.state.tabmenu">
              <el-tab-pane :key="item.fullPath" :label="item.title" :name="item.fullPath" :closable="index>0"></el-tab-pane>
            </template>
          </el-tabs>
        </div>
        <keep-alive>
          <router-view class="bottom"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
const version = require("element-ui/package.json").version;
export default {
  name: "Backend",

  data() {
    return {
      key: 0,
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
  methods: {
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
      if (this.$store.state.menu[0].children[0]) {
        path =
          this.$store.state.menu[0].path +
          "/" +
          this.$store.state.menu[0].children[0].path;
      }
      this.$router.replace(path);
    },
    logout() {
      this.$router.replace("/login");
    },
    async refresh() {
      let { data } = await this.axios("/adminapi/User/information", {
        data: { uid: this.userinfo.uid }
      });

      if (!data.code) {
        this.$router.replace("/login");
        return;
      }
      localStorage.setItem("userinfo", JSON.stringify(data.data));
      this.$router.setRoles();
      this.refreshKey = Math.random();
      let to = this.$route;
      let title = to.meta.title;
      if (
        to.matched[to.matched.length - 2] &&
        to.matched[to.matched.length - 2].meta.title
      ) {
        title =
          to.matched[to.matched.length - 2].meta.title + "/" + to.meta.title;
      }
      let option = {
        name: to.name,
        fullPath: to.fullPath,
        path: to.path,
        title
      };
      this.$store.commit("setTabmenu", option);
    },
    updateTheme(val, oldVal = "#409EFF") {
      if (typeof val !== "string") return;
      const head = document.getElementsByTagName("head")[0];
      const themeCluster = this.getThemeCluster(val.replace("#", ""));
      const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
      const getHandler = (variable, id) => {
        return () => {
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );

          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            head.appendChild(styleTag);
          }
          styleTag.innerText = newStyle;
        };
      };

      // const chalkHandler = getHandler("chalk", "chalk-style");

      const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
      this.getCSSString(url, getHandler("chalk", "chalk-style"), "chalk");
      // chalkHandler();

      const link = [].slice.call(
        document.getElementsByTagName("head")[0].getElementsByTagName("link")
      );
      for (let i = link.length - 3; i < link.length; i++) {
        const style = link[i];
        this.getCSSString(style.href, innerText => {
          const originalCluster = this.getThemeCluster(
            this.theme.replace("#", "")
          );
          const newStyle = this.updateStyle(
            innerText,
            originalCluster,
            themeCluster
          );
          let styleTag = document.getElementById(i);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = i;
            styleTag.innerText = newStyle;
            head.appendChild(styleTag);
          }
        });
      }

      const styles = [].slice
        .call(document.querySelectorAll("style"))
        .filter(style => {
          const text = style.innerText;
          return (
            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
          );
        });
      styles.forEach(style => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },
    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          if (variable) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
          }
          callback(xhr.responseText);
        }
      };
      xhr.open("GET", url);
      xhr.send();
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    }
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
  width: 100vw;
  min-width: 1200px;
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
      margin: 0 15px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      // transition: all 0.6s;
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
</style>