<!--
Template Name: goodnews
Create author: qinglong
Create Time  : 2020-10-19
-->
<template>
  <div class="content content-left-right">
    <el-card header="战报资料">
      <mixForm v-model="formData" :fields="formFields" />
    </el-card>
    <el-card header="战报预览" :key="key">
      <div class="image" v-loading="loading">
        <el-image :src="formData.pic+ '?s=' + Math.random()" :preview-src-list="[formData.pic+ '?s=' + Math.random()]" fit="contain" @load="()=>loading=false" />
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Goodnews',
  data() {
    return {
      key: '0',
      loading: false,
      page: { limit: 10, page: 0 },
      searchData: {},
      searchFields: [
        { span: 3, label: '搜索', prop: 'search', type: 'text' },
        { span: 12, type: 'button', label: '搜索', click: this.getData }
      ],
      formData: [],
      formFields: [
        { labelWidth: 60, type: 'text', label: '姓名', prop: 'name' },
        { labelWidth: 60, type: 'text', label: '部门', prop: 'bumen' },
        { labelWidth: 60, type: 'text', label: '小组', prop: 'dui' },
        { labelWidth: 60, type: 'number', label: '金额', prop: 'money' },
        { labelWidth: 60, type: 'switch', label: '状态', prop: 'status' },
        { labelWidth: 60, type: 'button', label: '确定', click: this.formEdit }
      ]
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async formEdit() {
      this.loading = true;
      let { data } = await this.axios('/adminapi/Report/edit', { data: this.formData });
      if (data.code) {
        this.$set(this.formData, 'pic', data.data);
      }
    },
    async getData() {
      this.loading = true;
      let { data } = await this.axios('/adminapi/Report/list', {
        data: { ...this.page, ...this.searchData }
      });
      if (data.code) {
        this.formData = data.data[0] || {};
      }
    }
  }
};
</script>
<style lang='less' scoped>
.image {
  width: 360px;
  height: 553px;
  margin: auto;
}
</style>