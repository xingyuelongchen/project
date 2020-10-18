<!--
Template Name: 权限管理
Create author: qinglong
Create Time  : 2020-07-27
-->
<template>
  <div class="content">
    <div class="content content-left-right">
      <el-card class="left" shadow="never">
        <div slot="header">
          <el-button type="primary" size="mini" @click="treeAddTop">添加</el-button>
        </div>
        <div style="height:100%">
          <el-scrollbar>
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
      </el-card>
      <el-card class="right" shadow="never">
        <div slot="header">权限列表</div>
        <mixTable v-model="tableData" :fields="tableFields" />
        <mixPage v-model="page" />
      </el-card>
    </div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible" width="400px" :modal="true" top="15vh">
      <mixForm v-model="roles" :fields="rolesFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Roles",
  data() {
    return {
      dialogFormVisible: false,
      index: 0,
      treeKey: [],
      title: "",
      roles: {},
      rolesFields: [
        {
          label: "上级",
          type: "selectTree",
          labelWidth: "40",
          prop: "pid",
          options: [],
          props: { label: "title", value: "id", children: "children" }
        },
        { label: "名称", type: "text", labelWidth: "40", prop: "title" },
        { label: "图标", type: "text", labelWidth: "40", prop: "icon" },
        { label: "排序", type: "number", labelWidth: "40", prop: "sort" },
        { label: "路径", type: "text", labelWidth: "40", prop: "name" },
        {
          type: "button",
          labelWidth: "40",
          label: "确定",
          style: "primary",
          click: this.addRoleMenu
        }
      ],
      treeData: [],
      tableData: [],
      tableFields: [
        {
          label: "id",
          prop: "id",
          width: 60
        },
        {
          label: "pid",
          prop: "pid",
          width: 100,
          type: "input",
          change: this.tableChange
        },
        {
          label: "status",
          prop: "status",
          type: "switch",
          change: this.tableChange,
          width: 100
        },
        {
          label: "sort",
          prop: "sort",
          type: "input",
          change: this.tableChange
        },
        {
          label: "name",
          prop: "name",
          type: "input",
          change: this.tableChange
        },

        {
          label: "title",
          prop: "title",
          type: "input",
          change: this.tableChange
        }
      ],
      defaultProps: {
        children: "children",
        label: "title"
      },
      page: {
        page: 1,
        limie: 10,
        total: 0
      }
    };
  },
  async created() {
    this.getMenuData();
  },
  methods: {
    handleNodeClick(data) {
      console.log("点击树节点");
      this.treeKey[0] = data.id;
      this.getData(data.id);
    },
    treeAddTop() {
      this.title = "添加顶级菜单";
      console.log("添加顶级菜单");
      this.roles = { pid: 0 };
      this.dialogFormVisible = true;
    },
    async treeAdd(data) {
      this.url = "";
      this.title = "添加子菜单";
      console.log("添加子菜单");
      this.roles = {
        pid: data.id
      };
      this.dialogFormVisible = true;
    },
    async addRoleMenu() {
      let url = this.url || "/adminapi/Authrule/add";
      let { data } = await this.axios(url, {
        method: "post",
        data: this.roles
      });
      if (data.code) {
        this.roles = {};
        this.dialogFormVisible = false;
        this.getMenuData();
      }
    },
    async treeChange(data) {
      this.roles = { ...data };
      this.dialogFormVisible = true;
      this.title = "修改权限菜单";
      this.url = "/adminapi/Authrule/edit";
    },
    async treeDel(val) {
      let { data } = await this.axios("/adminapi/Authrule/del", {
        data: val
      });
      if (data.code) {
        this.$message.success(data.msg);
        this.getMenuData();
        this.roles = {};
      }
    },
    async tableChange(a) {
      await this.axios("/adminapi/Authrule/edit", {
        method: "post",
        data: a
      });
    },
    async getMenuData() {
      let { data } = await this.axios("/adminapi/Authrule/list");
      if (data.code) {
        let list = data.data;
        this.treeData = list;
        this.rolesFields[0].options = list;
        this.url = "";
        this.getData(list[0].id);
      }
    },
    async getData(pid) {
      let { data } = await this.axios("/adminapi/Authrule/listPid", {
        data: { pid }
      });
      if (data.code) {
        this.tableData = data.data;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>