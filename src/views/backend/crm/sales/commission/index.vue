<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-06
-->
<template>
  <div class="content">
    <div class="content-cols">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <mixTable v-model="tableData" :fields="tableFields" @select="select" />
      <mixPage v-model="page" />
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" title="编辑" width="500px">
      <mixForm v-model="formData" :fields="formFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Salestotal",
  data() {
    return {
      selectList: [],
      show: false,
      page: {
        limit: 10,
        page: 1,
        total: 0
      },
      searchData: {},
      searchFields: [
        { label: "日期", prop: "month", type: "month", span: 5 },
        {
          span: 6,
          type: "button",
          options: [
            { label: "搜索", click: this.getData },
            {
              label: "批量设置",
              click: this.piliang,
              style: "danger",
              role: 152
            }
          ]
        }
      ],
      tableData: [],
      tableFields: [
        { type: "selection" },
        { label: "时间", prop: "month" },
        { label: "花名", prop: "nickname" },
        { label: "部门", prop: "saler_group_zid" },
        {
          label: "提成等级",
          prop: "grade",
          type: "tagdown",
          options: [],
          change: this.change
        },
        {
          label: "目标金额",
          prop: "dest_sale_amount",
          type: "input",
          change: this.change
        }
      ],
      formData: {},
      formFields: [
        {
          label: "等级",
          prop: "grade",
          type: "select",
          labelWidth: 70,
          options: []
        },
        {
          label: "目标金额",
          prop: "dest_sale_amount",
          type: "text",
          labelWidth: 70,
          options: []
        },
        {
          labelWidth: 40,
          type: "button",
          label: "保存",
          click: this.save
        }
      ]
    };
  },
  created() {
    this.getData();
    this.getTable();
  },
  methods: {
    select(item) {
      this.selectList = item.map(e => e.id);
    },

    async getTable() {
      let { data } = await this.axios("/adminapi/Salerate/p_tool");
      if (data.code) {
        this.formFields = this.formFields.map(e => {
          if (e.prop == "grade") {
            e.options = data.data;
          }
          return e;
        });
        this.tableFields = this.tableFields.map(e => {
          if (e.prop == "grade") {
            e.options = data.data;
          }
          return e;
        });
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Salecommission/list", {
        params: Object.assign({}, this.searchData)
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
        this.show = false;
      }
    },
    piliang() {
      this.show = true;
    },
    async save() {
      await this.axios("/adminapi/Salecommission/edit", {
        data: Object.assign({ id: this.selectList }, this.formData)
      });
      this.getData();
      this.show = false;
    },
    async change(item) {
      let { id, dest_sale_amount, grade } = item;
      await this.axios("/adminapi/Salecommission/edit", {
        data: { id, dest_sale_amount, grade }
      });
      this.getData();
    }
  }
};
</script>
