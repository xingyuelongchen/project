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
  // 主体内容
  .content {
    height: 100%;
    overflow: hidden;
  }
  .content-body {
    height: calc(100vh - 165px);
    margin: 20px 20px 30px;
    box-sizing: border-box;
    position: relative;
  }
  // 主体内容排列布局
  .content-cols {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
    overflow: hidden;
    > .mix-table {
      flex: auto;
      height: calc(100% - 100px) !important;
    }
  }
  // 主体内容横向排列布局
  .content-rows {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    box-sizing: border-box;
    // overflow: hidden;
  }
  // 主体内容横向左右布局
  .content-left-right {
    display: grid;
    grid-template-columns: 25% auto;
    grid-gap: 2%;
    box-sizing: border-box;
    > div {
      height: auto;
    }
  }
  // 主体内容横向左中右布局
  .content-left-center-right {
    display: grid;
    grid-template-columns: 32% 32% 32%;
    grid-gap: 2%;
    box-sizing: border-box;
    > div {
      height: auto;
    }
  }

  .el-card {
    height: 100%;
    .el-card__body {
      height: calc(100% - 60px);
    }
  }
  .el-tabs {
    width: 100%;
    // overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-tabs__content {
      flex: 1 1 auto;
      display: flex;
      .el-tab-pane {
        flex: auto;
        display: flex;
      }
    }
  }
  .el-scrollbar {
    height: 100%;
    width: 100%;
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
  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  // 编辑器输入框大小
  .ck.ck-content.ck-editor__editable {
    min-height: 400px;
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

