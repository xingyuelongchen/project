<!--
Template Name: 员工管理
Create author: qinglong
Create Time  : 2020-07-26
-->
<template>
  <div class="content">
    <div class="content-cols">
      <mixSearch v-model="search" :fields="searchFields" />
      <mixTable v-model="tableData" :fields="tableFields" />
      <mixPage v-model="page" />
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogShow" title="编辑">
      <mixForm v-model="editForm" :fields="editFormField" />
      <div slot="footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Adminmenber',
  data() {
    return {
      tableData: [],
      tableFields: [],
      search: {},
      searchFields: [
        { type: 'text', label: '搜索', prop: 'search', span: 3 },
        {
          type: 'select',
          label: '搜索',
          prop: 'status',
          span: 3,
          options: [
            {
              label: '在职',
              value: 1
            },
            {
              label: '离职',
              value: 2
            },
            {
              label: '未审核',
              value: '0'
            }
          ]
        },
        {
          type: 'selectTree',
          label: '部门选择',
          prop: 'dept',
          span: 3,
          options: [
            {
              label: '在职',
              id: 1,
              value: 1,
              children: [
                { label: '3部', value: 1, id: 2 },
                { label: '2部', value: 2, id: 3 },
                {
                  label: '3部',
                  value: 3,
                  id: 4,
                  children: [
                    { label: '1组', value: 1, id: 5 },
                    { label: '2组', value: 2, id: 6 }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'button',
          prop: 'value',
          span: 3,
          label: '搜索',
          style: 'primary',
          click: this.getData
        }
      ],
      page: {
        page: 1,
        limit: 10,
        total: 0,
        event: this.getData
      },
      dialogShow: false,
      editForm: { 'nickname[a]': 0 },
      editFormField: [
        // { label: "姓名", prop: "nickname", type: "text" },
        { label: '姓名', prop: 'nickname[a]', type: 'text' }
      ]
    }
  },
  async created() {
    await this.getData()
    await this.getTableData()
  },
  methods: {
    async getTableData() {
      let { data } = await this.axios('/adminapi/Publics/table_th', {
        data: { table_id: 2 }
      })
      if (data.code) {
        this.tableFields = data.data.concat([
          {
            label: '操作',
            type: 'manage',
            fixed: 'right',
            width: 120,
            options: [
              {
                label: '编辑',
                style: 'primary',
                click: this.tableEdit,
                role: 96
              },
              {
                label: '重置密码',
                style: 'danger',
                isShow: { type: '==', val: '正常', prop: 'status' },
                click: this.reset,
                role: 100
              },
              {
                label: '审核',
                style: 'warning',
                isShow: { type: '==', val: '未审核', prop: 'status' },
                click: this.adopt,
                role: 97
              },
              {
                label: '离职',
                style: 'info',
                isShow: { type: '==', val: '正常', prop: 'status' },
                click: this.quit,
                role: 98
              },
              {
                label: '恢复',
                style: 'success',
                isShow: { type: '==', val: '离职', prop: 'status' },
                click: this.recovery,
                role: 99
              }
            ]
          }
        ])
      }
    },
    async tableEdit(item) {
      let { data } = await this.axios('/adminapi/Publics/TableFormEdit', {
        data: {
          table_id: 2,
          type: 'edit'
        }
      })
      if (data.code) {
        this.editFormField = data.data.map(e => {
          return {
            span: 12,
            labelWidth: 80,
            ...e
          }
        })
        let obj = {}
        data.data.forEach(e => {
          obj[e.prop] = item[e.prop]
        })
        this.editForm = obj
        this.dialogShow = true
      }
    },
    async getData() {
      let page = JSON.parse(JSON.stringify(this.page))
      delete page.event
      let { data } = await this.axios('/adminapi/User/list', {
        params: Object.assign(page, this.search)
      })
      if (data.code) {
        this.tableData = data.data
        this.page.total = data.count
      }
    },
    async adopt(item) {
      await this.axios('/adminapi/User/adopt', {
        data: { id: item.id }
      })
      this.getData()
    },
    async quit(item) {
      await this.axios('/adminapi/User/quit', {
        data: { id: item.id }
      })
      this.getData()
    },
    async recovery(item) {
      await this.axios('/adminapi/User/recovery', {
        data: { id: item.id }
      })
      this.getData()
    },
    async save() {
      let { data } = await this.axios('/adminapi/User/edit', {
        data: this.editForm
      })
      if (data.code) {
        this.dialogShow = false
        this.getData()
      }
    },
    async reset(item) {
      let { data } = await this.axios('/adminapi/user/reset', {
        data: { id: item.id }
      })
      if (data.code) {
        this.$alert('密码重置成功，新密码是：' + data.data, {
          type: 'success',
          title: data.msg
        })
      }
    }
  }
}
</script> 