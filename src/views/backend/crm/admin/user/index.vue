<!--
Template Name: 员工管理
Create author: qinglong
Create Time  : 2020-07-26
-->
<template>
  <div class="content-box">
    <mixSearch v-model="search" :fields="searchFields" />
    <div>
      <mixTable v-model="tableData" :fields="tableFields" />
    </div>
    <mixPage v-model="page" />
  </div>
</template>
<script>
export default {
  name: "Adminmenber",
  data() {
    return {
      tableData: [],
      tableFields: [],
      search: {},
      searchFields: [
        {
          type: "select",
          label: "搜索",
          prop: "status",
          span: 3,
          options: [
            {
              label: "在职",
              value: 1
            },
            {
              label: "离职",
              value: 2
            },
            {
              label: "未审核",
              value: "0"
            }
          ]
        },

        { type: "text", label: "搜索", prop: "search", span: 3 },
        {
          type: "button",
          prop: "value",
          span: 3,
          label: "搜索",
          style: "primary",
          click: this.getData
        }
      ],
      page: {
        page: 1,
        limit: 10,
        total: 0,
        event: this.getData
      }
    };
  },
  activated() {
    this.getData();
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 2 }
      });
      if (data.code) {
        this.tableFields = data.data.concat([
          {
            label: "操作",
            type: "manage",
            fixed: "right",
            options: [
              {
                label: "编辑",
                style: "primary"
              },
              {
                label: "审核",
                style: "warning",
                isShow: { type: "==", val: "未审核", prop: "status" },
                click: this.adopt
              },
              {
                label: "离职",
                style: "info",
                isShow: { type: "==", val: "正常", prop: "status" },
                click: this.quit
              },
              {
                label: "恢复",
                style: "success",
                isShow: { type: "==", val: "离职", prop: "status" },
                click: this.recovery
              }
            ]
          }
        ]);
      }
    },
    async getData() {
      let page = JSON.parse(JSON.stringify(this.page));
      delete page.event;
      let { data } = await this.axios("/adminapi/User/list", {
        params: Object.assign(page, this.search)
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
      }
    },
    async adopt(item) {
      await this.axios("/adminapi/User/adopt", {
        data: { id: item.id }
      });
      this.getData();
    },
    async quit(item) {
      await this.axios("/adminapi/User/quit", {
        data: { id: item.id }
      });
      this.getData();
    },
    async recovery(item) {
      await this.axios("/adminapi/User/recovery", {
        data: { id: item.id }
      });
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
</style>