<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-16
-->
<template>

  <MonacoEditor :key="key" class="editor" :height="fields.height" :width="fields.width" :language="fields.language" :theme="fields.theme" :code="value" @mounted="onMounted" @codeChange="codeChange" />

</template>
<script>
import MonacoEditor from "vue-monaco-editor";
export default {
  components: {
    MonacoEditor
  },
  props: {
    value: {
      type: String,
      default: () => ""
    },
    fields: {
      type: Object,
      default() {
        return {
          height: "100%",
          width: "100%",
          language: "json",
          theme: "vs",
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: false,
          glyphMargin: true
        };
      }
    }
  },
  data() {
    return {
      key: "0"
    };
  },
  watch: {
    fields() {
      this.update();
    }
  },
  mounted() {
    window.onresize = () => {
      this.update();
    };
  },
  methods: {
    update() {
      this.key = Math.random();
    },
    codeChange(editor) {
      let code = editor.getValue();
      this.$emit("input", code);
    },
    onMounted(editor) {
      this.editor = editor;
    }
  }
};
</script>
<style lang='less' scoped>
.editor {
  border: 1px solid #ccc;
}
</style>