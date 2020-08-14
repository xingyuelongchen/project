<!--
Template Name: 接待设置
Create author: qinglong
Create Time  : 2020-04-02
-->
<template>
  <div class="content-wrap">
    <div class="box">
      <mixSearch v-model="search" :fields="searchFields" />
      <div>
        <mixSearch v-model="selectionData" :fields="selectionField" v-role="68" />
      </div>
      <div style="height:calc(100% - 150px)">
        <mixTable v-model="tableData" :fields="tableFields" @select="select" />
      </div>
      <mixPage v-model="page" />
    </div>
    <!-- <mixDrawer v-model="drawer" :title="drawerName" @confirm="onSave" @close="drawerClose">
      <mixForm v-model="editForm" :fields="editFields" />

    </mixDrawer> -->
    <el-dialog :title="drawerName" :visible="drawer" width="30%" :before-close="drawerClose">

      <mixTable v-model="salesList" :fields="dialogTable" @select="select($event,'user')" />
      <span slot="footer">
        <el-button type="primary" @click="onSave">提交</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: "Tutorreceive",
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
          span: 3
        },
        {
          label: "选择部门",
          type: "select",
          prop: "servicer_group_zid",
          span: 3
        },
        {
          type: "button",
          span: 10,
          options: [
            { label: "搜索", style: "success", click: this.onSearch },
            { label: "重置", style: "init", click: this.onReset },
            {
              label: "添加",
              style: "primary",
              icon: "el-icon-plus",
              click: this.onAdd,
              role: 67
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
        // {
        //   label: "接待渠道",
        //   type: "select",
        //   prop: "source",
        //   span: 3,
        //   options: [
        //     { label: "微信", value: 1 },
        //     { label: "QQ", value: 2 },
        //     { label: "微信、QQ", value: 3 }
        //   ]
        // },
        // {
        //   label: "渠道",
        //   type: "select",
        //   prop: "channel",
        //   span: 3,
        //   options: [
        //     { label: "信息流", value: 1 },
        //     { label: "搜索引擎", value: 2 },
        //     { label: "信息流、搜索引擎", value: 3 }
        //   ]
        // },

        {
          label: "接待上限",
          type: "number",
          prop: "limit",
          span: 3
        },
        {
          label: "接单状态",
          type: "select",
          prop: "status",
          span: 3,
          options: [
            { label: "开启", value: 1 },
            { label: "暂停", value: "0" }
          ]
        },
        {
          type: "button",
          span: 3,
          options: [
            { label: "批量修改", click: this.selectEdit, style: "primary" }
          ]
        }
      ],
      tableData: [],
      tableFields: [
        { type: "selection" },
        { sort: true, label: "ID", prop: "id" },
        { sort: true, label: "花名", prop: "nickname" },
        { sort: true, label: "部门ID", prop: "servicer_group_zid" },
        { sort: true, label: "累计接待", prop: "count" },
        {
          sort: true,
          label: "接待上限",
          prop: "limit",
          type: "input",
          change: this.change
        },
        // {
        //   sort: true,
        //   label: "渠道",
        //   prop: "channel",
        //   type: "select",
        //   change: this.change,
        //   minWidth: 150,
        //   options: [
        //     { label: "信息流", value: 1 },
        //     { label: "搜索引擎", value: 2 },
        //     { label: "信息流、搜索引擎", value: 3 }
        //   ]
        // },
        // {
        //   sort: true,
        //   label: "接待渠道",
        //   prop: "source",
        //   type: "select",
        //   change: this.change,
        //   minWidth: 150,
        //   options: [
        //     { label: "微信", value: 1 },
        //     { label: "QQ", value: 2 },
        //     { label: "微信、QQ", value: 3 }
        //   ]
        // },
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
          minWidth: 250,
          options: [
            { label: "删除", style: "danger", click: this.tableDel, role: 69 },
            {
              label: "自行控制",
              style: "warning",
              click: this.control,
              role: 162
            },
            { label: "权重", style: "success", click: this.weight, role: 161 }
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
      let { data } = await this.axios("/adminapi/Servicerefunder/UserList");
      if (data.code) {
        this.salesList = data.data;
      }
    },
    async getDepartment() {
      let { data } = await this.axios("/adminapi/Servicerefunder/dept");
      if (data.code) {
        this.searchFields = this.searchFields.map(e => {
          if (e.prop == "servicer_group_zid") {
            e.options = data.data;
          }
          return e;
        });
      }
    },
    async getData(type = true) {
      let form = type ? Object.assign({}, this.search, this.page) : this.page;
      let { data } = await this.axios("/adminapi/Servicerefunder/list", {
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
      this.url = "/adminapi/Servicerefunder/add";
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
      let url = "/adminapi/Servicerefunder/edit";
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
          await this.axios("/adminapi/Servicerefunder/control", {
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
      let url = "/adminapi/Servicerefunder/edit";
      await this.axios(url, { data: obj });
    },
    async control(item) {
      await this.axios("/adminapi/Servicerefunder/control", {
        data: { id: item.id, control: item.control == "是" ? 0 : 1 }
      });
      this.getData();
    },
    async tableDel(item) {
      let { data } = await this.axios("/adminapi/Servicerefunder/del", {
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
<style lang='less' scoped>
.box {
  height: 100%;
  // margin: 20px;

  .mix-search {
    margin: 5px 0;
    padding: 5px;
    background: #f0f0f0;
  }
  .el-pagination {
    text-align: right;
    padding: 20px;
    background: #fff;
  }
}
</style>