webpackJsonp([9],{XjX3:function(t,e,n){var s=n("k1JT");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n("rjj0")("6ca7f376",s,!0,{})},k1JT:function(t,e,n){e=t.exports=n("FZ+f")(!0),e.push([t.i,"\n\n","",{version:3,sources:[],names:[],mappings:"",file:"dashboard-goods.vue",sourceRoot:""}])},zY3m:function(t,e,n){"use strict";function s(t){n("XjX3")}Object.defineProperty(e,"__esModule",{value:!0});var o=n("qsHl"),r={data:function(){return{list:[]}},methods:{fetchData:function(){var t=this;o.request.r().then(function(e){t.list=e.data.content})}},created:function(){this.fetchData()}},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h4",[t._v("商品数量")]),t._v(" "),n("p",[t._v("共有 "),n("strong",[t._v(t._s(t.list.length))]),t._v(" 件商品。")])])},i=[],c={render:a,staticRenderFns:i},u=c,l=n("VU/8"),f=s,d=l(r,u,!1,f,null,null);e.default=d.exports}});
//# sourceMappingURL=9.94246af83b2b998df18f.js.map