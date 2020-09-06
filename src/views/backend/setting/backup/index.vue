<!--
Template Name: 数据备份
Create author: qinglong
Create Time  : 2020-09-01
-->
<template>
  <div class="content">
    <div class=" content content-left-right">
      <el-card>
        <div slot="header">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
          数据表
          <el-button style="padding:6px;float:right" type="primary" @click="add">添加新表</el-button>
        </div>
        <div class="left" :key="key">
          <el-scrollbar>
            <el-checkbox-group v-model="checkList">
              <template v-for="(item,index) in  list">
                <div class="item" user=card-active :key="index" @click="tab(item)" :class="{active:version.Name==item.Name}">
                  <el-checkbox :key="index" :label="item.Name">{{''}}</el-checkbox>
                  <span> {{item.Name}} </span>
                </div>
              </template>
            </el-checkbox-group>
          </el-scrollbar>
        </div>
      </el-card>
      <el-card>
        <div slot="header">
          <el-button style="padding:6px;" type="danger" @click="resetBackup">还原数据</el-button>
          <el-button style="padding:6px;" type="success" @click="backData">备份选中数据表</el-button>
          <el-button style="padding:6px;" type="info" @click="del(false)">删除选中数据表</el-button>
          <el-button style="padding:6px;" type="warning" @click="edit">修改数据表名称</el-button>
          <el-button style="padding:6px;" type="primary" @click="addAppid">添加新字段</el-button>
        </div>
        <div class="right">
          <mixTable v-model="tableData" :fields="tableFields" />
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="addShow" title="添加数据表" width="500px">
      <mixForm v-model="addData" :fields="addFields" />
    </el-dialog>
    <el-dialog :visible.sync="editShow" title="编辑数据表" width="500px">
      <mixForm v-model="editData" :fields="editFields" />
    </el-dialog>
    <el-dialog :visible.sync="addFieldShow" title="字段" width="500px">
      <mixForm v-model="addData" :fields="appFields" />
    </el-dialog>
    <el-dialog :visible.sync="resetBackupShow" title="备份数据" width="500px">
      <mixTable v-model="resetBackupData" :fields="resetBackupFields" />
    </el-dialog>
  </div>
