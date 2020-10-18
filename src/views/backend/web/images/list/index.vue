<!--
Template Name: image
Create author: qinglong
Create Time  : 2020-09-20
-->
<template>
  <div class="content-cols">
    <mixSearch v-model="searchData" :fields="searchFields" />
    <div class="mix-table">
      <el-scrollbar>
        <div class="list" :key="key">
          <template v-for="(item,index) in list">
            <div class="item" :class="{active:ids.includes(item.id)}" :key="index">
              <div>
                <el-image :src="item.url" :preview-src-list=" previewList " fit="contain">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div class="top">
                  <el-checkbox :value="ids.includes(item.id)" @change="selection(item)" />
                  <span class="el-icon-delete" @click="del(item)"></span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </el-scrollbar>
    </div>
    <mixPage v-model="page" />
    <input v-show="false" type="file" name="file" ref="file" multiple @input="uploadFile">
  </div>
</template>
<script>
export default {
  name: "WebImageslist",
  data() {
    return {
      key: "0",
      check: false,
      list: [],
      ids: [],
      all: false,
      searchData: {},
      searchFields: [],
      previewList: [],
      page: {
        page: 1,
        limit: 27,
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
    await this.getData();
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
            span: 10,
            type: "button",
            options: [
              { label: "搜索", style: "success", click: this.getData },
              { label: "全选", style: "primary", click: this.checkAll }
            ]
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
              },
              {
                label: "批量删除",
                style: "danger",
                click: this.del
              }
            ]
          }
        ];
      }
    },
    checkAll() {
      this.all = !this.all;
      if (this.all) {
        this.ids = this.list.map(e => e.id);
      } else {
        this.ids = [];
      }
    },
    selection(item) {
      if (this.ids.includes(item.id)) {
        this.ids = this.ids.filter(e => e !== item.id);
      } else {
        this.ids.push(item.id);
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/images/list", {
        data: { ...this.searchData, ...this.page }
      });
      if (data.code) {
        this.list = data.data.map(e => {
          if (this.ids.includes(e.id)) e.checked = !e.checked;
          return e;
        });
        this.previewList = data.data.map(e => e.url);
        this.page.total = data.count;
      }
    },
    close() {
      // 关闭窗口
      console.log(0);
    },
    getCheck() {
      // 全选
      console.log(0);
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
    async del(item) {
      let ids = this.ids;
      if (item.id) ids = [item.id];
      this.$confirm("此操作将永久删除选中图片，是否继续？", "警告！", {
        type: "warning"
      }).then(async () => {
        let { data } = await this.axios("/adminapi/images/del_images", {
          data: { ids }
        });
        if (data.code) this.getData();
      });
    }
  }
};
</script>
<style lang='less' scoped>
.list {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  flex: auto;
  // height: calc(100% - 100px);
  // overflow: hidden;
  .item {
    width: 10%;
    padding-bottom: 10%;
    height: 0;
    margin: 0.5%;
    border-radius: 15px;
    overflow: hidden;
    background: #f6f6f6;
    transition: all 0.2s;
    cursor: pointer;
    position: relative;
    border: 1px solid #ccc;
    > div {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .el-image {
      display: inline-block;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .top {
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      opacity: 0;
      height: 20px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s;
    }
    &:hover,
    &.active {
      box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.3);
      transition: all 0.2s;
      .top {
        transition: all 0.2s;
        opacity: 1;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
      }
    }
  }
}
</style>