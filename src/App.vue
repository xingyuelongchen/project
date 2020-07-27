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
    height: calc(100vh - 130px);
    padding: 20px 0;
  }
}
body,
html {
  margin: 0;
  padding: 0;
}
* {
  outline: none;
}
</style>
<script>
export default {
  name: "App",
  created() {}
};
</script>
