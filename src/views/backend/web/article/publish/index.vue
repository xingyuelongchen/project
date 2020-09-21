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
        <ckeditor v-if="editor" :editor="editor" @ready="onReady" v-model="formData.content" :config="config" />
      </el-scrollbar>
    </el-card>

  </div>
</template>
<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
// import ClassicEditor from "../../../../../../editor/ckeditor";
// import "../../../../../../editor/translations/zh-cn";
// import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
// import ClassicEditor from "@/api/ckeditor.js";
// import "@/api/translations/zh-cn.js";
// import ClassicEditor from "@/editor/ckeditor";
import axios from "axios";
/**
 * 自定义上传图片插件
 */
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const files = new FormData();
    files.append("files", await this.loader.file);
    let { data } = await axios({
      url: `/adminapi/Publics/uploadsImage`,
      method: "POST",
      data: files
    });
    // 方法返回数据格式： {default: "url"}
    return {
      default: data.data
    };
  }
}

export default {
  name: "Webarticlepublish",
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: null,
      config: {
        language: "zh-cn",
        image: {
          // Configure the available styles.
          styles: ["alignLeft", "alignCenter", "alignRight"],

          // Configure the available image resize options.
          resizeOptions: [
            {
              name: "imageResize:original",
              label: "Original",
              value: null
            },
            {
              name: "imageResize:25",
              label: "25%",
              value: "25"
            },
            {
              name: "imageResize:50",
              label: "50%",
              value: "50"
            },
            {
              name: "imageResize:75",
              label: "75%",
              value: "75"
            },
            {
              name: "imageResize:100",
              label: "100%",
              value: "100"
            }
          ],

          // You need to configure the image toolbar, too, so it shows the new style
          // buttons as well as the resize buttons.
          toolbar: [
            "imageStyle:alignLeft",
            "imageStyle:alignCenter",
            "imageStyle:alignRight",
            "|",
            "imageResize",
            "|",
            "imageTextAlternative"
          ]
        }
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
  mounted() {
    this.editor = window.ClassicEditor;
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
    },
    onReady(editor) {
      // 自定义上传图片插件
      editor.plugins.get("FileRepository").createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
      };
    }
  }
};
</script>
<style lang="less" scoped>
</style>
 