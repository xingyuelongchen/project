<!--
Template Name: thtor
Create author: qinglong
Create Time  : 2020-07-24
-->
<template>
  <step v-if="stepShow" v-model="stepShow" :item="step" />
  <div v-else class="content">
    <div class="content-cols">
      <mixSearch v-model="searchData" :fields="searchFields" />
      <mixTable v-model="tableData" :fields="tableFields" />
      <mixPage v-model="page" />
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="show" title="编辑">
      <mixForm v-model="editData" :fields="editFields" />
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="添加业绩" :visible.sync="qrcode" width="50%">
      <div style="max-height:500px;height:500px;overflow:hidden">
        <el-scrollbar>
          <mixForm v-model="qrocdeData" :fields="qrocdeFields" style="border:none;padding-right:20px" />
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOrder">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :visible.sync="jinduShow" title="客户状态" width="500px">
      <mixForm v-model="statusFormData" :fields="statusFormFields" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Tutorindex',
  components: { step: () => import('./step') },
  data() {
    return {
      show: false,
      stepShow: false,
      jinduShow: false,
      step: null,
      page: { page: 1, limit: 10, total: 0 },
      searchData: {},
      searchFields: [
        { label: '时间', type: 'datetimerange', span: 5.5, prop: 'date' },
        {
          label: '业绩类型',
          type: 'select',
          span: 3,
          prop: 'type',
          options: [
            { label: '新业绩', value: '新业绩' },
            { label: '补欠款', value: '补欠款' },
            { label: '升级', value: '升级' }
          ]
        },
        { label: '模糊搜索', type: 'text', span: 3, prop: 'search' },
        { label: '搜索', type: 'button', span: 3, click: this.getData }
      ],
      tableData: [],
      tableFields: [],
      editFields: [],
      editData: {},
      qrcode: false,
      qrocdeData: {},
      qrocdeFields: [],
      salesSearchData: {},
      statusFormFields: [],
      statusFormData: {}
    }
  },
  stepShow(a) {
    !a && this.getData()
  },
  async created() {
    await this.getData()
    await this.getTable()
  },
  methods: {
    async changeStep() {
      await this.axios('/adminapi/Service/label_add', {
        data: this.statusFormData
      })
      this.jinduShow = false
      this.getData()
    },
    async tableDialog(item) {
      // 客户状态进度修改
      let { data } = await this.axios('/adminapi/Service/customer_label', {
        data: { ...item, service_id: item.id }
      })
      if (data.code) {
        let options = data.data.label[0].children.filter(e => {
          if (!data.data.label_log) return false
          // console.log(e.progress, data.data.label_log.progress);
          return e.progress == data.data.label_log.progress
        })
        if (!options.length) options = data.data.label[0].children

        options = options[0]
        this.statusFormData = {
          service_id: item.id
        }

        this.statusFormFields = [
          {
            label: '当前进度：',
            prop: 'label',
            wrap: true,
            type: 'cascader',
            // readonly: true,
            options: data.data.label[0].children
          },
          {
            label: '备注',
            prop: 'remak',
            type: 'textarea',
            wrap: true
          },
          {
            label: '确定',
            type: 'button',
            style: 'primary',
            click: this.changeStep,
            wrap: true
          }
        ]
        this.jinduShow = true
      }
    },
    async getTable() {
      let { data } = await this.axios('/adminapi/Publics/table_th', {
        data: { table_id: 4 }
      })
      if (data.code) {
        let arr = data.data.concat([
          {
            label: '操作',
            fixed: 'right',
            type: 'manage',
            width: 100,
            options: [
              // { label: "编辑", click: this.edit },
              { label: '添加业绩', click: this.addOrder },
              {
                label: '查看状态',
                click: this.speed,
                isShow: { prop: 'type', type: '==', val: '新业绩' },
                role: 200
              },
              { label: '删除', click: this.del, role: 226 }
            ]
          }
        ])
        this.tableFields = arr.map(e => {
          if (e.prop == 'track_status') {
            e.change = this.tableChange
          }
          if (e.prop == 'label') {
            e.click = this.tableDialog
          }
          return e
        })
      }
    },
    async getData() {
      let { data } = await this.axios('/adminapi/Service/list', {
        data: Object.assign(this.page, this.searchData)
      })
      if (data.code) {
        this.tableData = data.data
        this.page.total = data.count
      }
    },
    async edit() {
      this.show = true
      let { data } = await this.axios('')
      if (data.code) {
        this.editData = data.data.concat([
          {
            label: '保存',
            type: 'button',
            style: 'primary',
            click: this.save
          }
        ])
      }
    },
    async tableChange(item) {
      await this.axios('/adminapi/Service/track_status', {
        data: item
      })
    },
    async save() {
      await this.axios('/adminapi/Service/edit', {
        data: this.editData
      })
      this.getData()
    },
    async del(item) {
      this.axios('/adminapi/Service/del', {
        data: item
      })
      this.getData()
    },
    speed(item) {
      this.step = {
        customer_id: item.customer_id,
        service_id: item.id,
        sale_id: item.sale_id,
        label_id: item.label_id
      }
      this.stepShow = true
    },
    async saveOrder() {
      // 添加业绩保存
      let form = {}
      for (let k of this.qrocdeFields) {
        form[k.prop] = this.qrocdeData[k.prop]
      }
      form.service_id = this.qrocdeData.id
      let { data } = await this.axios('/adminapi/Servicesale/add', {
        data: form
      })
      if (data.code) {
        this.getData()
        this.qrcode = false
      }
    },
    async addOrder(item) {
      // 添加业绩
      let { data } = await this.axios('/adminapi/Publics/TableFormEdit', {
        data: { type: 'add', table_id: 13 }
      })
      if (data.code) {
        let obj = JSON.parse(JSON.stringify(item))
        delete obj.remark
        this.qrocdeData = { ...obj, discount: 0 }
        this.qrocdeFields = data.data.map(e => {
          if (e.prop == 'type' && item.xin) {
            e.options.shift()
          }
          if (e.prop == 'is_timely' && item.xin) {
            e.type = 'hidden'
          }
          if (e.prop == 'is_goods' && item.xin) {
            e.type = 'hidden'
          }
          return e
        })
        this.qrcode = true
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>