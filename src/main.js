import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui';
import axios from './api';
import template from './components';
import '@/assets/theme/sykblue/index.css';
import '@/assets/iconfont/iconfont.css';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css';
import version from '../package.json';
import isElectron from "is-electron";
Vue.config.productionTip = false;
Vue.use(VXETable)
Vue.prototype.$modal = VXETable.modal
Vue.directive('role', {
  bind(el, binding) {
    if (binding.value == undefined) return;
    if (store.state.userinfo.role.includes(0)) return;
    if (!store.state.userinfo.role.includes(binding.value)) {
      el.style.display = 'none'
    }
  },
  // 校验权限
  inserted(el, binding) {
    if (binding.value == undefined) return;
    if (store.state.userinfo.role.includes(0)) return;
    if (!store.state.userinfo.role.includes(binding.value)) {
      el.style.display = 'none'
    }
  },
  update(el, binding) {
    if (binding.value == undefined) return;
    if (store.state.userinfo.role.includes(0)) return;
    if (!store.state.userinfo.role.includes(binding.value)) {
      el.style.display = 'none'
    }
  }
});
Vue.directive('move', {
  bind(el, binding) {

    console.log(el, binding);
  },
  inserted(el, binding) {
    console.log(el, binding);
  },
  update(el, binding) {
    console.log(el, binding);

  }
});

Vue.prototype.axios = axios;
Vue.prototype.EXEVERSION = version.version;
Vue.prototype.isElectron = isElectron;
Vue.use(Element);
Vue.use(template);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");