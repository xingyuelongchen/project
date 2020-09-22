<!--
Template Name: Webarticleclass
Create author: qinglong
Create Time  : 2020-09-20
-->
<template>
  <div class="content content-left-right">
    <el-card>
      <div slot="header">
        分类列表
        <el-button style="padding:5px;float:right" size="mini" type="primary" @click="addClass">添加分类</el-button>
      </div>
      <div class="el-list">
        <div :class="[item.id == currentClass.id?'active el-item':'el-item']" v-for="(item) in list" :key="item.id" @click="getArticle(item)">
          <span>{{item.label}}</span>
          <div>
            <span style="padding-left:10px" class="el-icon-edit" @click.stop.self="editClass(item)" type="info"></span>
            <span style="padding-left:10px" class="el-icon-delete" @click.stop.self="delClass(item)" type="info"></span>
          </div>
        </div>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        文章列表
        <el-button style="padding:5px;float:right" size="mini" type="danger" @click="delArticle">批量删除</el-button>
      </div>
      <mixTable v-model="tableData" :fields="tableFields" @select="selection" />
      <mixPage v-model="page" />
    </el-card>

  </div>
</template>
<script>
export default {
  name: "Webarticleclass",
  data() {
    return {
      list: [],
      form: { label: "" },
      currentClass: null,
      tableData: [],
      page: { page: 1, limit: 15, total: 0, event: this.getArticle },
      tableFields: [
        { type: "selection" },
        { label: "名称", prop: "title" },
        { label: "封面图", prop: "image" },
        { label: "发布时间", prop: "create_time" }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    selection(item) {
      this.ids = item.map(e => e.id);
    },
    editClass(item) {
      this.$prompt("请输入分类名称", "修改分类名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.+/,
        inputErrorMessage: "请输入名称"
      }).then(async e => {
        await this.axios("/adminapi/Articletype/edit", {
          data: { label: e.value, id: item.id }
        });
        this.getData();
      });
    },
    async delClass(item) {
      await this.axios("/adminapi/Articletype/del", {
        data: { id: item.id }
      });
      this.getData();
    },
    async getArticle(item) {
      this.currentClass = item;
      let { data } = await this.axios("/adminapi/Articletype/article_list", {
        data: { id: item.id }
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
      }
    },
    async delArticle() {
      await this.axios("/adminapi/Articletype/del_article", {
        data: { ids: this.ids }
      });
      console.log(0);
      this.getArticle(this.currentClass);
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Articletype/list");
      if (data.code) {
        this.list = data.data;
        if (!this.currentClass) this.getArticle(data.data[0]);
      }
    },
    async addClass() {
      this.$prompt("请输入分类名称", "添加新分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /.+/,
        inputErrorMessage: "请输入名称"
      }).then(async e => {
        await this.axios("/adminapi/Articletype/add", {
          data: { label: e.value }
        });
        this.getData();
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>