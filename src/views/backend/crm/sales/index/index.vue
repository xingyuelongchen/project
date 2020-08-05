<!--
Template Name: 咨询列表
Create author: qinglong
Create Time  : 2020-07-29
-->
<template>
  <div class="content-wrap">
    <mixSearch v-model="searchData" :fields="searchFields" />
    <!-- <mixNewTable v-model="tableData" :fields="tableFields" :page="page" :search="tableSearch" :loading="loading" /> -->
    <div style="height:calc(100% - 70px)">
      <mixTable v-model="tableData" :fields="tableFields" />
    </div>
    <mixPage v-model="page" />
    <el-dialog title="编辑" :visible.sync="show" width="30%">
      <mixForm v-model="editData" :fields="editFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Salesindex",
  data() {
    return {
      tableData: [],
      tableFields: [],
      loading: false,
      searchData: {},
      editData: {},
      show: false,
      searchFields: [
        {
          type: "text",
          span: 3,
          prop: "search"
        },
        {
          span: 3,
          type: "button",
          label: "搜索",
          click: this.search
        }
      ],
      editFields: [
        {
          label: "修改二维码",
          type: "image",
          prop: "screenshot"
        }
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
    this.getHeadeData();
  },
  methods: {
    async getHeadeData() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 3 }
      });
      if (data.code) {
        this.tableFields = data.data.concat([
          {
            type: "manage",
            fixed: "right",
            options: [{ label: "编辑", style: "primary", click: this.dialog }]
          }
        ]);
      }
    },
    async getData() {
      this.loading = true;
      let { data } = await this.axios("/adminapi/Sale/list", {
        params: Object.assign({}, this.page, this.searchData)
      });
      if (data.code) {
        this.loading = false;
        this.tableData = data.data;
        this.page.total = data.count;
      }
    },
    async change(item) {
      console.log(item);
      let { data } = await this.axios("/adminapi/Customer/edit", {
        data: item.row
      });
      if (data.code) {
        console.log(data);
      }
    },
    dialog(row) {
      console.log(row);
      this.editData = row;
      // this.editFields = [{ type: "upload", fie }];
      this.show = true;
    },
    search() {
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
</style>