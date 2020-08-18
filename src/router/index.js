/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Store from '../store';
import config from '../config';
import backend from './backend';
import client from './client';
import minApp from './minApp';
import app from './app';
import web from './web';
import setting from './setting';
Vue.use(VueRouter);
// 基础路由表
const routes = [
  { path: '/test', component: () => import('@/test.vue') },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login')
  },
  {
    path: '/error401',
    name: 'Error-401',
    component: () => import('@/views/error/401')
  },
  {
    path: '/error404',
    name: 'Error-404',
    component: () => import('@/views/error/404')
  }, {
    path: '*',
    redirect: '/error404'
  }
];
const routeOption = {
  mode: config.routeMode,
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
}
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
// 获取用户登录信息
let userinfo = localStorage.getItem('userinfo');
VueRouter.prototype.setRoles = setRoles;
const router = new VueRouter(routeOption);
let target = true;

if (userinfo) {
  userinfo = JSON.parse(userinfo);
  // 刷新页面时，重新加载路由表
  setRoles();
  // 页面刷新保持选项卡
  cache()
}

router.beforeEach(beforeRouter)
export default router;

/**
 * 前置路由守卫
 * @param {Object} to 目标路由
 * @param {Object} from 源路由
 * @param {Object} next 
 */
function beforeRouter(to, from, next) {
  // 获取用户信息
  let userinfo = localStorage.getItem('userinfo')
  if (userinfo) userinfo = JSON.parse(userinfo);

  // 是否需要登录权限,如果用户信息过期，清空用户信息并跳转到登录
  if (to.matched.some(e => e.meta.isAuth) && (!userinfo || userinfo.dateTime < Date.now())) {
    console.log('需要登录');
    localStorage.removeItem('userinfo')
    next('/login')
    return;
  }

  // 页面访问权限
  if (to.meta.role && userinfo.role[0] !== 0) {
    if (!userinfo || !userinfo.role.includes(to.meta.role)) {
      console.log('需要权限');
      next('/error401');
      return
    }
  }
  if (/(crm|app|minapp|web|user)/.test(to.fullPath)) {
    let title = to.meta.title;
    if (to.matched[to.matched.length - 2] && to.matched[to.matched.length - 2].meta.title) {
      title = to.matched[to.matched.length - 2].meta.title + '/' + to.meta.title;
    }
    let option = {
      name: to.name,
      fullPath: to.fullPath,
      path: to.path,
      title
    };
    Store.commit("setTabmenu", option);
  }

  next()
}

/**
 * 根据用户权限生成路由表
 * @param {Object} obj 路由对象
 * @param {Array} userinfo 用户权限
 */
function mapRouter(obj, userinfo) {
  let arr = [];
  obj.forEach(e => {
    if (userinfo.role.includes(e.meta.role)) {
      if (e.children && e.children.length) {
        arr.push({
          ...e,
          children: mapRouter(e.children, userinfo)
        });
      } else {
        arr.push(e);
      }
    }
  });
  return arr;
}
function mapRole(routes, menu, roles) {
  let arr = [];
  menu.forEach(e => {
    let obj = routes.filter(k => {
      return k.meta.role == e.id
    });
    if (obj.length) {
      if (e.children && e.children.length) {
        if (roles[0] == 0 || roles.includes(obj[0].meta.role)) {
          // 
          arr.push({
            ...obj[0],
            meta: { ...obj[0].meta, title: e.title, },
            ...e,
            children: mapRole(routes, e.children, roles)
          })
        }
      } else {
        if (roles[0] == 0 || roles.includes(obj[0].meta.role)) {
          arr.push({
            ...obj[0],
            meta: { ...obj[0].meta, title: e.title, },
            ...e,
          })
        }
      }
    }
  });
  return arr;
}

/**
 * 调用用户权限，匹配路由，并注入路由表
 * @param {Array} userinfo 用户权限
 * @param {Array} backend 后台路由 
 */
function setRoles() {
  Store.commit("setClear");
  // 获取账号信息
  let userinfo = localStorage.getItem('userinfo');
  // 获取当前所在系统，默认为： crm
  let targetIndex = sessionStorage.getItem('xitong') || 'crm';
  // 拼接路由地址
  let xitong = backend.concat(app, web, minApp, setting);
  // 解析账号信息
  if (userinfo) userinfo = JSON.parse(userinfo);
  // 匹配路由权限  
  let route = mapRole(xitong, userinfo.menu, userinfo.role);
  // 获取当前系统菜单
  let frist = route.filter(e => e.name == targetIndex);
  // 存入Vuex
  Store.commit('setUserinfo', userinfo);
  // 设置菜单缓存
  Store.commit('setMenu', frist);
  // 设置路由缓存
  Store.commit('setRoutes', route);

  if (frist[0].children && frist[0].children.length) {
    // 清空缓存后，添加首页到第一个tabs标签
    Store.commit('setTabmenu', {
      path: frist[0].children[0].path,
      fullPath: frist[0].path + '/' + frist[0].children[0].path,
      active: true,
      name: frist[0].name,
      title: frist[0].meta.title + '/' + frist[0].children[0].meta.title
    })
  }
  if (target) {
    // 动态添加一次即可
    // target = false;
    // 添加当前管理系统
    sessionStorage.setItem('xitong', targetIndex);
    router.addRoutes(route.concat(client));
  }
}
/**
 * 缓存tab选项卡
 */
function cache() {
  window.onbeforeunload = () => {
    sessionStorage.setItem("Store", JSON.stringify(Store.state));
  };
  window.addEventListener("load", () => {
    let data = sessionStorage.getItem("Store") || false;
    if (data) Store.commit("setInit", JSON.parse(data));
    sessionStorage.removeItem("Store");
  });
}




