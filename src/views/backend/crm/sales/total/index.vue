<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-06
-->
<template>
  <div class="content-cols">
    <el-tabs v-model="searchData.type" @tab-click="handleClick">
      <el-tab-pane label="时间段" name="2" />
      <el-tab-pane label="日数据" name="1" />
      <el-tab-pane label="月数据" name="3" />
    </el-tabs>
    <mixSearch v-model="searchData" :fields="searchFields" />
    <mixTable ref="table" :key="key" v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
  </div>
</template>
<script>
export default {
  name: "Salestotal",
  data() {
    return {
      key: 0,
      searchData: { type: "1" },
      searchFields: [],
      tableData: [],
      tableFields: [],
      page: { page: 1, limit: 10, total: 0 }
    };
  },
  async created() {
    await this.getData();
    await this.getTable();
    await this.handleClick();
  },
  mounted() {
    this.handleClick();
  },
  methods: {
    handleClick() { 
      let arr = [];
      if (this.searchData.type == "1") {
        arr[0] = { label: "选择", type: "daterange", prop: "date", span: 5.5 };
      }
      if (this.searchData.type == "2") {
        arr[0] = { label: "选择", type: "datetimerange", prop: "date", span: 5.5 };
      }
      if (this.searchData.type == "3") {
        arr[0] = { label: "选择", type: "month", prop: "date", span: 3 };
      }
      arr.push({
        type: "button",
        span: 5,
        options: [
          { label: "搜索", click: this.getData },
          { label: "导出", click: this.export, style: "danger", role: 149 },
          {
            label: "查看合伙人",
            click: this.viewhehuoren,
            style: "primary",
            role: 237
          }
        ]
      });
      let { type } = this.searchData;
      this.searchData = { type };
      this.searchFields = arr;
      this.getData();
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Saletotal/list", {
        data: { ...this.searchData }
      });
      if (data.code) {
        this.page.total = data.count;
        this.tableData = data.data;
      }
    },
    async viewhehuoren() {
      let { data } = await this.axios("/adminapi/Saletotal/list_he", {
        data: { ...this.searchData, dept_id: 90 }
      });
      if (data.code) {
        // this.page.total = data.count;
        this.tableData = data.data;
      }
    },
    async getTable() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 7 }
      });
      if (data.code) {
        this.key = Math.random();
        this.tableFields = data.data;
      }
    },
    async export() {
      let { data } = await this.axios("/adminapi/Saletotal/export");
      if (data.code) this.$refs.table.outTab();
    }
  }
};
</script>
<style lang='less' scoped>
</style>