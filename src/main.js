import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui'; 
import template from './components';
import '@/assets/theme/black/index.css';
import '@/assets/iconfont/iconfont.css';
import 'xe-utils';
import version from '../package.json';
import isElectron from "is-electron";
import VCharts from 'v-charts';
import 'v-charts/lib/style.css';
import socket from './api/socket-io';
// import api from 'xingyuelongchen';
import api from './api';
Vue.config.productionTip = false;
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
Vue.use(api);
Vue.prototype.EXEVERSION = version.version;
Vue.prototype.isElectron = isElectron();
Vue.prototype.socket = socket();
Vue.use(VCharts);
Vue.use(Element);
Vue.use(template);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");