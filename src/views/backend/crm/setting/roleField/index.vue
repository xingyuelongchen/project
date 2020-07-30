<!--
Template Name: 添加字段
Create author: qinglong
Create Time  : 2020-03-27
-->

<template>
  <div class="content-wrap">
    <el-card header="系统菜单">
      <el-scrollbar>
        <el-tree
          default-expand-all
          :data="treeData"
          :props="treeOpstion"
          @node-click="treeClickNode"
        ></el-tree>
      </el-scrollbar>
    </el-card>
    <div
      style="display: flex; flex-direction: column;justify-content: space-between;  height:100%; overflow: hidden;"
    >
      <div style="min-height:220px;height:220px">
        <el-card>
          <div slot="header">
            关联数据表
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="dialogVisible=true"
            >新增关联表</el-button>
          </div>
          <mixTable
            :key="tableData && tableData.length || 'key'"
            :options="{height:'110px'}"
            v-model="tableData"
            :fields="tabelFields"
          />
        </el-card>
      </div>
      <div style="flex:1 1 auto;overflow:hidden;height:100%;min-height:220px;max-height:100%">
        <el-tabs type="border-card" style="height:100%">
          <el-tab-pane label="菜单关联表">
            <el-tabs v-model="activeTabName" class="tabs-top">
              <el-tab-pane label="数据表格" name="a" :key="key+1">
                <mixTable
                  v-if="activeTabName=='a'"
                  v-model="tableMenuData"
                  :fields="tableMenuField"
                  :options="tableOptions"
                />
              </el-tab-pane>
              <el-tab-pane label="表单字段" name="b" :key="key+2">
                <mixTable
                  v-if="activeTabName=='b'"
                  v-model="formMenuData"
                  :fields="formMenuField"
                  :options="tableOptions"
                />
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="添加字段">
            <el-scrollbar>
              <div style="display:flex">
                <div style="flex:1">
                  <div style="margin:10px">表格属性:</div>
                  <mixForm v-model="addFieldFormData" :fields="addFieldFormFields" />
                </div>
                <div style="flex:1">
                  <div style="margin:10px ">表单属性:</div>
                  <mixForm v-model="addFieldFormData.editable" :fields="addFieldFormField_a" />
                </div>
              </div>
              <!-- <div style="text-align:center;margin-top:-50px">
                <el-button type="primary" style="width:30%" @click="addField">确定添加</el-button>
              </div>-->
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog title="新增关联表" :visible.sync="dialogVisible" width="30%">
      <mixForm
        ref="form"
        v-model="tableFormData"
        :fields="tableFormfields"
        :options="{labelWidth:'80px',size:'small'}"
      />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "add-field",
  watch: {
    activeTabName() {
      this.key = Math.random();
    }
  },
  data() {
    let form = [
      { label: "text - 文本框", value: "text" },
      { label: "textarea - 文本域", value: "textarea" },
      { label: "select - 下拉框", value: "select" },
      { label: "cascader - 级联选择器", value: "cascader" },
      { label: "radio - 单选", value: "radio" },
      { label: "checkbox - 复选", value: "checkbox" },
      { label: "number - 数字输入框", value: "number" },
      { label: "date - 日期", value: "date" },
      { label: "datetime - 日期时间", value: "datetime" },
      { label: "hidden - 隐藏", value: "hidden" },
      { label: "plan - 进度条", value: "plan" },
      { label: "year_select", value: "year_select" },
      { label: "month_select", value: "month_select" },
      { label: "date_select", value: "date_select" },
      { label: "time_select", value: "time_select" },
      { label: "datetime_select", value: "datetime_select" },
      { label: "部门选择", value: "部门选择" },
      { label: "角色选择", value: "角色选择" }
    ];
    let table = [
      { label: "text - 文本", value: "text" },
      { label: "tag - 标签", value: "tag" },
      { label: "plan - 进度条", value: "plan" },
      { label: "image - 图片", value: "image" },
      { label: "input - 输入框", value: "input" },
      { label: "switch - 开关", value: "switch" },
      { label: "select - 选择框", value: "select" },
      { label: "dropdown - 下拉框", value: "dropdown" },
      { label: "tagdown - 标签下拉框", value: "tagdown" },
      { label: "cascader - 级联选择器", value: "cascader" }
    ];
    return {
      key: 0,
      isShow: true,
      dialogVisible: false,
      activeTabName: "a",
      id: null,
      treeData: [],
      treeOpstion: { label: "title" },
      // 关联数据表 - 新增关联表
      // 中间的新增关联表
      tableFormData: { parentName: "请选择左侧菜单" },
      tableFormfields: [
        {
          label: "所属菜单",
          prop: "parentName",
          type: "text",
          wrap: true,
          labelWidth: 70,
          readonly: true
        },
        {
          label: "表别名",
          prop: "title",
          wrap: true,
          labelWidth: 70,
          type: "text"
        },
        {
          label: "数据表名",
          prop: "elem",
          labelWidth: 70,
          type: "text"
        },

        {
          type: "button",
          label: "",
          labelWidth: 70,
          options: [
            {
              label: "新增关联表",
              click: this.addReloveTable,
              style: "primary"
            }
          ]
        }
      ],
      // 关联数据表 - 表格数据
      // 中间的表格数据
      tabelFields: [
        {
          label: "ID",
          prop: "id",
          minWidth: 50
        },
        {
          label: "表别名",
          prop: "title",
          type: "input",
          change: this.tableChange
        },
        {
          label: "表名称",
          prop: "elem",
          type: "input",
          change: this.tableChange
        },
        {
          label: "操作",
          type: "manage",
          //   minWidth: "200",
          options: [
            { label: "查看", click: this.views, style: "primary" },
            { label: "删除", click: this.tableDel, style: "danger" }
          ]
        }
      ],
      tableData: [],
      // 菜单关联表 - 表格数据
      // 最右边tabs的表格
      tableMenuData: [],
      tableMenuField: [
        {
          prop: "order",
          label: "排序",
          type: "input",
          change: this.tableEdit,
          width: 110
        },
        {
          prop: "type",
          label: "类型",
          type: "tagdown",
          change: this.tableEdit,
          options: table,
          width: 150
        },
        {
          prop: "minWidth",
          label: "最小宽度",
          type: "input",
          change: this.tableEdit,
          width: 80
        },
        {
          prop: "prop",
          label: "字段名",
          type: "input",
          esizable: true,
          change: this.tableEdit
        },
        {
          prop: "label",
          label: "别名",
          type: "input",
          change: this.tableEdit
        },
        {
          prop: "sort",
          label: "排序",
          align: "center",
          type: "switch",
          change: this.tableEdit,
          width: 80
        },
        {
          prop: "visible",
          label: "启用",
          align: "center",
          type: "switch",
          change: this.tableEdit,
          width: 80
        },
        {
          type: "manage",
          label: "操作",
          fixed: "right",
          width: 80,
          options: [
            {
              label: "删除",
              click: this.tableOrFormDel
            }
          ]
        }
      ],
      // 最右边tabs的表单
      formMenuData: [],
      formMenuField: [
        {
          change: this.formEdit,
          prop: "prop",
          label: "prop",
          type: "input",
          resizable: true,
          width: 250
        },
        {
          change: this.formEdit,
          prop: "label",
          label: "label",
          type: "input",
          fixed: "left"
        },
        { change: this.formEdit, prop: "order", label: "order", type: "input" },
        {
          change: this.formEdit,
          prop: "type",
          label: "type",
          type: "tagdown",
          options: form,
          width: 120
        },
        {
          change: this.formEdit,
          prop: "visible",
          label: "visible",
          align: "center",
          type: "switch",
          width: 100
        },
        {
          change: this.formEdit,
          prop: "visible_add",
          label: "visible_add",
          align: "center",
          type: "switch",
          width: 100
        },
        {
          change: this.formEdit,
          prop: "visible_edit",
          label: "visible_edit",
          align: "center",
          type: "switch",
          width: 100
        },
        {
          change: this.formEdit,
          prop: "size",
          label: "size",
          type: "select",
          options: [
            { label: "default", value: "default" },
            { label: "mini", value: "mini" },
            { label: "small", value: "small" },
            { label: "large", value: "large" }
          ]
        },
        {
          change: this.formEdit,
          prop: "required",
          label: "required",
          align: "center",
          type: "switch"
        },

        {
          change: this.formEdit,
          prop: "readonly",
          label: "readonly",
          align: "center",
          type: "switch"
        },
        {
          change: this.formEdit,
          prop: "disabled",
          label: "disabled",
          align: "center",
          type: "switch"
        },
        {
          type: "manage",
          label: "操作",
          fixed: "right",
          options: [
            {
              label: "删除",
              click: this.tableOrFormDel
            }
          ]
        }
      ],
      // 添加字段,最右边上面的添加字段
      addFieldFormData: {
        fieldFun: true,
        visible: true,
        minWidth:100,
        editable: { type: "text" }
      },
      addFieldFormFields: [
        {
          wrap: true,
          span: 15,
          label: "所属菜单",
          type: "text",
          prop: "parentName"
        },
        {
          wrap: true,
          span: 15,
          label: "字段名称",
          type: "text",
          prop: "prop"
        },
        {
          wrap: true,
          span: 15,
          label: "字段标题",
          type: "text",
          prop: "label"
        },
        {
          wrap: true,
          span: 15,
          label: "表格类型",
          type: "select",
          prop: "type",
          change: this.change,
          options: table
        },
        {
          wrap: true,
          span: 15,
          label: "单列宽度",
          type: "number",
          prop: "minWidth",
          placeholder: "默认100px"
        },
        {
          wrap: true,
          span: 15,
          label: "排序",
          type: "number",
          prop: "order"
        },
        {
          wrap: true,
          span: 15,
          label: "是否启用",
          type: "radio",
          prop: "visible",
          options: [
            { label: "是", value: true },
            { label: "否", value: false }
          ]
        }
      ],
      addFieldFormField_a: [
        {
          wrap: true,
          span: 15,
          label: "字段名",
          type: "text",
          prop: "prop"
        },
        {
          wrap: true,
          span: 15,
          label: "名称",
          type: "text",
          prop: "label"
        },
        {
          wrap: true,
          span: 15,
          label: "排序",
          type: "number",
          prop: "sort"
        },
        {
          wrap: true,
          span: 15,
          label: "表单类型",
          type: "select",
          prop: "type",
          options: form
        },
        {
          wrap: true,
          span: 15,
          type: "button",
          options: [
            {
              label: "确定添加",
              style: "primary",
              click: this.addField
            }
          ]
        }
      ],
      tableOptions: { maxHeight: "590px", selection: false, size: "mini" }
    };
  },
  created() {
    this.getTreeList();
  },
  methods: {
    async tableOrFormDel(item) {
      let bool = await this.$confirm("本操作不可恢复，是否继续！", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {});
      if (!bool) return;
      let { data } = await this.axios("/adminapi/Column/column_del", {
        data: { id: item.id }
      });
      if (data.code) {
        this.tableMenuData = this.tableMenuData.filter(e => e.id !== item.id);
        this.formMenuData = this.formMenuData.filter(e => e.id !== item.id);
      }
    },
    tableEdit(item) {
      this.axios("/adminapi/Column/column_edit", {
        data: item
      });
    },
    formEdit(item) {
      this.axios("/adminapi/Column/column_editable_edit", {
        data: item
      });
    },
    async tableDel(item) {
      let bool = await this.$confirm("本操作不可恢复，是否继续！", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {});
      if (!bool) return;
      let { data } = await this.axios("/adminapi/Column/table_del", {
        method: "post",
        data: { id: item.id }
      });
      if (data.code) {
        this.tableData = this.tableData.filter(e => e.id != item.id);
      }
    },
    async tableChange(item) {
      // 修改关联表
      await this.axios("/adminapi/Column/table_edit", {
        data: item
      });
    },
    async views(item) {
      let a = JSON.parse(JSON.stringify(this.addFieldFormData));
      this.addFieldFormData = Object.assign({}, a, {
        parentName: item.title,
        table_id: item.id
      });
      this.getTableColumn();
      this.activeTabName = "a";
    },
    async getTableColumn() {
      //  获取菜单关联表数据
      let { data } = await this.axios("/adminapi/Column/column_list", {
        data: this.addFieldFormData
      });
      if (data.code) {
        this.isShow = true;
        this.tableMenuData = data.data.column || [];
        this.formMenuData = data.data.columneditable || [];
      }
    },
    async treeClickNode(d) {
      // 点击树节点
      this.id = d.id;
      this.tableFormData = { parentName: d.title, auth_id: d.id };
      await this.page();
    },
    async page(page = 1, limit = 10) {
      let option = {
        auth_id: this.id,
        page,
        limit
      };
      let { data } = await this.axios("/adminapi/Column/table_list", {
        data: option
      });
      if (data.code) {
        this.tableData = data.data || [];
      } else {
        this.tableData = [];
      }
    },
    async getTreeList() {
      let { data } = await this.axios.post("/adminapi/Column/authtree");
      if (data.code) {
        this.treeData = data.data;
      }
    },
    async addReloveTable() {
      // 新增关联表
      let { data } = await this.axios("/adminapi/Column/table_add", {
        data: this.tableFormData
      });
      if (data.code) {
        this.page();
        this.dialogVisible = false;
      }
    },
    change(item, index, type) {
      console.log(item, index, type);
    },
    async addField() {
      // 添加字段
      if (this.addFieldFormData.type !== "text") {
        this.addFieldFormData.change = "change";
      }
      let { data } = await this.axios("/adminapi/Column/column_add", {
        data: this.addFieldFormData
      });
      if (data.code) {
        this.getTableColumn();
        this.addFieldFormData = Object.assign({}, this.addFieldFormData, {
          prop: "",
          order: "",
          minWidth: "",
          type: "",
          label: ""
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  display: grid;
  grid-template-columns: 200px minmax(750px, auto);
  grid-gap: 1%;
  width: 100%;
  overflow: hidden;
  .tabs-top {
    /deep/ .el-tabs__content {
      height: calc(100% - 60px) !important ;
    }
  }
}
</style>