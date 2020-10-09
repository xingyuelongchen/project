<!--
Template Name: Marketingmember  
Create author: qinglong
Create Time  : 2020-08-16
-->
<template>
  <div class="content-cols">
    <mixSearch v-model="searchData" :fields="searchFields" />
    <mixTable v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
  </div>
</template>
<script>
export default {
  name: 'Marketingmember',
  data() {
    return {
      page: { total: 0, limit: 18, page: 1, event: this.getData },
      searchData: {},
      searchFields: [
        { span: 3, sm: 12, md: 12, xs: 12, label: '姓名', prop: 'name', type: 'text' },
        { span: 3, sm: 12, md: 12, xs: 12, label: '手机号码', prop: 'mobile', type: 'number' },
        { span: 3, sm: 12, md: 12, xs: 12, label: '套餐版本', prop: 'meal', type: 'select', options: [] },
        { span: 10, sm: 12, md: 12, xs: 12, label: '搜索', type: 'button', click: this.getData }
      ],
      tableData: [],
      tableFields: [
        { label: '姓名', prop: 'name' },
        { label: '手机号', prop: 'mobile' },
        { label: '版本', prop: 'meal' },
        { label: '地区', prop: 'ip_address' },
        { label: '状态', prop: 'status', type: 'switch' },
        { label: '操作', type: 'button', options: [{ label: '查看合同', click: this.views, style: 'primary' }] }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let { data } = await this.axios('/adminapi/members/list', {
        data: { ...this.searchData, ...this.page }
      })
      if (data.code) {
        this.tableData = data.data
        this.page.total = data.count
      }
    },
    async views() {
      console.log(0)
    }
  }
}
</script>
<style lang='less' scoped>
</style>