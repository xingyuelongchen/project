<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-07-31
-->
<template>
  <div style="height:100%">
    <!-- <div style="height:60px">

    </div> -->
    <div style="height:calc(100% - 100px)">
      <vxe-grid ref="table" v-bind="tableOption" :data="data" :columns="fields">
        <template v-slot:buttons>
          <slot name="head"></slot>
        </template>
        <template v-slot:empty>
          <span>
            <img src="https://xuliangzhan_admin.gitee.io/vxe-table/static/other/img1.gif">
            <p>没有更多数据了！</p>
          </span>
        </template>
      </vxe-grid>
    </div>
    <vxe-pager background auto-hidden :current-page.sync="page.page" :page-size.sync="page.limit" :total="page.total" :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']" @page-change="pageChange"></vxe-pager>
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
    search: {
      type: Object,
      default() {
        return {};
      }
    },
    loading: Boolean,
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
          { title: "性别", field: "sex", readonly: true },
          { title: "姓名", field: "name" },
          // { title: "编辑", type: "manage",click:(a)=>console.log(a) }
          {
            title: "编辑",
            type: "manage",
            icon: "vxe-icon--edit-outline",
            click: a => console.log(a)
            // options: [
            //   { click: a => console.log(a), title: "编辑" },
            //   { click: a => console.log(a), title: "删除" }
            // ]
          }
        ];
      }
    },
    formData: Object,
    page: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 20,
          total: 0
        };
      }
    }
  },
  data() {
    return {
      tableOption: {
        border: true,
        resizable: true,
        showOverflow: true,
        keepSource: true,
        height: "auto",
        rowId: "id",
        filterConfig: { remote: true },
        radioConfig: {
          labelField: "id",
          reserve: true,
          highlight: true
        },
        checkboxConfig: {
          labelField: "id",
          checkField: "checked",
          reserve: true,
          highlight: true
        },
        toolbar: {
          // 工具栏
          // import: true,
          export: true,
          print: true,
          //   refresh: true,
          zoom: true,
          custom: true
        },
        editConfig: {
          // 单元格编辑
          trigger: "click",
          mode: "cell",
          showStatus: false,
          showIcon: false
        },
        showHeaderOverflow: true,
        showFooterOverflow: true,
        exportConfig: {
          // 导出
          // 默认选中类型
          type: "csv",
          // 自定义类型
          types: ["csv", "html", "xml", "txt"],
          // 自定义数据量列表
          modes: ["current", "all"]
        }
      }
    };
  },
  methods: {
    activeCellMethod({ columnIndex }) {
      return !!this.fields[columnIndex].readonly;
    },
    change(item) {
      if (typeof this.$parent.change == "function") this.$parent.change(item);
      else {
        console.log("父组件没有change函数");
      }
    },
    btnClick(item, row) {
      if (typeof item.click == "function") {
        item.click(row);
      }
    },
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