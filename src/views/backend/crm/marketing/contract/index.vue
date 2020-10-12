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
          版本
          <el-button style="padding:6px;float:right" type="primary" @click="add">添加版本</el-button>
        </div>
        <div class="left">
          <el-scrollbar>
            <template v-if="list.length">
              <div v-for="(item,index) in  list" class="item" style="display: flex; justify-content: space-between; align-items: center;padding-right: 10px;" user=card-active :key="index" @click="tab(item)" :class="{active:version.id==item.id}">
                <span>{{item.label}}</span>
                <span class="el-icon-plus" @click="addPic(item)"></span>
              </div>
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
            <!-- <el-button style="padding:3px 6px;" size="mini" type="warning" @click="changeSave">添加图片</el-button> -->
          </template>
        </div>
        <div class="right">
          <mixTable v-model="imageList" :fields="tableFields" />
          <el-scrollbar v-show="false">
            <div class="list" v-if="imageList.length">
              <template v-for="(item,index) in imageList">
                <div class="item" :key="index">
                  <div class="name">{{item.src}}</div>
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
    <el-dialog :close-on-click-modal="false" :visible.sync="addShow" title="添加套餐" width="500px">
      <mixForm v-model="addData" :fields="addFields" />
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="editShow" title="编辑套餐" width="500px">
      <mixForm v-model="editData" :fields="editFields" />
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="picShow" title="添加图片" width="500px">
      <mixForm v-model="picData" :fields="picFields" />
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="editPicShow" title="修改图片" width="500px">
      <mixForm v-model="editPicData" :fields="editPicFields" />
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'Admincontract',
  data() {
    const contract = [
      { labelWidth: 80, label: '套餐名称', prop: 'label', type: 'text' },
      { labelWidth: 80, label: '是否淘宝', prop: 'form_id', type: 'switch' },
      { labelWidth: 80, label: '套餐价格', prop: 'price', type: 'number' },
      { labelWidth: 80, label: '有效期', prop: 'duration', type: 'number' },
      {
        labelWidth: 80,
        label: '套餐封面',
        prop: 'meal_pic',
        type: 'imageonce',
        all: false
      }
      // { labelWidth: 80, label: "套餐合同", prop: "pic", type: "imageonce" }
    ]
    return {
      version: {},
      addShow: false,
      editShow: false,
      picShow: false,
      editPicShow: false,
      list: [],
      imageList: [],
      picData: {},
      picFields: [
        // { label: "图片名称", type: "text", prop: "label" },
        { label: '图片排序', type: 'number', prop: 'sort' },
        { label: '上传图片', prop: 'pic', type: 'imageonce', all: false },
        { label: '是否需要签名', type: 'switch', prop: 'is_sign' },
        { label: '确定', type: 'button', click: this.changeSave }
      ],
      addData: {},
      addFields: contract.concat([
        {
          labelWidth: 80,
          type: 'button',
          options: [{ label: '提交', click: this.save }]
        }
      ]),
      editData: {},
      editFields: contract.concat([
        {
          labelWidth: 80,
          type: 'button',
          options: [{ label: '提交', click: this.editSave }]
        }
      ]),
      editPicData: {},
      editPicFields: [
        // { label: "图片名称", type: "text", prop: "label" },
        { label: '图片排序', type: 'number', prop: 'sort' },
        { label: '上传图片', prop: 'pic', type: 'imageonce', all: false },
        { label: '是否需要签名', type: 'switch', prop: 'is_sign' },
        {
          type: 'button',
          options: [{ label: '提交', click: this.editPic }]
        }
      ],

      tableFields: [
        { label: '缩略图', prop: 'pic', type: 'image' },
        { change: this.changeEdit, label: '排序', prop: 'sort', type: 'input' },
        {
          change: this.changeEdit,
          label: '名称',
          prop: 'label',
          type: 'input'
        },
        {
          change: this.changeEdit,
          label: '是否签名',
          prop: 'is_sign',
          type: 'switch'
        },
        {
          change: this.changeEdit,
          label: '字体色',
          prop: 'font_color',
          type: 'input'
        },
        {
          change: this.changeEdit,
          label: '字号',
          prop: 'font_size',
          type: 'input'
        },
        {
          change: this.changeEdit,
          label: '签名位置1',
          prop: 'position_a',
          type: 'input'
        },
        {
          change: this.changeEdit,
          label: '签名位置2',
          prop: 'position_b',
          type: 'input'
        },
        {
          change: this.changeEdit,
          label: '签名位置3',
          prop: 'position_c',
          type: 'input'
        },
        {
          label: '操作',
          type: 'button',
          options: [{ label: '修改图片', click: this.changeEditPic, style: 'warning' }]
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    add() {
      this.addShow = true
    },
    async addPic(item) {
      this.picShow = true
      this.picData.meal_id = item.id
    },
    async changeEdit(item) {
      item = { ...item }
      delete item.create_time
      delete item.update_time
      await this.axios('/adminapi/meal/sign_edit', {
        data: item
      })
    },
    async del() {
      this.$confirm('此操作不可恢复，是否继续', '警告！', {
        type: 'warning'
      }).then(async () => {
        await this.axios('/adminapi/Meal/del', {
          data: this.version
        })
        this.version = {}
        this.imageList = []
        this.getData()
      })
    },
    async tab(item) {
      this.version = item
      let { data } = await this.axios('/adminapi/meal/list_mael', {
        data: { id: item.id }
      })
      if (data.code) {
        console.log(data)
        this.imageList = data.data
      }
      // if (item) {
      //   this.imageList = item.pic.map((e, i) => ({ id: i, src: e }));
      // }
    },
    edit() {
      this.editShow = true
      this.editData = this.version
    },
    onLeft(item) {
      item = { ...item }
      this.imageList = this.imageList.filter(e => e.id != item.id)
      this.imageList.splice(item.id - 1, 0, item)
      this.imageList = this.imageList.map((e, i) => {
        e.id = i
        return e
      })
      let arr = this.imageList.map(e => e.src)
      this.version.pic = arr
    },
    onRight(item) {
      item = { ...item }
      this.imageList = this.imageList.filter(e => e.id != item.id)
      this.imageList.splice(item.id + 1, 0, item)
      this.imageList = this.imageList.map((e, i) => {
        e.id = i
        return e
      })
      let arr = this.imageList.map(e => e.src)
      this.version.pic = arr
    },
    onDel(item) {
      this.imageList = this.imageList.filter(e => e.id != item.id)
      let arr = this.imageList.map(e => e.src)
      this.version.pic = arr
    },
    async changeSave() {
      await this.axios('/adminapi/Meal/picture', {
        data: this.picData
      })
      this.getData()
      this.picShow = false
    },
    async editSave() {
      let { data } = await this.axios('/adminapi/Meal/edit', {
        data: this.editData
      })
      if (data.code) {
        this.getData()
        this.editShow = false
      }
    },
    async getData() {
      let { data } = await this.axios('/adminapi/meal/list')
      if (data.code) {
        this.list = data.data
        if (!this.version.id) {
          this.version = data.data[0]
          this.tab(this.version)
        }
      }
    },
    async save() {
      let { data } = await this.axios('/adminapi/Meal/add', {
        data: this.addData
      })
      if (data.code) {
        this.addShow = false
        this.addData = {}
        this.getData()
      }
    },
    async changeEditPic(item) {
      this.editPicShow = true
      this.editPicData = item
    },
    async editPic() {
      await this.axios('/adminapi/meal/sign_edit', {
        data: this.editPicData
      })
      this.editPicShow=false;
    }
  }
}
</script>
<style lang='less' scoped>
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
      height: 250px;
      margin: 4px;
      padding: 4px;
      overflow: hidden;
      border: 1px solid #eee;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
      transition: all 0.2s;
      .name {
        text-align: center;
        height: 22px;
        line-height: 22px;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        z-index: 99;
      }
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