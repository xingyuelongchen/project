import Vue from "vue";
import Vuex from "vuex";
import router from '../router';
import { setStore } from '../api/Storage';
Vue.use(Vuex);
const STATE = {
  menu: [],
  userinfo: {},
  tabmenu: [],
  routes: [],
  update: false,
  status: {},
  getImage: { show: false, files: [], all: true },
}
export default new Vuex.Store({
  state: STATE,
  mutations: {
    updateMessage(state, data) {
      state.update = data
    },
    setGetImage(state, data) {
      state.getImage = data
      console.log(data);
    },
    // 客户流程状态
    setStatus(state, data) {
      state.status = data
    },
    // 清空数据
    setClear(state) {
      for (let k in state) {
        state[k] = STATE[k]
        // if (state[k] == null) state[k] = null;
        // else if (state[k].constructor == Array) state[k] = [];
        // else if (state[k].constructor == Object) state[k] = {};
        // else if (state[k].constructor == Boolean) state[k] = false;
        // else if (state[k].constructor == String) state[k] = '';
        // else if (state[k].constructor == Number) state[k] = 0;

      }
    },
    // 刷新后初始化
    setInit(state, data) {
      for (let k in data) {
        state[k] = STATE[k]
      }
    },
    // 动态路由表
    setRoutes(state, data) {
      state.routes = data
    },
    // 动态菜单
    setMenu(state, data) {
      state.menu = data
    },
    // 用户数据表
    setUserinfo(state, data) {
      if (data.id) {
        state.userinfo = data;
        setStore('userinfo', data, true)
        // data = JSON.stringify(data);
        // window.localStorage.setItem('userinfo', data)
      }
    },
    // 添加tab选项卡
    setTabmenu(state, data) {
      // 增加标签页
      let arr = [];
      let bool = state.tabmenu.filter(e => {
        e.active = e.fullPath == data.fullPath;
        arr.push(e);
        return e.fullPath == data.fullPath
      })
      if (!bool.length) state.tabmenu.push({ ...data, active: true })
      else state.tabmenu = arr

    },
    // 删除tab选项卡
    delTabmenu(state, data) {
      // 删除标签页 
      let index = null, path;
      let arr = state.tabmenu.filter((e, i) => {
        if (e.active) index = i;
        return e.fullPath != data
      });
      if (index > 0) { arr[index - 1].active = true; path = arr[index - 1] };
      if (index == 0) { arr[0].active = true; path = arr[0] }
      state.tabmenu = arr;
      router.replace(path.fullPath)
    },
    // 重置tab选项卡
    removeTabmenu(state) {
      state.tabmenu = []
    },
  },
  actions: {

  },
  modules: {}
});
