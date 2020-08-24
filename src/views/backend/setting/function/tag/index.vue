<!--
Template Name: 流程标签
Create author: qinglong
Create Time  : 2020-08-21
-->
<template>
  <div class="content-wrap">
    <el-card class="box-card" style="height:100%">
      <div slot="header">
        客户标签
        <el-button style="padding:3px 6px;float:right" type="primary " @click="treeAddTop">添加</el-button>
      </div>
      <div style="height:100%">
        <el-scrollbar style="height:100%">
          <el-tree :data="treeData" :props="defaultProps" :expand-on-click-node="true" :default-expanded-keys="treeKey" highlight-current node-key="id" check-strictly @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <i class="el-icon-plus" @click.self.stop="() => treeAdd(data)" style="color:#00BABD;padding:0 5px"></i>
                <i class="el-icon-edit" @click.stop.self="() => treeChange(data)" style="color:#ff6600;padding:0 5px"></i>
                <i class="el-icon-delete" @click.stop.self="() => treeDel(data)" style="color:#ee3333;padding:0 5px"></i>
              </span>
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible" width="400px" :modal="true" top="15vh">
        <mixForm v-model="roles" :fields="rolesFields" />
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Admintag",
  data() {
    return {
      url: "",
      dialogFormVisible: false,
      index: 0,
      treeKey: [],
      title: "",
      roles: {},
      rolesFields: [
        {
          label: "所属部门",
          type: "select",
          labelWidth: "80",
          prop: "dept",
          options: [],
          props: { label: "label", value: "id" }
        },
        {
          label: "上级标签",
          type: "selectTree",
          labelWidth: "80",
          prop: "pid",
          options: [],
          props: { label: "label", value: "id" }
        },
        { label: "标签名称", type: "text", labelWidth: "80", prop: "label" },
        {
          label: "进度数值",
          type: "number",
          labelWidth: "80",
          prop: "progress"
        },
        {
          type: "button",
          labelWidth: "40",
          label: "确定",
          style: "primary",
          click: this.addRoleMenu
        }
      ],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      page: {
        page: 1,
        limie: 10,
        total: 0
      }
    };
  },
  created() {
    this.getData();
    this.getDept();
  },
  methods: {
    async getDept() {
      let { data } = await this.axios("/adminapi/label/dept");
      if (data.code) {
        this.rolesFields = this.rolesFields.map(e => {
          if (e.prop == "dept")
            e.options = data.data.map(e => ({ ...e, value: e.id }));
          return e;
        });
      }
    },
    handleNodeClick(data) {
      this.treeKey[0] = data.id;
    },
    treeAddTop() {
      this.url = "/adminapi/label/add";
      this.title = "添加顶级标签";
      this.roles = { pid: 0 };
      this.dialogFormVisible = true;
    },
    async treeAdd(data) {
      this.url = "";
      this.title = "添加子标签";
      this.roles = { dept: data.dept, pid: data.id };
      this.dialogFormVisible = true;
    },
    async addRoleMenu() {
      let url = this.url || "/adminapi/label/add";
      let { data } = await this.axios(url, {
        data: this.roles
      });
      if (data.code) {
        this.roles = {};
        this.dialogFormVisible = false;
        this.getData();
      }
    },
    async treeChange(data) {
      console.log(data);
      this.roles = { ...data };
      this.dialogFormVisible = true;
      this.title = "修改标签";
      this.url = "/adminapi/label/edit";
    },
    async treeDel(val) {
      let { data } = await this.axios("/adminapi/label/del", {
        data: val
      });
      if (data.code) {
        this.getData();
        this.roles = {};
      }
    },
    async tableChange(a) {
      await this.axios("/adminapi/label/edit", {
        method: "post",
        data: a
      });
      this.getData();
    },
    async getData(pid) {
      let { data } = await this.axios("/adminapi/label/list", {
        data: { pid }
      });
      if (data.code) {
        this.treeData = data.data;
        this.url = "";
        this.rolesFields = this.rolesFields.map(e => {
          if (e.prop == "pid") e.options = this.treeData;
          return e;
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  display: grid;
  grid-template-columns: 25% auto;
  grid-gap: 2%;
  .el-card {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    /deep/ .el-card__body {
      flex: 1 1 auto;
    }
  }
  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>