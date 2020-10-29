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
    <el-dialog :visible.sync="addMemberShow" title="添加会员" width="580px" :fullscreen="false">
      <mixForm v-model="addMemberData" :fields="addMemberFields" />
    </el-dialog>
    <el-dialog :visible.sync="changeVersionShow" title="修改套餐版本" width="580px" :fullscreen="false">
      <mixForm v-model="addMemberData" :fields="changeVersionFields" />
    </el-dialog>
    <el-dialog :visible.sync="roleShow" title="会员授权" width="580px" :fullscreen="false">
      <mixForm v-model="roleData" :fields="roleFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Marketingmember',
  data() {
    return {
      show: false,
      addMemberShow: false,
      changeVersionShow: false,
      roleShow: false,
      page: { total: 0, limit: 18, page: 1, event: this.getData },
      roleData: {},
      roleFields: [],
      searchData: {},
      searchFields: [],
      addMemberData: {},
      addMemberFields: [],
      changeVersionFields: [],
      tableData: [],
      tableFields: [],
      imgList: []
    };
  },
  async created() {
    await this.getSearch();
    await this.getData();
  },
  methods: {
    async getSearch() {
      let { data } = await this.axios('/adminapi/Members/meal_type');
      if (data.code) {
        this.searchFields = [
          { span: 3, sm: 12, md: 12, xs: 12, label: '搜索', prop: 'search', type: 'text' },
          // { span: 3, sm: 12, md: 12, xs: 12, label: '手机号码', prop: 'mobile', type: 'number' },
          { span: 3, sm: 12, md: 12, xs: 12, label: '套餐版本', prop: 'type', type: 'select', options: data.data, config: { value: 'id' } },
          {
            span: 10,
            sm: 12,
            md: 12,
            xs: 12,
            type: 'button',
            options: [
              { label: '搜索', click: this.getData },
              { label: '添加会员', click: this.addMember, style: 'danger', role: 310 }
            ]
          }
        ];
        this.addMemberFields = [
          { label: '手机号', prop: 'mobile', type: 'number' },
          { label: '套餐版本', type: 'select', prop: 'meal_id', options: data.data, config: { value: 'id' } },
          { label: '姓名', prop: 'name', type: 'text' },
          {
            label: '性别',
            prop: 'sex',
            type: 'radio',
            options: [
              { label: '男', value: '0' },
              { label: '女', value: 1 }
            ]
          },
          { label: '确定添加', type: 'button', click: this.setMember }
        ];
        this.changeVersionFields = [
          { label: '手机号', prop: 'mobile', type: 'number' },
          { label: '套餐版本', type: 'select', prop: 'meal_id', options: data.data, config: { value: 'id' } },
          { label: '姓名', prop: 'name', type: 'text' },
          {
            label: '性别',
            prop: 'sex',
            type: 'radio',
            options: [
              { label: '男', value: '0' },
              { label: '女', value: 1 }
            ]
          },
          { label: '确定修改', type: 'button', click: this.setChangeVersion }
        ];
        this.tableFields = [
          // { label: 'ID', prop: 'id' },
          { label: '头像', prop: 'pic', type: 'image' },
          { label: '姓名', prop: 'name' },
          {
            label: '性别',
            prop: 'sex',
            type: 'tag',
            options: [
              { label: '男', value: 0 },
              { label: '女', value: 1 },
              { label: '--', value: null }
            ]
          },
          { label: '手机号', prop: 'mobile' },
          { label: '地区', prop: 'ip_address' },
          { label: '签名图', prop: 'sign', type: 'image' },
          { label: '导师', prop: 'tutor_id' },
          { label: '版本', prop: 'meal' },
          { label: '版本权限', prop: 'gorup' },
          { label: '状态', prop: 'status', type: 'switch' },
          {
            label: '操作',
            type: 'manage',
            width: 100,
            options: [
              { label: '查看合同', click: this.views, style: 'primary', role: 305, isShow: { prop: 'sign', type: '!=', value: null } },
              { label: '重置合同', click: this.reset, style: 'danger', role: 306, isShow: { prop: 'sign', type: '!=', value: null } },
              { label: '下载合同', click: this.download, style: 'danger', role: 309, isShow: { prop: 'sign', type: '!=', value: null } },
              { label: '修改套餐', click: this.changeVersion, style: 'danger', role: 309 },
              { label: '会员授权', click: this.setRole, style: 'danger', role: 309 },
              { label: '密码重置', click: this.resetPw, style: 'danger', role: 308 },
              { label: '删除会员', click: this.del, style: 'danger', role: 308 }
            ]
          }
        ];
      }
    },
    async getData() {
      let { data } = await this.axios('/adminapi/members/list', {
        data: { ...this.searchData, ...this.page }
      });
      if (data.code) {
        this.tableData = data.data;
        this.page.total = data.count;
      }
    },
    async views(item) {
      let { data } = await this.axios('/adminapi/Members/see_signature', {
        data: { uid: item.id }
      });
      if (data.code) {
        this.imgList = data.data;
        this.show = true;
      }
    },
    async reset(item) {
      this.$confirm('重置后不可恢复，是否继续？', '警告！', { type: 'warning' }).then(async () => {
        await this.axios('/adminapi/Members/reset_signature', {
          data: { uid: item.id }
        });
        this.getData();
      });
    },
    async resetPw(item) {
      this.$confirm('此操作不可恢复，是否继续？', '警告！', { type: 'warning' }).then(async () => {
        await this.axios('/adminapi/Members/resetPassword', { data: { uid: item.id } });
      });
      console.log(0);
    },
    async download(item) {
      let { data } = await this.axios('/adminapi/Members/pack_download', {
        data: { uid: item.id }
      });
      if (data.code) {
        const link = document.createElement('a');
        link.href = data.data;
        let a = window.open(data.data, '_blank');
        setTimeout(a.close, 100);
      }
    },
    addMember() {
      this.addMemberData = { sex: '0' };
      this.addMemberShow = true;
    },
    async setMember() {
      await this.axios('/adminapi/Members/add', {
        data: this.addMemberData
      });
      this.getData();
      this.addMemberShow = false;
    },
    async del(item) {
      this.$confirm('删除后不可恢复，是否继续？', '警告！', { type: 'warning' }).then(async () => {
        await this.axios('/adminapi/Members/del', {
          data: { id: item.id }
        });
        this.getData();
      });
    },
    changeVersion(item) {
      this.addMemberData = item;
      this.changeVersionShow = true;
    },
    async setChangeVersion() {
      this.$confirm('正在修改版本，此操作不可恢复，是否继续？', '警告！', { type: 'warning' }).then(async () => {
        await this.axios('/adminapi/Members/edit', {
          data: this.addMemberData
        });
        this.getData();
        this.changeVersionShow = false;
      });
    },
    async setRole(item) {
      this.roleData.id = item.id;
      this.roleshow = true;
      let { data } = await this.axios('/adminapi/members/v_group_list');
      if (data.code) {
        this.roleFields = [
          { label: '会员授权', type: 'select', prop: 'role', options: data.data, config: { label: 'title', value: 'id' } },
          { label: '确定授权', type: 'button', click: this.setGroup }
        ];
        this.roleShow = true;
      }
    },
    async setGroup() {
      await this.axios('/adminapi/members/group', {
        data: this.roleData
      });
      this.getData();
      this.roleShow = false;
    }
  }
};
</script>