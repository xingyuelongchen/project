<!--
Template Name: home
Create author: qinglong
Create Time  : 2020-07-22
-->
<template>
  <div>紧张筹备中……更新过了

    <el-button @click="sendMsg"> 按钮</el-button>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return { value: null };
  },
  mounted() {},
  methods: {
    sendMsg() {
      window.ipcRenderer.send("message", "******************");
    }
  }
};
</script>
<style lang='less' scoped>
</style>