<!--
Template Name: 客户管理
Create author: qinglong
Create Time  : 2020-03-27
-->
<template>
  <div>
    <div class="content-wrap">
      <mixSearch v-model="search" :fields="searchFields" />

      <div class="info">
        <span>
          <el-button @click="handDistribution" type="primary" size="mini">手动分配</el-button>
        </span>
        <span>
          <el-button @click="autoDistribution(true)" type="warning" size="mini">自动分配</el-button>
        </span>
        <template v-if="maxOrder">
          <span>
            接待上限：
            <el-tag>{{maxOrder.limit || '--'}}</el-tag>
          </span>
          <span>
            累计接单：
            <el-tag>{{maxOrder.count || '--'}}</el-tag>
          </span>
          <span v-if="maxOrder.control">
            暂停接单：
            <el-switch v-model="maxOrder.status" @change="stopOrder" inactive-color="#ccc" />
          </span>
        </template>
      </div>
      <div style="height:calc(100% - 160px)">
        <mixTable v-model="tableData" :fields="tableFields" @select="selection" />
      </div>
      <mixPage v-model="page" />
    </div>
    <mixDrawer style="top:61px" v-model="drawer" :title="drawerName" @confirm="onSave" @close="drawerClose" :isShow="true">
      <mixForm :key="key" v-model="editForm" :fields="editFields" />
    </mixDrawer>
    <el-dialog :title="dialogName" :visible.sync="dialogVisible" width="50%">
      <mixSearch v-model="salesSearchData" :fields="salesSearch" v-if="!show" />
      <mixTable v-model="tableSalesData" :fields="tableSales" v-if="!show" />
      <mixForm v-model="addOrderData" :fields="addOrderFields" v-if="show" style="border:none" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭窗口</el-button>
      </span>
    </el-dialog>
    <el-dialog title="客户二维码" :visible.sync="qrcode" width="50%">
      <mixForm v-model="editForm" :fields="qrocdeFields" style="border:none" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeImageSave">确定修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "customerManage",
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
          prop: "status"
          // --fix
          // formatter: (a, b, c) => (c ? "接单中" : "休息中")
        },
        {
          label: "操作",
          type: "manage",
          options: [
            { label: "分配", click: this.onDistribution, style: "primary" }
          ]
        }
      ],
      selectList: [],
      selectionData: { channel: null, source: null, status: null },
      search: {},
      searchFields: [
        {
          label: "咨询",
          type: "datetimerange",
          prop: "date",
          span: 5.5
        },
        {
          label: "模糊匹配",
          prop: "search",
          type: "text",
          span: 3
        },
        {
          label: "跟踪状态",
          type: "select",
          prop: "trace_status",
          span: 3,
          options: []
        },
        {
          label: "客户类型",
          type: "select",
          prop: "label",
          span: 3,
          options: []
        },
        {
          type: "button",
          span: 10,
          options: [
            { label: "搜索", style: "success", click: this.onSearch },
            { label: "重置", style: "wraning", click: this.onReset },
            {
              label: "添加咨询信息",
              style: "primary",
              click: this.onAdd,
              icon: "el-icon-plus"
            },
            {
              label: "导出表格",
              style: "danger",
              icon: "el-icon-download",
              click: this.onExport
            }
          ]
        }
      ],
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
      qrocdeFields: [
        {
          label: "修改二维码",
          type: "image",
          prop: "screenshot"
        }
      ],
      editForm: {},
      editFields: [],
      close: null,
      selectData: null
    };
  },
  watch: {
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
    // this.init();
  },
  activated() {
    this.init();
  },
  computed: {
    refresh() {
      return this.$store.state.refresh;
    }
  },
  methods: {
    async stopMaxOrder() {
      // 暂停接单
      let { data } = await this.axios("/adminapi/Customer/control");
      if (data.code) {
        this.maxOrder = data.data;
      }
    },
    async stopOrder() {
      await this.axios("/adminapi/Customer/control_update", {
        data: this.maxOrder
      });
    },
    init() {
      this.tableFields = [
        {
          label: "操作",
          type: "manage",
          fixed: "right",
          width: 310,
          options: [
            {
              size: "mini",
              label: "编辑",
              style: "success",
              click: this.tableEdit
            },
            {
              size: "mini",
              label: "分配",
              style: "wraning",
              click: this.distribution
            },
            {
              size: "mini",
              label: "删除",
              style: "danger",
              click: this.tableDel
            }
            // { size:'mini',label: "添加订单", style: "primary", click: this.addOrder }
          ]
        }
      ];
      // 表格内容数据
      this.getData(false);
      // 表头数据
      this.getTable();
      this.getSelect();
      this.stopMaxOrder();
    },
    async getSelect() {
      let { data: result } = await this.axios("/adminapi/Customer/p_tool", {
        data: { id: 4 }
      });
      if (result.code) {
        this.searchFields = this.searchFields.map(e => {
          if (e.prop == "trace_status") e.options = result.data;
          return e;
        });
      }

      let { data } = await this.axios("/adminapi/Customer/p_tool", {
        data: { id: 5 }
      });
      if (data.code) {
        this.searchFields = this.searchFields.map(e => {
          if (e.prop == "label") e.options = data.data;
          return e;
        });
      }
    },
    changeImage(item) {
      this.qrcode = true;
      this.editForm = { id: item.id, screenshot: item.screenshot };
    },
    async changeImageSave() {
      // this.change(this.editForm, { property: "screenshot" });

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

    async getTable() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 1 }
      });
      if (data.code) {
        let arr = data.data.concat(this.tableFields);
        arr.unshift({ type: "selection", fixed: "left" }, { type: "expand" });
        this.tableFields = arr;
      }
    },
    async getData(bool = true) {
      let obj = bool ? Object.assign({}, this.page, this.search) : this.page;
      let { data } = await this.axios("/adminapi/Customer/list", {
        data: obj
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
      }
    },
    async onAdd() {
      let b = [
        {
          label: "快捷填单",
          prop: "referer_info",
          type: "textarea",
          input: this.quick
        },
        // {
        //   label: "粘贴图片",
        //   prop: "screenshot",
        //   type: "image"
        // }
        // {
        //   label: "接待渠道",
        //   prop: "channel",
        //   type: "radio",
        //   options: [
        //     { label: "信息流", value: 1 },
        //     { label: "搜索引擎", value: 2 }
        //     // { label: "信息流、搜索引擎", value: 3 }
        //   ]
        // }
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
      this.key = Math.random();
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
        this.key = Math.random();
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
      this.key = Math.random();
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
      this.id = select.map(e => e.customer_id);
    },
    async autoDistribution(bool = false) {
      // 批量自动分配
      if (!this.id) {
        this.$message.error("请选择数据");
        return;
      }
      if (bool) {
        let { data } = await this.axios("/adminapi/Customer/many_automatic ", {
          data: { id: this.id }
        });
        if (data.code) {
          this.getData();
        }
        return;
      }
      let { data } = await this.axios("/adminapi/Customer/automatic ", {
        data: { id: this.id }
      });
      if (data.code) {
        this.getData();
      }
    },
    async handDistribution() {
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
      let { data } = await this.axios("/adminapi/Customer/manual    ", {
        data: { uid: item.id, id: this.id }
      });
      if (data.code) {
        this.getData();
      }
    },
    distribution(item) {
      this.id = item.customer_id;
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
        this.getData();
      }
    },
    toggleForm(item) {
      let a = [
        {
          label: "业务类型",
          prop: "business",
          type: "cascader",
          options: this.options,
          config: { label: "title", value: "id" }
        }
      ];
      let b = {
        type: "button",
        options: [
          {
            label: "确定",
            click: this.onConfirm,
            style: "primary"
          }
        ]
      };
      let business = item.business;

      // 切换选择不同类目，显示不同填写表单
      if (business[0]) {
        if (business[0] == 1) {
          if (business[1] != 8 && business[1] != 9) {
            let arr = {
              label: "店铺类型",
              type: "select",
              prop: "shop_type",
              rule: {
                rule: { required: false, message: "必填项" },
                message: "必填项"
              },
              options: [
                { label: "旗舰店", value: "旗舰店" },
                { label: "专营店", value: "专营店" },
                { label: "专卖店", value: "专卖店" }
              ]
            };
            a.push(arr);
          }
          let arr = [
            {
              label: "商标类型",
              type: "text",
              rule: { required: false, message: "必填项" },
              prop: "trademark_type"
            },
            {
              label: "入驻商标名称",
              type: "text",
              rule: { required: false, message: "必填项" },
              prop: "trademark_name"
            },
            {
              label: "商标注册号",
              type: "text",
              rule: { required: false, message: "必填项" },
              prop: "trademarking_number"
            },
            {
              label: "入驻公司",
              type: "text",
              rule: { required: false, message: "必填项" },
              prop: "entry_company"
            },
            {
              label: "入驻产品",
              type: "text",
              rule: { required: false, message: "必填项" },
              prop: "settled"
            },
            {
              label: "入驻类目",
              type: "cascader",
              prop: "categories",
              rule: { required: false, message: "必填项" },
              options: this.categorieList,
              config: {
                label: "title",
                value: "id",
                lazy: true,
                lazyLoad: async (node, resolve) => {
                  const { id } = node.data;
                  let { data } = await this.axios(
                    "/adminapi/Saleorders/CategorieList",
                    {
                      data: { pid: id }
                    }
                  );
                  if (data.code) {
                    let arr = data.data.map(e => {
                      e.leaf = false;
                      if (!e.children) {
                        e.leaf = true;
                      }
                      return e;
                    });
                    resolve(arr);
                  }
                }
              }
            },

            {
              label: "合同",
              type: "upload",
              rule: { required: false, message: "必填项" },
              prop: "contract"
            }
          ];
          a.push(...arr);
        }
        if (business[1] !== 17 && business[0] !== 3) {
          let arr = [
            {
              label: "商标名称",
              type: "text",
              rule: { required: false, message: "必填项" },
              prop: "trademark_name"
            },
            {
              label: "商标类型",
              type: "text",
              rule: { required: false, message: "必填项" },
              prop: "trademark_type"
            },
            {
              label: "商标注册号",
              type: "text",
              rule: { required: false, message: "必填项" },
              prop: "trademarking_number"
            }
          ];
          a.push(...arr);
        }
        a.push(
          {
            label: "订单金额",
            type: "number",
            rule: { required: false, message: "必填项" },
            prop: "order_amount"
          },
          {
            label: "备注",
            type: "textarea",
            rule: { required: false, message: "必填项" },
            prop: "remarks"
          }
        );
      }

      a.push(b);
      let obj = [];
      a = a.filter(e => {
        if (obj.indexOf(e.prop) == -1) {
          obj.push(e.prop);
          return true;
        }
      });
      this.addOrderFields = a;
    },
    addOrder(item) {
      // console.log("添加订单", item);
      // 入驻类目
      this.CategorieList();
      // 业务类型
      this.getNaves();
      this.addOrderData.customer_id = item.id;
      this.show = true;
      this.dialogVisible = true;
      this.dialogName = "添加订单";
    },
    onSearch() {
      console.log("搜索");
      this.getData();
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
    sizeChange(a) {
      this.page.limit = a;
      this.getData();
    },
    currentChange(a) {
      this.page.page = a;
      this.getData();
    },
    async onExport() {
      // 导出表格
      let { data } = await this.axios("/adminapi/Customer/CustomersExcel", {
        data: Object.assign({}, this.page, this.search)
      });
      if (data.code) {
        this.$confirm("是否下载导出数据", "提示", {
          confirmButtonText: "下载",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          const link = document.createElement("a");
          link.href = data.data.url;
          link.setAttribute("target", "_blank");
          link.setAttribute("download", data.data.title);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }
    },
    async onConfirm() {
      // 确定添加订单
      let obj = {};
      this.addOrderFields.forEach(e => {
        if (this.addOrderData[e.prop]) {
          obj[e.prop] = this.addOrderData[e.prop];
        }
      });
      obj.customer_id = this.addOrderData["customer_id"];
      let { data } = await this.axios("/adminapi/Saleorders/SaleordersAdd", {
        data: obj
      });
      if (data.code) {
        this.$notify.success({
          title: "成功",
          message: data.msg
        });
        this.dialogVisible = false;
        this.toggleForm();
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
        this.getData(false);
        let obj = {};
        this.editFields.forEach(e => (obj[e.prop] = null));
        obj["source"] = this.editForm.source;
        this.editForm = obj;
        this.drawer = false;
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