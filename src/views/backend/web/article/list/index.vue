<!--
Template Name: Webarticlelist
Create author: qinglong
Create Time  : 2020-09-20
-->
<template>
  <div class="content-cols">
    <template v-if="show">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <mixTable v-model="tableData" :fields="tableFields" />
      <mixPage v-model="page" />
    </template>
    <template v-else>
      <el-page-header @back="back" :content="title" />
      <publishDom v-model="details" />
    </template>
  </div>
</template>
<script>
export default {
  name: "Webarticlelist",
  components: { publishDom: () => import("../publish") },
  data() {
    return {
      show: true,
      title: "发布文章",
      details: {},
      page: { page: 0, limit: 14, total: 0, event: this.getData },
      searchFields: [],
      searchData: {},
      tableData: [],
      tableFields: [
        { headAlign: "center", label: "封面图", prop: "pic", type: "image" },
        { headAlign: "center", label: "文章标题", prop: "title" },
        { headAlign: "center", label: "副标题", prop: "subtitle" },
        { headAlign: "center", label: "文章分类", prop: "type" },
        { headAlign: "center", label: "浏览量", prop: "count" },
        { headAlign: "center", label: "作者", prop: "author" },
        { headAlign: "center", label: "发布时间", prop: "create_time" },
        {
          headAlign: "center",
          label: "操作",
          type: "button",
          width: 250,
          options: [
            {
              label: "预览",
              size: "mini",
              style: "success",
              click: this.preview
            },
            {
              label: "删除",
              size: "mini",
              style: "danger",
              click: this.del
            },
            {
              label: "修改",
              size: "mini",
              style: "warning",
              click: this.change
            }
          ]
        }
      ]
    };
  },
  async created() {
    await this.getClass();
    this.getData();
  },
  methods: {
    back() {
      this.details = {};
      this.show = true;
      this.getData();
    },
    preview(item) {
      window.open(item.url, "_blank");
    },
    async del(item) {
      let { data } = await this.axios("/adminapi/article/del", {
        data: { id: item.id }
      });
      if (data.code) {
        this.getData();
      }
    },
    async change(item) {
      this.details = item;
      this.title = "修改文章";
      this.show = false;
    },
    publish() {
      this.title = "发布文章";
      this.show = false;
    },
    async getClass() {
      let { data } = await this.axios("/adminapi/Articletype/list");
      if (data.code) {
        this.searchFields = [
          {
            span: 3,
            type: "select",
            label: "文章分类",
            prop: "type",
            options: data.data.map(e => {
              return { ...e, value: e.id };
            })
          },
          { span: 3, type: "text", prop: "search" },
          {
            span: 12,
            type: "button",
            options: [
              { label: "搜索", style: "primary", click: this.getData },
              { label: "发布文章", style: "success", click: this.publish }
            ]
          }
        ];
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/article/list", {
        data: { ...this.page, ...this.searchData }
      });
      if (data.code) {
        this.tableData = data.data;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.el-page-header {
  padding-bottom: 20px;
}
</style>