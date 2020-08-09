<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
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
<script>
export default {
  name: "App",
  created() {}
};
</script>
