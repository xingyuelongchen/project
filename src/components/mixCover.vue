<!--
Template Name: 裁剪
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <div>
    <vueCropper :img="image" outputType="webp" />
  </div>
</template>
<script>
import vueCropper from "vue-cropper";
export default {
  props: {
    img: null
  },
  name: "mixCover",
  components: { vueCropper },
  data() {
    return {
      image: null
    };
  },
  watch: {
    img() {
      this.toggle();
    }
  },
  created() {
    this.toggle();
  },
  methods: {
    toggle() {
      if (typeof this.img == "object") {
          console.log(0);
      }
      if (this.img.indexOf("base64") > 0) {
        this.image = this.img;
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>