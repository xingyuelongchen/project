<!--
Template Name: 数据分析
Create author: qinglong
Create Time  : 2020-09-13
-->
<template>
  <el-scrollbar>
    <div class="content">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <el-tabs v-model="searchData.type" @tab-click="handleClick">
        <el-tab-pane label="总成交额" name="1" />
        <el-tab-pane label="总转入量" name="2" />
        <el-tab-pane label="总成交数" name="3" />
      </el-tabs>
      <div style="height:300px">
        <ve-line :data="echartData.data" height="100%" :loading="loading" :settings="echartData.settings" />
      </div>
      <div style="height:350px">
        <mixTable v-model="echartData.interval" :loading="loading" :fields="tableFields" />
      </div>
    </div>
  </el-scrollbar>

</template>
<script>
export default {
  name: "Dataindex",
  data() {
    return {
      echartData: {
        settings: {
          area: true
        },
        data: null,
        interval: null
      },
      loading: false,
      tableFields: [],
      searchData: {
        type: "1"
      },
      searchFields: [
        { span: 6, label: "选择", type: "daterange", prop: "date" },
        // { span: 3, label: "选择部门", type: "cascader", prop: "dept" },
        { span: 3, label: "查看数据", type: "button", click: this.getData }
      ],
     
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      let { data } = await this.axios("/adminapi/Analysis/list", {
        data: this.searchData
      });
      if (data.code) {
        this.$set(this.echartData, "data", {
          columns: Object.keys(data.data.day[0]),
          rows: data.data.day
        });
        this.$set(this.echartData, "interval", data.data.interval);
        this.tableFields = Object.keys(data.data.interval[0]).map(e => {
          return {
            label: e,
            prop: e
          };
        });
      }
      this.loading = false;
    },
    handleClick() {
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
</style>