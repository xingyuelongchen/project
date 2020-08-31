<!--
Template Name: 搜索表单
Create author: qinglong
Create Time  : 2020-04-02
-->
<template>
  <div class="mix-search">
    <el-row>
      <template v-for="(item,index) in fields">
        <el-col :span="item.span" :xs="item.xs || item.span" :sm="item.sm || item.span" :md="item.md || item.span" :lg="item.lg || item.span" :xl="item.xl || item.span" :key="index" v-role="item.role">
          <template v-if="['text','textarea','number'].indexOf(item.type)>=0">
            <el-input v-model="form[item.prop]" :readonly="item.readonly" :type="item.type" :size="item.size||'mini'" :placeholder="item.label" clearable :default-value="new Date()"></el-input>
          </template>
          <template v-if="item.type == 'select'">
            <el-select v-model="form[item.prop]" :readonly="item.readonly" :placeholder="item.label" :size="item.size||'mini'" :multiple="item.multiple" clearable>
              <template v-if="item.options">
                <el-option v-for="(k,i) in item.options" :key="i" :label="k.label|| k[item.config.label]" :value="k.value || item.config && item.config.value && k[item.config.value] || item.config&& item.config.label&& k[item.config.label]"></el-option>
              </template>
            </el-select>
          </template>
          <template v-if="['datetime','date','week','daterange','month','datetimerange'].indexOf(item.type)>=0">
            <el-date-picker v-if="item.type=='datetime'" v-model="form[item.prop]" align="right" :key="item.type" :format="item.format || item.valueFormat ||'yyyy-MM-dd HH:mm:ss'" :value-format="item.format || item.valueFormat ||'yyyy-MM-dd HH:mm:ss'" :placeholder="item.placeholder || item.label" :type="item.type" :size="item.size||'mini'"></el-date-picker>
            <el-date-picker v-if="item.type=='date'" v-model="form[item.prop]" align="right" :key="item.type" :format="item.format || item.valueFormat ||'yyyy-MM-dd '" :value-format="item.format || item.valueFormat ||'yyyy-MM-dd'" :placeholder="item.placeholder || item.label" :type="item.type" :size="item.size||'mini'"></el-date-picker>
            <el-date-picker v-if="item.type=='week'" v-model="form[item.prop]" align="right" :key="item.type" :format="item.format || item.valueFormat ||'WW'" :value-format="item.format || item.valueFormat ||'WW'" :placeholder="item.placeholder || item.label" :type="item.type" :size="item.size||'mini'"></el-date-picker>
            <el-date-picker v-if="item.type=='month'" v-model="form[item.prop]" align="right" :key="item.type" :format="item.format || item.valueFormat ||'yyyy-MM'" :value-format="item.format || item.valueFormat ||'yyyy-MM'" :placeholder="item.placeholder || item.label" :type="item.type" :size="item.size||'mini'"></el-date-picker>
            <el-date-picker v-if="item.type=='daterange'" v-model="form[item.prop]" align="right" :key="item.type" :format="item.format || item.valueFormat ||'yyyy-MM-dd'" :value-format="item.format || item.valueFormat ||'yyyy-MM-dd'" :start-placeholder="item.label+'开始日期'" :end-placeholder="item.label+'结束日期'" :placeholder="item.placeholder || item.label" type="daterange" :size="item.size||'mini'" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"></el-date-picker>
            <el-date-picker v-if="item.type=='datetimerange'" v-model="form[item.prop]" align="right" :key="item.type" :format="item.format || item.valueFormat ||'yyyy-MM-dd HH:mm:ss'" :value-format="item.format || item.valueFormat ||'yyyy-MM-dd HH:mm:ss'" :start-placeholder="item.label+'开始日期'" :end-placeholder="item.label+'结束日期'" :placeholder="item.placeholder || item.label" type="datetimerange" :size="item.size||'mini'" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"></el-date-picker>
            <el-date-picker v-if="item.type=='datetimeall'" v-model="form[item.prop]" align="right" :key="item.type" :format="item.format || item.valueFormat ||'yyyy-MM-dd HH:mm:ss'" :value-format="item.format || item.valueFormat ||'yyyy-MM-dd HH:mm:ss'" :start-placeholder="item.label+'开始日期'" :end-placeholder="item.label+'结束日期'" :placeholder="item.placeholder || item.label" type="datetimerange" :size="item.size||'mini'" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
          </template>
          <template v-if="item.type == 'time'">
            <el-time-select v-model="form[item.prop]" :size="item.size||'mini'" :picker-options="{ start:item.start|| '08:30', step:item.step|| '00:01', end:item.end|| '18:30' }" :placeholder="item.label||'选择时间'"></el-time-select>
          </template>
          <template v-if="item.type == 'button'">
            <el-button v-if="!item.options" :key="index" :type="item.style || 'primary'" v-role="item.role" :size="item.size||'mini'" :icon="item.icon" @click.stop="click(item)">{{item.label}}</el-button>
            <template v-else>
              <template v-for="(k,i) in item.options">
                <el-button v-if="k.type=='info'" :key="i" v-role="k.role" type="info" size="mini" plain> {{k.label}} : {{form[k.prop]}} </el-button>
                <el-button v-else :key="i" v-role="k.role" :icon="k.icon" :type="k.style||item.style || 'primary'" :size="k.size || item.size || 'mini'" @click.stop="click(k)">{{k.label}}</el-button>
              </template>
            </template>
          </template>
          <template v-if="item.type == 'cascader'">
            <el-cascader clearable v-if="!item.readonly" v-model="form[item.prop]" :placeholder="item.placeholder || item.label" :show-all-levels="false" :collapse-tags="true" :disabled="item.disabled" :readonly="item.readonly" :checkStrictly="true" :emitPath="false" :options="item.options" :size="item.size || 'mini'" :props="item.config || { value:'id', checkStrictly: true}"></el-cascader>
            <el-input v-else v-model="form[item.prop]" :disabled="item.disabled" :readonly="item.readonly"></el-input>
          </template>
          <template v-if="item.type == 'radio'">
            <el-radio v-for="(k,i) in item.options" :key="i" :name="item.prop" v-model="form[item.prop]" :disabled="item.disabled" :readonly="item.readonly" :label="k.id">{{k.label}}</el-radio>
          </template>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "mixSearch",
  model: {
    prop: "form"
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: time => {
          return new Date().getMonth() - new Date(time).getMonth() > 3;
        },
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              end.setTime(start.getTime());
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    click(type, index, item) {
      let click = type["click"];
      if (!click) return;

      if (typeof click == "function") {
        click(type, index, item);
        return;
      }
      if (typeof this.$parent[click] == "function") {
        this.$parent[click](type, index, item);
        return;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.mix-search {
  margin: 5px 0;
  padding: 5px;
  background: #f0f0f0;
}
.el-date-editor {
  width: 100%;
}
.el-col {
  margin: 3px;
  min-width: 100px;
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>