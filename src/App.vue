<style>
@import "./assets/common.css";
</style>

<template>
  <router-view id="app" @login="loginDirect" @logout="logoutDirect"></router-view>
</template>

<script>
import Vue from "vue";
import api from "./api";
import fullpath from "./router/fullpath";
import * as util from "./assets/util.js";
import config from "../config";

//请求拦截句柄
let myInterceptor;

export default {
  data() {
    return {
      menuData: null,
      userData: null
    };
  },
  methods: {
    //解析用户信息，将可访问的资源映射成为map返回
    getPermission: function(resources) {
      let resourcePermission = {};
      if (Array.isArray(resources)) {
        resources.forEach(function(e, i) {
          let key = e.resourcePath;
          resourcePermission[key] = true;
        });
      }
      return resourcePermission;
    },
    //设置拦截器
    setInterceptor: function(resourcePermission) {
      let vm = this;
      myInterceptor = api.interceptors.request.use(function(config) {
        //得到请求路径
        let perName = config.url
          .replace(config.baseURL, "")
          .replace("/GET", "")
          .replace("/POST", "")
          .split("?")[0];
        //权限格式1 /path/${param}
        let reg1 = perName.match(/^(\/[^\/]+\/)[^\/]+$/);
        if (reg1) {
          perName = reg1[1] + "**";
        }
        //权限格式2 /path/${param}/path
        let reg2 = perName.match(/^\/[^\/]+\/([^\/]+)\/[^\/]+$/);
        if (reg2) {
          perName = perName.replace(reg2[1], "*");
        }
        //校验权限
        if (!resourcePermission[config.method + "," + perName]) {
          //调试信息
          console.warn(resourcePermission, config.method + "," + perName);
          vm.$message({
            message: "无访问权限，请联系企业管理员",
            type: "warning"
          });
          //拦截请求
          return Promise.reject({
            message: "no permission"
          });
        }
        return config;
      });
    },
    getRoutes: function(resources) {
      let vm = this;
      let allowedRouter = [];
      //将菜单数据转成多维数组格式
      let arrayMenus = util.buildMenu(resources);
      //将多维数组转成对象格式
      let hashMenus = {};
      let setMenu2Hash = function(array, base) {
        array.map(key => {
          if (key.resourcePath) {
            let hashKey = ((base ? base + "/" : "") + key.resourcePath).replace(
              /^\//,
              ""
            );
            hashMenus["/" + hashKey] = true;
            // if (Array.isArray(key.children)) {
            //   setMenu2Hash(key.children, key.resourcePath);
            // }
          }
        });
      };
      setMenu2Hash(arrayMenus);
      //全局挂载hashMenus，用于实现路由守卫
      this.$root.hashMenus = hashMenus;
      //筛选本地路由方法
      let findLocalRoute = function(array, base) {
        let replyResult = [];
        array.forEach(function(route) {
          let pathKey = (base ? base + "/" : "") + route.path;
          if (hashMenus[pathKey]) {
            if (Array.isArray(route.children)) {
              route.children = findLocalRoute(route.children, route.path);
            }
            replyResult.push(route);
          }
        });
        if (base) {
          return replyResult;
        } else {
          allowedRouter = allowedRouter.concat(replyResult);
        }
      };
      let originPath = util.deepcopy(fullpath[0].children);
      findLocalRoute(originPath);
      return allowedRouter;
    },
    extendRoutes: function(allowedRouter) {
      let vm = this;
      let actualRouter = util.deepcopy(allowedRouter);
      actualRouter.map(e => {
        //复制子菜单信息到meta用于实现导航相关效果，非必需
        if (e.children) {
          if (!e.meta) e.meta = {};
          e.meta.children = e.children;
        }
        //为动态路由添加独享守卫
        return (e.beforeEnter = function(to, from, next) {
          if (vm.$root.hashMenus[to.path]) {
            next();
          } else {
            next("/401");
          }
        });
      });
      let originPath = util.deepcopy(fullpath);
      originPath[0].children = actualRouter;
      //注入404路由，所有其他请求默认路由到404
      vm.$router.addRoutes(
        originPath.concat([
          {
            path: "*",
            redirect: "/404"
          }
        ])
      );
    },
    //登录操作
    signin: function(callback) {
      let vm = this;
      //首先检查session中的ticket是否存在
      let ticket = util.session("ticket");
      if (!ticket) {
        //如果session中的ticket不存在，表明还未登录。
        //未登录的情况下，判断url中是否有ticket参数
        let queryTicket = this.$route.query.ticket;
        if (!queryTicket) {
          //如果都没有，则需要重定向到 统一授权系统的登录界面
          window.location.href =
            process.env.uamRootUrl +
            "?targetAppCode=" +
            process.env.targetAppCode +
            "&targetUrl=http://localhost:" +
            process.env.port +
            "/";
          return;
        } else {
          //如果有新ticket，就赋值。
          ticket = queryTicket;
        }
      }
      //设置请求头统一携带token
      //api.defaults.headers.common['Authorization'] = 'Bearer ' + localUser;
      //获取用户信息及权限数据
      api
        .get(`/login/checkTicket`, {
          params: {
            ticket: ticket
          }
        })
        .then(res => {
          let userInfo = res.data;
          //取得资源权限对象
          let resourcePermission = vm.getPermission(
            userInfo.commission_resource_list
          );
          //使用资源权限设置请求拦截
          //vm.setInterceptor(resourcePermission);
          //获得实际路由
          let allowedRouter = vm.getRoutes(userInfo.commission_resource_list);
          //若无可用路由限制访问
          if (!allowedRouter || !allowedRouter.length) {
            util.session("ticket", "");
            return (document.body.innerHTML =
              "<h1>账号访问受限，请联系系统管理员！</h1>");
          }
          //动态注入路由
          vm.extendRoutes(allowedRouter);
          //保存数据用作他处，非必需
          vm.menuData = allowedRouter;
          vm.userData = userInfo.user;
          //权限检验方法
          // Vue.prototype.$_has = function(rArray) {
          //   let resources = [];
          //   let permission = true;
          //   //提取权限数组
          //   if (Array.isArray(rArray)) {
          //     rArray.forEach(function(e) {
          //       resources = resources.concat(e.p);
          //     });
          //   } else {
          //     resources = resources.concat(rArray.p);
          //   }
          //   //校验权限
          //   resources.forEach(function(p) {
          //     if (!resourcePermission[p]) {
          //       return permission = false;
          //     }
          //   });
          //   return permission;
          // }

          //执行回调
          this.$router.push("/"); //登录成功，跳到首页
        });
    },
    //登录
    loginDirect: function(newPath) {
      this.signin(() => {
        //跳转到新路径或跟路径
        this.$router.replace({ path: newPath || "/" });
      });
    },
    //退出
    logoutDirect: function() {
      //清除session
      util.session("ticket", "");
      //清除请求权限控制
      // api.interceptors.request.eject(myInterceptor);
      //清除菜单权限
      this.$root.hashMenus = {};
      //清除请求头token
      api.defaults.headers.common["Authorization"] = "";
      //回到登录页
      window.location.href =
        process.env.uamRootUrl +
        "login/logout?targetAppCode=" +
        process.env.targetAppCode +
        "&targetUrl=http://localhost:" +
        process.env.port +
        "/";
    }
  },
  created: function(newPath) {
    this.signin();
  }
};
</script>