import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/theme/blue/index.css'
import '@/assets/iconfont/iconfont.css'
Vue.config.productionTip = false;
Vue.directive('role', {
  inserted(el, binding) {
    if (!store.state.userinfo.role.includes(binding.value)) {
      el.style.display = 'none'
    }
  }
})
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
