<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-06
-->
<template>
  <div class="content-wrap">
    <el-tabs v-model="searchData.type" @tab-click="handleClick">
      <el-tab-pane label="日数据" name="1" />
      <el-tab-pane label="指定时间" name="2" />
      <el-tab-pane label="月数据" name="3" />
    </el-tabs>
    <mixSearch v-model="searchData" :fields="searchFields" />
    <div style="height:calc(100% - 160px)">
      <mixTable ref="table" :key="key" v-model="tableData" :fields="tableFields" />
    </div>

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
      page: { page: 1, limit: 15, total: 0 }
    };
  },
  created() {
    this.getData();
    this.getTable();
    this.handleClick();
  },
  mounted() {
    this.handleClick();
  },
  methods: {
    handleClick() {
      console.log(0);
      let arr = [];
      if (this.searchData.type == "1") {
        arr[0] = { label: "选择", type: "date", prop: "date", span: 3 };
      }
      if (this.searchData.type == "2") {
        arr[0] = { label: "选择", type: "date", prop: "date", span: 5.5 };
      }
      if (this.searchData.type == "3") {
        arr[0] = { label: "选择", type: "month", prop: "date", span: 3 };
      }
      arr.push({
        type: "button",
        span: 5,
        options: [
          { label: "搜索", click: this.getData },
          { label: "导出", click: this.export, style: "danger", role: 149 }
        ]
      });
      let { type } = this.searchData;
      this.searchData = { type };
      this.searchFields = arr;
      this.getData();
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Saletotal/list", {
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