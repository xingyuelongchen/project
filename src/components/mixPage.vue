<!--
Template Name: 分页
Create author: qinglong
Create Time  : 2020-07-27
-->
<template>
  <div class="mix-page">
    <slot name="left"></slot>
    <el-pagination background :current-page.sync="page.page" :layout="page.layout || 'prev, pager, next,sizes, total'" :page-size="page.limit" :page-sizes="sizes" :total="page.total || total" @size-change="sizeChange" @current-change="currentChange"></el-pagination>
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  name: 'MixPage',
  props: {
    value: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 20,
          total: 0
        };
      }
    },
    total: Number
  },

  data() {
    return {
      page: {},
      sizes: [10, 20, 30, 50, 70, 90, 100]
    };
  },
  created() {
    this.page = this.value;
    if (!this.sizes.includes(this.value.limit)) this.sizes.unshift(this.value.limit);
  },
  methods: {
    sizeChange(limit) {
      this.page.limit = limit;
      this.page.page = 1;
      this.currentChange();
    },
    currentChange() {
      this.$emit('input', { ...this.page });
      if (typeof this.value.event == 'function') {
        this.value.event();
      } else if (typeof this.event == 'function') {
        this.event();
      } else {
        this.$parent.getData(this.page);
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
 