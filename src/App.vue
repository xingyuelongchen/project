<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import isElectron from "is-electron";

export default {
  mounted() {
    let vm = this;
    if (isElectron()) {
      vm.ipcRenderer = window.ipcRenderer;
      vm.ipcRenderer.on("message", (event, data) => {
        console.log(event, data.msg);
      });
      vm.ipcRenderer.on("downloadProgress", (event, progressObj) => {
        console.log("downloadProgress", progressObj);
        // 可自定义下载渲染效果
        let loading = vm.$loading({
          lock: true,
          text: "已下载" + progressObj.percent + "%",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        if (progressObj.percent == 100) {
          loading.close();
        }
      });
      vm.ipcRenderer.on("isUpdateNow", (event, versionInfo) => {
        // 自定义选择效果，效果自行编写
        vm.$confirm(
          "检测到新版本" + versionInfo.version + ",是否立即升级？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            showCancelButton: false,
            type: "warning"
          }
        ).then(() => {
          vm.ipcRenderer.send("updateNow");
        });
      });
      vm.autoUpdate(); // electron应用启动后主动触发检查更新函数
    }
  },
  beforeDestroy() {
    // 移除ipcRenderer所有事件
    if (isElectron()) {
      this.ipcRenderer.removeAllListeners();
    }
  },

  methods: {
    autoUpdate() {
      // 用来触发更新函数
      this.ipcRenderer.send("checkForUpdate");
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .content-box {
    display: grid;
    height: calc(100vh - 82px);
    grid-template-rows: 60px auto 60px;
    grid-auto-columns: 100%;
    padding: 20px 0;
    overflow: hidden;
    width: 100%;
  }
  .content-wrap {
    height: calc(100vh - 100px);
    padding: 20px 0;
  }
  .content-item {
    height: 100%;
    display: grid;
    grid-template-rows: auto 60px;
    padding: 20px 0;
    overflow: hidden;
  }

  .el-card__body {
    height: calc(100% - 56px);
  }
  .el-tabs {
    width: 100%;
    // overflow: hidden;
    .el-tabs {
      height: 100%;
    }
    .el-tabs__content {
      height: calc(100% - 40px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .el-image .el-image-viewer__close .el-icon-circle-close {
    font-size: 30px;
    color: #fff;
  }
}
body,
html {
  margin: 0;
  padding: 0;
}
* {
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
}
</style>

