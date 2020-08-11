<!--
Template Name: thtor
Create author: qinglong
Create Time  : 2020-07-24
-->
<template>
  <div class="content-box">
    <mixSearch v-model="searchData" :fields="searchFields" />
    <mixTable v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
  </div>
</template>
<script>
export default {
  name: "Tutorindex",
  data() {
    return {
      page: { page: 1, limit: 15, total: 0 },
      searchData: {},
      searchFields: [
        { label: "时间", type: "datetimerange", span: 5.5, prop: "date" },
        { label: "QQ", type: "text", span: 3, prop: "search" },
        {
          label: "业绩类型",
          type: "select",
          span: 3,
          prop: "type",
          options: [
            { label: "新业绩", value: "新业绩" },
            { label: "补欠款", value: "补欠款" }
          ]
        },
        { label: "搜索", type: "button", span: 3, click: this.getData }
      ],
      tableData: [],
      tableFields: []
    };
  },
  activated() {
    this.getData();
    this.getTable();
  },
  methods: {
    async getTable() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 4 }
      });
      if (data.code) {
        this.tableFields = data.data;
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Service/list", {
        data: Object.assign(this.page, this.searchData)
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>