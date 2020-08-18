<!--
Template Name: 喜报
Create author: qinglong
Create Time  : 2020-08-18
-->
<template>
  <div class="mix-xibao" :class="{active:value.show}" @click="close">
    <div class="mix-content" v-if="value.data">
      <div class="touxiang">
        <img :src="value.data.pic" alt="">
      </div>
      <div class="ranking">
        <div class="item" v-for="(item,index) in value.data.sort" :key="index">
          <img src="~@/assets/image/4.png" alt="" v-if="!index" class="icon">
          <el-avatar :src="item.pic" :size="75" />
          <div>
            <span>第{{index+1}}名</span>
            <span>{{item.name}}</span>
            <span>{{item.number}} 单</span>
          </div>
        </div>
      </div>
      <div class="message">
        <span v-text="value.data.msg"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mixXibao",
  props: {
    value: {}
  },
  methods: {
    close() {
      let value = { ...this.value, show: false };
      this.$emit("input", value);
    }
  }
};
</script>
<style lang='less' scoped>
.mix-xibao {
  position: fixed;
  overflow: hidden;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  bottom: -100%;
  z-index: 9999;
  background: url(~@/assets/image/5.png) no-repeat bottom / 100% 100%,
    rgba(0, 0, 0, 0.4);
  transition: all 0.5s;
  opacity: 0;
  &.active {
    opacity: 1;
    bottom: 0;
    transition: all 0.5s;
  }
}
.mix-content {
  position: absolute;
  width: 1000px;
  height: 723px;
  overflow: hidden;
  bottom: -20px;
  color: #fff;
  left: 0;
  right: 0;
  margin: auto;
  background: url("~@/assets/image/6.png") no-repeat bottom / 100% 100%;

  .touxiang {
    position: absolute;
    top: 195px;
    left: 285px;
    width: 185px;
    height: 215px;
    background: #eee;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border: 5px solid rgb(255, 198, 119);
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .ranking {
    position: absolute;
    top: 165px;
    left: 610px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 260px;
    .item {
      position: relative;
      height: 60px;
      width: 220px;
      padding-left: 25px;
      padding-right: 10px;
      margin-bottom: 33px;
      font-size: 20px;
      text-align: center;
      line-height: 60px;
      color: #f60;
      font-weight: bold;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      background: url(~@/assets/image/7.png) no-repeat left / 100% 100%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      .icon {
        position: absolute;
        top: -25px;
        left: -55px;
        width: 30px;
        height: 26px;
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 22px;
        }
      }
      .el-avatar {
        position: absolute;
        left: -55px;
        top: -8px;
      }
    }
  }
  .message {
    position: absolute;
    width: 700px;
    height: 65px;
    top: 420px;
    left: 160px;
    text-shadow: 0 0 1px #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
      display: inline-block;
    }
  }
}
</style>