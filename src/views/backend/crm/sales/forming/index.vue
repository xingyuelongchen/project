<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-06
-->
<template>
  <div class="content-cols">
    <mixSearch v-model="searchData" :fields="searchFields" />
    <mixTable v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
  </div>
</template>
<script>
export default {
  name: "Salesforming",
  data() {
    return {
      key: 0,
      searchData: {},
      tableData: [],
      searchFields: [],
      tableFields: [
        { label: "时间", prop: "date_time" },
        { label: "部门", prop: "dept_id" },
        { label: "花名", prop: "nickname" },
        { label: "等级", prop: "grade" },
        { label: "目标金额", prop: "dest_sale_amount" },
        { label: "实际销售额", prop: "payment_total" },
        { label: "进度", prop: "progress" },
        { label: "出单数", prop: "count_sale" },
        { label: "接待数", prop: "count_enter" }
      ],
      page: {
        page: 1,
        limit: 10,
        total: 0
      }
    };
  },
  created() {
    this.getDept();
    this.getData();
  },
  methods: {
    async getDept() {
      let { data } = await this.axios("/adminapi/Saleforming/dept", {
        data: {}
      });
      if (data.code) {
        this.searchFields = [
          { span: 3, label: "选择", type: "month", prop: "month" },
          { span: 3, label: "花名", type: "text", prop: "nickname" },
          {
            span: 3,
            label: "部门选择",
            type: "select",
            prop: "dept_id",
            options: data.data,
            role: 250
          },
          { span: 10, label: "搜索", type: "button", click: this.getData }
        ];
      }
    },
    async getData() {
      this.tableData = [];
      let { data } = await this.axios("/adminapi/Saleforming/list", {
        data: Object.assign({}, this.page, this.searchData)
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
        this.key = Math.random();
      }
    }
  }
};
</script>
