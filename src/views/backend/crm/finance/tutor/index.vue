<!--
Template Name: 财务管理
Create author: qinglong
Create Time  : 2020-08-07
-->
<template>
  <div class="content">
    <div class="content-cols">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <mixTable v-model="tableData" :fields="tableFields" />
      <mixPage v-model="page" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Financetutor",
  data() {
    return {
      page: {
        page: 1,
        limit: 10,
        total: 0
      },
      searchData: {},
      searchFields: [],
      tableData: [],
      tableFields: []
    };
  },

  async created() {
    await this.getData();
    await this.getHeadeData();
    await this.getDept();
  },

  methods: {
    async getDept() {
      let { data } = await this.axios("/adminapi/Servicesale/sale_dept");
      if (data.code) {
        this.searchFields = [
          {
            type: "datetimerange",
            span: 5.5,
            label: "选择",
            prop: "date"
          },
          {
            label: "部门",
            type: "select",
            span: 2,
            prop: "saler_group_zid",
            options: data.data
          },
          {
            label: "状态",
            type: "select",
            prop: "finance_audit_status",
            span: 2,
            options: [
              { label: "未审核", value: "0" },
              { label: "已审核", value: "1" }
            ]
          },
          {
            label: "业绩类型",
            type: "select",
            span: 2,
            prop: "type",
            options: [
              { label: "新业绩", value: "新业绩" },
              { label: "补欠款", value: "补欠款" },
              { label: "升级", value: "升级" }
            ]
          },
          {
            label: "模糊搜索",
            type: "text",
            span: 3,
            prop: "search"
          },

          {
            span: 6,
            type: "button",
            options: [
              {
                label: "搜索",
                click: this.getData
              },
              // {
              //   label: "共享",
              //   click: this.gongxiang
              // },
              {
                label: "导出",
                style: "danger",
                click: this.onExport,
                role: 241
              }
            ]
          }
        ];
      }
    },
    async getHeadeData() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 13 }
      });
      if (data.code) {
        this.tableFields = data.data.concat([
          {
            label: "操作",
            type: "button",
            fixed: "right",
            width: 110,
            options: [
              {
                label: "审核",
                style: "primary",
                click: this.shenhe,
                role: 240,
                isShow: { type: "==", prop: "finance_audit_status", val: "0" }
              },
              {
                label: "审核完成",
                style: "primary",
                isShow: { type: "==", prop: "finance_audit_status", val: "1" }
              }
            ]
          }
        ]);
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Financeservice/list", {
        data: Object.assign({}, this.page, this.searchData)
      });
      if (data.code) {
        this.tableData = data.data;
        // this.page.total = data.count;
      }
    },
    async shenhe(item) {
      let { data } = await this.axios("/adminapi/Financeservice/audit_status", {
        data: { id: item.id, finance_audit_status: 1 }
      });
      if (data.code) {
        this.getData();
      }
    },
    async onExport() {
      // 导出表格
      let { data } = await this.axios("/adminapi/Financeservice/export", {
        data: this.searchData
      });
      if (data.code) {
        const link = document.createElement("a");
        link.href = data.data.url;
        link.setAttribute("target", "_blank");
        link.setAttribute("download", data.data.title);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
};
</script>
