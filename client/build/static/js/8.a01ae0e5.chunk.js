(window.webpackJsonpCKEditor5=window.webpackJsonpCKEditor5||[]).push([[8],{374:function(t,e,a){"use strict";a.d(e,"a",(function(){return c}));var c=function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},409:function(t,e,a){},410:function(t,e,a){},461:function(t,e,a){"use strict";a.r(e);var c=a(46),n=a(165),r=a(0),o=a.n(r),s=a(62),l=a.n(s),i=a(35),u=a(372),m=a(31),d=(a(409),a(18)),h=(a(410),a(54)),p=a(374),E=Object(i.c)((function(t){var e=t.product_id,a=t.productPrice,c=t.productImages,n=t.productName,r=(t.quantity,t.cookies),s=t.setCart,i=r.cookies.accessToken;return o.a.createElement("div",{className:"".concat("cart-item")},o.a.createElement("img",{src:"".concat(h.a.API_IMAGES).concat(c[0])}),o.a.createElement("div",{className:"".concat("cart-item","-info")},o.a.createElement(d.b,{to:"/product-detail/".concat(e)},n),o.a.createElement("span",null,"".concat(Object(p.a)(a),"\u0111")),o.a.createElement("div",{className:"".concat("cart-item","-btn")},o.a.createElement(m.a,{type:"danger",onClick:function(){l()({method:"DELETE",url:"".concat(h.a.API_URL,"/carts/delete-product"),headers:{authorization:"Bearer ".concat(i)},data:{product_id:e}}).then((function(t){t.data.results&&(s(t.data.results),u.a.success("X\xf3a s\u1ea3n ph\u1ea9m th\xe0nh c\xf4ng !"))})).catch((function(t){return u.a.error("X\xf3a kh\xf4ng th\xe0nh c\xf4ng !")}))}},"X\xf3a"))))}));a(84),e.default=function(t){Object(n.a)(t);var e=Object(i.b)("cookies"),a=Object(c.a)(e,3),s=a[0],d=(a[1],a[2],Object(r.useState)([])),f=Object(c.a)(d,2),g=f[0],b=f[1],v=s.accessToken;return Object(r.useEffect)((function(){l()({method:"GET",url:"".concat(h.a.API_URL,"/carts/"),headers:{authorization:"Bearer ".concat(v)}}).then((function(t){t.data.results.listItems&&b(t.data.results)})).catch((function(t){return console.log(t)}))}),[JSON.stringify(g)]),o.a.createElement("div",{className:"".concat("cart")},o.a.createElement("p",null,"gi\u1ecf h\xe0ng",o.a.createElement("span",null,"(",g.listItems?g.listItems.length:0," s\u1ea3n ph\u1ea9m)")),o.a.createElement("div",{className:"".concat("cart","-content")},g.listItems&&function(t,e){var a=null;return t&&t.length>0&&(a=t.map((function(t,a){return o.a.createElement(E,Object.assign({key:a},t,{setCart:e}))}))),a}(g.listItems,b),!g.listItems&&o.a.createElement("div",{className:"".concat("cart","-empty")},"Gi\u1ecf h\xe0ng r\u1ed7ng !")),o.a.createElement("div",{className:"".concat("cart","-payment-side")},o.a.createElement("div",{className:"".concat("cart","-payment")},o.a.createElement("div",{className:"".concat("cart","-temp")},o.a.createElement("span",null,"T\u1ea1m t\xednh:"),o.a.createElement("span",null,"".concat(Object(p.a)(function(t){return t.total_money}(g)||0),"\u0111"))),o.a.createElement("span",null),o.a.createElement("div",{className:"".concat("cart","-real")},o.a.createElement("span",null,"Th\xe0nh ti\u1ec1n (\u0110\xe3 c\xf3 gi\u1ea3m gi\xe1):"),o.a.createElement("span",null,"".concat(Object(p.a)(function(t){return t.total_money}(g)||0),"\u0111")))),o.a.createElement("div",{className:"".concat("cart","-btn")},o.a.createElement(m.a,{type:"danger",style:{marginTop:"1.5rem",width:"80%"},onClick:function(){l()({method:"PATCH",url:"".concat(h.a.API_URL,"/carts/pay"),headers:{authorization:"Bearer ".concat(v)}}).then((function(t){u.a.success("Giao d\u1ecbch th\xe0nh c\xf4ng !")})).catch((function(t){return console.log(t)}))}},"Thanh to\xe1n"))))}}}]);
//# sourceMappingURL=8.a01ae0e5.chunk.js.map