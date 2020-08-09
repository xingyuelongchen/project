<!--
Template Name: customer
Create author: qinglong
Create Time  : 2020-07-24
-->
<template>
  <div class="content-box">
    <mixSearch v-model="search" :fields="searchField1" />
    <mixTable v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
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
      searchField1: [
        { prop: "date", type: "daterange", span: 5.5, label: "选择" },
        { prop: "name", type: "text", span: 3, label: "名称" },
        { type: "button", click: this.getSearch, label: "搜索", span: 3 }
      ],
      tableData: [],
      tableFields: [
        { prop: "date_time", label: "日期" },
        { prop: "crm_uid", label: "系统ID" },
        { prop: "dept", label: "部门" },
        { prop: "dept_id", label: "部门" },
        { prop: "id", label: "id" },
        { prop: "jie", label: "接单量" },
        { prop: "nickname", label: "花名" }
      ],
      page: {
        page: 1,
        limit: 15,
        total: 0
      }
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
        this.page.total = data.count;
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