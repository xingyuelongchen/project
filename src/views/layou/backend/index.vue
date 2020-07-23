<!--
Template Name: backend-layou
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div class="app-body">
    <div class="app-header">
      <div class="left">
        <div class="item icon">
          <el-tooltip effect="dark" :content="isCollapse?'展开侧边栏':'折叠侧边栏'" placement="right-end">
            <i
              :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']"
              @click="isCollapse=!isCollapse"
            ></i>
          </el-tooltip>
        </div>
      </div>
      <div class="center"></div>
      <div class="right">
        <div class="item">
          <el-color-picker v-model="theme"></el-color-picker>
        </div>
        <div class="item">
          <el-avatar :size="40" :src="$store.state.userinfo.pic">{{$store.state.userinfo.name}}</el-avatar>
        </div>
        <div class="item">{{$store.state.userinfo.name}}</div>
        <div class="item">
          <el-dropdown>
            <i class="el-icon-s-tools" style="font-size:18px;cursor: pointer;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="app-container">
      <div class="app-side">
        <el-scrollbar style="height:100%">
          <el-menu default-active="0" :collapse="isCollapse" class="el-menu-vertical-demo" router>
            <template v-for="(item,index) in $store.state.menu">
              <el-submenu
                :index="''+index"
                :key="index"
                :route="item"
                v-if="item.children && item.children.length"
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.title || item.meta.title}}</span>
                </template>
                <template v-for="(k,i) in item.children">
                  <el-menu-item :index="index+'-'+i" :key="i" :route="k">
                    <i :class="k.icon"></i>
                    <span slot="title">{{k.title || k.meta.title}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item :index="''+index" :key="index" :route="item" v-else>
                <i :class="item.icon"></i>
                <span slot="title">{{item.title || item.meta.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="app-content">
        <keep-alive>
          <transition mode="out-in">
            <router-view v-if="$route.meta.keepAlice !== false" />
          </transition>
        </keep-alive>
        <transition mode="out-in">
          <router-view v-if="$route.meta.keepAlice === false" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
const version = require("element-ui/package.json").version;
export default {
  name: "Backend",
  data() {
    return { isCollapse: false, theme: this.$store.state.userinfo.theme };
  },
  watch: {
    theme(val) {
      this.updateTheme(val);
    }
  },
  methods: {
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
  height: 100vh;
  .app-header {
    height: 60px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 20px rgba(1, 1, 1, 0.1);
    .left {
      flex: auto;
      display: flex;
      justify-content: flex-start;
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
    }
    .icon {
      font-size: 22px;
      padding: 0 10px;
      overflow: hidden;
      cursor: pointer;
    }
    .item {
      margin: 0 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .app-container {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .app-side {
      border-right: 1px solid #e6e6e6;
      box-shadow: 0 10px 10px rgba(1, 1, 1, 0.1);
      height: 100%;
      overflow: hidden;
      .menu {
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        border: none;
      }
      .el-menu {
        border: none;
      }
    }
    .app-content {
      flex: auto;
      height: 100%;
      padding: 20px;
      overflow: hidden;
    }
  }
}
</style>