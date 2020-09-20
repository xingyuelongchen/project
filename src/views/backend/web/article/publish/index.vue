<!--
Template Name: Articlepublish
Create author: qinglong
Create Time  : 2020-09-20
-->
<template>
  <div class="content-cols">
    <el-card>
      <div slot="header">
        <el-button type="success" style="float:right" size="mini" @click="save">保存文章</el-button>
        <span>编辑文章</span>
      </div>
      <el-scrollbar>
        <mixForm v-model="formData" :fields="formFields" />
        <ckeditor :editor="editor" v-model="formData.content" :config="config" />
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
export default {
  name: "Webarticlepublish",
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ClassicEditor,
      config: {
        language: "zh-cn"
      },
      test: "sdfas",
      formData: {},
      formFields: [
        {
          labelWidth: 80,
          type: "text",
          span: 10,
          label: "标题",
          prop: "title",
          wrap: true
        },
        {
          labelWidth: 80,
          type: "text",
          span: 10,
          label: "副标题",
          prop: "subtitle",
          wrap: true
        },
        {
          labelWidth: 80,
          type: "text",
          span: 10,
          label: "浏览量",
          prop: "number",
          wrap: true
        },
        {
          labelWidth: 80,
          type: "text",
          span: 10,
          label: "作者",
          prop: "author",
          wrap: true
        },
        {
          labelWidth: 80,
          type: "text",
          span: 10,
          label: "封面图",
          prop: "image",
          wrap: true
        }
      ]
    };
  },
  created(query = {}) {
    this.id = query.id || null;
    if (query.id) this.getData();
  },
  methods: {
    async save() {
      await this.axios("/adminapi/", {
        data: this.formData
      });
    },
    async getData() {
      let { data } = await this.axios("/adminapi/", { data: { id: this.id } });
      if (data.code) {
        this.formData = data.data;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.content-cols {
  padding-bottom: 60px;
}
.save {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: auto;
  height: 80px;
  box-shadow: 0 0 10px 5px #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
 