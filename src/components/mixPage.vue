<!--
Template Name: 分页
Create author: qinglong
Create Time  : 2020-07-27
-->
<template>
  <div class="page">
    <el-pagination
      background
      :layout="value.layout||'prev, pager, next'"
      :page-size="value.limit"
      :page-sizes="value.sizes "
      :total="value.total"
      @current-change="currentChange"
      hide-on-single-page
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "MixPage",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    currentChange(val) {
      this.$emit("input", Object.assign({}, this.value, { page: val }));
      if (typeof this.value.event == "function") {
        this.value.event();
      } else if (typeof this.event == "function") {
        this.event();
      } else {
        this.$parent.getData();
      }
    }
  }
};
</script>
<style lang='less' scoped>
.page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>