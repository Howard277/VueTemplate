webpackJsonp([3],{"+Skk":function(e,t,n){t=e.exports=n("FZ+f")(!0),t.push([e.i,"\n.extendGroup[data-v-2d3b9ab9] {\n  float: right;\n  margin-right: 20px;\n  opacity: 0;\n}\n.el-tree-node__content:hover .extendGroup[data-v-2d3b9ab9] {\n  opacity: 1;\n}\n","",{version:3,sources:["/Users/wuketao/Public/study/github/VueTemplate/src/views/roles.vue"],names:[],mappings:";AACA;EACE,aAAa;EACb,mBAAmB;EACnB,WAAW;CACZ;AACD;EACE,WAAW;CACZ",file:"roles.vue",sourcesContent:["\n.extendGroup[data-v-2d3b9ab9] {\n  float: right;\n  margin-right: 20px;\n  opacity: 0;\n}\n.el-tree-node__content:hover .extendGroup[data-v-2d3b9ab9] {\n  opacity: 1;\n}\n"],sourceRoot:""}])},"1XJF":function(e,t,n){"use strict";function a(e){n("zFec")}Object.defineProperty(t,"__esModule",{value:!0});var r={};n.d(r,"request",function(){return l}),n.d(r,"remove",function(){return s}),n.d(r,"notAllowed",function(){return i});var o=n("gyMJ"),l={p:["get,/roles"],r:function(e){return o.a.get("/roles",{params:e})}},s={p:["delete,/role/**"],r:function(e){return o.a.get("/role/"+e.id)}},i={p:["get,/roles/notAllowed"],r:function(e){return o.a.get("/roles/notAllowed",{params:e})}},u={data:function(){return{role:r}}},c={mixins:[u],data:function(){return{list:[],canReset:!0,loading:!1}},methods:{fetchData:function(e){var t=this;this.loading=!0,l.r().then(function(e){t.list=e.data.content,t.loading=!1})},requestNotAllowed:function(){i.r()}},created:function(){this.fetchData(!0)}},d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[n("div",{staticClass:"operation"},[n("el-button",{directives:[{name:"has",rawName:"v-has",value:[e.role.request],expression:"[role.request]"}],attrs:{size:"small",type:"primary"},on:{click:e.fetchData}},[e._v("查询")]),e._v(" "),n("el-button",{directives:[{name:"has",rawName:"v-has",value:[e.role.remove],expression:"[role.remove]"}],attrs:{size:"small",type:"danger"}},[e._v("删除")]),e._v(" "),e.$_has([e.role.request])&&e.canReset?n("el-button",{attrs:{size:"small"}},[e._v("重置")]):e._e(),e._v(" "),n("el-button",{attrs:{size:"small",type:"info"},on:{click:e.requestNotAllowed}},[e._v("尝试发起越权请求")])],1),e._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,border:""}},[n("el-table-column",{attrs:{prop:"name",label:"名称",width:"120"}}),e._v(" "),n("el-table-column",{attrs:{prop:"timestamp",label:"创建时间"}}),e._v(" "),n("el-table-column",{attrs:{prop:"summary",label:"备注","show-overflow-tooltip":!0}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"info"}},[e._v("编辑")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"}},[e._v("删除")])]}}])})],1)],1)},v=[],p={render:d,staticRenderFns:v},m=p,f=n("VU/8"),b=a,h=f(c,m,!1,b,"data-v-2d3b9ab9",null);t.default=h.exports},zFec:function(e,t,n){var a=n("+Skk");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("0df2b4ac",a,!0,{})}});
//# sourceMappingURL=3.946b5babee90d49c9352.js.map