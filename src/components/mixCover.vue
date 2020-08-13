<!--
Template Name: 裁剪
Create author: qinglong
Create Time  : 2020-08-12
-->
<template>
  <VueCropper v-if="show" ref="cropper" :img="image" outputType="png" :autoCrop="true" :canMove="false" :fixed="true" :fixedNumber="[1,1]" @realTime="realTime" />
</template>
<script>
import { VueCropper } from "vue-cropper";
export default {
  props: {
    img: null
  },
  name: "mixCover",
  components: { VueCropper },
  data() {
    return {
      image: null,
      show: false
    };
  },
  mounted() {
    this.toggle();
  },
  methods: {
    toggle() {
      if (!this.img) return;
      if (typeof this.img == "object") {
        let that = this;
        let reader = new FileReader(); //实例化文件读取对象
        reader.readAsDataURL(this.img); //将文件读取为 DataURL,也就是base64编码
        reader.onload = function(ev) {
          //文件读取成功完成时触发
          let dataURL = ev.target.result; //获得文件读取成功后的DataURL,也就是base64编码
          that.image = dataURL; //将DataURL码赋值给img标签
          that.show = true;
        };
      }
      if (typeof this.img == "string" && this.img.indexOf("base64") > 0) {
        this.image = this.img;
      }
    },
    sacle(bool = false) {
      if (bool) this.$refs.cropper.rotateRight();
      else this.$refs.cropper.rotateLeft();
    },
    realTime(obj) {
      this.$refs.cropper.getCropData(base64 => {
        this.$emit("input", { ...obj, base64 });
      });
    }
  },

  beforeDestroy() {
    this.$refs.cropper.stopCrop();
    this.$refs.cropper.clearCrop();
  }
};
</script>
<style lang='less' scoped>
</style>