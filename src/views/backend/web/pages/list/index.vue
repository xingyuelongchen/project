<!--
Template Name: 页面管理
Create author: qinglong
Create Time  : 2020-09-20
-->
<template>
  <div class="content">
    <div class="content content-left-right">
      <el-card>
        <div slot="header">
          文件目录
          <div style="float:right;">
            <el-button type="primary" style="padding:5px;" @click="addDir">添加顶级目录</el-button>
            <el-button type="primary" style="padding:5px" @click="addFile">添加顶级文件</el-button>
          </div>
        </div>
        <el-scrollbar>
          <el-tree :data="treeList" :expand-on-click-node="true" :default-expanded-keys="treeKey" highlight-current node-key="path" check-strictly @node-click="nodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span v-if="data.type" class="el-icon-document"> {{ data.label }}</span>
              <span v-else class="el-icon-folder-opened"> {{ data.label }}</span>
              <span>
                <i v-if="!data.type" class="el-icon-plus" @click.self.stop="() => treeAdd(node)" style="color:#00BABD;padding:0 5px"></i>
                <i class="el-icon-edit" @click.stop.self="() => treeChange(data)" style="color:#ff6600;padding:0 5px"></i>
                <i class="el-icon-delete" @click.stop.self="() => treeDel(data)" style="color:#ee3333;padding:0 5px"></i>
              </span>
            </span>
          </el-tree>
        </el-scrollbar>
      </el-card>
      <el-card>
        <div slot="header" class="slot">
          {{title}}
          <el-button type="primary" style="float:right;padding:5px;" @click="onSave">保存编辑</el-button>
        </div>
        <mixCode :key="key" v-model="code" :options="options" />
      </el-card>
    </div>
    <el-dialog :title="title" :visible.sync="visible" width="400px" :modal="true" top="15vh" @close="close">

    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Webpageslist",
  data() {
    return {
      treeKey: [],
      treeList: [],
      options: {},
      code: "",
      title: "代码编辑",
      visible: false,
      key: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    nodeClick(data) {
      this.treeKey[0] = data.id;
      if (data.type) {
        this.getFile(data);
      }
    },
    addDir() {
      console.log(0);
    },
    addFile() {
      console.log(0);
    },
    async getFile(item) {
      let { data } = await this.axios("/adminapi/Page/reads", {
        data: item
      });
      if (data.code) {
        this.code = data.data;
        this.options.language = item.type;
        this.key = Math.random();
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/page/list");
      if (data.code) {
        this.treeList = data.data;
      }
    },
    async onSave() {
      await this.axios("/adminapi/page/save");
    },
    close() {},
    treeAdd(item) {
      console.log(item);
    },
    treeChange(item) {
      console.log(item);
    },
    treeDel(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let { data } = await this.axios("/adminapi/page/del", {
          data: item
        });
        if (data.code) this.getData();
      });
    }
  }
};
</script>