<style scoped>
.g-body {
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  padding: 110px 20px 0 270px;
}

.g-statues-bar {
  width: 100%;
  height: 40px;
  background: #fff;
}

.g-statues-bar .bread {
  line-height: 40px;
}

.g-side {
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 230px;
  height: 100%;
  padding-top: 55px;
  border-right: 1px solid #dedede;
  overflow-y: auto;
}

.g-head {
  position: fixed;
  z-index: 91;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  line-height: 55px;
  background: #545c64;
}

.logo {
  float: left;
  text-align: center;
  width: 270px;
  font-size: 1.4em;
  text-decoration: none;
  color: #fff;
}

.nav {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.usermenu {
  float: right;
  padding: 0 2em;
  color: #fff;
}
.usermenu a {
  text-decoration: none;
  margin: 0 0.2em 0 1em;
  color: inherit;
}
#main {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 15px;
  padding-right: 15px;
}
</style>

<template>
  <div>
    <!--菜单抬头部分-->
    <el-menu :default-active="activeMenu" router 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"  mode="horizontal">
      <a href="javascript:;" class="logo" >统一授权管理系统</a>
      <template v-for="(route, index) in menus">
        <template v-if="route.children">
          <el-submenu :key="index" :index="route.name">
            <template slot="title">
              {{route.meta.name || route.name}}</template>
            <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute"><i class="ion menuIcon" v-html="cRoute.meta.icon"></i>{{cRoute.meta.name || cRoute.name}}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :route="route" :index="route.name">{{route.meta.name || route.name}}</el-menu-item>
        </template>
      </template>
      <template>
        <div class="nav">
        <div class="usermenu" v-if="user.loginName">
          你好，{{user.userName}}
          <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
          <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
        </div>
      </div>
      </template>
    </el-menu>
    <!--内容主体部分-->
    <div id="main">
      <div class="g-statues-bar">
        <el-breadcrumb separator="/" class="bread" id="mybread">
          <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
            {{ item.meta.name || item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <template v-if="$route.path=='/'">
        <dashboard />
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
    </div>
  </div>
</template>
<script>
import instance from "../api";
import { changePw } from "../api/account";

export default {
  components: {
    dashboard: () => import("../components/dashboard.vue")
  },
  data() {
    return {
      user: {},
      menus: []
    };
  },
  computed: {
    activeMenu: function() {
      return this.$route.name;
    },
    breadcrumbs: function() {
      return (this.$route && this.$route.matched) || [];
    }
  },
  methods: {
    logout: function() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$emit("logout");
        })
        .catch(() => {});
    }
  },
  //从父级节点获取数据
  created: function() {
    let user = this.$parent.userData;
    if (user) {
      this.user = user;
    } else {
      this.$router.push({ path: "/" });
    }
    let menus = this.$parent.menuData;
    if (menus) {
      this.menus = menus;
    }
  }
};
</script>
