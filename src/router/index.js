import Vue from "vue";
import VueRouter from "vue-router";
import Store from '../store'
import config from '../config';
import backend from './backend';
import client from './client';
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
// 刷新页面时，重新加载路由表
if (userinfo) {
  userinfo = JSON.parse(userinfo);
  setRoles(userinfo, backend);
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
    console.log('需要权限');
    if (!userinfo || !userinfo.role.includes(to.meta.role)) {
      console.log(!to.meta.role, !userinfo, userinfo.role, (to.meta.role));
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
    if (e.children && e.children.length) {
      arr.push({
        ...e,
        children: mapRouter(e.children, userinfo)
      });
    } else if (userinfo.role.includes(e.meta.role)) {
      arr.push(e);
    }
  });
  return arr;
}

/**
 * 调用用户权限，匹配路由，并注入路由表
 * @param {Array} userinfo 用户权限
 * @param {Array} backend 后台路由 
 */
function setRoles(userinfo, backend) {
  let children = mapRouter(backend, userinfo);
  // 存入Vuex
  Store.commit('setUserinfo', userinfo)
  Store.commit('setMenu', children)
  let routes = [
    {
      path: "/backend",
      name: "Backend",
      component: () => import("@/views/layou/backend"),
      meta: { isAuth: true },
      redirect: "backend/home",
      children,
    }
  ];
  router.addRoutes(routes.concat(client));
  return true
}




