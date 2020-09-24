<!--
Template Name: 上传更新
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <div class="content">
    <el-card>
      <div slot="header">
        <el-button style="padding:6px;" type="primary" @click="addUpdate">添加更新</el-button>
      </div>
      <mixTable v-model="tableData" :fields="tableFields" />
    </el-card>
    <el-dialog :close-on-click-modal="false" :visible.sync="addUpdateShow" title="添加更新" width="500px">
      <mixForm v-model="addUpdateData" :fields="addUpdateFields" @uploadStatus='uploadStatus' />
      <div slot="footer">
        <el-button type="primary" @click="submitUpdate" :loading="loading">提交更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Settingupdatelog",
  data() {
    return {
      version: {},
      addUpdateShow: false,
      addUpdateData: {},
      loading: false,
      tableData: [],
      tableFields: [
        { label: "更新版本", prop: "version" },
        { label: "标题", prop: "title" },
        { label: "更新描述", prop: "remark" },
        {
          label: "操作",
          type: "button",
          options: [
            { click: this.del, style: "danger", label: "删除缓存", role: 259 }
          ]
        }
      ],
      addUpdateFields: [
        { labelWidth: 75, label: "日志标题", type: "text", prop: "title" },
        { labelWidth: 75, label: "更新版本", type: "text", prop: "version" },
        { labelWidth: 75, label: "更新描述", type: "text", prop: "remark" },
        { labelWidth: 75, label: "更新内容", type: "upload", prop: "file" }
      ],
      list: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    addUpdate() {
      this.addUpdateShow = true;
    },
    uploadStatus(loading) {
      this.loading = loading;
    },
    async submitUpdate() {
      this.$confirm("确定更新版本？", "提示", { type: "warning" }).then(
        async () => {
          this.loading = true;
          let form = new FormData();
          for (let k in this.addUpdateData) {
            form.append(k, this.addUpdateData[k]);
          }
          let { data } = await this.axios("/adminapi/Edition/add", {
            data: form
          });
          if (data.code) {
            this.addUpdateShow = false;
            this.addUpdateData = {};
            this.getData();
          }
          this.loading = false;
        }
      );
    },
    async del(item) {
      this.$confirm("确定删除这个版本缓存吗？", "提示!", {
        type: "warning"
      }).then(async () => {
        await this.axios("/adminapi/Edition/del", {
          data: item
        });
        this.getData();
      });
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Edition/list");
      if (data.code) {
        this.tableData = data.data;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  .el-card {
    height: 100%;
  }
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
}
</style>