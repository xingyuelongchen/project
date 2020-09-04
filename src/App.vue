<template>
  <div id="app">
    <router-view />
    <mixDown />
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .content-body {
    height: calc(100vh - 165px);
    margin: 20px 20px 40px;
    box-sizing: border-box;
  }
  .content-wrap {
    height: 100%;
    > .mix-table {
      height: calc(100% - 100px) !important;
    }
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
    .el-scrollbar__bar {
      z-index: 999;
    }
  }
  .el-image .el-image-viewer__close .el-icon-circle-close {
    font-size: 30px;
    color: #fff;
  }
  .el-card {
    height: 100%;
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
.update {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.8);
  z-index: 5000;
}
.mix-dialog {
  height: 330px;
}
.speed {
  width: 90%;
  margin: 50px auto;
  overflow: hidden;
  text-align: center;
}
</style>

