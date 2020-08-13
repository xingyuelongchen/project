<!--
Template Name: 公用表单
Create author: qinglong
Create Time  : 2020-03-31
-->
<template>
  <el-form ref="form" :model="fieldsData" :size="options.size" :inline="options.inline||false" @validate="validated">
    <template v-for="(v,i) in mapFields">
      <el-row :key="i">
        <template v-for="(item,index) in v">
          <template v-if="item.type == 'hidden'"></template>
          <el-col :key="index" :span="item.span||24" :xs="item.xs||24" v-else>
            <el-form-item :label-width="item.labelWidth?item.labelWidth+'px' :'120px'" :label="item.type == 'button' ?'': item.label" :prop="item.prop" :rules="item.rule" :required="!!item.required" :error="item.error">
              <template v-if="['text','textarea','number','email','password'].indexOf(item.type)!==-1">
                <el-input class="input" v-model="fieldsData[item.prop]" inline-message :placeholder="item.placeholder" :readonly="!!item.readonly" :disabled="!!item.disabled" :type="item.type" @change="change(item,index,'change')" @input="change(item,index,'input')">
                  <span v-if="item.prepend" slot="prepend" @click.stop="click(item,index)">
                    <template v-if="/^(el-icon|my-icon).*/.test(item.prepend)">
                      <i :class="item.prepend"></i>
                    </template>
                    <template v-else>{{item.prepend}}</template>
                  </span>
                  <span v-if="item.append" slot="append" @click.stop="click(item,index)">
                    <template v-if="/^(el-icon|my-icon).*/.test(item.append)">
                      <i :class="item.append"></i>
                    </template>
                    <template v-else>{{item.append}}</template>
                  </span>
                </el-input>
              </template>
              <template v-if="item.type == 'select'">
                <el-select v-if="!item.readonly" v-model="fieldsData[item.prop]" :disabled="!!item.disabled" :multiple="item.multiple" :collapse-tags="item.multiple" @change="change(item,index,'change')">
                  <el-option v-for="(k,i) in item.options" :key="i" :disabled="k.disabled" :value-id="k.id" :label="k.label || k[item.config.label]" :value="k.value || k[item.config.value] || k" />
                </el-select>
                <el-input v-else v-model="fieldsData[item.prop]" :disabled="!!item.disabled" :readonly="!!item.readonly"></el-input>
              </template>
              <template v-if="item.type == 'switch'">
                <el-switch v-model="fieldsData[item.prop]" inactive-color="#ccc" :disabled="!!item.disabled" />
              </template>
              <template v-if="item.type == 'slider'">
                <el-slider v-model="fieldsData[item.prop]" :format-tooltip="item.formatTooltip" :disabled="!!item.disabled" />
              </template>
              <template v-if="item.type == 'checkbox'">
                <template v-if="item.options && item.options.length">
                  <el-checkbox v-model="fieldsData[item.prop]" v-for="(k,i) in item.options" :key="i" :label="k.value ||k[item.config.value] || k.id || k.label" :disabled="k.disabled" :checked="k.checked">{{k.label || k[item.config.label] }}</el-checkbox>
                </template>
                <el-checkbox v-else v-model="fieldsData[item.prop]" :label="item.options.value" :disabled="!!item.disabled" :checked="item.checked">{{item.options.label}}</el-checkbox>
              </template>
              <template v-if="item.type == 'cascader'">
                <el-cascader v-if="!item.readonly" v-model="fieldsData[item.prop]" :disabled="!!item.disabled" :readonly="!!item.readonly" :checkStrictly="true" :emitPath="false" :options="item.options" :props="item.config" @change="change(item,index,'change')"></el-cascader>
                <el-input v-else v-model="fieldsData[item.prop]" :disabled="!!item.disabled" :readonly="!!item.readonly"></el-input>
              </template>
              <template v-if="item.type == 'checkboxgroup'">
                <el-checkbox-group v-model="fieldsData[item.prop]" :disabled="!!item.disabled">
                  <el-checkbox v-for="(k,i) in item.options" :label="k.value||k.id||k.label" :key="i" :disabled="k.disabled" :checked="k.checked">{{k.label || k[item.config.label] }}</el-checkbox>
                </el-checkbox-group>
              </template>
              <template v-if="item.type == 'radio'">
                <template v-if="item.options && item.options.length">
                  <el-radio v-model="fieldsData[item.prop]" v-for="(k,i) in item.options" :key="i" :label="k.value" :disabled="k.disabled">{{k.label}}</el-radio>
                </template>
                <el-radio v-else v-model="fieldsData[item.prop]" :label="item.options.value" :disabled="!!item.disabled">{{item.options.label}}</el-radio>
              </template>
              <template v-if="item.type == 'radiogroup'">
                <el-radio-group v-model="fieldsData[item.prop]" :disabled="!!item.disabled">
                  <el-radio v-for="(k,i) in item.options" :label="k.value" :key="i" :disabled="k.disabled">{{k.label}}</el-radio>
                </el-radio-group>
              </template>
              <template v-if="item.type == 'button'">
                <el-button v-if="!item.options || !item.options.length" :key="index" :type="item.style || 'primary'" @click.stop="click(item,index,item)">{{item.label}}</el-button>
                <el-button v-else v-for="(k,i) in item.options" :key="i" :type="k.style || 'primary'" @click.stop="click(k,index,item)">{{k.label}}</el-button>
              </template>
              <template v-if="['date','datetime'].indexOf(item.type)>=0">
                <el-date-picker :type="item.type" :value-format="item.type =='date'?'yyyy-MM-dd':'yyyy-MM-dd HH:mm:ss'" v-model="fieldsData[item.prop]" :placeholder="item.label" :disabled="!!item.disabled" :readonly="!!item.readonly"></el-date-picker>
              </template>
              <template v-if="item.type == 'image'">
                <div :key="key" class="image">
                  <el-input v-model="files[item.prop]" type="text" @paste.native.capture.prevent="onPaste($event,item,index)" placeholder="粘贴截图上传">
                    <el-button slot="append" @click.native.stop="$refs.upload[0].click()">本地上传</el-button>
                  </el-input>
                  <input ref="upload" type="file" accept="image/png, image/jpg, image/jpeg, image/gif, image/svg" @input="upload($event,item)" v-show="false" />
                  <div v-if="fieldsData[item.prop] && fieldsData[item.prop].length" class="image-box">
                    <template v-for="(v,i) in fieldsData[item.prop]">
                      <div class="image-item" :key="i">
                        <el-image :src="v" :preview-src-list="fieldsData[item.prop]" fit="cover" />
                        <i class="el-icon-delete" @click="onDelImage(item,i)"></i>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
              <template v-if="item.type == 'upload'">
                <el-button @click="$refs.upload[0].click()" :type="item.style || 'primary'" :icon="item.icon || 'el-icon-upload2'">点击上传</el-button>
                <input type="file" ref="upload" @change="onUpload($event,item)" multiple v-show="false" accept="application/pdf, image/jpg, image/jpeg, image/png" />
                <div v-if="fileList && fileList.length" style="margin-top: 10px;">
                  <span class="file-list" v-for="(k,i) in fileList" :key="i">{{k.name}}</span>
                </div>
              </template>
              <template v-if="item.type == 'plan'">
                <el-progress :percentage="fieldsData[item.prop]" text-inside type="line" :stroke-width="25"></el-progress>
              </template>
              <template v-if="item.type=='selectTree'">
                <select-tree v-model="fieldsData[item.prop]" :options="item.options" :props="item.props||{label:'label',value:'value',children:'children'}" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </template>
  </el-form>
