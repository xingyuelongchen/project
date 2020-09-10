<!--
Template Name: quality
Create author: qinglong
Create Time  : 2020-07-24
-->
<template>
  <step v-if="stepShow" v-model="stepShow" :item="step" />
  <div v-else class="content-cols">
    <mixSearch v-model="searchData" :fields="searchFields" />
    <mixTable v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
  </div>
</template>
<script>
export default {
  name: "Qualityindex",
  components: { step: () => import("./step") },
  data() {
    return {
      stepShow: false,
      step: {},
      tableFields: [],
      tableData: [],
      searchData: {},
      searchFields: [
        { label: "旺旺/qq/手机号", type: "text", prop: "search", span: 3 },
        { label: "选择 ", type: "datetimerange", prop: "date", span: 6 },
        {
          type: "button",
          span: 5,
          options: [
            { label: "导出", click: this.export, role: 254 },
            { label: "搜索", click: this.getData }
          ]
        }
      ],

      page: { page: 1, limit: 10, total: 0 }
    };
  },
  watch: {
    stepShow(a) {
      !a && this.getData();
    }
  },
  created() {
    this.getTable();
    this.getData();
  },
  methods: {
    async getTable() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 11 }
      });
      if (data.code) {
        this.tableFields = data.data.concat([
          {
            label: "操作",
            type: "button",
            fixed: "right",
            width: 120,
            options: [
              {
                label: "服务状态",
                style: "primary",
                click: this.onStep
              }
            ]
          }
        ]);
      }
    },
    onStep(item) {
      let { customer_id, sale_id, service_id, id } = item;
      this.step = { customer_id, sale_id, service_id, id };
      this.stepShow = true;
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Financerefund/list", {
        data: { ...this.page, ...this.searchData }
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.data.count;
      }
    },
    async export() {
      // 导出表格
      let { data } = await this.axios("/adminapi/Financerefund/export", {
        data: this.search
      });
      if (data.code) {
        const link = document.createElement("a");
        link.href = data.data.url;
        let a = window.open(data.data.url, "_blank");
        setTimeout(a.close, 100);
        // link.setAttribute("download", data.data.title);
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      }
    }
  }
};
</script>
 