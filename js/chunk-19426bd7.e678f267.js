(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-19426bd7"],{"08ad":function(t,s,e){"use strict";var a=e("83cf"),i=e.n(a);i.a},"0ac2":function(t,s,e){"use strict";var a=e("4e6c"),i=e.n(a);i.a},"4e6c":function(t,s,e){},5020:function(t,s,e){},"83cf":function(t,s,e){},"9f25":function(t,s,e){"use strict";var a=e("5020"),i=e.n(a);i.a},ec2d:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"home"}},[e("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}}),e("Carousel"),e("Content")],1)},i=[],c=e("cebc"),o=e("2f62"),n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"carousel slide",attrs:{id:"carousel","data-ride":"carousel"}},[e("ol",{staticClass:"carousel-indicators"},t._l(3,function(t){return e("li",{class:{active:1===t},attrs:{"data-target":"#carousel","data-slide-to":t-1}})}),0),e("div",{staticClass:"carousel-inner"},t._l(t.carousel,function(s,a){return e("div",{staticClass:"carousel-item",class:{active:0===a},style:{"background-image":"url("+s.coverImg+")"}},[e("div",{staticClass:"carousel-caption d-none d-md-block"},[e("h5",[t._v(t._s(s.title))]),e("p",[t._v(t._s(s.content))])])])}),0),t._m(0),t._m(1)])},l=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("a",{staticClass:"carousel-control-prev",attrs:{href:"#carousel",role:"button","data-slide":"prev"}},[e("span",{staticClass:"carousel-control-prev-icon",attrs:{"aria-hidden":"true"}}),e("span",{staticClass:"sr-only"},[t._v("Previous")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("a",{staticClass:"carousel-control-next",attrs:{href:"#carousel",role:"button","data-slide":"next"}},[e("span",{staticClass:"carousel-control-next-icon",attrs:{"aria-hidden":"true"}}),e("span",{staticClass:"sr-only"},[t._v("Next")])])}],r={data:function(){return{carousel:[{coverImg:"https://images.unsplash.com/photo-1543023177-2ef21c4a514e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",title:"歡慶母親節",content:"獻給生命中最親愛的母親，讓溫情的五月，充滿最真摯的感恩。"},{coverImg:"https://images.unsplash.com/photo-1477901492169-d59e6428fc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",title:"台北新店舖開幕優惠",content:"現在加入會員，即刻取得 5 折禮券"},{coverImg:"https://images.unsplash.com/photo-1524275461690-a79bfeaf1f3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",title:"夏季選品搶先購",content:"精選男裝、女裝，通通 8.5 折"}]}}},u=r,d=(e("0ac2"),e("2877")),_=Object(d["a"])(u,n,l,!1,null,null,null),v=_.exports,f=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"content"}},[e("section",{staticClass:"latest_box"},[t._m(0),e("ul",t._l(t.products.slice(0,3),function(s){return e("li",{key:s.id,staticClass:"product_card"},[e("div",{staticClass:"card_img",style:{"background-image":"url("+s.imageUrl+")"}}),e("div",{staticClass:"card_content"},[e("h5",{staticClass:"card_title"},[t._v(t._s(s.title))]),e("p",{staticClass:"card_text"},[t._v(t._s(s.description))]),e("del",{staticClass:"origin_price"},[t._v("原價 "+t._s(t._f("currency")(s.origin_price)))]),e("div",{staticClass:"discount_price"},[t._v("售價 "+t._s(t._f("currency")(s.price)))])]),e("div",{staticClass:"card_buttons"},[e("button",{staticClass:"btn_more btn btn-sm",attrs:{type:"button"},on:{click:function(e){return t.setProductDetail(s.id)}}},[e("span",[t._v("了解更多")])])])])}),0)]),e("section",{staticClass:"services_box"},[t._m(1),e("ul",t._l(t.services,function(s){return e("li",{staticClass:"service_item"},[e("div",{staticClass:"service_icon"},[e("i",{class:s.serviceIcon})]),e("div",{staticClass:"service_title_eng"},[t._v(t._s(s.titleEng))]),e("div",{staticClass:"service_title_ch"},[t._v(t._s(s.titleCh))])])}),0)]),e("section",{staticClass:"dialog_box",style:{"background-image":"url("+t.dialog.dialogImg+")"}},[e("div",{staticClass:"dialog_overlay"}),e("div",{staticClass:"dialog_content"},[e("div",{staticClass:"dialog_title"},[t._v(t._s(t.dialog.title))]),e("div",{staticClass:"dialog_text"},[t._v(t._s(t.dialog.content))])])])])},p=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"section_title"},[e("h2",[t._v("新品上市")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"section_title"},[e("h2",[t._v("我們的服務")])])}],h={data:function(){return{services:[{serviceIcon:"fas fa-shipping-fast",titleEng:"FAST DELIVERY",titleCh:"快速出貨"},{serviceIcon:"fas fa-money-check-alt",titleEng:"FREE SHIPPING",titleCh:"滿額免運"},{serviceIcon:"fas fa-plane",titleEng:"JAPAN FASHION",titleCh:"日本同步"},{serviceIcon:"fas fa-gifts",titleEng:"FREE REFUND",titleCh:"免費退貨"}],dialog:{dialogImg:"https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",title:"給您極上的衣著體驗",content:"我們致力於提升衣服的材質，精心打造兼具舒適及時尚的平價逸品。"}}},methods:Object(c["a"])({},Object(o["b"])("shopModule",["loadProductDetail"]),{setProductDetail:function(t){this.loadProductDetail(t),this.$router.push("/yustyleshop/".concat(t))}}),computed:Object(c["a"])({},Object(o["d"])("shopModule",["products"]))},g=h,m=(e("9f25"),Object(d["a"])(g,f,p,!1,null,null,null)),b=m.exports,C={components:{Carousel:v,Content:b},methods:Object(c["a"])({},Object(o["c"])(["updateLoading"]),Object(o["b"])("shopModule",["loadProductsInShop"])),computed:Object(c["a"])({},Object(o["d"])(["isLoading"])),created:function(){this.updateLoading(!0),this.loadProductsInShop()}},E=C,y=(e("08ad"),Object(d["a"])(E,a,i,!1,null,null,null));s["default"]=y.exports}}]);
//# sourceMappingURL=chunk-19426bd7.e678f267.js.map