</template>
<script>
export default {
  name: "MixForm",
  components: { selectTree: () => import("@/components/mixSelectTree") },
  model: {
    prop: "fieldsData"
  },
  props: {
    fields: {
      type: Array,
      default: () => [
        {
          label: "菜单名称",
          prop: "title",
          type: "text",
          rule: null,
          append: "arrow-right",
          click: (item, index) => {
            console.log(item, index);
          }
        },
        {
          label: "菜单名称",
          prop: "title",
          type: "text",
          rule: null,
          append: "el-icon-arrow-right"
        },
        {
          label: "菜单名称",
          prop: "title",
          type: "text",
          rule: null,
          prepend: "el-icon-arrow-left"
        },
        { label: "菜单名称", prop: "switch", type: "switch", rule: null },
        { label: "单选框", prop: "radio", type: "radio", rule: null },
        {
          label: "单选框组",
          prop: "radiogroup",
          type: "radio",
          options: [
            { label: "a", value: "a" },
            { label: "b", value: "b" }
          ],
          rule: null
        },
        { label: "复选框", prop: "checkbox", type: "checkbox", rule: null },
        {
          label: "复选框",
          prop: "checkboxgroup",
          type: "checkbox",
          options: [
            { label: "a", value: "a" },
            { label: "b", value: "b" }
          ],
          rule: null
        }
      ]
    },
    fieldsData: {
      type: Object,
      default: () => {
        return {
          title: "false",
          switch: true,
          checkbox: false,
          checkboxgroup: [],
          radio: true,
          radiogroup: []
        };
      }
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return { key: "key", mapFields: [], files: [], fileList: [] };
  },
  watch: {
    fields() {
      this.onMapFields();
    },
    fieldsData() {
      this.key = Math.random();
    }
  },

  created() {
    this.onMapFields();
  },
  methods: {
    async onUpload(event, item) {
      this.fileList = event.target.files || [];
      let formData = new FormData();
      this.fileList.forEach(e => {
        formData.append("files", e);
      });
      let { data } = await this.axios("/admin/Publics/UploadFiles", {
        data: formData
      });
      if (data.code) {
        this.fieldsData[item.prop] = data.data;
      }
    },
    previewFile(file, files) {
      console.log(file, files);
    },
    removeFile(file, files) {
      console.log(file, files);
    },
    // 上传图片
    list(item) {
      if (item && item.length) {
        return item.map(e => {
          return e.blob || e;
        });
      }
      return [];
    },
    // 删除选择的图片
    onDelImage(item, i) {
      this.fieldsData[item.prop].splice(i, 1);
      this.key = Math.random();
    },
    // 点击按钮上传
    upload(event, item) {
      this.update(event.target.files[0], event.target.files[0].type, item);
    },
    // 粘贴剪切板截图
    onPaste(event, item) {
      if (!(event.clipboardData && event.clipboardData.items)) {
        this.$message.error("当前环境不支持粘贴上传，\n请手动点击上传图片");
        return;
      }
      if (event.clipboardData.items[0].type.indexOf("image") >= 0) {
        let file = event.clipboardData.items[0].getAsFile();
        let mime = event.clipboardData.items[0].type;
        this.update(file, mime, item);
      }
    },
    // 更新表单数据源字段内容
    async update(file, mime, item) {
      let obj = new FormData();
      obj.append("files", file);
      let { data } = await this.axios("/adminapi/Publics/uploadsImage", {
        data: obj
      });
      if (data.code) {
        // let blob = window.URL.createObjectURL(file);
        if (this.fieldsData[item.prop] && this.fieldsData[item.prop].length) {
          this.fieldsData[item.prop].push(data.data);
        } else {
          this.fieldsData[item.prop] = [data.data];
        }
        this.key = Math.random();
      }
    },
    onMapFields() {
      this.mapFields = [];
      let arr = [];
      this.fields.forEach(e => {
        if (e.wrap) {
          this.mapFields.push(arr);
          arr = [];
        }
        arr.push(e);
      });
      this.mapFields.push(arr);
    },
    change(item, index, type) {
      let click = item[type];
      if (!click) return;
      this.onClick(click, item, index, type);
    },
    click(item, index, option) {
      let click = item["click"];
      if (!click) return;
      this.onClick(click, item, index, option);
    },
    onClick(click, item, index, option) {
      if (typeof click == "function") {
        click(item, index, option);
        return;
      }
      if (typeof this.$parent[click] == "function") {
        this.$parent[click](item, index, option);
        return;
      }
    },
    // 输入触发验证
    validated(prop) {
      // 验证
      console.log("表单验证字段：", prop);
    },
    // 表单验证
    async validate() {
      try {
        return await this.$refs["form"].validate();
      } catch (error) {
        return error;
      }
    },
    resetFields() {
      this.$refs["form"].resetFields();
    },
    clearValidate() {
      this.$refs["form"].clearValidate();
    },
    resetForm() {
      this.$refs["form"].resetFields();
    }
  }
};
</script>
<style lang='less' scoped>
.el-form {
  //   border: 1px solid #ccc;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-right: 20px;
}
.el-cascader-panel {
  color: #f00;
  /deep/ .el-radio {
    position: absolute;
    width: 100%;
  }
  /deep/ .el-cascader-node__label {
    margin-left: 10px;
  }
}
.file-list {
  display: block;
  padding: 3px 15px;
  border: 1px solid #eee;
  margin-top: 10px;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: none;
  }
  &:not(:first-child) {
    border-top: none;
  }
}
.el-col {
  min-width: 280px;
}
.input /deep/ input[readonly="readonly"] {
  border: none;
  background: none;
}
.el-select,
.el-cascader,
.el-date-editor {
  width: 100%;
}
.image-box {
  display: flex;
  flex-wrap: wrap-reverse;
  align-content: center;
  align-items: center;
  .image-item {
    // width: 50px;
    min-height: 50px;
    max-height: 50px;
    height: 50px;
    max-width: 50px;
    width: 50px;
    min-width: 50px;
    border: 1px solid #ccc;
    margin: 5px;
    position: relative;
    overflow: hidden;
    i {
      display: none;
      cursor: pointer;
    }
    &:hover {
      i {
        position: absolute;
        top: 0;
        right: 0;
        margin: auto;
        display: block;
        background: #fff;
      }
    }
  }
}
.el-button {
  width: 100%;
}
</style>