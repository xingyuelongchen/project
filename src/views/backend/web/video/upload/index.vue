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
          <div v-if="!list.length">暂无数据</div>
          <template v-else>
            <div class="item" :class="{active:ids.includes(item.id)}" v-for="(item,index) in list" :key="index">
              <div>
                <el-image :src="item.pic" fit="contain" @click.self="onPlay(item)">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div class="top">
                  <el-checkbox :value="ids.includes(item.id)" @change="selection(item)" />
                  <span class="el-icon-edit" @click="edit(item)"></span>
                  <span class="el-icon-delete" @click="del(item)"></span>
                </div>
                <div class="bottom">
                  {{item.title}}
                </div>
              </div>
            </div>
          </template>
        </div>
      </el-scrollbar>
    </div>
    <mixPage v-model="page" />
    <el-dialog :close-on-click-modal="false" :visible.sync="show" :title="title" width="600px">
      <mixForm v-model="formData" :fields="formFields" />
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="playShow" title="视频预览" width="900px">
      <div style="width:100%;overflow-x:hidden">
        <video :src="src" :key="src" width="900px" controls />
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Webweblist",
  data() {
    return {
      key: "0",
      check: false,
      list: [],
      ids: [],
      title: "上传视频",
      formData: {},
      formFields: [],
      show: false,
      playShow: false,
      src: "",
      all: false,
      url: "",
      searchData: {},
      searchFields: [],
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
    this.getData();
  },
  methods: {
    async getClass() {
      let { data } = await this.axios("/adminapi/videoType/list");
      if (data.code) {
        let options = data.data.map(e => {
          return { ...e, value: e.id };
        });
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
            options,
            span: 3
          },
          {
            span: 14,
            type: "button",
            options: [
              { label: "搜索", style: "success", click: this.getData },
              { label: "全选", style: "primary", click: this.checkAll },
              {
                label: "上传视频",
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
        this.formFields = [
          { label: "视频名称", prop: "title", type: "text", wrap: true },
          {
            label: "视频封面",
            prop: "pic",
            type: "selectimage",
            wrap: true,
            style: "success"
          },
          {
            label: "视频分类",
            prop: "type",
            type: "select",
            options,
            wrap: true
          },
          { label: "点击量", prop: "count", type: "number", wrap: true },
          {
            label: "视频",
            prop: "url",
            type: "video",
            wrap: true,
            accept: "video/mp4"
          },
          { label: "确定上传", type: "button", click: this.save }
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
      let { data } = await this.axios("/adminapi/video/list", {
        data: { ...this.searchData, ...this.page }
      });
      if (data.code) {
        this.list = data.data.map(e => {
          if (this.ids.includes(e.id)) e.checked = !e.checked;
          return e;
        });

        this.page.total = data.count;
      }
    },
    async upload() {
      this.formData = {};
      this.title = "上传视频";
      this.show = true;
      this.url = "/adminapi/video/add";
    },
    async save() {
      if (!this.formData.url && !this.formData.size) {
        this.$alert("请等待上传完成", {
          type: "warning"
        });
        return;
      }
      // 上传文件
      await this.axios(this.url, {
        data: this.formData
      });
      this.getData();
      this.show = false;
    },
    async del(item) {
      let ids = this.ids;
      if (item.id) ids = [item.id];
      this.$confirm("此操作将永久删除选中视频，是否继续？", "警告！", {
        type: "warning"
      }).then(async () => {
        let { data } = await this.axios("/adminapi/video/del", {
          data: { ids }
        });
        if (data.code) this.getData();
      });
    },
    async edit(item) {
      this.formData = item;
      this.title = "编辑视频信息";
      this.show = true;
      this.url = "/adminapi/video/edit";
    },
    onPlay(item) {
      this.playShow = true;
      this.src = item.url;
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
    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      display: flex;
      padding: 0 10px;
      justify-content: center;
      align-items: center;
      opacity: 1;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      span {
        display: inline-block;
        text-align: left;
      }
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