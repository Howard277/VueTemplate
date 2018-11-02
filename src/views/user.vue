<template>
    <div v-loading="loading">
    <!-- 操作 -->
    <div class="operation">
      <el-button size="small" type="primary" @click="toggleSearchRegion"><i class="el-icon-search"></i>&nbsp;&nbsp;搜索</el-button>
      <el-button size="small" type="danger" >删除</el-button>
      <!-- <el-button size="small" v-if="canReset">重置</el-button> -->
      <!-- <el-button size="small" type="info" @click="requestNotAllowed">尝试发起越权请求</el-button> -->
    </div>
    <div v-if="showSearchRegion">
      <span>登录名：</span>
      <el-input size="mini" v-model="queryData.loginName" style="width:200px;"></el-input>
      <br/>
      <span>用户名：</span>
      <el-input size="mini" v-model="queryData.userName" style="width:200px;"></el-input>
      <br/>
      <span>机构编码：</span>  
      <el-input size="mini" v-model="queryData.orgCode" style="width:200px;"></el-input>
      <br/>
      <span>机构名称：</span>  
      <el-input size="mini" v-model="queryData.orgName" style="width:200px;"></el-input>  
      <br/>
      <el-button size="small" @click="fetchData" type="primary">查询</el-button>
      <el-button size="small" @click="resetQueryCondition" type="primary">重置</el-button>
    </div>
    <br/>
    <!-- table start  -->
    <el-table :data="dataList" border highlight-current-row stripe style="width: 100%">
      <el-table-column type="index" lable="No." width="50">
      </el-table-column>
      <el-table-column prop="loginName" label="登录名" width="120">
      </el-table-column>
      <el-table-column prop="userName" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="orgCode" label="机构编码" width="200">
      </el-table-column>
      <el-table-column prop="orgName" label="机构名称" width="120">
      </el-table-column>
      <el-table-column prop="enable" :formatter="formatEnable" label="是否有效" width="120">
      </el-table-column>
      <el-table-column prop="creator" label="创建人" width="180">
      </el-table-column>
      <el-table-column prop="createTime" :formatter="formatDate" label="创建时间" width="200">
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="sizes, prev, pager, next"
        :total="pagination.totalElements"
        :page-size="pagination.pageSize"
        :page-sizes="[10, 20, 30, 40, 50]"
        :current-page.sync="pagination.currentPage"     
        @size-change="fetchData"
        @current-change="fetchData">
    </el-pagination>
    <!-- table end  -->
  </div>
</template>

<script>
import apiUser from "../api/user";

export default {
  data() {
    return {
      dataList: [],
      pagination: {
        pageSize: 10,
        totalElements: 0,
        currentPage: 1
      },
      loading: false,
      queryData: {
        loginName: "",
        userName: "",
        orgCode: "",
        orgName: ""
      },
      showSearchRegion: false //搜索区域显示控制
    };
  },
  methods: {
    fetchData: function() {
      this.loading = true;
      var queryParams = {
        pageIndex: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        loginName: this.queryData.loginName,
        userName: this.queryData.userName,
        orgCode: this.queryData.orgCode,
        orgName: this.queryData.orgName
      };
      apiUser.userPageOfJSON(queryParams).then(res => {
        this.dataList = res.data.content;
        this.pagination.totalElements = res.data.totalElements;
      });
      this.loading = false;
    },
    //切换搜索区域显示
    toggleSearchRegion: function() {
      this.showSearchRegion = this.showSearchRegion ? false : true;
    },
    formatDate: function(row, column, value, index) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    formatEnable: function(row, column, value, index) {
      if (value === "ENABLED") {
        return "有效";
      } else {
        return "无效";
      }
    },
    //重置查询条件
    resetQueryCondition: function() {
      this.queryData.loginName = "";
      this.queryData.userName = "";
      this.queryData.orgCode = "";
      this.queryData.orgName = "";
    }
  },
  created() {
    //初始化数据
    this.fetchData();
  }
};
</script>