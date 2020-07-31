<!--
Template Name: 数据管理
Create author: qinglong
Create Time  : 2020-07-28
-->
<template>
  <div class="box">
    <mixNewTable :data="tableData" :fields="tableFields" :page="tablePage" />
  </div>
</template>
<script>
export default {
  name: "Dataindex",
  data() {
    return {
      tableData: [],
      tableFields: [],
      tablePage: {
        page: 0,
        limit: 10,
        total: 0
      }
    };
  }
};
</script>
<style lang='less' scoped>
.box {
  height: calc(100% - 40px);
  overflow: hidden;
  margin: 20px 0;
}
</style>