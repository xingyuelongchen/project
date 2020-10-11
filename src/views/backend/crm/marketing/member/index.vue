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
    <el-dialog :visible.sync="show" title="合同预览">
      <el-carousel height="150px">
        <el-carousel-item v-for="(item,index) in imgList" :key="index">
          <el-image :src="item" :preview-src-list="imgList"></el-image>
        </el-carousel-item>
      </el-carousel>
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
          type: 'manage',
          width: 100,
          options: [
            { label: '查看合同', click: this.views, style: 'primary' },
            { label: '重置合同', click: this.reset, style: 'danger' },
            { label: '密码重置', click: this.resetPw, style: 'danger' }
          ]
        }
      ],
      imgList: []
    }
  },
  created() {
    this.getSearch()
    this.getData()
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
    },
    async resetPw(item) {
      this.$confirm('此操作不可恢复，是否继续？', '警告！', { type: 'warning' }).then(async () => {
        await this.axios('/adminapi/Members/resetPassword', { data: { uid: item.id } })
      })
      console.log(0)
    }
  }
}
</script>
<style lang='less' scoped>
</style>