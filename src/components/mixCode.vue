<!--
Template Name: 
Create author: qinglong
Create Time  : 2020-08-16
-->
<template>

  <MonacoEditor :key="key" class="editor" :height="option.height" :width="option.width" :language="option.language" :theme="option.theme" :code="value" @mounted="onMounted" @codeChange="codeChange" :editorOptions="option" />

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
    options: {
      type: Object
    }
  },
  data() {
    return {
      key: "0",
      option: {
        height: "100%",
        width: "100%",
        language: "json",
        // theme: "vs",
        theme: "vs-dark",
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false,
        glyphMargin: true
      }
    };
  },
  watch: {
    options() {
      this.update();
    }
  },
  created() {
    this.update();
  },
  mounted() {
    window.onresize = () => {
      this.update();
    };
  },
  methods: {
    update() {
      this.option = { ...this.option, ...this.options };
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