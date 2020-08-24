<!--
Template Name: 下载更新
Create author: qinglong
Create Time  : 2020-08-22
-->
<template>
  <div class="update" v-if="show">
    <mixDialog v-model="show">
      <div slot="head">下载进度</div>
      <div class="speed">
        <el-progress :text-inside="true" :stroke-width="36" :percentage="speed" :status="status"></el-progress>
        <div>{{title}}</div>
      </div>
      <div style="margin:40px auto;text-align:center">
        <el-button :loading="speed<=100" type="primary">确定安装</el-button>
      </div>
    </mixDialog>
  </div>
</template>
<script>
import isElectron from "is-electron";
export default {
  data() {
    return {
      show: false,
      speed: 1,
      status: "primary",
      version: "",
      title: ""
    };
  },
  mounted() {
    let vm = this;
    if (isElectron()) {
      let msg = null;
      vm.ipcRenderer = window.ipcRenderer;
      vm.ipcRenderer.on("message", (event, data) => {
        msg && msg.close();
        if (data.status == 1) this.show = true;
        this.title = data.msg;
      });
      vm.ipcRenderer.on("downloadProgress", (event, progressObj) => {
        this.speed = progressObj.percent;
      });
      vm.ipcRenderer.on("isUpdateNow", (event, versionInfo) => {
        this.version = versionInfo.version;
        this.show = true;
      });
    }
  },
  methods: {
    update() {
      //  发送更新请求
      window.ipcRenderer.send("updateNow");
    }
  },
  beforeDestroy() {
    // 移除ipcRenderer所有事件
    if (isElectron()) {
      this.ipcRenderer.removeAllListeners();
    }
  }
};
</script>
<style lang='less' scoped>
.update {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.8);
}
.mix-dialog {
  height: 300px !important;
  min-height: 300px !important;
}
.speed {
  width: 90%;
  margin: 50px auto;
  overflow: hidden;
  text-align: center;
}
</style>