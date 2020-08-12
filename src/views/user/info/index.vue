<!--
Template Name: 个人中心
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <div class="content-wrap">
    <div style="height:100%;display:grid;grid-gap:20px;grid-template-columns:500px 400px">
      <el-card header="头像修改">

      </el-card>
      <el-card header="个人">
        <mixForm v-model="formData" :fields="formFields" />
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Userinfo",
  data() {
    return {
      formFields: [
        { labelWidth: 90, label: "手机号", type: "number", prop: "mobile" },
        { labelWidth: 90, label: "身份证号码", type: "text", prop: "idCard" },
        { labelWidth: 90, label: "生日", type: "date", prop: "birthday" },
        {
          labelWidth: 90,
          label: "情感状态",
          type: "select",
          prop: "",
          options: [
            { label: "已婚", value: "已婚" },
            { label: "单身", value: "单身" },
            { label: "热恋中", value: "热恋中" }
          ]
        }
      ],
      formData: {}
    };
  }
};
</script>
<style lang='less' scoped>
.content-wrap {
  margin: 0 20px;
  padding: 0;
}
</style>