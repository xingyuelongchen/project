<!--
Template Name: 权限组
Create author: qinglong
Create Time  : 2020-07-28
-->
<template>
  <div class="content">
    <div class="content content-left-center-right">
      <el-card class="left">
        <div slot="header">
          权限组
          <el-button style="float: right; padding: 3px 0" type="text" size="mini" @click="addGroup('添加')">添加新组</el-button>
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
          <el-button style="float: right; padding: 6px" type="primary" size="mini" @click="saveRole">保存权限</el-button>
        </div>

        <el-scrollbar style="height:100%" v-if="role.id">
          <el-tree :data="treeData" :props="{label:'title'}" :expand-on-click-node="true" :check-strictly="false" @check-change="checkChange" highlight-current show-checkbox node-key="id" ref="tree">
            <template slot-scope="{data}">
              <div style="flex: 1;display:flex;justify-content:space-between">
                <span>{{data.title}}</span>
                <span>
                  <el-button type="primary" style="padding:3px;font-size:12px" @click.stop="nodeClick(data)">查看</el-button>
                </span>
              </div>
            </template>
          </el-tree>
        </el-scrollbar>
      </el-card>
      <el-card class="right">
        <div slot="header">
          权限子列表
          <el-button style="float: right; padding: 6px; margin:0 5px" type="primary" size="mini" @click="saveList">保存权限</el-button>
          <!-- <el-button style="float: right; padding: 6px; margin:0 5px" type="danger" size=" mini" @click="oneOpen">一键开启</el-button> -->
        </div>
        <mixTable v-model="rolesList" :fields="rolesFields" @select="listCheck" ref="table" />
      </el-card>
    </div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible" width="400px" :modal="true" top="15vh">
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
        {
          label: "字段",
          labelWidth: 60,
          type: "select",
          prop: "fields",
          multiple: false,
          options: [
            { label: "creator_group_zid", value: "creator_group_zid" },
            { label: "saler_group_zid", value: "saler_group_zid" },
            { label: "servicer_group_zid", value: "servicer_group_zid" },
            { label: "creator_userid", value: "creator_userid" },
            { label: "saler_userid", value: "saler_userid" },
            { label: "servicer_userid", value: "servicer_userid" },
            { label: "creator_group_id", value: "creator_group_id" },
            { label: "saler_group_id", value: "saler_group_id" },
            { label: "servicer_group_id", value: "servicer_group_id" },
            { label: "cross_userid", value: "cross_userid" },
            { label: "cross_group_id", value: "cross_group_id" },
            { label: "cross_group_zid", value: "cross_group_zid" }
          ]
        },
        { type: "textarea", labelWidth: 60, prop: "reamk", label: "描述" },
        { type: "button", label: "修改", labelWidth: 60, click: this.change }
      ],
      rolesList: [],
      rolesFields: [],
      selectTableField: {
        laytables_editable: [],
        laytables: [],
        laytables_export: []
      }
    };
  },
  created() {
    this.getData();
    this.getMenuData();
  },
  methods: {
    changeGroup(val, item) {
      // 修改权限组
      this.url = "/adminapi/Authgroup/edit";
      this.roleData = item;
      this.title = val + "权限组";
      this.dialogFormVisible = true;
    },
    cloneGroup(item) {
      // 复制权限组
      this.url = "/adminapi/Authgroup/clone";
      this.roleData = { id: item.id };
      this.change();
    },
    delGroup(item) {
      // 删除权限组
      this.url = "/adminapi/Authgroup/del";
      this.roleData = { id: item.id };
      this.change();
    },
    addGroup(val) {
      // 添加权限组
      this.title = val + "权限组";
      this.dialogFormVisible = !this.dialogFormVisible;
      this.url = "/adminapi/Authgroup/add";
    },
    checkChange() {
      // 选中的权限菜单
      let checked = this.$refs.tree.getCheckedKeys();
      let checkedParent = this.$refs.tree.getHalfCheckedKeys();
      this.role.rules = checkedParent.concat(checked).sort((a, b) => a - b);
    },
    listCheck(val) {
      // 选中的授权字段
      this.selectTableField.laytables = val.map(e => e.id);
    },
    async nodeClick(val) {
      this.selectTableField.id = val.id;
      // 点击权限菜单，查询菜单下的授权字段
      let { data } = await this.axios("/adminapi/Authgroup/table_list", {
        data: { id: val.id, table_id: this.role.id }
      });
      if (data.code) {
        let a = Object.keys(data.data.column[0]).map(e => {
          let obj = {
            label: e,
            prop: e
          };
          if (e == "edit") {
            obj = {
              label: e,
              prop: e,
              type: e == "edit" ? "switch" : "",
              change: this.listChange
            };
          } else if (e == "export") {
            obj = {
              label: e,
              prop: e,
              type: e == "export" ? "switch" : "",
              change: this.changeExport
            };
          }
          return obj;
        });
        this.role.table_id = data.data.table_id;
        let status = [],
          id = [],
          expor = [];
        if (
          data.data.lay.laytables &&
          data.data.lay.laytables[data.data.table_id]
        )
          id = data.data.lay.laytables[data.data.table_id];
        if (
          data.data.lay.laytables_editable &&
          data.data.lay.laytables_editable[data.data.table_id]
        )
          status = data.data.lay.laytables_editable[data.data.table_id];
        if (
          data.data.lay.laytables_export &&
          data.data.lay.laytables_export[data.data.table_id]
        )
          expor = data.data.lay.laytables_export[data.data.table_id];
        this.rolesList = data.data.column.map(e => {
          return {
            ...e,
            checked: id.includes(e.id),
            edit: status.includes(e.id) ? 1 : 0,
            export: expor.includes(e.id) ? 1 : 0
          };
        });
        this.rolesFields = [{ type: "selection" }].concat(a);
        this.selectTableField.laytables = id;
        this.selectTableField.laytables_editable = status;
        this.selectTableField.laytables_editable = status;
        this.selectTableField.laytables_export = expor;
      } else {
        this.rolesList = [];
      }
    },
    async changeExport(item) {
      // 获取授权字段开启列表
      let a = this.selectTableField.laytables_export;
      let index = a && a.indexOf(item.id);
      if (index >= 0) {
        this.selectTableField.laytables_export.splice(index, 1);
      } else {
        this.selectTableField.laytables_export.push(item.id);
      }
    },
    async listChange(item) {
      // 获取授权字段开启列表
      let a = this.selectTableField.laytables_editable;
      let index = a && a.indexOf(item.id);
      if (index >= 0) {
        console.log(index);
        this.selectTableField.laytables_editable.splice(index, 1);
      } else {
        console.log(index);
        this.selectTableField.laytables_editable.push(item.id);
      }
    },
    async saveList() {
      // 保存授权字段更改
      this.selectTableField.auth_id = this.role.id;
      this.selectTableField.table_id = this.role.table_id;
      let form = JSON.parse(JSON.stringify(this.selectTableField));
      let { data } = await this.axios("/adminapi/Authgroup/table_add", {
        data: form
      });
      if (data.code) {
        this.selectTableField = {
          laytables_editable: [],
          laytables: []
        };
        this.nodeClick({ id: form.id });
      }
    },
    oneOpen() {
      // 一键开启
    },
    async getMenuData() {
      // 获取权限菜单
      let { data } = await this.axios("/adminapi/Authgroup/lis");
      if (data.code) {
        this.treeData = data.data;
      }
    },
    async change() {
      // 修改权限组数据
      let { data } = await this.axios(this.url, {
        data: this.roleData
      });
      if (data.code) {
        this.dialogFormVisible = false;
        this.roleData = {};
        this.getData();
      }
    },
    async getData() {
      // 获取权限组
      let { data } = await this.axios("/adminapi/Authgroup/list");
      if (data.code) {
        this.list = data.data;
      }
    },
    async saveRole() {
      // 保存权限菜单
      await this.axios("/adminapi/Authgroup/preservation", {
        data: this.role
      });
    },
    async getRole(item) {
      // 获取权限菜单
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
      // 遍历回显数据，剔除父节点
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
.content-left-center-right {
  grid-template-columns: 25% 25% 46% !important;
}
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
</style>