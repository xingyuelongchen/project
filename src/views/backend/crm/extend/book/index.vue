<!--
Template Name: book
Create author: qinglong
Create Time  : 2020-10-19
-->
<template>
  <div class="content-cols">
    <mixSearch v-model="searchData" :fields="searchFields" />
    <mixTable v-model="tableData" :fields="tableFields" />
    <mixPage v-model="page" />
    <el-dialog :visible.sync="show" title="添加学员" width="500px">
      <mixForm v-model="formData" :fields="formFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Book',
  data() {
    return {
      page: { page: 1, limit: 10, total: 0 },
      searchData: {},
      tableData: [],
      formData: {},
      show: false,
      searchFields: [
        { span: 3, label: '搜索', prop: 'search', type: 'text' },
        {
          span: 12,
          type: 'button',
          options: [
            { label: '搜索', click: this.getData },
            { label: '添加', click: this.add, style: 'danger' }
          ]
        }
      ],
      tableFields: [
        { label: '图片', prop: 'pic', type: 'image' },
        { type: 'input', label: '名字', prop: 'title' },
        { type: 'input', label: '版本', prop: 'name' },
        { label: '状态', prop: 'status' },
        { label: '操作', type: 'button', options: [{ label: '修改信息', click: this.addChange, style: 'primary' }] }
      ],
      formFields: [
        { labelWidth: 60, label: '姓名', prop: 'title', type: 'text' },
        { labelWidth: 60, label: '版本', prop: 'name', type: 'text' },
        { labelWidth: 60, type: 'button', label: '确定', click: this.submit }
      ]
    };
  },
  async created() {
    await this.getData();
  },
  methods: {
    add() {
      this.url = '/adminapi/Generate/add';
      this.formData = {};
      this.show = true;
    },
    addChange(item) {
      this.url = '/adminapi/Generate/edit';
      this.formData = item;
      this.show = true;
    },
    async submit() {
      await this.axios(this.url, {
        data: this.formData
      });
      this.getData();
      this.show = false;
    },
    async getData() {
      let { data } = await this.axios('/adminapi/Generate/list', {
        data: { ...this.page, ...this.searchData }
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>