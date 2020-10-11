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
    <el-dialog :visible.sync="show" title="合同预览" width="780px" :fullscreen="false" top="5vh">
      <el-image v-for="(item,index) in imgList" :key="index" :src="item" :preview-src-list="imgList" fit="contaion"></el-image> 
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Marketingmember',
  data() {
    return {
      show: false,
      page: { total: 0, limit: 18, page: 1, event: this.getData },
      searchData: {},
      searchFields: [],
      tableData: [],
      tableFields: [
        { label: '姓名', prop: 'name' },
        { label: '手机号', prop: 'mobile' },
        { label: '版本', prop: 'meal' },
        { label: '地区', prop: 'ip_address' },
        { label: '状态', prop: 'status', type: 'switch' },
        {
          label: '操作',
          type: 'button',
          options: [
            { label: '查看合同', click: this.views, style: 'primary' },
            { label: '重置合同', click: this.reset, style: 'danger' }
          ]
        }
      ],
      imgList: []
    }
  },
  async created() {
    await this.getSearch()
    await this.getData()
  },
  methods: {
    async getSearch() {
      let { data } = await this.axios('/adminapi/Members/meal_type')
      if (data.code) {
        this.searchFields = [
          { span: 3, sm: 12, md: 12, xs: 12, label: '搜索', prop: 'search', type: 'text' },
          // { span: 3, sm: 12, md: 12, xs: 12, label: '手机号码', prop: 'mobile', type: 'number' },
          { span: 3, sm: 12, md: 12, xs: 12, label: '套餐版本', prop: 'type', type: 'select', options: data.data, config: { value: 'id' } },
          { span: 10, sm: 12, md: 12, xs: 12, label: '搜索', type: 'button', click: this.getData }
        ]
      }
    },
    async getData() {
      let { data } = await this.axios('/adminapi/members/list', {
        data: { ...this.searchData, ...this.page }
      })
      if (data.code) {
        this.tableData = data.data
        this.page.total = data.count
      }
    },
    async views(item) {
      let { data } = await this.axios('/adminapi/Members/see_signature', {
        data: { uid: item.id }
      })
      if (data.code) {
        this.imgList = data.data
        this.show = true
      }
    },
    async reset(item) {
      this.$confirm('重置后不可恢复，是否继续？', '警告！', { type: 'warning' }).then(async () => {
        await this.axios('/adminapi/Members/reset_signature', {
          data: { uid: item.id }
        })
        this.getData()
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>