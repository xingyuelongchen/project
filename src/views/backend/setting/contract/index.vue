<!--
Template Name: 合同管理
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <div class="content-wrap">
    <div class="box">
      <el-card>
        <div slot="header">
          版本
          <el-button style="padding:6px;float:right" type="primary" @click="add">添加版本</el-button>
        </div>
        <div class="left">
          <el-scrollbar>
            <template v-if="list.length">
              <div v-for="(item,index) in  list" class="item" user=card-active :key="index" @click="tab(item)" :class="{active:version.id==item.id}">{{item.label}}</div>
            </template>
          </el-scrollbar>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <template v-if="list.length">
            <el-button style="padding:3px 6px;" size="mini" type="info"> 版本：{{version.label  }} </el-button>
            <el-button style="padding:3px 6px;" size="mini" type="info"> 时长：{{version.duration  }} 个月</el-button>
            <el-button style="padding:3px 6px;" size="mini" type="info"> 价格：{{version.price }}元</el-button>
            <el-button style="padding:3px 6px;" size="mini" type="danger" @click="del">删除当前套餐</el-button>
            <el-button style="padding:3px 6px;" size="mini" type="success" @click="edit">编辑套餐</el-button>
            <el-button style="padding:3px 6px;" size="mini" type="warning" @click="changeSave">保存图片修改</el-button>
          </template>
        </div>
        <div class="right">
          <el-scrollbar>
            <div class="list" v-if="imageList.length">
              <template v-for="(item,index) in imageList">
                <div class="item" :key="index">
                  <div class="icon">
                    <span> <i class="el-icon-arrow-left" v-if="index" @click="onLeft(item)"></i></span>
                    <span><i class="el-icon-delete" @click="onDel(item)"></i> </span>
                    <span> <i class="el-icon-arrow-right" v-if="index<imageList.length-1" @click="onRight(item)"></i></span>
                  </div>
                  <el-image pr fit="contain" :preview-src-list="version.pic" :src="item.src" />
                </div>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="addShow" title="添加套餐" width="500px">
      <mixForm v-model="addData" :fields="addFields" />
    </el-dialog>
    <el-dialog :visible.sync="editShow" title="编辑套餐" width="500px">
      <mixForm v-model="editData" :fields="editFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Admincontract",
  data() {
    return {
      version: {},
      addShow: false,
      editShow: false,
      list: [],
      imageList: [],
      addData: {},
      addFields: [
        { labelWidth: 80, label: "套餐名称", prop: "label", type: "text" },
        { labelWidth: 80, label: "套餐价格", prop: "price", type: "number" },
        { labelWidth: 80, label: "有效期", prop: "duration", type: "number" },
        { labelWidth: 80, label: "套餐合同", prop: "pic", type: "image" },
        {
          labelWidth: 80,
          type: "button",
          options: [{ label: "提交", click: this.save }]
        }
      ],
      editData: {},
      editFields: [
        { labelWidth: 80, label: "套餐名称", prop: "label", type: "text" },
        { labelWidth: 80, label: "套餐价格", prop: "price", type: "number" },
        { labelWidth: 80, label: "有效期", prop: "duration", type: "number" },
        { labelWidth: 80, label: "套餐合同", prop: "pic", type: "image" },
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
    add() {
      this.addShow = true;
    },
    async del() {
      await this.axios("/adminapi/Meal/del", {
        data: this.version
      });
      this.version = {};
      this.imageList = [];
      this.getData();
    },
    tab(item) {
      if (item) {
        this.version = item;
        this.imageList = item.pic.map((e, i) => ({ id: i, src: e }));
      }
    },
    edit() {
      this.editShow = true;
      this.editData = this.version;
    },
    onLeft(item) {
      item = { ...item };
      this.imageList = this.imageList.filter(e => e.id != item.id);
      this.imageList.splice(item.id - 1, 0, item);
      this.imageList = this.imageList.map((e, i) => {
        e.id = i;
        return e;
      });
      let arr = this.imageList.map(e => e.src);
      this.version.pic = arr;
    },
    onRight(item) {
      item = { ...item };
      this.imageList = this.imageList.filter(e => e.id != item.id);
      this.imageList.splice(item.id + 1, 0, item);
      this.imageList = this.imageList.map((e, i) => {
        e.id = i;
        return e;
      });
      let arr = this.imageList.map(e => e.src);
      this.version.pic = arr;
    },
    onDel(item) {
      this.imageList = this.imageList.filter(e => e.id != item.id);
      let arr = this.imageList.map(e => e.src);
      this.version.pic = arr;
    },
    async changeSave() {
      await this.axios("/adminapi/Meal/picture", {
        data: this.version
      });
      this.getData();
    },
    async editSave() {
      let { data } = await this.axios("/adminapi/Meal/edit", {
        data: this.editData
      });
      if (data.code) {
        this.getData();
        this.editShow = false;
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/meal/list");
      if (data.code) {
        this.list = data.data;
        if (!this.version.id) {
          this.version = data.data[0];
          this.tab(this.version);
        }
      }
    },
    async save() {
      let { data } = await this.axios("/adminapi/Meal/add", {
        data: this.addData
      });
      if (data.code) {
        this.addShow = false;
        this.addData = {};
        this.getData();
      }
    }
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  .box {
    display: grid;
    grid-template-columns: 250px auto;
    grid-gap: 20px;
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