<!--
Template Name: thtor
Create author: qinglong
Create Time  : 2020-07-24
-->
<template>
  <step v-if="stepShow" v-model="stepShow" :item="step" />
  <div v-else class="content">
    <div class="content-cols">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <mixTable v-model="tableData" :fields="tableFields" />
      <mixPage v-model="page" />
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" title="编辑">
      <mixForm v-model="editData" :fields="editFields" />
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="添加业绩" :visible.sync="qrcode" width="50%">
      <div style="max-height:500px;height:500px;overflow:hidden">
        <el-scrollbar>
          <mixForm v-model="qrocdeData" :fields="qrocdeFields" style="border:none;padding-right:20px" />
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOrder">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Crosstutor",
  components: { step: () => import("./step") },
  data() {
    return {
      show: false,
      stepShow: false,
      step: null,
      page: { page: 1, limit: 10, total: 0 },
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
      editData: {},
      qrcode: false,
      qrocdeData: {},
      qrocdeFields: [],
      salesSearchData: {}
    };
  },
  stepShow(a) {
    !a && this.getData();
  },
  created() {
    this.getData();
    this.getTable();
  },
  methods: {
    async getTable() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 12 }
      });
      if (data.code) {
        this.tableFields = data.data.concat([
          {
            label: "操作",
            fixed: "right",
            type: "manage",
            width: 100,
            options: [
              // { label: "编辑", click: this.edit },
              // { label: "添加业绩", click: this.addOrder },
              {
                label: "服务状态",
                click: this.speed,
                isShow: { prop: "type", type: "==", val: "新业绩" }
              },
              { label: "删除", click: this.del,role:227 }
            ]
          }
        ]);
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Cross/list", {
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
      await this.axios("/adminapi/Cross/edit", {
        data: this.editData
      });
      this.getData();
    },
    async del(item) {
      this.axios("/adminapi/Cross/del", {
        data: item
      });
      this.getData();
    },
    speed(item) {
      this.step = {
        customer_id: item.customer_id,
        service_id: item.id,
        sale_id: item.sale_id
      };
      this.stepShow = true;
    },
    async saveOrder() {
      // 添加业绩保存
      let form = {};
      for (let k of this.qrocdeFields) {
        form[k.prop] = this.qrocdeData[k.prop];
      }
      form.service_id = this.qrocdeData.id;
      let { data } = await this.axios("/adminapi/Servicesale/add", {
        data: form
      });
      if (data.code) {
        this.getData();
        this.qrcode = false;
      }
    },
    async addOrder(item) {
      // 添加业绩
      let { data } = await this.axios("/adminapi/Publics/TableFormEdit", {
        data: { type: "add", table_id: 13 }
      });
      if (data.code) {
        let obj = JSON.parse(JSON.stringify(item));
        delete obj.remark;
        this.qrocdeData = { ...obj, discount: 0 };
        this.qrocdeFields = data.data.map(e => {
          if (e.prop == "type" && item.xin) {
            e.options.shift();
          }
          if (e.prop == "is_timely" && item.xin) {
            e.type = "hidden";
          }
          if (e.prop == "is_goods" && item.xin) {
            e.type = "hidden";
          }
          return e;
        });
        this.qrcode = true;
      }
    }
  }
};
</script>
