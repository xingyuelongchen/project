<!--
Template Name: 合同管理
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <div>
    <div class="content-wrap">
      <el-card>
        <div slot="header">
          版本
          <el-button style="padding:6px;float:right" type="primary" @click="add">添加版本</el-button>
        </div>
        <div class="left">
          <el-scrollbar>
            <template v-for="(item,index) in [{id:1},{id:2},{id:3}]">
              <div class="item" user=card-active :key="index" @click="tab(item)" :class="{active:versionId==item.id}">{{item.id}}</div>
            </template>
          </el-scrollbar>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <el-button style="padding:6px;" type="danger" @click="del">删除当前版本</el-button>
          <el-button style="padding:6px;" type="success" @click="upload">上传合同图片</el-button>
        </div>
        <div class="right">
          <el-scrollbar>
            <div class="list">
              <template v-for="(item,index) in 10">
                <div class="item" :key="index">
                  <el-image fit="contain" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597232953390&di=e294de21d4e740ab259e057b44331b56&imgtype=0&src=http%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D3616242789%2C1098670747%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D900%26h%3D1350" />
                </div>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Admincontract",
  data() {
    return {
      versionId: null
    };
  },
  methods: {
    add() {
      console.log("add");
    },
    del() {
      console.log("del");
    },
    tab(item) {
      console.log(item);
      this.versionId = item.id;
    },
    upload() {
      console.log(0);
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  display: grid;
  grid-template-columns: 250px auto;
  grid-gap: 20px;
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
        width: 200px;
        height: 300px;
        margin: 4px;
        padding: 4px;
        overflow: hidden;
        border: 1px solid #eee;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>