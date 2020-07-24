import Vue from "vue";
import VueRouter from "vue-router";
import Store from '../store';
import config from '../config';
import backend from './backend';
import client from './client';
import minApp from './minApp';
import app from './app';
import web from './web';
Vue.use(VueRouter);
// 基础路由表
const routes = [
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
// 
let userinfo = localStorage.getItem('userinfo');
VueRouter.prototype.setRoles = setRoles;
const router = new VueRouter(routeOption);
let target = [];
// 刷新页面时，重新加载路由表
if (userinfo) {
  userinfo = JSON.parse(userinfo);
  setRoles();
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
  if (to.meta.role) {
    if (!userinfo || !userinfo.role.includes(to.meta.role)) {
      console.log('需要权限');
      next('/error401');
      return
    }
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

/**
 * 调用用户权限，匹配路由，并注入路由表
 * @param {Array} userinfo 用户权限
 * @param {Array} backend 后台路由 
 */
function setRoles() {
  let userinfo = localStorage.getItem('userinfo');
  let targetIndex = sessionStorage.getItem('xitong') || 'crm';
  let xitong = backend;
  if (userinfo) userinfo = JSON.parse(userinfo);
  if (targetIndex == 'crm') xitong = backend;
  if (targetIndex == 'app') xitong = app;
  if (targetIndex == 'web') xitong = web;
  if (targetIndex == 'minapp') xitong = minApp;
  let children = mapRouter(xitong, userinfo);
  // 存入Vuex
  Store.commit('setUserinfo', userinfo);
  Store.commit('setMenu', children);
  let routes = [
    {
      path: "/" + targetIndex,
      name: targetIndex.charAt(0).toUpperCase() + targetIndex.slice(1),
      component: () => import("@/views/layou/backend"),
      meta: { keepAlive: true, isAuth: true },
      redirect: targetIndex + '/' + children[0].path,
      children,
    }
  ];
  if (!target.includes(targetIndex)) {
    target.push(targetIndex)
    router.addRoutes(routes.concat(client));
  }
}




