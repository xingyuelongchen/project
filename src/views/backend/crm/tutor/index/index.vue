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
    <el-dialog :visible.sync="show" title="编辑">
      <mixForm v-model="editData" :fields="editFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Tutorindex",
  data() {
    return {
      show: false,
      plenShow: false,
      page: { page: 1, limit: 15, total: 0 },
      searchData: {},
      searchFields: [
        { label: "时间", type: "datetimerange", span: 5.5, prop: "date" },
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
        { label: "模糊搜索", type: "text", span: 3, prop: "search" },
        { label: "搜索", type: "button", span: 3, click: this.getData }
      ],
      tableData: [],
      tableFields: [],
      editFields: [],
      editData: {}
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
        this.tableFields = data.data.concat([
          {
            label: "操作",
            fixed: "right",
            type: "manage",
            width: 100,
            options: [
              { label: "编辑", click: this.edit },
              { label: "学习进度", click: this.speed },
              { label: "删除", click: this.del }
            ]
          }
        ]);
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
    },
    async edit() {
      this.show = true;
      let { data } = await this.axios("");
      if (data.code) {
        this.editData = data.data.concat([
          {
            label: "保存",
            type: "button",
            style: "primary",
            click: this.save
          }
        ]);
      }
    },

    async save() {
      await this.axios("/adminapi/Service/edit", {
        data: this.editData
      });
      this.getData();
    },
    async del(item) {
      this.axios("/adminapi/Service/del", {
        data: item
      });
      this.getData();
    },
    async speed(item) {
      this.plenShow = true;
      console.log(item);
    }
  }
};
</script>
<style lang='less' scoped>
</style>