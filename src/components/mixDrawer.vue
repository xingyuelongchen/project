<!--
Template Name: 侧边弹窗
Create author: qinglong
Create Time  : 2020-04-02
-->
<template>
  <div class="mix-drawer" :class="{active:!isShow&&show}" @click.stop.self="colse">
    <transition name="fade">
      <div class="body" v-if="show" :style="{width:width+'vw',position:'absolute',right:0}">
        <div class="title">{{title}}</div>
        <el-scrollbar>
          <div class="content">
            <slot></slot>
          </div>
        </el-scrollbar>
        <div class="button">
          <el-button @click.native="colse" type="init">关闭</el-button>
          <el-button @click.native="confirm" type="primary">确定</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "mix-drawer",
  model: {
    prop: "show"
  },
  props: {
    show: {
      type: Boolean
    },
    title: {
      type: String
    },
    width: {
      default: 25
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    show(a) {
      if (a) {
        this.init();
      }
    }
  },
  methods: {
    init() {
      // if (!this.isShow) {
      //   let that = this;
      //   function a(e) {
      //     that.colse();
      //     document.removeEventListener("click", a);
      //   }
      //   document.addEventListener("click", a);
      // }
    },
    confirm() {
      this.$emit("confirm");
    },
    colse() {
      this.$emit("close");
    },
    change(row, column, cell, event, type) {
      if (typeof type == "function") {
        type(row, column, cell, event);
      }
      if (typeof this.$parent[type] == "function") {
        this.$parent[type](row, column, cell, event);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(100%);
}
.active {
  width: 100%;
  height: 100%;
}
.mix-drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;

  .body {
    width: 25vw;
    min-width: 400px;
    height: 100%;
    overflow-y: hidden;
    background: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  .title {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .content {
    padding: 0 20px;
    padding-bottom: 70px;
    overflow: hidden;
  }
  /deep/ .el-form {
    border: none;
  }
  .button {
    position: fixed;
    width: inherit;
    bottom: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    text-align: center;
    padding: 10px 0;
    z-index: 200;
    min-width: 400px;
  }
}
</style>