<!--
Template Name: coupon
Create author: qinglong
Create Time  : 2020-10-19
-->
<template>
  <div class="content content-left-right">
    <el-card header="添加礼包">
      <el-scrollbar>
        <mixForm v-model="formData" :fields="formFields" />
      </el-scrollbar>
    </el-card>
    <el-card header="礼包列表">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <mixTable v-model="tableData" :fields="tableFiels" />
      <mixPage v-model="page" />
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Coupon',
  data() {
    return {
      page: { page: 1, limit: 10 },
      searchData: {},
      searchFields: [
        { span: 5, label: '搜索', prop: 'search', type: 'text' },
        { span: 12, label: '搜索', type: 'button', click: this.getData }
      ],
      tableData: [],
      tableFiels: [
        { label: '推广图', prop: 'pic', type: 'image' },
        { label: '礼包名称', prop: 'label' },
        { label: '优惠金额', prop: 'amount' },
        { label: '礼包总数', prop: 'total' },
        { label: '剩余数量', prop: 'surplus' },
        { label: '开始日期', prop: 'dateStart' },
        { label: '结束日期', prop: 'dateEnd' },
        { label: '操作', width: 110, type: 'manage', options: [{ label: '提前开始' }, { label: '提前结束' }, { label: '修改礼包' }, { label: '删除礼包' }] }
      ],
      formData: {},
      formFields: [
        { labelWidth: 70, label: '礼包名称', prop: 'label', type: 'text' },
        { labelWidth: 70, label: '优惠金额', prop: 'amount', type: 'number' },
        { labelWidth: 70, label: '礼包数量', prop: 'total', type: 'number' },
        { labelWidth: 70, label: '开始日期', prop: 'dateStart', type: 'date' },
        { labelWidth: 70, label: '结束日期', prop: 'dateEnd', type: 'date' },
        { labelWidth: 70, label: '封面图', prop: 'pic', type: 'image' },
        { labelWidth: 70, label: '生成礼包', type: 'button' }
      ]
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data } = await this.axios('/adminapi/Package/list', {
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