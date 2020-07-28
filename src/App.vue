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
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .content-box {
    display: grid;
    height: calc(100vh - 150px);
    grid-template-rows: 60px auto 60px;
    padding: 20px 0;
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
  .el-card__body{
    height:calc(100% - 56px)
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
