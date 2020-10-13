<!--
Template Name: 选项管理
Create author: qinglong
Create Time  : 2020-03-27
-->
<template>
  <div class="content content-rows">
    <div class="left">
      <mixSearch v-model="formData.left" :fields="formFields.left" />
      <div style="height:calc(100% - 40px)">
        <mixTable v-model="tableData.left" :fields="tableFields.left" />
      </div>
    </div>
    <div class="right">
      <mixSearch v-model="formData.right" :fields="formFields.right" />
      <div style="height:calc(100% - 40px)">
        <mixTable v-model="tableData.right" :fields="tableFields.right" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "optionManage",
  data() {
    return {
      // url: "",
      key: "key",
      show: false,
      currentData: null,
      formData: { left: {}, right: {} },
      formFields: {
        left: [
          { label: "选项组名称", prop: "name", span: 5, type: "text" },
          {
            type: "button",
            span: 3,
            options: [{ label: "添加", click: this.saveLeft, style: "primary" }]
          }
        ],
        right: [
          { label: "选项名称", prop: "label", span: 5, type: "text" },
          { label: "选项值", prop: "value", span: 5, type: "text" },
          { label: "附加值", prop: "sub", span: 5, type: "text" },
          {
            type: "button",
            span: 6,
            options: [
              { label: "添加", click: this.saveRight, style: "primary" }
              // { label: "保存", click: this.save, style: "success" }
            ]
          }
        ]
      },
      tableData: { left: [], right: [] },
      tableFields: {
        left: [
          { label: "ID", minWidth: 50, prop: "id" },
          {
            label: "选项组名称",
            type: "input",
            prop: "name",
            change: this.tableChange
          },
          {
            label: "操作",
            type: "button",
            width: 200,
            options: [
              { label: "编辑选项", style: "primary", click: this.tableEdit },
              { label: "删除", style: "danger", click: this.tableDel }
            ]
          }
        ],
        right: [
          // { label: "ID", minWidth: 50, prop: "id" },
          {
            label: "选项名称",
            prop: "label",
            type: "input",
            change: this.tableChange
          },
          {
            label: "选项值",
            prop: "value",
            type: "input",
            change: this.tableChange
          },
          {
            label: "附加值",
            prop: "sub",
            type: "input",
            change: this.tableChange
          },
          {
            label: "tag样式",
            prop: "style",
            type: "tagdown",
            options: [
              { label: "primary", value: "primary" },
              { label: "success", value: "success" },
              { label: "info", value: "info" },
              { label: "warning", value: "warning" },
              { label: "danger", value: "danger" }
            ],
            change: this.tableChange
          },
          // {
          //   label: "是否默认",
          //   type: "switch",
          //   prop: "default",
          //   change: this.tableChange
          // },
          {
            label: "操作",
            type: "button",
            options: [
              { label: "删除", style: "danger", click: this.tableOnDel }
            ]
          }
        ]
      }
    };
  },
  async created() {
    this.getData();
  },

  methods: {
    async getData() {
      // 获取选项组列表
      let { data } = await this.request("/adminapi/Tool/list");
      if (data) {
        this.tableData.left = data;
      }
    },
    async tableEdit(item) {
      // 编辑子选项
      let data = await this.request("/adminapi/Tool/list", {
        id: item.id
      });
      if (data) {
        // 当前选项
        this.currentData = item;
        // 子选项表格数据
        this.tableData.right = data.data.options || [];
        this.show = true;
        this.key = Math.random();
      }
    },
    async tableDel(item) {
      let bool = await this.$confirm("本操作不可恢复，是否继续！", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {});
      if (!bool) return;
      // 删除选项组
      let data = await this.request("/adminapi/Tool/del", {
        id: item.id
      });
      if (data) {
        this.getData();
      }
    },
    async tableOnDel(item) {
      let bool = await this.$confirm("本操作不可恢复，是否继续！", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => {});
      if (!bool) return;
      // 删除子选项
      let arr = this.tableData.right.filter(e => e.label != item.label);
      this.tableData.right = (arr && arr.length && arr) || null;
      this.save();
    },
    async tableChange() {
      // 修改子选项
      await this.save();
      this.tableEdit(this.currentData);
    },
    async saveLeft() {
      // 添加选项组
      await this.request("/adminapi/Tool/add", this.formData.left);
      this.getData();
    },
    saveRight() {
      //  添加子选项
      if (
        !this.tableData.right.some(e => e.label == this.formData.right.label)
      ) {
        this.tableData.right.push(this.formData.right);
      } else {
        this.$message.error("请勿重复添加");
        return;
      }
      this.save();
      this.formData.right = {};
      this.key = Math.random();
    },
    async save() {
      // 保存子选项
      this.currentData.options = this.tableData.right;
      let data = await this.axios("/adminapi/Tool/edit", {
        data: this.currentData
      });
      if (data) {
        this.getData();
      }
    },
    async request(url, data) {
      let { data: result } = await this.axios(url, {
        data
      });
      if (result && result.code) return result;
      else return false;
    }
  }
};
</script>
<style lang='less' scoped>
.right {
  flex: 1 1 auto;
}
.left {
  width: 500px;
  margin-right: 20px;
}
</style>