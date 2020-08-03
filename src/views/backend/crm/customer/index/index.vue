<!--
Template Name: customer
Create author: qinglong
Create Time  : 2020-07-24
-->
<template>
  <div style="height:100%">
    <!-- <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="日数据" name="1" />
      <el-tab-pane label="月数据" name="2" />
    </el-tabs> -->
    <mixNewTable v-model="tableData" :fields="tableFields1">
      <template #head>
        <mixSearch v-model="search" :fields="searchField1" />
      </template>
    </mixNewTable>
  </div>
</template>
<script>
export default {
  name: "Customerindex",
  data() {
    return {
      tab: "1",
      status: "",
      search: {},
      searchField: [
        { prop: "date", type: "month", span: 3, label: "选择" },
        { prop: "name", type: "text", span: 3, label: "名称" },
        { type: "button", click: this.getSearch, label: "搜索", span: 3 }
      ],
      searchField1: [
        { prop: "date", type: "daterange", span: 5.5, label: "选择" },
        { prop: "name", type: "text", span: 3, label: "名称" },
        { type: "button", click: this.getSearch, label: "搜索", span: 3 }
      ],
      tableData: [],
      tableFields: [
        { field: "date_time", title: "date_time" },
        { field: "crm_uid", title: "crm_uid" },
        { field: "dept", title: "dept" },
        { field: "dept_id", title: "dept_id" },
        { field: "id", title: "id" },
        { field: "jie", title: "jie" },
        { field: "nickname", title: "nickname" }
      ],
      tableFields1: [
        { field: "date_time", title: "date_time" },
        { field: "crm_uid", title: "crm_uid" },
        { field: "dept", title: "dept" },
        { field: "dept_id", title: "dept_id" },
        { field: "id", title: "id" },
        { field: "jie", title: "jie" },
        { field: "nickname", title: "nickname" }
      ]
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data } = await this.axios("/adminapi/Customerstatistics/list", {
        params: Object.assign({}, { type: this.tab }, this.search)
      });
      if (data.code) {
        this.tableData = data.data;
      }
    },
    getSearch() {
      this.getData();
    },
    handleClick() {
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
</style>