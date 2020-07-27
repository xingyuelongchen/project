<!--
Template Name: 表格
Create author: qinglong
Create Time  : 2020-03-28
-->
<template>
  <el-table
    ref="table"
    row-key="id"
    height="100%"
    max-height="100%"
    style="width:100%"
    tooltip-effect="dark"
    :header-row-style="{background:'#f9f9f9'}"
    :header-cell-style="{background:'none'}"
    :border="true"
    :fit="true"
    :data="fieldsData"
    :lazy="options.lazy|| false"
    :load="options.load || null"
    :tree-props="options.treeProps || {hasChildren:'children'}"
    @cell-click="cellClick"
    @cell-dblclick="cellDblClick"
    @selection-change="selectionChange"
  >
    <template v-for="(item,index ) in field">
      <template v-if="'expand'==item.type">
        <el-table-column
          :key="index+'key'"
          :type="item.type"
          :label="item.label"
          :fixed="item.fixed"
          :align="item.align||item.headAlign||'left'"
          :header-align="item.headAlign||'left'"
          :resizable="item.resizable"
        >
          <template slot-scope="props">
            <div class="demo-table-expand">
              <template v-for="(k,i) in fields">
                <div class="item" v-if="!!(k.prop && props.row[k.prop]) " :label="k.label" :key="i">
                  <span class="label">{{k.label}}</span>
                  <span>{{ props.row[k.prop] }}</span>
                </div>
              </template>
            </div>
          </template>
        </el-table-column>
      </template>
      <template v-else-if="['selection','index','expand'].includes(item.type)">
        <el-table-column
          :key="index+'key'"
          :type="item.type"
          :label="item.label"
          :fixed="item.fixed"
          :align="item.align||item.headAlign||'left'"
          :header-align="item.headAlign||'left'"
          :resizable="item.resizable"
        />
      </template>
      <template v-else-if="item.type && !['selection','index','expand'].includes(item.type)">
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :filters="item.filters"
          :sortable="!!item.sort"
          :fixed="item.fixed||false"
          :formatter="item.formatter"
          :class-name="item.className||''"
          :resizable="item.resizable || false"
          :header-align="item.headAlign||'left'"
          :align="item.align||item.headAlign||'left'"
          :width="item.width||item.minWidth ||'auto'"
          :show-overflow-tooltip="item.tootip || true"
          :reserve-selection="item.reserveSelection||false"
          :min-width="item.minWidth || item.type=='manage'?'178':'0'"
        >
          <template slot-scope="scope">
            <template v-if="item.type == 'tag'">
              <div v-if="item.options" class="box">
                <el-tag
                  effect="plain"
                  v-for="(k,i) in item.options"
                  :type="k.style"
                  :key="i"
                >{{k.label || k}}</el-tag>
              </div>
              <el-tag v-else>{{ scope.row[item.prop] || '空'}}</el-tag>
            </template>
            <template v-if="item.type == 'select'">
              <!-- {{typeof scope.row[item.prop]}} -->
              <el-select v-model="scope.row[item.prop]" @change="onInput(item,scope,'change')">
                <el-option v-for="(k,i) in item.options" :key="i" :label="k.label" :value="k.value"></el-option>
              </el-select>
            </template>
            <template v-if="item.type == 'dropdown'">
              <el-dropdown>
                <span>{{scope.row[item.prop]}}</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(k,i) in item.options"
                    :key="i"
                    @click.stop.native="dropDown(item,k,scope)"
                  >{{k.label}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template v-if="item.type == 'tagdown'">
              <el-dropdown>
                <el-tag
                  class="hover"
                  effect="plain"
                  :type="toogle(item,scope.row[item.prop])"
                >{{ getTagDownLabel(item,scope) }}</el-tag>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(k,i) in item.options"
                    :key="i"
                    @click.self.stop.native="dropDown(item,k,scope)"
                  >{{k.label}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template v-if="item.type == 'switch'">
              <el-switch
                v-model="scope.row[item.prop]"
                @change="onInput(item,scope,'change',$event)"
                :disabled="item.readonly"
              />
            </template>
            <template v-if="item.type == 'cascader'">
              <el-cascader
                v-model="scope.row[item.prop]"
                :options="item.config || {}"
                @change="onInput(item,scope,'change',$event)"
              />
            </template>
            <template v-if="item.type == 'input'">
              <div class="input" :key="showKey+index">
                <el-input
                  readonly
                  v-if="!item['readonly'+scope.$index]"
                  :value="scope.row[item.prop]"
                  @focus="onInput(item,scope)"
                ></el-input>
                <el-input
                  v-else
                  v-model="scope.row[item.prop]"
                  @change="onInput(item,scope,'change')"
                  @blur="onInput(item,scope,'blur')"
                ></el-input>
              </div>
            </template>
            <template v-if="item.type == 'manage'">
              <div class="box">
                <template v-for="(k,i) in item.options">
                  <template v-if="k.type == 'tagdown'">
                    <el-dropdown :key="i">
                      <el-tag
                        class="hover"
                        effect="plain"
                        :type="toogle(k,scope.row[item.prop])"
                      >{{ getTagDownLabel(k,scope) }}</el-tag>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          v-for="(j,t) in k.options"
                          :key="t"
                          @click.self.stop.native="dropDown(k,j,scope)"
                        >{{j.label}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                  <el-button
                    v-else
                    v-show="isShow(k,item,scope)"
                    :underline="false"
                    :key="i"
                    :type="k.style || 'default'"
                    size="mini"
                    @click="click(k.click,scope.row,scope.column)"
                  >{{k.label}}</el-button>
                </template>
              </div>
            </template>
            <template v-if="item.type == 'icon'">
              <i :class="scope.row[item.prop]"></i>
            </template>
            <template v-if="item.type == 'plan'">
              <el-progress
                :percentage="scope.row[item.prop]"
                text-inside
                type="line"
                :status="progressStatus(scope.row[item.prop])"
                :stroke-width="15"
              ></el-progress>
            </template>
            <template v-if="item.type == 'image'">
              <template v-if="scope.row[item.prop] && scope.row[item.prop].length">
                <el-image v-for="(k,i) in scope.row[item.prop]" :key="i" :src="k" fit="cover" />
              </template>
              <span v-else>无</span>
            </template>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :sortable="!!item.sort"
          :fixed="item.fixed||false"
          :formatter="item.formatter"
          :width="item.width||'auto'"
          :align="item.align||item.headAlign||'left'"
          :class-name="item.className||''"
          :min-width="item.minWidth || 100"
          :resizable="item.resizable || false"
          :header-align="item.headAlign||'left'"
          :show-overflow-tooltip="item.tootip || true"
          :reserve-selection="item.reserveSelection||false"
        ></el-table-column>
      </template>
    </template>
  </el-table>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "MixTable",
  model: {
    prop: "fieldsData"
  },
  props: {
    // 表头字段
    fields: {
      type: Array,
      // required: true,
      default: () => [
        {
          label: "标签",
          type: "tag",
          prop: "id"
        },
        {
          label: "input",
          type: "input",
          prop: "input"
        },
        {
          label: "操作",
          type: "manage",
          fixed: "right",
          options: [
            {
              label: "删除",
              click() {
                console.log("删除");
              }
            },
            {
              label: "修改",
              click() {
                console.log("修改");
              }
            },
            {
              label: "添加",
              click() {
                console.log("添加");
              }
            }
          ]
        },
        {
          label: "开关",
          type: "switch",
          prop: "switch",
          align: "center"
        },
        {
          label: "dropDown",
          prop: "dropdown",
          type: "dropdown",
          options: [{ label: "下拉a", value: "下拉a" }]
        },
        {
          label: "tagdown",
          prop: "tagdown",
          type: "tagdown",
          options: [{ label: "下拉a", value: "下拉a" }]
        },
        {
          label: "选择器",
          type: "select",
          prop: "select",
          options: [
            { label: "a", value: "a" },
            { label: "b", value: "b" }
          ]
        },
        {
          label: "表头名称",
          prop: "title",
          width: "auto",
          sort() {},
          click() {
            console.log("单击事件");
          }
          // dblClick() {
          //   // 单击事件和双击事件只能出现一个
          //   console.log("双击事件");
          // }
        }
      ]
    },
    // 表格数据
    fieldsData: {
      type: Array,
      // required: true,
      default: () => [
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 20,
          title: "首页",
          path: "/",
          select: "a",
          dropdown: "下拉选择",
          switch: false,
          input: "readonly",
          tagdown: "tagdown"
        },
        {
          id: 21,
          title: "页",
          path: "/a",
          select: "b",
          dropdown: "下拉",
          switch: false
        }
      ]
    },
    // 表格配置
    options: {
      type: Object,
      default() {
        return {
          lazy: false,
          load: null
        };
      }
    }
  },
  data() {
    return {
      showKey: "key",
      field: []
    };
  },
  watch: {
    fields() {
      this.init();
    },
    fieldsData() {
      this.toggleRowSelection();
    }
  },
  created() {
    this.init();
  },

  methods: {
    async outTab() {
      // 导出表格
      let bool = await this.$confirm("是否导出当前数据到文件", "提示！", {
        confirmButtonText: "确定",
        cancalButtonText: "取消",
        type: "warning"
      }).catch();
      if (!bool) return;
      let fix = this.$refs.table.$el.querySelector(".el-table__fixed");
      let wb;
      if (fix) {
        wb = XLSX.utils.table_to_book(this.$refs.table.$el.removeChild(fix));
        this.$refs.table.$el.appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(this.$refs.table.$el);
      }
      /* get binary string as output */
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });

      try {
        let fileName =
          this.fnFormatDate(new Date(), "YYYY_MM_DD") +
          Math.floor(Math.random() * 100);
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream"
          }),
          `${fileName}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    progressStatus(item) {
      if (item <= 0) return "exception";
      if (70 >= item) return "warning";
      if (item > 70) return "success";

      return "init";
    },
    isShow(k, item, scope) {
      // 按钮是否显示
      if (k.isShow) {
        return scope.row[k.isShow];
      } else {
        return true;
      }
    },
    getTagDownLabel(item, scope) {
      // 标签内容
      try {
        let arr = item.options.filter(e => {
          return scope.row[item.prop] == e.value;
        });
        return arr && arr.length && arr[0].label;
      } catch (error) {
        return scope.row[item.prop];
      }
    },
    toggleRowSelection() {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.fieldsData.filter(e => {
          if (e.checked) this.$refs.table.toggleRowSelection(e);
        });
      }, 50);
    },
    onInput(item, scope, type, event) {
      if (type == "change" && item["change"]) {
        this.click(item[type], scope.row, scope, event);
      }
      this.field = this.field.map(e => {
        if (e.prop == item.prop) {
          e["readonly" + scope.$index] = !type;
          this.showKey = Math.random();
        }
        return e;
      });
    },
    toogle(item, value) {
      if (item.options) {
        try {
          let style = item.options.filter(e => e.value == value)[0];
          return style.style || style.value;
        } catch (error) {
          return null;
        }
      }
    },
    init() {
      this.field = this.fields.map(e => e);
    },
    // 复选框状态改变时触发
    selectionChange(selection) {
      this.$emit("select", selection);
    },

    // 点击单元格
    cellClick(row, column, cell, event) {
      let data = this.field.filter(e => e.prop == column.property);
      data = data.length && data[0];
      if (!data.click || data.dblClick) return;
      this.click(data["click"], row, column, cell, event, data);
    },
    // 双击单元格
    cellDblClick(row, column, cell, event) {
      let data = this.field.filter(e => e.prop == column.property);
      data = data.length && data[0];
      if (!data.dblClick) return;
      this.click(data["dblClick"], column, cell, event, row, data);
    },
    click(type, row, column, cell, event) {
      if (typeof type == "function") {
        type(row, column, cell, event, type);
      }
      if (typeof this.$parent[type] == "function") {
        this.$parent[type](row, column, cell, event, type);
      }
    },
    // 下拉选择
    dropDown(item, k, scope) {
      scope.row[item.prop] = k.value || k.label;
      let click = item["change"];
      if (!click) return;
      if (typeof click == "function") {
        click(scope.row, scope.column, scope);
        return;
      }
      if (typeof this.$parent[click] == "function") {
        this.$parent[click](scope.row, scope.column, scope);
        return;
      }
    }
  },

  filters: {
    getTagDownLabel(val, item) {
      console.log(val, item);
    }
  }
};
</script>
<style lang='less' scoped>
.demo-table-expand {
  width: 75vw;
  display: grid;
  grid-template-columns: 25% repeat(auto-fit, 25%);
  // border: 1px dashed #ccc;
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 35px;
    padding-left: 15px;
    padding-right: 15px;
    border: 1px dashed #ccc;
    // margin: -1px;
    margin-left: -1px;
    margin-top: -1px;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    .label {
      min-width: 90px;
      color: #99a9bf;
      margin-right: 10px;
    }
  }
}
.box {
  /deep/ .el-input__inner {
    padding: 0;
  }

  .hover {
    cursor: pointer;
  }
  white-space: initial;
  .el-button {
    margin: 2px;
  }
  .el-link {
    margin: 2px 3px;
  }
}
.el-table {
  /deep/ td {
    padding: 5px 0;
  }
  /deep/ th {
    background-color: none;
  }
}
.input {
  /deep/ input[readonly="readonly"] {
    border: none;
    background: none;
  }
}
.el-image {
  width: 30px;
}
</style>