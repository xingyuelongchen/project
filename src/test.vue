<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-16
-->
<template>
  <div>
    <mixTable />
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      formData: {},
      formFields: [
        {
          label: "状态",
          prop: "status",
          type: "cascader",
          options: [
            {
              label: "售前客服",
              value: "售前客服",
              id: 1,
              children: [
                { label: "考虑中", value: "考虑中" },
                { label: "无意向", value: "无意向" }
              ]
            },
            {
              label: "顾问客服",
              value: "顾问客服",
              id: 1,
              children: [
                { label: "无意向", value: "无意向", id: 1 },
                { label: "预付款", value: "预付款", id: 2 }
              ]
            },
            {
              label: "售后客服",
              value: "售后客服",
              id: 1,
              children: [
                { label: "投诉受理", value: "学习中", id: 1 },
                { label: "投诉处理中", value: "学习中", id: 2 },
                {
                  label: "投诉完结",
                  value: "投诉完结",
                  children: [
                    { label: "退款并结束服务", value: "退款并结束服务" },
                    { label: "撤销投诉，继续学习", value: "撤销投诉继续学习" },
                    { label: "其它情况", value: "其他情况" }
                  ]
                }
              ]
            }
          ]
        },

        {
          label: "备注",
          prop: "beizhu",
          type: "textarea"
        },
        {
          label: "确定",
          type: "button",
          click: this.onSave
        }
      ]
    };
  },
  methods: {
    onSave() {
      console.log(0);
    }
  }
};
</script>
<style lang='less' scoped>
</style>