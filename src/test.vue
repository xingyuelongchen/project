<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-07-31
-->
<template>
  <div>
    <vxe-grid
      :data="tableData"
      :id="options.id"
      :context-menu="options.contextMenu"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      :keyboard-config="{isArrow: true}"
      :border="true"
      :size="'small'"
      :loading="!!!tableData.length"
      :height="options.height || '100%'"
      :max-height="options.maxHeight || options.height"
      @cell-click="cellClickEvent"
    >
      <template v-for="(item, index) in tableField">
        <vxe-table-column v-if="item.type=='manage'" title="操作" :key="index">
          <template v-slot="{ row }">
            <vxe-button status="primary" @click="editEvent(row)">编辑</vxe-button>
            <vxe-button status="primary" @click="removeEvent(row)">删除</vxe-button>
          </template>
        </vxe-table-column>
        <template v-else>
          <vxe-table-column
            :key="index"
            v-bind="item"
            :edit-render="{name: '$input', props: {type: 'text'}}"
          ></vxe-table-column>
        </template>
      </template>
    </vxe-grid>
    <vxe-pager
      background
      :current-page.sync="pageData.page"
      :page-size.sync="pageData.limit"
      :total="pageData.total"
      :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
      @page-change="pageChange"
    ></vxe-pager>
  </div>
</template>
<script>
export default {
  name: "mixNewTable",
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
    tableData: {
      // 表格数据
      type: Array,
      default() {
        return [
          { seq: 10, name: 1, sex: 1, age: 30, meta: { name: 0 } },
          { seq: 10, name: 1, sex: "", age: 30 }
        ];
      }
    },
    tableField: {
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
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    pageData: {
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
  methods: {
    pageChange(type, currentPage) {
      if (typeof this.$parent.currentPage == "function") {
        this.$parent.currentPage(currentPage);
      } else {
        console.error("error:", "父组件未定义currentPage分页函数");
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