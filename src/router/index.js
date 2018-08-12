import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login.vue'
Vue.use(Router);

let baseRoute = [{
  path: '/login',
  name: '登录',
  component: login
}, {
  path: '/401',
  name: '无权访问',
  component: (resolve) => require(['../views/common/401.vue'], resolve)
}, {
  path: '/404',
  name: '找不到页面',
  component: (resolve) => require(['../views/common/404.vue'], resolve)
}];

let router = new Router({
  mode: 'history',
  routes: baseRoute
});

router.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + 'Vue-Access-Control';
  next();
});

export default router;
