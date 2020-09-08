<!--
Template Name: 下载更新
Create author: qinglong
Create Time  : 2020-08-22
-->
<template>
  <div class="update" v-if="show">
    <div class="update-box">
      <div class="head">
        <div class="left">{{info.title}}</div>
        <div class="right"><i class="el-icon-close" @click="show=false"></i></div>
      </div>
      <div class="body">
        <div class="progress">
          <el-progress type="circle" :percentage="progress" :status="status"></el-progress>
        </div>
        <div class="info">{{info.msg}}</div>
      </div>
      <div class="foot">
        <el-button size="mini" :loading="info.status !== 2" v-if="info.status == 2" type="success" @click="update">立即更新</el-button>
        <el-button size="mini" type="primary" v-if="info.status == 2" @click="show=false">下次启动时更新</el-button>
        <el-button size="mini" type="warning" v-if="info.status == -1" @click="handerDown">手动下载</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      ipcRenderer: null,
      info: {},
      status: "",
      progress: 1
    };
  },
  mounted() {
    if (this.isElectron) {
      this.ipcRenderer = window.ipcRenderer;
      this.ipcRenderer.on("message", (event, data) => {
        this.info = data;
        if (data.status == -1) this.status = "exception";
        if (data.status == 2) this.status = "success";
        if (data.status == 3) this.status = "success";
        if (data.progress) this.progress = Math.floor(data.progress*1) ;
        this.show = true;
      });
    }
  },
  methods: {
    handerDown() {
      console.log("手动下载");
    },
    update() {
      //  发送更新请求
      window.ipcRenderer.send("updateNow");
    }
  },
  beforeDestroy() {
    // 移除ipcRenderer所有事件
    if (this.isElectron) this.ipcRenderer.removeAllListeners();
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
.update-box {
  width: 500px;
  height: 300px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 20px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #eee;
    > div {
      padding: 0 20px;
      i {
        cursor: pointer;
      }
    }
  }
  .body {
    // display: flex;

    // justify-content: center;
    // align-items: center;
    margin: 15px auto;
    .progress {
      margin: auto;
      text-align: center;
    }
    .info {
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
  .foot {
    height: 58px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid #eee;
  }
}
</style>