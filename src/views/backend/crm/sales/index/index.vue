<!--
Template Name: 咨询列表
Create author: qinglong
Create Time  : 2020-07-29
-->
<template>
  <div class="content-wrap">
    <mixNewTable v-model="tableData" :fields="tableFields" :page="page" :search="tableSearch" :loading="loading" />
  </div>
</template>
<script>
export default {
  name: "Salesindex",
  data() {
    return {
      tableData: [],
      tableFields: [],
      tableSearch: {},
      loading: false,
      page: {
        total: 0,
        page: 1,
        limit: 20
      }
    };
  },
  // activated() {
  //   this.getData();
  //   this.getHeadeData();
  // },
  methods: {
    async getHeadeData() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 1 }
      });
      if (data.code) {
        this.tableFields = data.data.map(e => {
          return {
            title: e.label,
            field: e.prop,
            readonly: true,
            "min-width": e.minWidth
          };
        });
      }
    },
    async getData() {
      this.loading = true;
      let { data } = await this.axios("/adminapi/Customer/list", {
        params: Object.assign({}, this.page, this.tableSearch)
      });
      if (data.code) {
        this.loading = false;
        this.tableData = data.data;
        this.page.total = data.count;
      }
    },
    async change(item) {
      console.log(item);
      // let { data } = await this.axios("/adminapi/Customer/edit", {
      //   data: item.row
      // });
    }
  }
};
</script>
<style lang='less' scoped>
</style>