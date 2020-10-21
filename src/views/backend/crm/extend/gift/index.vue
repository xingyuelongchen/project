<!--
Template Name: Gift
Create author: qinglong
Create Time  : 2020-10-19
-->
<template>
  <div class="content content-left-right">
    <el-card header="礼包资料">
      <mixForm v-model="formData" :fields="formFields" />
    </el-card>
    <el-card header="礼包预览" :key="key">
      <div class="image" v-loading="loading">
        <el-image :src="formData.pic" :preview-src-list="[formData.pic]" fit="contain" @load="()=>loading=false" />
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Gift',
  data() {
    return {
      key: '0',
      loading: false,
      page: { limit: 10, page: 0 },
      formData: [],
      formFields: [
        { labelWidth: 70, type: 'text', label: '送出数量', prop: 'send' },
        { labelWidth: 70, type: 'text', label: '剩余数量', prop: 'surplus' },
        { labelWidth: 70, type: 'button', label: '确定', click: this.formEdit }
      ]
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    async formEdit() {
      this.loading = true;
      let { data } = await this.axios('/adminapi/package/edit', { data: this.formData });
      if (data.code) {
        this.$set(this.formData, 'pic', data.data + '?s=' + Math.random());
      }
    },
    async getData() {
      this.loading = true;
      let { data } = await this.axios('/adminapi/package/list');
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