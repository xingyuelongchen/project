<!--
Template Name: renovation
Create author: qinglong
Create Time  : 2020-08-14
-->
<template>
  <div class="content">
    <div class="content-cols">
      <mixSearch v-model="searchData" :fields="searchFields" :key="key" />
      <mixTable v-model="tableData" :fields="tableFields" />
    </div>
    <el-dialog :visible.sync="show" title="请输入账号" width="500px">
      <mixForm v-model="formData" :fields="[{label:'旺旺账号',type:'text',prop:'wangwang',labelWidth:80} ]" />
      <div slot="footer">
        <el-button @click="extract" type="primary">提取</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Tutorrenovation",
  data() {
    return {
      show: false,
      formData: {},
      key: "0",
      tableData: [],
      tableFields: [
        { label: "账号", prop: "username" },
        { label: "密码", prop: "password" },
        { label: "旺旺", prop: "wangwang" },
        { label: "花名", prop: "servicer" },
        { label: "提取时间", prop: "create_time" }
      ],
      searchFields: [
        { label: "账号", type: "text", prop: "search", span: 3 },
        {
          type: "button",
          span: 6,
          options: [
            { label: "搜索", click: this.getData },
            { label: "导入账号", style: "danger", click: this.add, role: 171 },
            {
              label: "提取账号",
              style: "warning",
              click: this.showa,
              role: 172
            },
            { label: "剩余总数", type: "info", prop: "count" }
          ]
        }
      ],
      searchData: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data } = await this.axios("/adminapi/Renovation/list", {
        data: this.searchData
      });
      if (data.code) {
        this.searchData.count = data.data.count;
        this.key = Math.random();
        this.tableData = data.data.data;
      }
    },
    showa() {
      this.show = true;
    },
    async extract() {
      let { data } = await this.axios("/adminapi/Renovation/extracts", {
        data: this.formData
      });
      if (data.code) {
        this.$alert(data.data, "请复制账号密码");
        this.formData = {};
        this.getData();
        this.show = false;
      }
    },
    add() {
      let file = document.createElement("input");
      file.type = "file";
      file.accept = "application/vnd.ms-excel,text/csv,application/csv";
      file.click();
      file.onchange = async () => {
        let form = new FormData();
        form.append("excel", file.files[0]);
        await this.axios("/adminapi/Renovation/import", {
          data: form
        });
      };
    }
  }
};
</script>
<style lang='less' scoped>
</style>