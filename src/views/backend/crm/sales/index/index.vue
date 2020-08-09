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
      <div style="height:500px;overflow:hidden">
        <el-scrollbar>
          <mixForm v-model="editData" :fields="editFields" style="padding-right:20px" />
        </el-scrollbar>
      </div>
    </el-dialog>
    <el-dialog title="更正" :visible.sync="showa" width="30%">
      <mixForm v-model="editData" :fields="editFields" style="padding-right:20px" />
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
      showa: false,
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
      editFields: [],
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
            label: "操作",
            type: "manage",
            align: "center",
            fixed: "right",
            options: [
              { label: "编辑", style: "primary", click: this.dialog },
              { label: "更正", style: "danger", click: this.dialoga }
            ]
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
    async change() {
      let form = {};
      for (let k of this.editFields) {
        form[k.prop] = this.editData[k.prop];
      }
      await this.axios("/adminapi/Sale/edit", {
        data: form
      });
      this.show = false;
    },
    async changea() {
      await this.axios("/adminapi/Sale/corrections", {
        data: this.editData
      });
      this.getData();
      this.showa = false;
    },
    async dialoga(row) {
      let { data } = await this.axios("/adminapi/Sale/p_tool");
      if (data.code) {
        this.editFields = [
          {
            label: "业绩类型",
            options: data.data,
            type: "radio",
            prop: "type"
          },
          {
            label: "销售时间",
            type: "datetime",
            prop: "create_time"
          },
          {
            label: "保存",
            style: "primary",
            type: "button",
            click: this.changea
          }
        ];
        this.editData = {
          id: row.id,
          create_time: row.create_time,
          type: row.type
        };
        this.showa = true;
      }
    },
    async dialog(row) {
      let { data } = await this.axios("/adminapi/Publics/TableFormEdit", {
        data: { type: "edit", table_id: 3 }
      });
      if (data.code) {
        this.editFields = data.data.concat([
          { type: "button", label: "保存", click: this.change }
        ]);
        this.editData = row;
        this.show = true;
      }
      // this.editFields = [{ type: "upload", fie }];
    },
    search() {
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
</style>