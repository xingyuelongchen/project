<!--
Template Name: 提成系数
Create author: qinglong
Create Time  : 2020-08-06
-->
<template>
  <div>
    <div class="content-wrap">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <div class="list">
        <span v-if="!list.length">暂无</span>
        <template v-for="(item,index) in list">
          <el-card :key="index">
            <div slot="header">{{item.grade}}
              <el-button style="padding:5px;margin:0 3px;float:right" type="danger" @click="del(item)">删除</el-button>
              <el-button style="padding:5px;margin:0 3px;float:right" type="primary" @click="edit(item)">编辑</el-button>
            </div>
            <div class=" item">
              <span>销售金额</span>
              <span>提成比例</span>
              <span>提成金额</span>
            </div>
            <template v-for="(k,i) in item.options">
              <div class="item" :key="i">
                <span>{{k.price}}</span>
                <span>{{k.rate}}</span>
                <span>{{(k.price*1000)/(1000*1000)*(k.rate*10)}}</span>
              </div>
            </template>
          </el-card>
        </template>
      </div>
    </div>
    <el-dialog :visible.sync="show" title="编辑">

      <template v-for="(item,index) in formData">
        <div :key="index" style="display:flex;margin:5px">
          <div style="flex:1;padding:0 10px">
            销售金额(元)：
            <el-input type="number" v-model="item.price" />
          </div>
          <div style="flex:1;padding:0 10px">
            提成比例(%)：
            <el-input type="number" v-model="item.rate" />
          </div>
        </div>
      </template>
      <div slot="footer">
        <el-button @click="addLine">添加一行</el-button>
        <el-button @click="save" type="primary">保存当前</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addShow" title="添加" width="250px">
      选择等级：
      <el-select v-model="grade">
        <template v-for="(item,index) in options">
          <el-option :label="item.label" :value="item.value" :key="index"></el-option>
        </template>
      </el-select>
      <div slot="footer">
        <el-button type="primary" @click="addGrade">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Salescoefficient",
  data() {
    return {
      grade: null,
      options: [],
      addShow: false,
      searchData: {},
      searchFields: [
        { type: "month", label: "选择日期", prop: "month", span: 3 },
        {
          type: "button",
          span: 5,
          options: [
            {
              type: "button",
              label: "查看",
              click: this.getData
            },
            {
              type: "button",
              label: "添加",
              click: this.add,
              icon: "el-icon-puls",
              style: "danger"
            }
          ]
        }
      ],
      list: [{ label: "等级一", children: [{ a: 10000, b: 0.1 }] }],
      show: false,
      formData: [{ price: "", rate: "" }]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    addLine() {
      this.formData.push({ price: "", rate: "" });
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Salerate/list", {
        params: this.searchData
      });
      if (data.code) {
        this.list = data.data;
        this.show = false;
      }
    },
    async del(item) {
      await this.axios("/adminapi/Salerate/del", {
        data: { id: item.id }
      });
      this.getData();
    },
    async add() {
      let { data } = await this.axios("/adminapi/Salerate/p_tool");
      if (data.code) {
        this.options = data.data;
        this.addShow = true;
      }
    },
    async addGrade() {
      await this.axios("adminapi/Salerate/add", {
        data: { grade: this.grade }
      });
      this.getData();
    },
    edit(item) {
      this.show = true;
      this.id = item.id;
    },
    async save() {
      await this.axios("/adminapi/Salerate/edit", {
        data: { id: this.id, form: this.formData }
      });
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
.list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 0;
  .el-card {
    width: 20%;
    margin: 20px 10px;
  }
  .item {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    border: 1px solid #eee;
    &:not(:first-child) {
      border-top: none;
    }

    span {
      flex: 1;
    }
  }
}
</style>