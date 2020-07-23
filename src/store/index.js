import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    menu: [],
    userinfo: {}
  },
  mutations: {
    setMenu(state, data) {
      state.menu = data
    },
    setUserinfo(state, data) {
      state.userinfo = data
    }
  },
  actions: {},
  modules: {}
});
