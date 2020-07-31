import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui';
import axios from './api';
import template from './components';
import '@/assets/theme/blue/index.css';
import '@/assets/iconfont/iconfont.css';
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.config.productionTip = false;
Vue.use(VXETable)
Vue.prototype.$modal = VXETable.modal
Vue.directive('role', {
  // 校验权限
  inserted(el, binding) {
    if (!store.state.userinfo.role.includes(binding.value)) {
      el.style.display = 'none'
    }
  }
});
Vue.prototype.axios = axios;
Vue.use(Element);
Vue.use(template);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");