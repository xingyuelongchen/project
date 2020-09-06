<!--
Template Name: 合同管理
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <div class="content ">
    <div class="content content-left-right">
      <el-card>
        <div slot="header">
          分类
          <el-button style="padding:6px;float:right" type="primary" @click="add">添加分类</el-button>
        </div>
        <div class="left" :key="key">
          <el-scrollbar>
            <template v-for="(item,index) in  list">
              <div class="item" user=card-active :key="index" @click="tab(item)" :class="{active:version.id==item.id}">{{item.title}}</div>
            </template>
          </el-scrollbar>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <el-button style="padding:6px;" type="danger" @click="del(false)">删除当前分类</el-button>
          <el-button style="padding:6px;" type="warning" @click="edit">修改分类名称</el-button>
          <el-button style="padding:6px;" type="primary" @click="addAppid">添加接口数据</el-button>
        </div>
        <div class="right">
          <mixTable v-model="tableData" :fields="tableFields" />
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="addShow" title="添加分类" width="500px">
      <mixForm v-model="addData" :fields="addFields" />
    </el-dialog>
    <el-dialog :visible.sync="editShow" title="编辑分类" width="500px">
      <mixForm v-model="editData" :fields="editFields" />
    </el-dialog>
    <el-dialog :visible.sync="appShow" title="添加接口" width="500px">
      <mixForm v-model="addData" :fields="appFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Admincontract",
  data() {
    return {
      key: 0,
      version: {},
      addShow: false,
      editShow: false,
      appShow: false,
      list: [],
      appFields: [
        { labelWidth: 80, label: "appId", prop: "appid", type: "text" },
        { labelWidth: 80, label: "微信密钥", prop: "appsecret", type: "text" },
        { labelWidth: 80, label: "商户Api", prop: "key", type: "text" },
        { labelWidth: 80, label: "商户号", prop: "mch_id", type: "text" },
        { labelWidth: 80, label: "回调地址", prop: "notify_url", type: "text" },
        { labelWidth: 80, label: "添加", type: "button", click: this.save }
      ],
      tableData: [],
      tableFields: [
        { label: "appId", prop: "appid" },
        { label: "微信密钥", prop: "appsecret" },
        { label: "商户Api", prop: "key" },
        { label: "商户号", prop: "mch_id" },
        { label: "回调地址", prop: "notify_url" },
        {
          type: "button",
          options: [{ label: "删除", click: this.del, style: "danger" }]
        }
      ],
      addData: { pid: 0 },
      addFields: [
        { labelWidth: 80, label: "分类名称", prop: "title", type: "text" },
        {
          labelWidth: 80,
          type: "button",
          options: [{ label: "提交", click: this.save }]
        }
      ],
      editData: {},
      editFields: [
        { labelWidth: 80, label: "分类名称", prop: "label", type: "text" },
        {
          labelWidth: 80,
          type: "button",
          options: [{ label: "提交", click: this.editSave }]
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    addAppid() {
      this.appShow = true;
      this.addData.pid = this.version.id;
    },
    add() {
      this.addShow = true;
      this.addData.pid = 0;
    },
    async del(item) {
      let id = this.version.id;
      if (item.id) id = item.id;
      await this.axios("/adminapi/Pay/del", {
        data: { id }
      });
      this.version = {};

      this.getData();
    },
    tab(item) {
      this.version = item;
      this.getTable();
    },
    edit() {
      this.editShow = true;
      this.editData = this.version;
    },
    async editSave() {
      let { data } = await this.axios("/adminapi/Pay/edit ", {
        data: this.editData
      });
      if (data.code) {
        this.getData();
        this.editShow = false;
      }
    },

    async getTable() {
      let { data } = await this.axios("/adminapi/Pay/listPid", {
        data: { id: this.version.id }
      });
      if (data.code) {
        this.tableData = data.data;
        this.appShow = false;
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Pay/list ");
      if (data.code) {
        this.list = data.data;
        if (!this.version.id) {
          this.version = data.data[0];
          this.tab(this.version);
        }
        this.getTable();
        this.key = Math.random();
        this.addData = {};
        this.editData = {};
      }
    },
    async save() {
      await this.axios("/adminapi/Pay/add", {
        data: this.addData
      });
      this.addShow = false;
      this.addData = { pid: 0 };
      this.getData();
    }
  }
};
</script>
 <style lang="less" scoped>
.left {
  height: 100%;
  .item {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }
}
.right {
  height: 100%;
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      width: 250px;
      height: 300px;
      margin: 4px;
      padding: 4px;
      overflow: hidden;
      border: 1px solid #eee;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
      transition: all 0.2s;
      .icon {
        display: none;
        transition: all 0.2s;
      }
      &:hover .icon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        margin: auto;
        font-size: 22px;
        z-index: 999;
        transition: all 0.2s;
        padding: 5px;
        background: rgba(0, 0, 0, 0.5);
        i {
          color: #fff;
          font-size: 22px;
          padding: 5px;
          border-radius: 5px;
          &:hover {
            transition: all 0.2s;
            color: rgba(0, 0, 0, 1);
            cursor: pointer;
            background: rgba(255, 255, 255, 0.5);
          }
        }
      }
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>