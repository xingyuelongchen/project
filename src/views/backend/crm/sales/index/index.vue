<!--
Template Name: 顾问记录
Create author: qinglong
Create Time  : 2020-07-29
-->
<template>
  <div class="content-wrap">
    <mixSearch v-model="searchData" :fields="searchFields" />
    <div style="height:calc(100% - 80px)">
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
    <el-dialog title="分配" :visible.sync="fenShow" width="50%">
      <mixSearch v-model="salesSearchData" :fields="salesSearch" />
      <div style="height:500px;overflow:hidden">
        <mixTable v-model="tableSalesData" :fields="tableSales" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Salesindex",
  data() {
    return {
      fen: {},
      tableData: [],
      tableFields: [],
      loading: false,
      searchData: {},
      editData: {},
      show: false,
      showa: false,
      fenShow: false,
      searchFields: [],
      editFields: [],
      page: {
        page: 1,
        limit: 15,
        total: 0
      },
      salesSearchData: {},
      tableSalesData: [],
      salesSearch: [],
      tableSales: [
        { label: "昵称", prop: "nickname" },
        { label: "部门", prop: "servicer_group_zid" },
        { label: "累计接待量", prop: "count" },
        { label: "最大上限", prop: "limit" },
        {
          label: "状态",
          prop: "status",
          formatter: (a, b, c) => (c ? "接单中" : "休息中")
        },
        {
          label: "操作",
          type: "button",
          options: [
            {
              label: "分配",
              click: this.handfenpei,
              style: "primary",
              value: "0"
            }
          ]
        }
      ]
    };
  },
  async created() {
    await this.getDept();
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
              { label: "编辑", style: "primary", click: this.dialog, role: 71 },
              { label: "删除", style: "danger", click: this.del, role: 72 },
              {
                label: "更正",
                style: "danger",
                click: this.dialoga,
                role: 135
              },
              {
                label: "手动分配",
                style: "danger",
                click: this.fenpei,
                role: 139,
                isShow: { type: "==", prop: "servicer_userid", value: "" }
              },
              {
                label: "自动分配",
                style: "danger",
                role: 136,
                click: this.autoFenpei,
                isShow: { type: "==", prop: "servicer_userid", value: "" }
              }
            ]
          }
        ]);
      }
    },
    async getDept() {
      let { data } = await this.axios("/adminapi/sale/sale_dept");
      if (data.code) {
        this.searchFields = [
          {
            type: "datetimerange",
            span: 5.5,
            label: "选择",
            prop: "date"
          },
          {
            type: "select",
            span: 2,
            prop: "saler_group_zid",
            options: data.data
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
                click: this.export,
                role: 140
              }
            ]
          }
        ];
      }
    },
    async getData() {
      this.loading = true;
      let { data } = await this.axios("/adminapi/Sale/list", {
        data: { ...this.page, ...this.searchData }
      });
      if (data.code) {
        this.loading = false;
        this.tableData = data.data;
        this.page.total = data.count;
      }
    },
    // async gongxiang() {
    //   this.loading = true;
    //   let { data } = await this.axios("/adminapi/sale/share", {
    //     // data: { ...this.page, ...this.searchData }
    //   });
    //   if (data.code) {
    //     this.loading = false;
    //     this.tableData = data.data;
    //     this.page.total = data.count;
    //   }
    // },

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
    },
    async dept() {
      let { data } = await this.axios("/adminapi/sale/dept");
      if (data.code) {
        this.salesSearch = [
          { label: "昵称", type: "text", prop: "search", span: 6 },
          {
            label: "部门",
            type: "cascader",
            prop: "servicer_group_zid",
            span: 6,
            options: data.data,
            config: {
              emitPath: false,
              checkStrictly: true
            }
          },
          {
            type: "button",
            span: 3,
            options: [{ label: "搜索", click: this.fenpei, style: "primary" }]
          }
        ];
      }
    },
    async fenpei(item) {
      this.fen = item;
      // 手动分配
      await this.dept();
      // 获取导师列表
      let { data } = await this.axios("/adminapi/sale/refunder", {
        data: this.salesSearchData
      });
      if (data.code) {
        this.tableSalesData = data.data;
        this.fenShow = true;
      }
    },
    async handfenpei(item) {
      await this.axios("/adminapi/sale/manual", {
        data: { uid: item.id, ...this.fen }
      });
      this.getData();
      this.fenShow = false;
    },
    async autoFenpei(item) {
      // 自动分配
      await this.axios("/adminapi/sale/automatic", {
        data: item
      });
      this.getData();
    },
    async export() {
      let { data } = await this.axios("/adminapi/sale/export", {
        data: this.searchData
      });
      if (data.code) {
        let link = document.createElement("a");
        link.href = data.data.url;
        link.setAttribute("target", "_blank");
        link.setAttribute("download", data.data.title);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    async del(item) {
      await this.axios("/adminapi/sale/del", {
        data: { id: item.id }
      });
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
</style>