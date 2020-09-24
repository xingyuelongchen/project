<!--
Template Name: banner接口
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <div class="content">
    <div class="content content-left-right">
      <el-card>
        <div slot="header">
          组织构架
          <el-button v-if="!orgList.length" type="primary" style="float:right;padding:5px;" @click="openList">添加组织</el-button>
        </div>
        <el-scrollbar>
          <el-tree :data="orgList" :expand-on-click-node="true" :default-expanded-keys="treeKey" highlight-current node-key="id" check-strictly @node-click="nodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <i class="el-icon-plus" @click.self.stop="() => treeAdd(data)" style="color:#00BABD;padding:0 5px"></i>
                <i class="el-icon-edit" @click.stop.self="() => treeChange(data)" style="color:#ff6600;padding:0 5px"></i>

                <i v-if="data.pid >=0" class="el-icon-delete" @click.stop.self="() => treeDel(data)" style="color:#ee3333;padding:0 5px"></i>
              </span>
            </span>
          </el-tree>
        </el-scrollbar>
      </el-card>
      <el-card header="组织"></el-card>
    </div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="dialogFormVisible" width="400px" :modal="true" top="15vh" @close="close">
      <mixForm v-model="orgForm" :fields="rolesFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Webhome",
  data() {
    return {
      orgList: [],
      treeKey: [],
      roleList: [],
      orgForm: {},
      title: "",
      dialogFormVisible: false,
      rolesFields: [
        {
          label: "上级",
          type: "selectTree",
          labelWidth: "40",
          prop: "pid",
          props: { label: "label", value: "id" },
          options: []
        },
        { label: "名称", type: "text", labelWidth: "40", prop: "label" },
        { label: "排序", type: "number", labelWidth: "40", prop: "sort" },
        {
          type: "button",
          labelWidth: "40",
          label: "确定",
          style: "primary",
          click: this.addOrgList
        }
      ]
    };
  },
  created() {
    this.getRoleList();
    this.getOrgList();
  },
  methods: {
    nodeClick(data) {
      this.treeKey[0] = data.id;
    },
    async getRoleList() {
      // 获取权限组
      let { data } = await this.axios("/adminapi/Authgroup/list");
      if (data.code) {
        this.roleList = data.data;
      }
    },
    async getOrgList() {
      // 获取组织
      let { data } = await this.axios("/adminapi/Company/list");
      if (data.code) {
        this.orgList = data.data;
        if (data.data.length) this.rolesFields[0].options = data.data;
      }
    },
    async addOrgList() {
      // 添加部门
      let url = this.url || "/adminapi/Company/department_add";
      let { data } = await this.axios(url, {
        data: this.orgForm
      });
      if (data.code) {
        this.getOrgList();
        this.dialogFormVisible = false;
        this.url = "";
      }
    },
    openList() {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async e => {
          await this.axios("/adminapi/Company/company_add", {
            data: { label: e.value }
          });
          this.getOrgList();
        })
        .catch(err => {
          console.log(err);
        });
    },
    close() {
      this.orgForm = {};
    },
    async treeAdd(data) {
      this.title = "添加部门";
      console.log(data);
      let { id: com_id, pid = 0 } = data;
      this.orgForm = { com_id, pid };
      this.dialogFormVisible = true;
    },
    async treeChange(data) {
      this.orgForm = { ...data };
      this.dialogFormVisible = true;
      this.title = "修改部门";
      this.url = "/adminapi/Company/department_edit";
    },
    async treeDel(val) {
      let { data } = await this.axios("/adminapi/Company/department_del", {
        data: val
      });
      if (data.code) {
        this.$message.success(data.msg);
        this.getOrgList();
        this.orgForm = {};
      }
    }
  }
};
</script>
 