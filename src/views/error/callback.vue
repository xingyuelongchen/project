 
<template>
  <div class="content-wrap">
    <div>
      <span v-if="title == 404" class="iconfont iconyepian"></span>
      <span v-else style="font-size:80px">{{title}}</span>
    </div>
    <div>
      <router-link to="/login" tag="span">登录</router-link>
      <span @click="$router.back()">返回上一页</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CallBack',
  data() {
    return {
      userinfo: {}
    }
  },
  props: {
    title: null
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.content-wrap {
  text-align: center;
  span {
    padding: 0 10px;
    cursor: pointer;
  }
  .iconyepian {
    font-size: 200px;
  }
}
</style>