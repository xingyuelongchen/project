<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-07-31
-->
<template>
  <div style="height:100%">
    <div style="height:60px">
      <vxe-toolbar>
        <template v-slot:buttons>
          <vxe-input v-model="search.search"></vxe-input>
          <vxe-button status="primary" @click="getSearch">查询</vxe-button>
        </template>
      </vxe-toolbar>
    </div>
    <div style="height:calc(100% - 100px)">
      <vxe-table
        stripe
        round
        resizable
        show-overflow
        :data="data"
        :id="options.id"
        :context-menu="options.contextMenu"
        :highlight-hover-column="true"
        :keyboard-config="{isArrow: true}"
        :border="true"
        :size="'small'"
        :loading="!!!data.length"
        :height="options.height || '100%'"
        :max-height="options.maxHeight || options.height"
        @cell-click="cellClickEvent"
      >
        <vxe-table-column v-for="(config,index) in fields" :key="index" v-bind="config"></vxe-table-column>
      </vxe-table>
    </div>
    <vxe-pager
      background
      :current-page.sync="page.page"
      :page-size.sync="page.limit"
      :total="page.total"
      :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
      @page-change="pageChange"
    ></vxe-pager>
  </div>
</template>
<script>
export default {
  name: "mixNewTable",
  model: {
    prop: "data"
  },
  props: {
    options: {
      // 表格配置
      type: Object,
      default() {
        return {
          border: true //none ,inner,outer,full,false
        };
      }
    },
    search: Object,
    data: {
      // 表格数据
      type: Array,
      default() {
        return [
          { seq: 10, name: 1, sex: 1, age: 30, meta: { name: 0 } },
          { seq: 10, name: 1, sex: "", age: 30 }
        ];
      }
    },
    fields: {
      // 表格列配置
      type: Array,
      default() {
        return [
          { title: "html", type: "html" },
          { title: "展开", type: "expand" },
          { title: "序号", type: "seq" },
          { title: "单选", type: "radio" },
          { title: "复选", type: "checkbox" },
          { title: "操作", type: "manage" }
        ];
      }
    },
    formData: Object,
    page: {
      type: Object,
      default() {
        return {
          page: 0,
          limit: 20,
          total: 0
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    pageChange() {
      if (typeof this.$parent.getData == "function") {
        this.$parent.getData();
      } else {
        console.error("error:", "未找到getData函数");
      }
    },
    getSearch() {
      if (typeof this.$parent.getData == "function") {
        this.$parent.getData();
      } else {
        console.error("error:", "未找到getData函数");
      }
    },
    headerCellClickEvent({ column }) {
      console.log(`表头单元格点击${column.title}`);
    },
    headerCellDBLClickEvent({ column }) {
      console.log(`表头单元格双击${column.title}`);
    },
    headerCellContextMenuEvent({ column }) {
      console.log(`右键列 ${column.title}`);
    },
    cellClickEvent({ column }) {
      console.log(`单元格点击${column.title}`);
    },
    cellDBLClickEvent({ column }) {
      console.log(`单元格双击${column.title}`);
    },
    cellMouseenterEvent({ column }) {
      console.log(`鼠标进入单元格${column.title}`);
    },
    cellMouseleaveEvent({ column }) {
      console.log(`鼠标离开单元格${column.title}`);
    },
    cellContextMenuEvent({ row }) {
      console.log(`右键行 ${row.name}`);
    },
    scrollEvent({ scrollTop, scrollLeft }) {
      console.log(`滚动事件scrollTop=${scrollTop} scrollLeft=${scrollLeft}`);
    },
    currentChange({ row }) {
      console.log(row);
    },
    editEvent(row) {
      console.log(row);
    },
    removeEvent(row) {
      console.log(row);
    }
  }
};
</script>
<style lang='less' scoped>
</style>