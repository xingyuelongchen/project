<!--
Template Name: 权限管理
Create author: qinglong
Create Time  : 2020-07-27
-->
<template>
  <div class="content-wrap">
    <el-card class="left" shadow="never">
      <div slot="header">
        <el-button type="primary" size="12px" @click=" dialogFormVisible = true;">添加</el-button>
      </div>
      <div style="height:100%">
        <el-scrollbar style="height:100%">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            :expand-on-click-node="false"
            highlight-current
            node-key="id"
            check-strictly
            @node-click="handleNodeClick"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.title }}</span>
              <span>
                <i
                  class="el-icon-plus"
                  @click="() => treeAdd(data)"
                  style="color:#00BABD;padding:0 5px"
                ></i>
                <i
                  class="el-icon-edit"
                  @click="() => treeChange(data)"
                  style="color:#ff6600;padding:0 5px"
                ></i>
                <i
                  class="el-icon-delete"
                  @click="() => treeDel(data)"
                  style="color:#ee3333;padding:0 5px"
                ></i>
              </span>
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
    </el-card>
    <el-card shadow="never">
      <div slot="header">权限列表</div>
      <!-- <mixTable v-model="" /> -->
      <mixPage v-model="page" />
    </el-card>
    <el-dialog
      title="添加权限菜单"
      :visible.sync="dialogFormVisible"
      width="400px"
      :modal="true"
      top="30vh"
    >
      <mixForm v-model="roles" :fields="rolesFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      dialogFormVisible: false,
      roles: { pid: 0 },
      rolesFields: [
        {
          label: "顶级",
          type: "text",
          labelWidth: "40",
          prop: "pid",
          readonly: true
        },
        { label: "名称", type: "text", labelWidth: "40", prop: "title" },
        { label: "图标", type: "text", labelWidth: "40", prop: "icon" },
        { label: "路径", type: "text", labelWidth: "40", prop: "name" },
        {
          type: "button",
          labelWidth: "40",
          label: "确定",
          style: "primary",
          click: this.addRoleMenu
        }
      ],
      treeData: [{}],
      defaultProps: {
        children: "children",
        label: "label"
      },
      page: {
        page: 1,
        limie: 10,
        total: 100
      }
    };
  },
  created() {
    this.dep([{ pid: 0 }, { pid: 1 }, { pid: 2 }, { pid: 5 }, { pid: 3 }]);
    this.getData();
  },
  methods: {
    handleNodeClick(data) {
      console.log("点击树节点");
      console.log(data);
    },
    async treeAdd() {
      console.log("添加菜单项");
    },
    async addRoleMenu() {
      console.log(this.roles);
      let { data } = await this.axios("/adminapi/Authrule/add", {
        method: "post",
        data: this.roles
      });
      if (data.code) {
        console.log(data);
      }
    },
    async treeChange(data) {
      this.roles = { ...data };
    },
    async treeDel() {
      console.log("删除菜单项");
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Authrule/list");
      if (data.code) this.treeData = data.data;
    },
    dep(a) {
      a = a.sort((b, c) => b.pid - c.pid);
      let b = this.aaa(a, a[a.length - 1].pid);
      console.log(b);
    },
    aaa(b, index) {
      if (index == 0) return;
      let arr = [];
      b.forEach(e => {
        if (e.pid == index - index) {
          arr.push(e);
        }
      });
      index--;
      return arr;
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  display: grid;
  grid-template-columns: 25% auto;
  grid-gap: 2%;
  .left.el-card {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    /deep/ .el-card__body {
      height: 100%;
    }
  }
  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>