(window.webpackJsonpCKEditor5=window.webpackJsonpCKEditor5||[]).push([[12],{398:function(e,t,a){},471:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(94),i=a(396),l=a(18),o=a(62),u=a.n(o),g=a(35),s=a(37),p=a(96),b=a.n(p),d=(a(398),a(54)),f=function(e){if(!e)return"";var t=e.toLowerCase();return t=(t="@"+(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=t.replace(/[\xe1\xe0\u1ea3\u1ea1\xe3\u0103\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\xe2\u1ea5\u1ea7\u1ea9\u1eab\u1ead]/gi,"a")).replace(/[\xe9\xe8\u1ebb\u1ebd\u1eb9\xea\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7]/gi,"e")).replace(/[i\xed\xec\u1ec9\u0129\u1ecb]/gi,"i")).replace(/[\xf3\xf2\u1ecf\xf5\u1ecd\xf4\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u01a1\u1edb\u1edd\u1edf\u1ee1\u1ee3]/gi,"o")).replace(/[\xfa\xf9\u1ee7\u0169\u1ee5\u01b0\u1ee9\u1eeb\u1eed\u1eef\u1ef1]/gi,"u")).replace(/[\xfd\u1ef3\u1ef7\u1ef9\u1ef5]/gi,"y")).replace(/\u0111/gi,"d")).replace(/[`~!@#|$%^&()+=,.\/?><'":;_]/gi,"")).replace(/ /gi,"-")).replace(/\-\-\-\-\-/gi,"-")).replace(/\-\-\-\-/gi,"-")).replace(/\-\-\-/gi,"-")).replace(/\-\-/gi,"-"))+"@").replace(/\@\-|\-\@|\@/gi,"")},m=a(84),h=a(21),E=b()({loader:function(){return a.e(6).then(a.bind(null,466))},loading:m.a}),v=b()({loader:function(){return Promise.all([a.e(0),a.e(7)]).then(a.bind(null,467))},loading:m.a}),w=i.a.TabPane;t.default=Object(s.b)((function(e){return{global:e.global}}),(function(e){return{dispatch:e}}))(Object(g.c)(Object(c.b)((function(e){var t=e.platform,a=e.match.params.tab,c=e.dispatch,o=e.global,g=t.isMobile?"top":"left",s=o.categories||[];return Object(n.useEffect)((function(){0===s.length&&u()({mehod:"GET",url:"".concat(d.a.API_URL,"/categories/")}).then((function(e){e.data.results.categories&&c(Object(h.c)({categories:e.data.results.categories}))})).catch((function(e){return console.log(e)}))}),[]),r.a.createElement("div",{className:"".concat("home")},r.a.createElement(i.a,{tabPosition:g,activeKey:a||"trang-chu"},r.a.createElement(w,{key:"trang-chu",tab:t.isMobile?r.a.createElement(l.b,{to:"/"},"Hot"):""},r.a.createElement(E,null)),function(e,t){var a=null;return e&&e.length>0&&(a=e.map((function(e,a){var n=e.name,c=e._id;return r.a.createElement(w,{key:f(n),tab:r.a.createElement(l.b,{to:"/category/".concat(f(n))},n)},r.a.createElement(v,{idCategory:c,tab:t}))}))),a}(s,a)))}))))}}]);
//# sourceMappingURL=12.a1336c80.chunk.js.map