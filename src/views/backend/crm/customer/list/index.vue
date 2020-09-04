<!--
Template Name: 客户管理
Create author: qinglong
Create Time  : 2020-03-27
-->
<template>
  <div class="content-wrap">
    <mixSearch v-model="search" :fields="searchFields" />
    <div class="info">
      <span>
        <el-button @click="handDistribution(null,true)" type="primary" size="mini" v-role="126">手动分配</el-button>
      </span>
      <span>
        <el-button @click="autoDistribution(null,true)" type="warning" size="mini" v-role="123">自动分配</el-button>
      </span>
    </div>
    <div style="height:calc(100% - 160px)" :key="key">
      <mixTable v-model="tableData" :fields="tableFields" @select="selection" />
    </div>
    <mixPage v-model="page" />
    <mixDrawer style="top:180px" v-model="drawer" :title="drawerName" @confirm="onSave" @close="drawerClose" :isShow="true">
      <mixForm v-model="editForm" :fields="editFields" />
    </mixDrawer>
    <el-dialog :title="dialogName" :visible.sync="dialogVisible" width="50%">
      <div style="max-height:500px;height:500px;overflow:hidden">
        <mixSearch v-model="salesSearchData" :fields="salesSearch" v-if="!show" />
        <mixTable v-model="tableSalesData" :fields="tableSales" v-if="!show" />
        <mixForm v-model="addOrderData" :fields="addOrderFields" v-if="show" style="border:none" />
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">关闭窗口</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Customerlist",
  data() {
    return {
      key: "a",
      show: false,
      maxOrder: null,
      page: {
        limit: 10,
        page: 1,
        total: 0
      },
      shareTableData: [],
      shareTableFields: [
        { label: "花名", prop: "nickname" },
        { label: "部门", prop: "dept" }
      ],
      id: null,
      drawerName: "编辑",
      drawer: false,
      dialogVisible: false,
      dialogName: "选择销售人员",
      tableFields: [],
      tableData: [],
      formFieldsData: {},
      tableSalesData: {},
      tableSales: [
        { label: "昵称", prop: "nickname" },
        { label: "部门", prop: "saler_group_zid" },
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
            { label: "分配", click: this.onDistribution, style: "primary" }
          ]
        }
      ],
      selectList: [],
      selectionData: { channel: null, source: null, status: null },
      search: {},
      searchFields: [],
      salesSearchData: {},
      salesSearch: [
        { label: "昵称", type: "text", prop: "search", span: 6 },
        {
          label: "部门",
          type: "cascader",
          prop: "saler_group_zid",
          span: 6,
          config: {
            emitPath: false,
            checkStrictly: true
          }
        },
        {
          type: "button",
          span: 3,
          options: [
            { label: "搜索", click: this.onSalesSearch, style: "primary" }
          ]
        }
      ],
      categorieList: null,
      options: null,
      addOrderData: {},
      addOrderFields: [
        {
          label: "业务类型",
          prop: "business",
          type: "cascader",
          options: [],
          config: { label: "title", value: "id" }
        },
        {
          type: "button",
          options: [
            {
              label: "确定",
              style: "primary"
            }
          ]
        }
      ],
      qrcode: false,
      qrocdeData: {},
      qrocdeFields: [],
      editForm: { channel: 2 },
      editFields: [],
      close: null,
      selectData: null
    };
  },
  watch: {
    update() {
      this.getData();
    },
    refresh(a) {
      if (a) {
        this.getData();
        this.$store.commit("setRefresh", false);
      }
    },
    addOrderData: {
      handler(a, b) {
        this.toggleForm(a, b);
      },
      deep: true
    }
  },

  created() {
    this.init();
  },
  computed: {
    ...mapState(["update"]),
    refresh() {
      return this.$store.state.refresh;
    }
  },
  methods: {
    // async stopMaxOrder() {
    //   // 暂停接单
    //   let { data } = await this.axios("/adminapi/Customer/control");
    //   if (data.code) {
    //     this.maxOrder = data.data;
    //   }
    // },
    async stopOrder() {
      await this.axios("/adminapi/Customer/control_update", {
        data: this.maxOrder
      });
    },
    async init() {
      this.tableFields = [
        {
          label: "操作",
          type: "manage",
          fixed: "right",
          width: 110,
          options: [
            {
              size: "mini",
              label: "编辑信息",
              style: "success",
              role: 37,
              click: this.tableEdit
            },
            {
              size: "mini",
              label: "手动分配",
              style: "warning",
              click: this.handDistribution,
              role: 39,
              isShow: { type: "==", prop: "saler", val: "" }
            },
            {
              size: "mini",
              label: "自动分配",
              style: "warning",
              role: 38,
              click: this.autoDistributiona,
              isShow: { type: "==", prop: "saler", val: "" }
            },
            {
              size: "mini",
              label: "删除",
              style: "danger",
              role: 130,
              click: this.tableDel
            }
          ]
        }
      ];
      // 搜索数据
      await this.getSelectList();
      // 表头数据
      await this.getTable();
      // 表格内容数据
      await this.getData(false);
      // await this.stopMaxOrder();
      this.key = Math.random();
    },
    async getSelectList() {
      let { data } = await this.axios("/adminapi/customer/p_tool", {
        data: { id: 4 }
      });
      let { data: res } = await this.axios("/adminapi/customer/p_tool", {
        data: { id: 5 }
      });
      this.searchFields = [
        {
          label: "咨询",
          type: "datetimerange",
          prop: "date",
          span: 6
        },
        {
          label: "微信/QQ/电话/旺旺",
          prop: "search",
          type: "text",
          span: 3
        },

        {
          label: "咨询信息",
          prop: "info",
          type: "text",
          span: 3
        },
        {
          label: "跟踪状态",
          type: "select",
          prop: "trace_status",
          span: 3,
          options: data.data
        },
        {
          label: "客户类型",
          type: "select",
          prop: "label",
          span: 3,
          options: res.data
        },
        {
          type: "button",
          span: 24,
          options: [
            { label: "搜索", style: "success", click: this.getData },
            { label: "重置", style: "wraning", click: this.onReset },
            {
              label: "添加咨询信息",
              style: "primary",
              click: this.onAdd,
              icon: "el-icon-plus",
              role: 36
            },
            {
              label: "导出表格",
              style: "danger",
              icon: "el-icon-download",
              click: this.onExport,
              role: 132
            }
          ]
        }
      ];
    },
    changeImage(item) {
      this.qrcode = true;
      this.editForm = { id: item.id, screenshot: item.screenshot };
    },
    async changeImageSave() {
      await this.axios("/adminapi/Customers/CustomersScreenshot", {
        data: this.editForm
      });
      this.getData();
      this.qrcode = false;
    },
    async CategorieList() {
      let { data } = await this.axios("/adminapi/Saleorders/CategorieList");
      if (data.code) {
        this.categorieList = data.data;
      }
    },
    async getNaves() {
      let { data } = await this.axios("/adminapi/Saleorders/NavesList");
      if (data.code) {
        this.$set(this.addOrderFields[0], "options", data.data);
        this.options = data.data;
      }
    },
    async getDepartment() {
      let { data } = await this.axios("/adminapi/Customer/dept");
      if (data.code) {
        this.salesSearch = this.salesSearch.map(e => {
          if (e.prop == "saler_group_zid") {
            e.options = data.data;
          }
          return e;
        });
      }
    },
    async setShare(item) {
      item = {
        sale_id: item.id,
        nickname: item.nickname,
        customer_id: this.id
      };
      await this.axios("adminapi/Customer/share", {
        data: item
      });
      this.dialogVisible = false;
      this.id = null;
    },
    async share(item) {
      this.id = item.id;
      this.getDepartment();
      this.tableSales = [
        { label: "昵称", prop: "nickname" },
        { label: "部门", prop: "saler_group_zid" },
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
          options: [{ label: "共享", click: this.setShare, style: "primary" }]
        }
      ];
      let { data } = await this.axios("/adminapi/Customer/refunder");
      if (data.code) {
        this.dialogVisible = true;
        this.dialogName = "选择共享人员";
        this.show = false;
        this.tableSalesData = data.data;
      }
    },
    async getTable() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 1 }
      });
      if (data.code) {
        let arr = data.data.concat(this.tableFields);
        arr.unshift({ type: "selection", fixed: "left" });
        this.tableFields = arr;
      }
    },
    async getData() {
      this.tableData = [];
      let { data } = await this.axios("/adminapi/Customer/list", {
        data: { ...this.page, ...this.search }
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
        // this.key = Math.random();
      }
    },
    async onAdd() {
      let b = [
        {
          label: "快捷填单",
          prop: "referer_info",
          type: "textarea",
          input: this.quick
        }
      ];
      let { data } = await this.axios("/adminapi/Publics/TableFormEdit", {
        data: { table_id: 1, type: "add" }
      });
      if (data.code) {
        let obj = {};
        let arr = b.concat(data.data);
        arr.forEach(e => {
          obj[e.prop] = "";
        });

        this.editForm = { ...obj, channel: this.editForm.channel };
        this.editFields = arr.map(e => {
          if (e.prop == "mobile") {
            e.rule = {
              validator: (rule, val, callback) => {
                if (!/^\d*$/.test(val) || !/^\d{11}$/.test(val)) {
                  callback(new Error("请输入正确的手机号码"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            };
          }
          return e;
        });
      }
      this.drawerOpen("添加咨询信息");
      // this.key = Math.random();
    },
    quick(item) {
      try {
        this.editForm[item.prop]
          .split("\n")
          .map(e => {
            let a = e.split("：");
            if (a[1]) {
              return {
                label: a[0].replace(/\s/g, ""),
                value: a[1].replace(/\s/g, "")
              };
            } else {
              return { label: a[0].replace(/\s/g, ""), value: null };
            }
          })
          .forEach(e => {
            this.editFields.forEach(k => {
              if (e.label.toLocaleLowerCase() == k.label.toLocaleLowerCase()) {
                this.editForm[k.prop] = e.value;
              }
            });
          });
        // this.key = Math.random();
      } catch (error) {
        this.$message.error("数据解析错误，请手动填写");
      }
    },
    async tableEdit(item) {
      let { data } = await this.axios("/adminapi/Publics/TableFormEdit", {
        data: { table_id: 1, type: "edit" }
      });
      if (data.code) {
        this.editFields = data.data;
        this.editForm = item;
      }
      this.drawerOpen("编辑");
    },
    async change(item, scope) {
      let obj = { id: item.id };
      obj[scope.property] = item[scope.property];
      let url = "/adminapi/Customer/CustomersEdit";
      if (
        [
          "trace_status",
          "label",
          "qualifications_status",
          "trademark_status"
        ].includes(scope.property)
      ) {
        url = "/adminapi/Customer/traceStatus";
      }
      let { data } = await this.axios(url, {
        data: obj
      });
      if (data.code) {
        this.qrcode = false;
      }
    },
    selection(select) {
      this.id = select.map(e => e.id);
    },
    async autoDistribution(item, type) {
      // 批量自动分配
      if (!this.id) {
        this.$message.error("请选择数据");
        return;
      }
      if (type) {
        let { data } = await this.axios("/adminapi/Customer/many_automatic ", {
          data: { id: this.id }
        });
        if (data.code) {
          this.getData();
        }
        return;
      }
    },
    async autoDistributiona(item, type) {
      console.log(item);
      if (type !== true) {
        this.id = item.id;
      }
      let { data } = await this.axios("/adminapi/Customer/automatic ", {
        data: { id: this.id }
      });
      if (data.code) {
        this.getData();
      }
    },
    async handDistribution(item, type) {
      if (type !== true) {
        this.id = item.id;
      }
      // 批量手动分配
      if (!this.id) {
        this.$message.error("请选择数据");
        return;
      }
      this.getDepartment();
      let { data } = await this.axios("/adminapi/Customer/refunder");
      if (data.code) {
        this.dialogVisible = true;
        this.dialogName = "选择接待人员";
        this.show = false;
        this.tableSalesData = data.data;
      }
    },
    async onDistribution(item) {
      let url = "/adminapi/Customer/manual";
      if (this.id && this.id.constructor == Array) {
        url = "/adminapi/Customer/many_manual";
      }
      let { data } = await this.axios(url, {
        data: { uid: item.id, id: this.id }
      });
      if (data.code) {
        this.getData();
        this.dialogVisible = false;
        this.id = null;
      }
    },
    distribution(item) {
      this.id = item.id;
      this.$confirm("是否执行自动分配?", "提示", {
        confirmButtonText: "自动分配",
        cancelButtonText: "手动分配",
        type: "warning",
        showClose: false,
        closeOnClickModal: false
      })
        .then(async () => {
          this.autoDistribution();
        })
        .catch(async () => {
          this.handDistribution();
        });
    },
    async onSalesSearch() {
      let { data } = await this.axios("/adminapi/Customer/refunder", {
        data: this.salesSearchData
      });
      if (data.code) {
        this.tableSalesData = data.data;
      }
    },
    async tableDel(item) {
      let bool = await this.$confirm("此操作不可逆,是否继续！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        showClose: false,
        closeOnClickModal: false
      }).catch(() => {});
      if (!bool) return;

      let { data } = await this.axios("/adminapi/Customer/del", {
        data: { id: item.id }
      });
      if (data.code) {
        this.tableData = this.tableData.filter(e => e.id != item.id);
      }
    },
    onReset() {
      console.log("重置");
      this.search = {};
      this.getData(false);
    },
    drawerOpen(title) {
      this.drawer = true;
      this.drawerName = title;
    },
    drawerClose() {
      this.drawer = false;
      this.editFields = [];
    },
    async onExport() {
      // 导出表格
      let { data } = await this.axios("/adminapi/Customer/export", {
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
    },
    async onSave() {
      // 添加咨询信息
      let body = this.editForm;
      delete body.quick;
      let url = this.drawerName == "编辑" ? "edit" : "add";
      let { data } = await this.axios("/adminapi/Customer/" + url, {
        data: body
      });
      if (data.code) {
        let obj = {};
        this.editFields.forEach(e => (obj[e.prop] = null));
        obj["channel"] = this.editForm.channel;
        this.editForm = obj;
        if (url == "edit") this.drawer = false;
        if (url == "add") this.getData();
        this.qrcode = false;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.info {
  margin: 5px 0;
  background: #f0f0f0;
  padding: 5px 0;
  font-size: 14px;
  span {
    margin: 0 10px;
  }
}
.mix-search {
  margin: 5px 0;
  background: #f0f0f0;
  padding: 5px;
}

.el-pagination {
  text-align: right;
  padding: 20px;
  background: #fff;
}
</style>