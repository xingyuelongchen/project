<!--
Template Name: 回流客户
Create author: qinglong
Create Time  : 2020-10-22
-->
<template>
  <div class="content-cols">
    <mixSearch v-model="searchData" :fields="searchFields" v-role="327" />
    <mixTable v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
  </div>
</template>
<script>
export default {
  name: 'Salesreturn_customer',
  data() {
    return {
      page: { page: 1, limit: 15, total: 0 },
      searchData: {},
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
        { label: '提取时间', prop: 'extract_time' }
      ]
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async getData() {
      let { data } = await this.axios('/adminapi/Customerxtract/list', {
        data: { ...this.page, ...this.searchData }
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
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
<style lang='less' scoped>
</style>