 
<template>
  <div class="content-wrap">
    <div style="font-size:80px">{{title}}</div>
    <div>
      <router-link to="/login">登录</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "CallBack",
  data() {
    return {
      userinfo: {}
    };
  },
  props: {
    title: null
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.content-wrap {
  text-align: center;
}
</style>