</template>
<script>
const TYPE = [
  { label: "varchar", value: "varchar" },
  { label: "bigint", value: "bigint" },
  { label: "binary", value: "binary" },
  { label: "bit", value: "bit" },
  { label: "blob", value: "blob" },
  { label: "char", value: "char" },
  { label: "date", value: "date" },
  { label: "datetime", value: "datetime" },
  { label: "decimal", value: "decimal" },
  { label: "double", value: "double" },
  { label: "enum", value: "enum" },
  { label: "float", value: "float" },
  { label: "geometry", value: "geometry" },
  { label: "geometrycollection", value: "geometrycollection" },
  { label: "int", value: "int" },
  { label: "json", value: "json" },
  { label: "linestring", value: "linestring" },
  { label: "longblob", value: "longblob" },
  { label: "integer", value: "integer" },
  { label: "longtext", value: "longtext" },
  { label: "mediumblob", value: "mediumblob" },
  { label: "mediumint", value: "mediumint" },
  { label: "mediumtext", value: "mediumtext" },
  { label: "multilinestring", value: "multilinestring" },
  { label: "multipoint", value: "multipoint" },
  { label: "multipolygon", value: "multipolygon" },
  { label: "numeric", value: "numeric" },
  { label: "point", value: "point" },
  { label: "polygon", value: "polygon" },
  { label: "real", value: "real" },
  { label: "set", value: "set" },
  { label: "smallint", value: "smallint" },
  { label: "text", value: "text" },
  { label: "time", value: "time" },
  { label: "timestamp", value: "timestamp" },
  { label: "tinyblob", value: "tinyblob" },
  { label: "tinyint", value: "tinyint" },
  { label: "tinytext", value: "tinytext" },
  { label: "varbinary", value: "varbinary" },
  { label: "year", value: "year" }
];
const columnForm = [
  {
    labelWidth: 65,
    type: "text",
    label: "数据表",
    prop: "table_name",
    readonly: true
  },
  { labelWidth: 65, type: "text", label: "字段名", prop: "name" },
  {
    labelWidth: 65,
    type: "select",
    label: "类型",
    prop: "type",
    options: TYPE
  },
  {
    labelWidth: 65,
    type: "select",
    label: "主键",
    prop: "key",
    options: [
      { label: "自增主键", value: "MUL" },
      { label: "主键", value: "PRI" }
    ]
  },
  { labelWidth: 65, type: "number", label: "长度", prop: "length" },
  { labelWidth: 65, type: "switch", label: "可为空", prop: "not_null" },
  { labelWidth: 65, type: "text", label: "注释", prop: "comment" }
];
export default {
  name: "Settingback",
  data() {
    return {
      key: 0,
      version: {},
      addShow: false,
      editShow: false,
      addFieldShow: false,
      resetBackupShow: false,
      resetBackupData: [],
      resetBackupFields: [
        { label: "文件名", prop: "title" },
        { label: "备份时间", prop: "time" },
        {
          label: "操作",
          type: "button",
          options: [
            { label: "还原", style: "danger", click: this.resetHandler }
          ]
        }
      ],
      checkAll: false,
      list: [],
      checkList: [],
      appFields: [],
      tableData: [],
      tableFields: [
        { label: "名", prop: "column_name" },
        { label: "类型", prop: "data_type" },
        { label: "长度", prop: "character_maximum_length" },
        { label: "可为空", prop: "is_nullable" },
        { label: "键", prop: "column_key" },
        { label: "注释", prop: "column_comment" },
        {
          label: "操作",
          type: "button",
          options: [
            { label: "编辑", click: this.columnEdit, style: "warning" },
            { label: "删除", click: this.del, style: "danger" }
          ]
        }
      ],
      addData: {},
      addFields: [
        { labelWidth: 70, label: "表名称", prop: "table_name", type: "text" },
        { labelWidth: 70, type: "button", label: "添加", click: this.save }
      ],
      editData: {},
      editFields: [
        { labelWidth: 90, label: "数据表名称", prop: "Name", type: "text" },
        {
          labelWidth: 90,
          type: "button",
          options: [{ label: "提交", click: this.editSave }]
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async resetHandler(item) {
      let { data } = await this.axios("/adminapi/Database/dataRestoreHandle", {
        data: item
      });
      if (data.code) {
        console.log(data);
      }
    },
    async resetBackup() {
      let { data } = await this.axios("/adminapi/Database/dataRestores");
      if (data.code) {
        this.resetBackupShow = true;
        this.resetBackupData = data.data;
      }
    },
    handleCheckAllChange(val) {
      if (val) {
        this.checkList = this.list.map(e => e.Name);
        this.checkAll = true;
      } else {
        this.checkList = [];
        this.checkAll = false;
      }
    },
    async backData() {
      let loading = this.$loading({
        text: "备份中……"
      });
      await this.axios("/adminapi/Database/backups", {
        data: { table_name: this.checkList }
      });

      loading.close();
    },
    addAppid() {
      this.addFieldShow = true;
      this.addData = { table_name: this.version.Name };
      this.appFields = columnForm.concat([
        {
          labelWidth: 65,
          type: "button",
          label: "确定",
          click: this.field_add
        }
      ]);
    },
    add() {
      this.addShow = true;
    },
    async del() {
      this.$confirm("此操作将无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.axios("/adminapi/Database/del", {
          data: this.checkList
        });
        this.version = {};
        this.getData();
      });
    },
    tab(item) {
      // 切换数据表
      this.version = item;
      this.getTable();
    },
    edit() {
      // 修改数据表名
      this.editShow = true;
      this.editData = this.version;
    },
    columnEdit(item) {
      // 修改字段
      this.addFieldShow = true;
      let {
        column_name: name,
        data_type: type,
        character_maximum_length: length,
        is_nullable: not_null,
        column_key: key,
        column_comment: comment
      } = item;
      this.addData = {
        table_name: this.version.Name,
        comment,
        key,
        not_null,
        length,
        type,
        name
      };
      this.appFields = columnForm.concat([
        {
          labelWidth: 65,
          type: "button",
          label: "确定",
          click: this.field_edit
        }
      ]);
    },
    async editSave() {
      let { data } = await this.axios("/adminapi/Database/edit ", {
        data: this.editData
      });
      if (data.code) {
        this.getData();
        this.editShow = false;
      }
    },

    async getTable() {
      let { data } = await this.axios("/adminapi/Database/listPid", {
        data: { table_name: this.version.Name }
      });
      if (data.code) {
        this.tableData = data.data;
        this.addFieldShow = false;
      }
    },
    async getData() {
      let { data } = await this.axios("/adminapi/Database/detst ");
      if (data.code) {
        this.list = data.data;
        if (!this.version.id) {
          this.version = data.data[0];
          this.tab(this.version);
        }
        this.key = Math.random();
        this.editData = {};
      }
    },
    async save() {
      let { data } = await this.axios("/adminapi/Database/add", {
        data: this.addData
      });
      if (data.code) {
        this.addShow = false;
        this.addData = { table_name: 0 };
        this.getData();
      }
    },
    async field_add() {
      let { data } = await this.axios("/adminapi/Database/field_add", {
        data: this.addData
      });
      if (data.code) {
        this.addShow = false;
        this.getData();
      }
    },
    async field_edit() {
      let { data } = await this.axios("/adminapi/Database/field_edit", {
        data: this.addData
      });
      if (data.code) {
        this.addShow = false;
        this.getData();
      }
    }
  }
};
</script>
<style lang='less' scoped>
.left {
  height: 100%;
  .item {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    flex: 1 1 auto;
  }
}
.right {
  height: 100%;
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      width: 250px;
      height: 300px;
      margin: 4px;
      padding: 4px;
      overflow: hidden;
      border: 1px solid #eee;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
      transition: all 0.2s;
      .icon {
        display: none;
        transition: all 0.2s;
      }
      &:hover .icon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        margin: auto;
        font-size: 22px;
        z-index: 999;
        transition: all 0.2s;
        padding: 5px;
        background: rgba(0, 0, 0, 0.5);
        i {
          color: #fff;
          font-size: 22px;
          padding: 5px;
          border-radius: 5px;
          &:hover {
            transition: all 0.2s;
            color: rgba(0, 0, 0, 1);
            cursor: pointer;
            background: rgba(255, 255, 255, 0.5);
          }
        }
      }
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>