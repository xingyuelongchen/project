<!--
Template Name: 官网配置
Create author: qinglong
Create Time  : 2020-09-23
-->
<template>
  <div class="content-cols">
    <el-card header="基本信息">
      <el-scrollbar>
        <mixForm v-model="formData" :fields="formFields" />
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "WenSetting",
  data() {
    return {
      formData: {},
      formData_a: {},
      formFields_a: [],
      formFields: [
        {
          span: 8,
          wrap: true,
          label: "网站名称",
          prop: "site_name",
          type: "text"
        },
        {
          span: 8,
          wrap: true,
          label: "LOGO",
          prop: "site_logo",
          type: "selectimage"
        },
        {
          span: 8,
          wrap: true,
          label: "Favico.ico",
          prop: "site_ico",
          type: "selectimage"
        },
        {
          span: 8,
          wrap: true,
          label: "keywords",
          prop: "site_keywords",
          type: "text"
        },
        {
          span: 8,
          wrap: true,
          label: "description",
          prop: "site_description",
          type: "textarea"
        },
        { span: 8, wrap: true, label: "备案信息", prop: "site_icp", type: "text" },
        {
          span: 8,
          wrap: true,
          label: "公司地址",
          prop: "site_address",
          type: "text"
        },
        {
          span: 8,
          wrap: true,
          label: "联系电话",
          prop: "site_mobile",
          type: "text"
        },
        {
          span: 8,
          wrap: true,
          label: "联系邮箱",
          prop: "site_email",
          type: "text"
        },
        {
          span: 8,
          wrap: true,
          label: "移动端统计",
          prop: "site_statis_shou",
          type: "textarea"
        },
        {
          span: 8,
          wrap: true,
          label: "PC端统计",
          prop: "site_statis",
          type: "textarea"
        },
        {
          span: 8,
          wrap: true,
          label: "提交修改",
          type: "button",
          click: this.save
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data } = await this.axios("/adminapi/Configure/info");
      if (data.code) {
        this.formData = data.data;
      }
    },
    async save() {
      await this.axios("/adminapi/Configure/edit", {
        data: this.formData
      });
    }
  }
};
</script>
<style lang='less' scoped>
.el-card {
  margin-bottom: 40px;
}
</style>