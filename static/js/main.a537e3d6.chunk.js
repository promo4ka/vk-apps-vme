(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{205:function(e,t,a){e.exports=a(376)},304:function(e,t,a){},311:function(e,t){},313:function(e,t){},376:function(e,t,a){"use strict";a.r(t);a(206),a(256);var s=a(2),o=a.n(s),n=a(38),c=a.n(n),i=a(30),l=a.n(i),r=a(136),p=a(137),u=a(143),m=a(138),d=a(144),h=a(50),b=a(28),f=(a(287),a(140)),v=a.n(f),k=a(141),E=(a(304),function(e){var t=e.id,a=e.go,s=e.fetchedUser,n=e.stories,c=e.viewstories;return o.a.createElement(b.d,{id:t},o.a.createElement(b.c,{className:"wrapper"},o.a.createElement("h1",{className:"mh1"},s&&s.first_name,","),o.a.createElement("h2",{className:"mh2"},"\u0441\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0442\u043e,",o.a.createElement("br",null)," \u0447\u0442\u043e \u0442\u044b \u0435\u0441\u0442\u044c!"),o.a.createElement("p",{className:"heart"},"\u2764")),o.a.createElement(b.c,{className:"center"},o.a.createElement(b.b,Object(k.a)({size:"xl",level:"commerce",className:"mnext",onClick:a},"size","l"),"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0434\u0430\u043b\u044c\u0448\u0435")),c&&o.a.createElement(b.c,{className:"mfooter center"},o.a.createElement(b.b,{level:"secondary",onClick:n,size:"l"},"\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0438\u0441\u0442\u043e\u0440\u0438\u0435\u0439"),o.a.createElement(b.c,{className:"stories-text"},"\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0438\u0434\u0435\u044e, \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u0432 \u0438\u0441\u0442\u043e\u0440\u0438\u044e.")))}),w=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).closePopout=function(){a.setState({popout:null})},a.savepopout=function(){a.setState({popout:o.a.createElement(b.a,{onClose:a.closePopout},o.a.createElement("h2",{className:"hi",style:{color:"black",margin:"0px"}},"\u0421\u043f\u0430\u0441\u0438\u0431\u043e \ud83d\ude0f"))}),setTimeout(function(){a.setState({popout:null})},1500)},a.go=function(){l.a.send("VKWebAppShare",{link:"https://vk.com/heyclickme"})},a.state={activePanel:"home",fetchedUser:null,viewstories:!0,popout:null},a.stories=a.stories.bind(Object(h.a)(Object(h.a)(a))),a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this;l.a.subscribe(function(t){switch(t.detail.type){case"VKWebAppGetUserInfoResult":e.setState({fetchedUser:t.detail.data});break;default:console.log(t.detail.type)}}),l.a.send("VKWebAppGetUserInfo",{}),l.a.send("VKWebAppSetViewSettings",{status_bar_style:"dark",action_bar_color:"#fff"})}},{key:"stories",value:function(e){var t=this;if(0!=this.viewstories){console.log("send stories");var a=this;l.a.send("VKWebAppGetAuthToken",{app_id:7112983,scope:"stories"}),l.a.subscribe(function(e){console.log(e),"VKWebAppAccessTokenReceived"===e.detail.type?l.a.send("VKWebAppCallAPIMethod",{method:"stories.getPhotoUploadServer",params:{link_text:"open",link_url:"https://vk.com/heyclickme",add_to_news:1,v:"5.92",access_token:e.detail.data.access_token}}):"VKWebAppCallAPIMethodResult"===e.detail.type&&(v.a.post("https://api.imrz.ru/stories.php",{upload_url:e.detail.data.response.upload_url}),a.setState({viewstories:!1}),t.savepopout())})}}},{key:"render",value:function(){return o.a.createElement(b.e,{popout:this.state.popout,activePanel:this.state.activePanel},o.a.createElement(E,{id:"home",fetchedUser:this.state.fetchedUser,go:this.go,viewstories:this.state.viewstories,stories:this.stories}))}}]),t}(o.a.Component),y=a(142),_=a.n(y);l.a.send("VKWebAppInit",{}),c.a.render(o.a.createElement(w,null),document.getElementById("root")),_.a.publish("dist",{branch:"master",repo:"https://github.com/promo4ka/heyclickme.git"})}},[[205,1,2]]]);