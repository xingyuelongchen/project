<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-06
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
  name: "Salestotal",
  data() {
    return {
      searchData: {},
      searchFields: [
        { label: "选择", type: "datetime", prop: "date", span: 3 },
        { label: "搜索", type: "button", click: this.getData, span: 3 }
      ],
      tableData: [],
      tableFields: [],
      page: { page: 1, limit: 15, total: 0 }
    };
  },
  activated() {
    this.getData();
    this.getTable();
  },
  methods: {
    async getData() {
      let { data } = await this.axios("/adminapi/Salepersonal/list", {
        data: Object.assign({}, this.page, this.searchData)
      });
      if (data.code) {
        this.page.total = data.count;
        this.tableData = data.data;
      }
    },
    async getTable() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 7 }
      });
      if (data.code) {
        this.tableFields = data.data;
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>