webpackJsonp([0],{"8dlZ":function(e,t,a){"use strict";function n(e){a("yOqU")}Object.defineProperty(t,"__esModule",{value:!0});var o=a("qsHl"),r={data:function(){return{goods:o}}},l={mixins:[r],data:function(){return{list:[],loading:!1,canReset:!1}},methods:{fetchData:function(){var e=this;e.loading=!0,o.request.r(e.queryParam).then(function(t){e.list=t.data.content,e.loading=!1})},requestNotAllowed:function(){o.notAllowed.r()}},created:function(){this.fetchData()}},s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[a("div",{staticClass:"operation"},[a("el-button",{directives:[{name:"has",rawName:"v-has",value:[e.goods.request],expression:"[goods.request]"}],attrs:{size:"small",type:"primary"},on:{click:e.fetchData}},[e._v("查询")]),e._v(" "),a("el-button",{directives:[{name:"has",rawName:"v-has",value:[e.goods.remove],expression:"[goods.remove]"}],attrs:{size:"small",type:"danger"}},[e._v("删除")]),e._v(" "),e.$_has([e.goods.request])&&e.canReset?a("el-button",{attrs:{size:"small"}},[e._v("重置")]):e._e(),e._v(" "),a("el-button",{attrs:{size:"small",type:"info"},on:{click:e.requestNotAllowed}},[e._v("尝试发起越权请求")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,border:""}},[a("el-table-column",{attrs:{prop:"number",label:"商品编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"商品名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pinyin",label:"拼音识别码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"barcode",label:"条形码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"standard",label:"规格型号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"creation_time_beauty",label:"创建时间",align:"center"}})],1)],1)},i=[],u={render:s,staticRenderFns:i},c=u,d=a("VU/8"),v=n,p=d(l,c,!1,v,"data-v-4449cbba",null);t.default=p.exports},CHvK:function(e,t,a){t=e.exports=a("FZ+f")(!0),t.push([e.i,"\n\n","",{version:3,sources:[],names:[],mappings:"",file:"goods-list.vue",sourceRoot:""}])},qsHl:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"request",function(){return o}),a.d(t,"remove",function(){return r}),a.d(t,"notAllowed",function(){return l});var n=a("gyMJ"),o={p:["get,/medications"],r:function(e){return n.a.get("/medications",{params:e})}},r={p:["delete,/medication/**"],r:function(e){return n.a.delete("/medication/"+e.id)}},l={p:["get,/roles/notAllowed"],r:function(e){return n.a.get("/roles/notAllowed",{params:e})}}},yOqU:function(e,t,a){var n=a("CHvK");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("31fe1a9b",n,!0,{})}});
//# sourceMappingURL=0.5a5d77e3be0baf6a566a.js.map