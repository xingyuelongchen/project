<!--
Template Name: images
Create author: qinglong
Create Time  : 2020-09-23
-->
<template>
  <div class="mix-images">
    <div class="box">
      <div class="head">
        <span>图片库</span>
        <span class="el-icon-close" @click="close({show:false})"></span>
      </div>
      <div class="body">
        <div class="content-cols">
          <mixSearch v-model="searchData" :fields="searchFields" />
          <mixTable v-model="list" :fields="tableFields" @select="selection" />
        </div>
      </div>
      <div class="foot">
        <mixPage v-model="page">
          <el-button slot="right" type="primary" size="small" v-if="getImage.all" @click="close">确定选择</el-button>
        </mixPage>
      </div>
    </div>
    <input v-show="false" type="file" name="file" ref="file" id="" multiple @input="uploadFile">
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "mixImages",
  data() {
    return {
      check: false,
      list: [],
      ids: [],
      files: [],
      searchData: {},
      searchFields: [],
      tableFields: [],
      previewList: [],
      page: {
        page: 1,
        limit: 8,
        total: 0,
        layout: "prev, pager, next,total"
      }
    };
  },
  watch: {
    "searchData.type"() {
      this.page.page = 1;
    }
  },
  async created() {
    await this.getClass();
    this.getData();
  },
  computed: {
    ...mapState(["getImage"])
  },
  methods: {
    async getClass() {
      let { data } = await this.axios("/adminapi/imagesType/list");
      if (data.code) {
        this.searchFields = [
          {
            label: "名称",
            prop: "search",
            type: "text",
            span: 3
          },
          {
            label: "分类搜索",
            prop: "type",
            type: "select",
            options: data.data.map(e => {
              return { ...e, value: e.id };
            }),
            span: 3
          },
          {
            span: 9,
            type: "button",
            label: "搜索",
            style: "success",
            click: this.getData
          },
          {
            label: "上传分类",
            prop: "uploadType",
            type: "select",
            options: data.data.map(e => {
              return { ...e, value: e.id };
            }),
            span: 4
          },
          {
            span: 3,
            type: "button",
            options: [
              {
                label: "上传图片",
                style: "warning",
                click: this.upload
              }
              //   {
              //     label: "批量删除",
              //     style: "danger",
              //     click: this.del
              //   }
            ]
          }
        ];
      }
    },
    selection(val) {
      this.ids = val.map(e => e.id);
      this.files = val.map(e => e.url);
    },
    async getData() {
      let { data } = await this.axios("/adminapi/images/list", {
        data: { ...this.searchData, ...this.page }
      });
      if (data.code) {
        this.list = data.data.map(e => {
          if (this.ids.includes(e.id)) e.checked = true;
          return e;
        });
        this.previewList = data.data.map(e => e.url);
        this.page.total = data.count;
        if (this.getImage.all) {
          this.tableFields = [
            { type: "selection" },
            { label: "缩略图", prop: "url", type: "image" },
            { label: "名称", prop: "title" },
            { label: "大小", prop: "size" },
            { label: "分类", prop: "type" }
          ];
        } else {
          this.tableFields = [
            { label: "缩略图", prop: "url", type: "image" },
            { label: "名称", prop: "title" },
            { label: "大小", prop: "size" },
            { label: "分类", prop: "type" },
            {
              label: "操作",
              type: "button",
              options: [
                { click: this.selectFile, label: "选定本图", style: "primary" }
              ]
            }
          ];
        }
      }
    },
    selectFile(item) {
      this.files = item.url;
      this.close();
    },
    close() {
      // 关闭窗口
      this.$store.commit("setGetImage", {
        files: this.files,
        show: false,
        all: true
      });
    },
    upload() {
      // 选择文件
      if (!this.searchData.uploadType) {
        this.$alert("请选择分类");
        return;
      }
      this.$refs.file.click();
    },
    async uploadFile(event) {
      // 上传文件
      let file_list = new FormData();
      event.target.files.forEach(e => {
        file_list.append("files[]", e);
      });
      file_list.append("type", this.searchData.uploadType);
      await this.axios("/adminapi/images/add", {
        data: file_list
      });
      this.getData();
    },
    async del() {
      this.$confirm("此操作将永久删除选中图片，是否继续？", "警告！", {
        type: "warning"
      }).then(async () => {
        let { data } = await this.axios("/adminapi/images/del_images", {
          data: { ids: this.ids }
        });
        if (data.code) this.getData();
      });
    }
  }
};
</script>
<style lang='less' scoped>
.mix-images {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: "auto";
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  .box {
    width: 840px;
    height: 550px;
    background: #fff;
    border-radius: 5px;
    .head {
      height: 40px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        cursor: pointer;
      }
    }
    .body {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      height: 450px;
      padding: 0 20px;
    }
    .foot {
      height: 40px;
    }
  }
}
</style>