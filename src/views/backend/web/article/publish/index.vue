<!--
Template Name: Articlepublish
Create author: qinglong
Create Time  : 2020-09-20
-->
<template>

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
</template>
<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
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
  props: {
    value: null
  },
  data() {
    return {
      editor: null,
      url: "/adminapi/Article/add",
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
      formData: {
        author: JSON.parse(window.localStorage.getItem("userinfo")).nickname
      },
      formFields: []
    };
  },
  async created() {
    this.getClass();
    if (this.value.id) {
      let data = { ...this.value };
      data.pic = [data.pic];
      this.formData = data;
      this.url = "/adminapi/Article/edit";
    } else {
      this.url = "/adminapi/Article/add";
    }
  },

  mounted() {
    this.editor = window.ClassicEditor;
  },
  methods: {
    async getClass() {
      let { data } = await this.axios("/adminapi/Articletype/list");
      if (data.code) {
        this.formFields = [
          {
            labelWidth: 60,
            type: "select",
            span: 10,
            label: "分类",
            prop: "type",
            wrap: true,
            options: data.data.map(e => {
              return { ...e, value: e.id };
            })
          },
          {
            labelWidth: 60,
            type: "text",
            span: 10,
            label: "标题",
            prop: "title",
            wrap: true
          },
          {
            labelWidth: 60,
            type: "text",
            span: 10,
            label: "副标题",
            prop: "subtitle",
            wrap: true
          },
          {
            labelWidth: 60,
            type: "text",
            span: 10,
            label: "关键词",
            prop: "keywords",
            wrap: true
          },
          {
            labelWidth: 60,
            type: "textarea",
            span: 10,
            label: "描述",
            prop: "description",
            wrap: true
          },
          {
            labelWidth: 60,
            type: "number",
            span: 10,
            label: "浏览量",
            prop: "count",
            wrap: true
          },
          {
            labelWidth: 60,
            type: "number",
            span: 10,
            label: "排序",
            prop: "sort",
            wrap: true
          },
          {
            labelWidth: 60,
            type: "text",
            span: 10,
            label: "作者",
            prop: "author",
            wrap: true
          },
          {
            labelWidth: 60,
            type: "selectimage",
            span: 10,
            label: "封面图",
            prop: "pic",
            wrap: true
          }
        ];
      }
    },
    async save() {
      if (this.formData.pic && this.formData.pic.length) {
        this.formData.pic = this.formData.pic[0];
      }
      let { data } = await this.axios(this.url, {
        data: this.formData
      });
      if (data.code) this.formData = {};
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
 