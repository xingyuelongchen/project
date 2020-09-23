<!--
Template Name: 官网配置
Create author: qinglong
Create Time  : 2020-09-23
-->
<template>
  <div class="content-clos">
    <el-card header="基本信息">
      <mixForm v-model="formData" :fields="formFields" />
    </el-card>
  </div>
</template>
<script>
export default {
  name: "WenSetting",
  data() {
    return {
      formData: {},
      formFields: [
        {
          span: 12,
          wrap: true,
          label: "网站名称",
          prop: "title",
          type: "text"
        },
        { span: 12, wrap: true, label: "LOGO", prop: "logo", type: "image" },
        {
          span: 12,
          wrap: true,
          label: "keyword",
          prop: "keyword",
          type: "text"
        },
        {
          span: 12,
          wrap: true,
          label: "description",
          prop: "description",
          type: "textarea"
        },
        { span: 12, wrap: true, label: "备案信息", prop: "icp", type: "text" },
        {
          span: 12,
          wrap: true,
          label: "公司地址",
          prop: "address",
          type: "text"
        },
        {
          span: 12,
          wrap: true,
          label: "联系电话",
          prop: "mobile",
          type: "text"
        },
        {
          span: 12,
          wrap: true,
          label: "联系邮箱",
          prop: "email",
          type: "text"
        },
        {
          span: 12,
          wrap: true,
          label: "统计代码",
          prop: "statistics",
          type: "textarea"
        },
        {
          span: 12,
          wrap: true,
          label: "提交修改",
          type: "button",
          click: this.save
        }
      ]
    };
  },
  methods: {
    async getData() {
      let { data } = await this.axios("/adminapi/web/info");
      if (data.code) {
        this.formData = data.data;
      }
    },
    async save() {
      await this.axios("/adminapi/web/save", {
        data: this.formData
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>