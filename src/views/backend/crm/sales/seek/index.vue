<!--
Template Name: 客户管理
Create author: qinglong
Create Time  : 2020-03-27
-->
<template>
  <div class="content">
    <step v-model="stepShow" v-if="stepShow" :item="statusData" />
    <div v-else class="content-cols">
      <mixSearch v-model="search" :fields="searchFields" />
      <div class="info" v-if="maxOrder">
        <template>
          <span>
            接待上限：
            <el-tag>{{maxOrder.limit || '--'}}</el-tag>
          </span>
          <span>
            累计接单：
            <el-tag>{{maxOrder.count || '--'}}</el-tag>
          </span>
          <span>
            <el-tag effect="dark" :type="maxOrder.status?'':'danger'">{{maxOrder.status ?'接单中':'暂停接单'}}</el-tag>
          </span>
          <span v-if="maxOrder.control">
            接单开关：
            <el-switch v-model="maxOrder.status" @change="stopOrder" inactive-color="#ccc" :active-value="1" :inactive-value="0" />
          </span>
        </template>
      </div>
      <mixTable v-model="tableData" :fields="tableFields" @select="selection" />
      <mixPage v-model="page" />
    </div>
    <mixDrawer style="top:61px" v-model="drawer" :title="drawerName" @confirm="onSave" @close="drawerClose" :isShow="true">
      <mixForm :key="key" v-model="editForm" :fields="editFields" />
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
    <el-dialog title="添加业绩" :visible.sync="qrcode" width="50%">
      <div style="max-height:500px;height:500px;overflow:hidden">
        <el-scrollbar>
          <mixForm v-model="qrocdeData" :fields="qrocdeFields" style="border:none;padding-right:20px" />
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOrder">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="jinduShow" title="客户状态" width="500px">
      <mixForm v-model="statusFormData" :fields="statusFormFields" />
    </el-dialog>
    <el-dialog :visible.sync="tagShow" title="客户信息" width="500px">
      <mixForm v-model="tagData" :fields="tagFields" />
    </el-dialog>
    <el-dialog :visible.sync="advanceShow" title="预付款信息" width="500px">
      <mixForm v-model="advanceData" :fields="advanceFields" />
    </el-dialog>

  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Saleseek",
  components: { step: () => import("./step") },
  data() {
    return {
      key: "a",
      show: false,
      maxOrder: null,
      stepShow: false,
      jinduShow: false,
      tagShow: false,
      advanceShow: false,
      advanceData: {},
      advanceFields: [],
      tagData: {},
      tagFields: [],
      page: {
        limit: 10,
        page: 1,
        total: 0
      },
      historyShow: false,
      historyData: [],
      historyFields: [
        { width: 100, label: "id", prop: "id" },
        { width: 120, label: "编辑部门", prop: "label_1" },
        { width: 120, label: "客户状态", prop: "label_2" },
        { width: 120, label: "服务状态", prop: "label_3" },
        { width: 120, label: "操作账号", prop: "uid" },
        { label: "操作时间", prop: "create_time" }
      ],
      statusShow: false,
      statusData: {},
      statusFields: [],
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
      searchFields: [
        {
          label: "咨询",
          type: "datetimerange",
          prop: "date",
          span: 5.5
        },
        {
          label: "微信/QQ/电话/旺旺",
          prop: "search",
          type: "text",
          span: 3
        },
        {
          type: "button",
          span: 10,
          sm: 24,
          xs: 24,
          options: [
            { label: "搜索", style: "success", click: this.getData },
            { label: "重置", style: "wraning", click: this.onReset },
            {
              label: "共享",
              style: "success",
              click: this.gongxiang,
              role: 131
            },
            {
              label: "添加咨询信息",
              style: "primary",
              click: this.onAdd,
              icon: "el-icon-plus",
              role: 194
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
      qrocdeData: {},
      qrocdeFields: [],
      editForm: {},
      editFields: [],
      close: null,
      selectData: null,
      statusFormData: { label_1: 0 },
      statusFormFields: []
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
    stepShow(a) {
      !a && this.getData();
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
    async stopMaxOrder() {
      // 暂停接单
      let { data } = await this.axios("/adminapi/Salecustomer/control");
      if (data.code) {
        this.maxOrder = data.data;
      }
    },
    async stopOrder() {
      await this.axios("/adminapi/Salecustomer/control_update", {
        data: this.maxOrder
      });
    },
    async init() {
      await this.stopMaxOrder();
      // 表头数据
      await this.getTable();
      // 表格内容数据
      await this.getData();
      this.key = Math.random();
    },
    async addHistory(item) {
      let { data } = await this.axios("/adminapi/Salecustomer/label_log", {
        data: { customer_id: item.id }
      });
      if (data.code) {
        this.historyShow = true;
        this.historyData = data.data;
      }
    },
    async addStatus(item) {
      this.stepShow = true;

      // this.statusShow = true;
      this.statusData = item;
      // let { data } = await this.axios("/adminapi/Salecustomer/customer_label");
      // if (data.code) {
      //   this.statusFields = [
      //     {
      //       label: "客户状态",
      //       type: "cascader",
      //       prop: "label",
      //       options: data.data
      //     },
      //     { label: "标签备注", type: "textarea", wrap: true, prop: "remak" },
      //     { label: "确定", type: "button", wrap: true, click: this.statusSave }
      //   ];
      // }
    },
    async statusSave() {
      await this.axios("/adminapi/Salecustomer/label_add", {
        data: this.statusData
      });
      this.getData();
      // this.statusShow = false;
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
      let { data } = await this.axios("/adminapi/Salecustomer/dept");
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
      await this.axios("/adminapi/Salecustomer/share", {
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
      let { data } = await this.axios("/adminapi/Salecustomer/refunder");
      if (data.code) {
        this.dialogVisible = true;
        this.dialogName = "选择共享人员";
        this.show = false;
        this.tableSalesData = data.data;
      }
    },
    async getTable() {
      let { data } = await this.axios("/adminapi/Publics/table_th", {
        data: { table_id: 10 }
      });
      if (data.code) {
        let arr = data.data.map(e => {
          if (e.prop == "label") {
            e.click = this.tableDialog;
          }
          if (e.prop == "tag") {
            e.click = this.addTag;
          }
          return e;
        });
        arr = arr.concat([
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
                role: 195,
                click: this.tableEdit
              },
              {
                role: 73,
                size: "mini",
                label: "添加业绩",
                style: "primary",
                click: this.addOrder
              },
              {
                size: "mini",
                label: "共享客户",
                style: "success",
                role: 188,
                click: this.share
              },
              {
                size: "mini",
                label: "历史状态",
                style: "primary",
                click: this.addStatus
              },
              {
                size: "mini",
                label: "预设付款",
                style: "danger",
                click: this.addAdvance
              }
            ]
          }
        ]);
        arr.unshift({ type: "selection", fixed: "left" });
        this.tableFields = arr;
      }
    },
    async addAdvance(item) {
      let { customer_id, id } = item;
      this.advanceData = item;
      {
        customer_id, id;
      }
      let { data } = await this.axios("/adminapi/Publics/meal_version");
      if (data.code) {
        this.advanceFields = [
          {
            label: "手机号码",
            prop: "mobile",
            type: "number",
            minlength: 11,
            maxlength: 11
          },
          { label: "预付金额", prop: "price", type: "number" },
          {
            label: "预付版本",
            prop: "version",
            type: "select",
            options: data.data.map(e => ({ label: e.label, value: e.id }))
          },
          {
            label: "付款类型",
            prop: "type",
            type: "radio",
            options: [{ label: "新业绩" }, { label: "补欠款" }]
          },
          { label: "确定", type: "button", click: this.setAdvance }
        ];
        this.advanceShow = true;
      }
    },
    async setAdvance() {
      let { data } = await this.axios("/adminapi/Salecustomer/payment_order", {
        data: this.advanceData
      });
      if (data.code) {
        console.log(data);
        this.advanceShow = false;
      }
    },
    async changeStep() {
      await this.axios("/adminapi/Salecustomer/label_add", {
        data: this.statusFormData
      });
      this.jinduShow = false;
      this.getData();
    },
    async addTag(item) {
      let { data } = await this.axios("/adminapi/Publics/TableFormEdit", {
        data: { table_id: 16, type: "add" }
      });
      let { data: result } = await this.axios(
        "/adminapi/Salecustomer/tag_info",
        { data: item }
      );

      if (data.code) {
        this.tagFields = data.data.concat({
          label: "保存",
          type: "button",
          click: this.saveTag
        });
        this.tagData = { ...item, ...result.data };
        this.tagShow = true;
      }
    },
    async saveTag() {
      let { data } = await this.axios("/adminapi/Salecustomer/tag_add", {
        data: this.tagData
      });
      if (data.code) this.tagShow = false;
      this.getData();
    },
    async tableDialog(item) {
      // 客户状态进度修改
      let { data } = await this.axios("/adminapi/Salecustomer/customer_label", {
        data: item
      });
      if (data.code) {
        let options = data.data.label[0].children.filter(e => {
          if (!data.data.label_log) return false;
          // console.log(e.progress, data.data.label_log.progress);
          return e.progress == data.data.label_log.progress;
        });
        if (!options.length) options = data.data.label[0].children;

        options = options[0];
        this.statusFormData = {
          customer_id: item.id
          // label: options.label,
          // label_1: options.id,
          // label_2: options.children[0].id,
          // progress: options.progress
        };

        this.statusFormFields = [
          {
            label: "当前进度：",
            prop: "label",
            wrap: true,
            type: "cascader",
            // readonly: true,
            options: data.data.label[0].children
          },
          // {
          //   label: "完成状态：",
          //   prop: "label_2",
          //   wrap: true,
          //   type: "radio",
          //   options: options.children,
          //   change: this.changeServe
          // },
          {
            label: "备注",
            prop: "remak",
            type: "textarea",
            wrap: true
          },
          {
            label: "确定",
            type: "button",
            style: "primary",
            click: this.changeStep,
            wrap: true
          }
        ];
        this.jinduShow = true;
      }
    },
    async gongxiang() {
      this.tableData = [];
      let { data } = await this.axios("/adminapi/Salecustomer/shares", {
        data: { ...this.search }
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
        this.key = Math.random();
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Salecustomer/list", {
        data: { ...this.page, ...this.search }
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
        }
      ];
      let { data } = await this.axios("/adminapi/Publics/TableFormEdit", {
        data: { table_id: 10, type: "add" }
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
        data: { table_id: 10, type: "edit" }
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
      let url = "/adminapi/Salecustomer/CustomersEdit";
      if (
        [
          "trace_status",
          "label",
          "qualifications_status",
          "trademark_status"
        ].includes(scope.property)
      ) {
        url = "/adminapi/Salecustomer/traceStatus";
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
        let { data } = await this.axios(
          "/adminapi/Salecustomer/many_automatic ",
          {
            data: { id: this.id }
          }
        );
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
      let { data } = await this.axios("/adminapi/Salecustomer/automatic ", {
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
      let { data } = await this.axios("/adminapi/Salecustomer/refunder");
      if (data.code) {
        this.dialogVisible = true;
        this.dialogName = "选择接待人员";
        this.show = false;
        this.tableSalesData = data.data;
      }
    },
    async onDistribution(item) {
      let url = "/adminapi/Salecustomer/manual";
      if (this.id && this.id.constructor == Array) {
        url = "/adminapi/Salecustomer/many_manual";
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
      let { data } = await this.axios("/adminapi/Salecustomer/refunder", {
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

      let { data } = await this.axios("/adminapi/Salecustomer/del", {
        data: { id: item.id }
      });
      if (data.code) {
        this.getData();
      }
    },
    async saveOrder() {
      // 添加业绩保存
      let form = {};
      for (let k of this.qrocdeFields) {
        form[k.prop] = this.qrocdeData[k.prop];
      }
      form.id = this.qrocdeData.id;
      let { data } = await this.axios("/adminapi/Sale/add", {
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
        data: { type: "add", table_id: 3 }
      });
      if (data.code) {
        let obj = JSON.parse(JSON.stringify(item));
        delete obj.remark;
        this.qrocdeData = { ...obj, discount: 0 };
        this.qrocdeFields = data.data.map(e => {
          if (e.prop == "type" && item.xin) {
            e.options.shift();
          }
          if (e.prop == "debt") {
            e.type = "compute";
            e.compute = {
              type: ["-", "-"],
              prop: "package_version",
              val: "payment",
              sub: "discount"
            };
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
      let { data } = await this.axios("/adminapi/Salecustomer/export", {
        data: this.search
      });
      if (data.code) {
        const link = document.createElement("a");
        link.href = data.data.url;
        let a = window.open(data.data.url, "_blank");
        a.close();
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
      let { data } = await this.axios("/adminapi/Salecustomer/" + url, {
        data: body
      });
      if (data.code) {
        this.getData(false);
        let obj = {};
        this.editFields.forEach(e => (obj[e.prop] = null));
        obj["channel"] = this.editForm.channel;
        this.editForm = obj;
        url == "edit" && (this.drawer = false);
        this.getData();
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
</style>