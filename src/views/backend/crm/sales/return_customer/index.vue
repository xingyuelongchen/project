<!--
Template Name: 回流客户
Create author: qinglong
Create Time  : 2020-10-22
-->
<template>
  <div class="content-cols">
    <mixSearch v-model="searchData" :fields="searchFields" v-role="327" :key="key" />
    <mixTable v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
    <el-dialog :visible.sync="show" title="查看资料" width="300px">
      <div class="el-list">
        <div class="el-item">微信：{{formData.weixin}}</div>
        <div class="el-item">QQ：{{formData.qq}}</div>
        <div class="el-item">电话：{{formData.mobile}}</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Salesreturn_customer',
  data() {
    return {
      key: 0,
      show: false,
      page: { page: 1, limit: 15, total: 0 },
      searchData: {},
      formData: {},
      searchFields: [
        {
          span: 12,
          type: 'button',
          options: [
            {
              size: 'mini',
              label: '提取客户',
              style: 'danger',
              role: 327,
              click: this.extracted
            },
            {
              size: 'mini',
              label: '剩余',
              style: 'info',
              type: 'info',
              prop: 'number'
            }
          ]
        }
      ],
      tableData: [],
      tableFields: [
        { label: '释放人', prop: 'saler' },
        { label: '释放时间', prop: 'create_time' },
        { label: '释放次数', prop: 'extract_count' },
        { label: '提取人', prop: 'xtract_name' },
        { label: '提取时间', prop: 'extract_time' },
        {
          label: '操作',
          type: 'button',
          options: [{ label: '查看', click: this.views }]
        }
      ]
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async views(item) {
      let { data } = await this.axios('/adminapi/Customerxtract/see', {
        data: item
      });
      if (data.code) {
        this.formData = data.data;
        this.show = true;
      }
    },
    async getData() {
      let { data } = await this.axios('/adminapi/Customerxtract/list', {
        data: { ...this.page, ...this.searchData }
      });
      if (data.code) {
        this.tableData = data.data.data;
        this.page.total = data.count;
        this.searchData.number = data.data.count;
        this.key = Math.random();
      }
    },
    extracted() {
      this.$prompt('请输入提取数量', '提示', {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d*$/,
        inputErrorMessage: '请输入提取数量'
      }).then(async ({ value: num }) => {
        await this.axios('/adminapi/Customerxtract/rxtract', {
          data: { num }
        });
        this.getData();
      });
    }
  }
};
</script> 