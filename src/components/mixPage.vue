<!--
Template Name: 分页
Create author: qinglong
Create Time  : 2020-07-27
-->
<template>
  <div class="mix-page">
    <slot name="left"></slot>
    <el-pagination background :layout="value.layout || 'prev, pager, next,sizes, total'" :page-size="value.limit" :page-sizes="value.sizes " :total="value.total || total" @size-change="sizeChange" @current-change="currentChange"></el-pagination>
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  name: "MixPage",
  props: {
    value: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 20
        };
      }
    },
    total: Number
  },
  data() {
    return {};
  },
  methods: {
    sizeChange(limit) {
      this.currentChange(1, limit);
    },
    currentChange(page, limit = 10) {
      this.$emit("input", { ...this.value, limit, page });
      if (typeof this.value.event == "function") {
        this.value.event();
      } else if (typeof this.event == "function") {
        this.event();
      } else {
        let a = Object.assign({}, this.value, { page });
        this.$parent.getData(a);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mix-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
</style>
 