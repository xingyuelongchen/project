<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-02
-->
<template>
  <div>
    <vxe-form :data="searchData" :items="search" title-align="right" title-width="100" @submit="getSearch" @reset="reset"></vxe-form>
    <vxe-grid ref="table" v-bind="tableOption" :data="data" :columns="fields" :formConfig="{items:search}">
      <template v-slot:empty>
        <span>
          <img src="https://xuliangzhan_admin.gitee.io/vxe-table/static/other/img1.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-grid>
    <vxe-pager background :current-page.sync="page.page" :page-size.sync="page.limit" :total="page.total" :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']" @page-change="pageChange"></vxe-pager>
    <vxe-modal v-model="showEdit" title="编辑&保存" width="800" :loading="submitLoading" resize destroy-on-close>
      <vxe-form :data="data" :items="update.data" :rules="update.rules" title-align="right" title-width="100" @submit="setUpdate"></vxe-form>
    </vxe-modal>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    fields: {
      type: Array,
      default() {
        return [
          // {
          //   field: "nickname",
          //   title: "nickname"
          // },
          // {
          //   field: "nickname",
          //   title: "nickname",
          //   remoteSort: true,
          //   minWidth: 200,
          //   filters: [
          //     { label: "前端开发", value: "前端" },
          //     { label: "后端开发", value: "后端" },
          //     { label: "测试", value: "测试" },
          //     { label: "程序员鼓励师", value: "程序员鼓励师" }
          //   ],
          //   filterMultiple: true
          // }
        ];
      }
    },
    search: {
      type: Array,
      default() {
        return [];
      }
    },
    page: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 20,
          total: 0
        };
      }
    },
    update: {
      type: Object,
      default() {
        return { data: [], rules: {} };
      }
    }
  },
  data() {
    return {
      searchData: {},
      showEdit: false,
      submitLoading: false,
      tableOption: {
        border: true,
        resizable: true,
        showOverflow: true,
        keepSource: true,
        height: 'auto',
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
          refresh: true,
          // import: true,
          export: true,
          print: true,
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
          type: "xlsx",
          // 自定义类型
          types: ["xlsx", "csv", "html", "xml", "txt"],
          // 自定义数据量列表
          modes: ["current", "all"]
        }
      }
    };
  },
  methods: {
    pageChange() {
      if (typeof this.$parent.getData == "function") {
        this.$parent.getData();
      } else {
        console.error("error:", "未找到getData函数");
      }
    },
    reset() {
      console.log(0);
    },
    getSearch(item) {
      if (typeof this.$parent.getData == "function") {
        this.$parent.getData(item.data);
      } else {
        console.error("error:", "未找到getData函数");
      }
    },
    setUpdate(item) {
      if (typeof this.$parent.update == "function") {
        this.$parent.update(item.data);
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
    }
  }
};
</script>
<style lang='less' scoped>
</style>