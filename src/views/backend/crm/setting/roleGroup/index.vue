<!--
Template Name: 权限组
Create author: qinglong
Create Time  : 2020-07-28
-->
<template>
  <div>
    <div class="content-wrap">
      <el-card class="left">
        <div slot="header">
          权限组
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            size="mini"
            @click="addGroup('添加')"
          >添加新组</el-button>
        </div>
        <el-scrollbar style="height:100%">
          <div class="el-list">
            <div class="el-item" v-for="item in list" :key="item.id" @click="getRole(item)">
              <span user="role">{{item.title}}</span>
              <span>
                <el-tooltip class="icon" effect="dark" content="修改" placement="left">
                  <i class="el-icon-edit" @click.stop="changeGroup('修改',item)"></i>
                </el-tooltip>
                <el-tooltip class="icon" effect="dark" content="复制" placement="top">
                  <i class="el-icon-copy-document" @click.stop="cloneGroup(item)"></i>
                </el-tooltip>
                <el-tooltip class="icon" effect="dark" content="删除" placement="right">
                  <i class="el-icon-delete" @click.stop="delGroup(item)"></i>
                </el-tooltip>
              </span>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
      <el-card class="center">
        <div slot="header">
          权限组修改
          <el-button
            style="float: right; padding: 6px"
            type="primary"
            size="mini"
            @click="saveRole"
          >保存权限</el-button>
        </div>

        <el-scrollbar style="height:100%" v-if="role.id">
          <el-tree
            :data="treeData"
            :props="{label:'title'}"
            :expand-on-click-node="true"
            :check-strictly="false"
            @check-change="checkChange"
            highlight-current
            show-checkbox
            node-key="id"
            ref="tree"
          />
        </el-scrollbar>
      </el-card>
      <el-card class="right">
        <div slot="header">权限子列表</div>
        <mixTable v-model="rolesList" :fields="rolesFields" />
      </el-card>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="400px"
      :modal="true"
      top="15vh"
    >
      <mixForm v-model="roleData" :fields="roleFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Rolegroup",
  data() {
    return {
      list: [],
      key: "",
      treeData: [],
      roleData: {},
      title: "",
      dialogFormVisible: false,
      role: {},
      roleFields: [
        { label: "组名称", prop: "title", labelWidth: 60, type: "text" },
        { label: "组排序", prop: "sort", labelWidth: 60, type: "number" },
        {
          label: "组权限",
          labelWidth: 60,
          type: "select",
          prop: "range",
          options: [
            { label: "全部", value: "1" },
            { label: "仅自己", value: "2" },
            { label: "所属部门", value: "3" },
            { label: "所属部门及下属部门", value: "4" }
          ]
        },
        { type: "textarea", labelWidth: 60, prop: "reamk", label: "描述" },
        { type: "button", label: "修改", labelWidth: 60, click: this.change }
      ],
      rolesList:[],
      rolesFields:[]
    };
  },
  created() {
    this.getData();
    this.getMenuData();
  },
  methods: {
    changeGroup(val, item) {
      this.url = "/adminapi/Authgroup/edit";
      this.roleData = item;
      this.title = val + "权限组";
      this.dialogFormVisible = true;
    },
    cloneGroup(item) {
      this.url = "/adminapi/Authgroup/clone";
      this.roleData = { id: item.id };
      this.change();
    },
    delGroup(item) {
      this.url = "/adminapi/Authgroup/del";
      this.roleData = { id: item.id };
      this.change();
    },
    addGroup(val) {
      this.title = val + "权限组";
      this.dialogFormVisible = !this.dialogFormVisible;
      this.url = "/adminapi/Authgroup/add";
    },
    checkChange() {
      let checked = this.$refs.tree.getCheckedKeys();
      let checkedParent = this.$refs.tree.getHalfCheckedKeys();
      this.role.rules = checkedParent.concat(checked).sort((a, b) => a - b);
    },
    async getMenuData() {
      let { data } = await this.axios("/adminapi/Authgroup/lis");
      if (data.code) {
        this.treeData = data.data;
      }
    },
    async change() {
      let { data } = await this.axios(this.url, {
        data: this.roleData
      });
      if (data.code) {
        this.dialogFormVisible = false;
        this.roleData = {};
        this.$message.success(data.msg);
        this.getData();
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Authgroup/list");
      if (data.code) {
        this.list = data.data;
      }
    },
    async saveRole() {
      let { data } = await this.axios("/adminapi/Authgroup/preservation", {
        data: this.role
      });
      if (data.code) {
        this.$message.success(data.msg);
      }
    },
    async getRole(item) {
      this.role = { id: item.id };
      let { data } = await this.axios("/adminapi/Authgroup/info", {
        data: this.role
      });
      if (data.code) {
        this.key = Math.random();
        this.$refs.tree.setCheckedKeys([]);
        let newArr = [];
        data.data.rules.forEach(e => this.checked(e, this.treeData, newArr));
        this.$refs.tree.setCheckedKeys(newArr);
        this.role = data.data;
      }
    },

    checked(id, data, newArr) {
      data.forEach(item => {
        if (item.id == id) {
          if (!item.children || !item.children.length) {
            newArr.push(item.id);
          }
        } else {
          if (item.children && item.children.length) {
            this.checked(id, item.children, newArr);
          }
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  display: grid;
  grid-template-columns: 20% 20% 48%;
  grid-gap: 1%;
  .el-list {
    .el-item {
      line-height: 40px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      .icon {
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
}
</style>