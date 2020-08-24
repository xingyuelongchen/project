<!--
Template Name: mixDialog
Create author: qinglong
Create Time  : 2020-08-22
-->
<template>
  <div class="mix-dialog">
    <div class="mix-dialog-head">
      <slot name="head">{{title}}</slot>
    </div>
    <div class="mix-dialog-body">
      <el-scrollbar>
        <slot />
      </el-scrollbar>
    </div>
    <solt name="foot"/>
  </div>
</template>
<script>
export default {
  name: "mixDialog",
  props: {
    value: Boolean,
    title: String
  },
  data() {
    return {};
  }
};
</script>
<style lang='less' scoped>
.mix-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 50%;
  max-height: 70vh;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;

  .mix-dialog-head {
    height: 58px;
    line-height: 58px;
    padding: 0 20px;
  }
  .mix-dialog-body {
    border-top: 1px solid #eee;
    height: calc(100% - 60px);
  }
}
</style>