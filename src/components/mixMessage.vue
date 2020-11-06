<!--
Template Name: 右下角弹框
Create author: qinglong
Create Time  : 2020-08-17
-->
<template>
  <div class="msg-box" ref="box" :style="ClassStyle">
    <div
      class="title"
      user="primary"
      @mousedown.stop.prevent="mousedown"
      @mouseup.stop="mouseup"
    >
      <span>{{ value.title || "您有新消息！" }}</span>
      <span><i class="el-icon-close" @click.stop="close"></i></span>
    </div>
    <div class="body" ref="msg" v-html="value.message"></div>
    <el-image-viewer v-if="url" :on-close="colseImage" :url-list="[url]" />
  </div>
</template>
<script>
export default {
  name: "mixMessage",
  props: {
    value: {}
  },
  components: {
    "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer")
  },
  data() {
    return {
      style: {},
      formData: {},
      formFields: [],
      ClassStyle: { left: "auto", top: "auto" },
      url: ""
    };
  },
  mounted() {
    if (this.$refs.msg.querySelector("img")) {
      this.$refs.msg.querySelector("img").onclick = e => {
        this.url = e.target.src;
      };
    }
  },
  methods: {
    colseImage() {
      this.url = "";
    },
    close() {
      this.$emit("input");
    },
    async save() {
      let { data } = await this.axios("/adminapi/Customer/tracestatus", {
        data: { id: this.value.id, status: this.value.status }
      });
      if (data.code) {
        console.log(0);
      }
    },
    mousedown(e) {
      e.preventDefault();
      let style = {
        // 鼠标到窗口左侧的距离
        mouseX: e.screenX,
        // 鼠标到窗口顶部的距离
        mouseY: e.screenY,
        // 盒子到窗口左侧的距离
        boxX: this.$refs.box.offsetLeft,
        // 盒子到窗口顶部的距离
        boxY: this.$refs.box.offsetTop,
        // 鼠标到盒子左侧的距离
        boxLeft: e.screenX - this.$refs.box.offsetLeft,
        // 鼠标到盒子左侧的距离
        boxTop: e.screenY - this.$refs.box.offsetTop
      };
      this.style = style;
      document.addEventListener("mousemove", this.mousemove);
      // this.ClassStyle.zIndex = 2000;
    },
    mousemove(e) {
      this.ClassStyle = {
        left: e.screenX - this.style.boxLeft + "px",
        top: e.screenY - this.style.boxTop + "px",
        zIndex: 1500
      };
    },
    mouseup() {
      // this.ClassStyle.zIndex = 1;
      document.removeEventListener("mousemove", this.mousemove);
    }
  }
};
</script>
<style lang='less' scoped>
.msg-box {
  position: fixed;
  bottom: 20px;
  width: 350px;
  height: 250px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 99999;
  background: #fff;
  border-radius: 5px;
  right: 20px;
  left: auto;
  top: auto;
  display: grid;
  grid-template-rows: 40px auto;
  grid-row-gap: 10px;
  overflow: hidden;
  .title {
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    cursor: grab;
    i {
      cursor: pointer;
      font-size: 20px;
    }
  }
  .body {
    overflow: hidden;
    padding: 15px;
    // font-size: 16px;
  }
}
</style>