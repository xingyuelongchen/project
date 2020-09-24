<!--
Template Name: 接待设置
Create author: qinglong
Create Time  : 2020-04-02
-->
<template>
  <div class="content">
    <div class="content-cols">
      <mixSearch v-model="search" :fields="searchFields" />
      <mixSearch v-model="selectionData" :fields="selectionField" v-role="43" />
      <mixTable v-model="tableData" :fields="tableFields" @select="select" />
      <mixPage v-model="page" />
    </div>
    <!-- <mixDrawer v-model="drawer" :title="drawerName" @confirm="onSave" @close="drawerClose">
      <mixForm v-model="editForm" :fields="editFields" />
    </mixDrawer> -->
    <el-dialog :close-on-click-modal="false" :title="drawerName" :visible="drawer" width="30%" :before-close="drawerClose">
      <div style="height:50vh;max-height:500px;overflow:hidden">
        <div style="height:100%">
          <mixTable v-model="salesList" :fields="dialogTable" @select="select($event,'user')" />
        </div>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="onSave">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Salesreceive",
  data() {
    return {
      url: null,
      drawerName: "",
      drawer: false,
      salesList: [],
      search: {},
      close: null,
      searchFields: [
        {
          label: "模糊搜索",
          type: "text",
          prop: "search",
          span: 2
        },
        {
          label: "选择部门",
          type: "select",
          prop: "saler_group_zid",
          span: 2
        },
        {
          type: "button",
          span: 5,
          options: [
            { label: "搜索", style: "success", click: this.onSearch },
            { label: "重置", style: "init", click: this.onReset },
            {
              label: "添加",
              style: "primary",
              icon: "el-icon-plus",
              click: this.onAdd,
              role: 42
            }
          ]
        }
      ],
      page: {
        limit: 10,
        page: 1,
        total: 0
      },
      selectList: [],
      selectionData: { channel: null, source: null, status: null },
      selectionField: [
        {
          label: "接待渠道",
          type: "select",
          prop: "source",
          span: 2,
          options: [
            { label: "微信", value: 1 },
            { label: "QQ", value: 2 },
            { label: "手机号", value: 3 },
            { label: "全部", value: 4 }
          ]
        },
        {
          label: "渠道",
          type: "select",
          prop: "channel",
          span: 2,
          options: [
            { label: "信息流", value: 1 },
            { label: "搜索引擎", value: 2 },
            { label: "其它", value: 3 },
            { label: "全部", value: 4 }
          ]
        },

        {
          label: "接待上限",
          type: "number",
          prop: "limit",
          span: 2
        },
        {
          label: "接单状态",
          type: "select",
          prop: "status",
          span: 2,
          options: [
            { label: "开启", value: 1 },
            { label: "暂停", value: "0" }
          ]
        },
        {
          type: "button",
          span: 6,
          options: [
            { label: "批量修改", click: this.selectEdit, style: "primary" },
            {
              label: "批量删除",
              click: this.selectDel,
              style: "danger",
              role: 209
            }
          ]
        }
      ],
      tableData: [],
      tableFields: [
        { type: "selection" },
        { sort: true, label: "ID", prop: "id" },
        { sort: true, label: "花名", prop: "nickname" },
        { sort: true, label: "部门ID", prop: "saler_group_zid" },
        { sort: true, label: "累计接待", prop: "count" },
        {
          sort: true,
          label: "接待上限",
          prop: "limit",
          type: "input",
          change: this.change
        },
        {
          sort: true,
          label: "渠道",
          prop: "channel",
          type: "select",
          change: this.change,
          minWidth: 150,
          options: [
            { label: "信息流", value: 1 },
            { label: "搜索引擎", value: 2 },
            { label: "其它", value: 3 },
            { label: "全部", value: 4 }
          ]
        },
        {
          sort: true,
          label: "接待渠道",
          prop: "source",
          type: "select",
          change: this.change,
          minWidth: 150,
          options: [
            { label: "微信", value: 1 },
            { label: "QQ", value: 2 },
            { label: "手机号", value: 3 },
            { label: "全部", value: 4 }
          ]
        },
        {
          sort: true,
          label: "权重",
          prop: "weight",
          type: "input",
          change: this.change,
          minWidth: 100
        },
        {
          label: "是否接单",
          prop: "status",
          align: "center",
          type: "switch",
          change: this.change,
          options: [
            { label: "开启", value: true },
            { label: "暂停", value: false }
          ]
        },
        {
          label: "自行控制",
          prop: "control",
          align: "center",
          change: this.change,
          type: "tag",
          options: [
            {
              label: "是",
              value: "是",
              style: "success"
            },
            {
              label: "否",
              value: "否",
              style: "danger"
            }
          ]
        },
        {
          label: "操作",
          type: "manage",
          minWidth: 110,
          options: [
            { label: "删除", style: "danger", click: this.tableDel, role: 44 },
            {
              label: "自行控制",
              style: "warning",
              click: this.control,
              role: 144
            },
            { label: "权重", style: "success", click: this.weight, role: 143 }
          ]
        }
      ],
      dialogTable: [
        { type: "selection" },
        { sort: true, label: "ID", prop: "id" },
        { sort: true, label: "花名", prop: "nickname" },
        { sort: true, label: "部门", prop: "dept_id" }
      ],
      editForm: { user: [] },
      editFields: []
    };
  },
  created() {
    this.usersList();
    this.getDepartment();
    this.getData(false);
  },
  methods: {
    async usersList() {
      let { data } = await this.axios("/adminapi/Customerrefunder/UserList");
      if (data.code) {
        this.salesList = data.data;
      }
    },
    async getDepartment() {
      let { data } = await this.axios("/adminapi/Customerrefunder/dept");
      if (data.code) {
        this.searchFields = this.searchFields.map(e => {
          if (e.prop == "saler_group_zid") {
            e.options = data.data;
          }
          return e;
        });
      }
    },
    async getData(type = true) {
      let form = type ? Object.assign({}, this.search, this.page) : this.page;
      let { data } = await this.axios("/adminapi/Customerrefunder/list", {
        data: form
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.total;
      }
    },
    async onAdd() {
      await this.usersList();
      this.drawerOpen("添加");
      this.url = "/adminapi/Customerrefunder/add";
    },
    select(select, type) {
      console.log(select, type);
      // 多选数据
      if (type == "user") {
        this.editForm.user = select.map(e => e.id);
      } else {
        this.selectList = select;
      }
    },

    async selectDel() {
      // 批量删除
      if (!(this.selectList && this.selectList.length)) {
        this.$notify.error({
          title: "错误",
          message: "请选择需要修改的数据"
        });
        return;
      }
      let obj = { id: this.selectList.map(e => e.id), ...this.selectionData };
      let url = "/adminapi/Customerrefunder/batch_del";
      let { data } = await this.axios(url, { data: obj });
      if (data.code) {
        this.getData(false);
      }
    },
    async selectEdit() {
      // 批量设置
      if (!(this.selectList && this.selectList.length)) {
        this.$notify.error({
          title: "错误",
          message: "请选择需要修改的数据"
        });
        return;
      }
      let obj = { id: this.selectList.map(e => e.id), ...this.selectionData };
      let url = "/adminapi/Customerrefunder/edit";
      let { data } = await this.axios(url, { data: obj });
      if (data.code) {
        this.getData(false);
      }
    },

    onSearch() {
      this.getData();
    },
    onReset() {
      this.getData(false);
      this.search = {};
    },
    async weight(item) {
      this.$prompt("请输入权重", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d+$/,
        inputErrorMessage: "请输入数字",
        inputValue: item.weight
      })
        .then(async e => {
          await this.axios("/adminapi/Customerrefunder/control", {
            data: { id: item.id, weight: e.value }
          });
          this.getData();
        })
        .catch(e => {
          console.log(e);
        });
    },
    async change(item, scope) {
      let obj = { id: item.id };
      obj[scope.column.property] = item[scope.column.property];
      let url = "/adminapi/Customerrefunder/edit";
      await this.axios(url, { data: obj });
    },
    async control(item) {
      await this.axios("/adminapi/Customerrefunder/control", {
        data: { id: item.id, control: item.control == "是" ? 0 : 1 }
      });
      this.getData();
    },
    async tableDel(item) {
      let { data } = await this.axios("/adminapi/Customerrefunder/del", {
        data: { id: item.id }
      });
      if (data.code) {
        this.getData();
      }
    },
    manage() {
      console.log("操作");
    },

    drawerOpen(title) {
      this.drawer = true;
      this.drawerName = title;
    },
    drawerClose() {
      this.drawer = false;
      this.editForm = {};
    },
    sizeChange(a) {
      this.page.limit = a;
      this.getData();
    },
    currentChange(a) {
      this.page.page = a;
      this.getData();
    },
    async onSave() {
      let { data } = await this.axios(this.url, {
        data: this.editForm.user
      });
      if (data.code) {
        this.drawerClose();
        this.getData();
      }
    }
  }
};
</script>