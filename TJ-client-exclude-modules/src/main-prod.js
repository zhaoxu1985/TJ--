// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vant from 'vant';
// import 'vant/lib/index.css';
import VueSocketIO from 'vue-socket.io'
import ClientSocketIO from 'socket.io-client'
// import axios from 'axios'
import TableBar from './components/tableBar.vue'  //全局的底部tablebar组件


import { Lazyload } from 'vant';
import { List } from 'vant';
import { Toast } from 'vant';
// vue-touch
import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });

Vue.component("table-bar", TableBar); // 直接使用即可 <table-bar></table-bar>

axios.defaults.validateStatus = status=> true
axios.defaults.baseURL = 'https://tj.testw.top/v1'
Vue.prototype.$axios=axios

Vue.use(new VueSocketIO({
  debug: false,
  connection: ClientSocketIO.connect('https://kf.testw.top',{
    autoConnect: false,
    transports: ['websocket'],
    auth: {
      imgPath: window.localStorage.getItem('headImg'),
      uid: window.localStorage.getItem('uid'), //用户的uid
      uname:sessionStorage.getItem('username')
    }
  }), //连接服务端
}))

//获取年月日 格式 ` 2020-01-01`  
Vue.prototype.$getDate = () => {
  let now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth() + 1;
  let d = now.getDate();
  m >= 10 ? "" : (m = "0" + (now.getMonth() + 1));
  d >= 10 ? "" : (d = "0" + now.getDate());
  return `${y}-${m}-${d}`;
};

//获取时间    格式 ` 00:00`
Vue.prototype.$getTime = () => {
  let now = new Date();
  let hh = now.getHours();
  let mm = now.getMinutes();
  // hh == 00 ? hh = 24 : ''
  hh >= 10 ? "" : (hh = "0" + hh);
  mm >= 10 ? "" : (mm = "0" + mm);
  return `${hh}:${mm}`;
};
Vue.prototype.$bus = new Vue()

// 请求拦截器
axios.interceptors.request.use(function(config){
	//在发出请求之前进行信息的判断、设置等等
    config.headers.token=window.localStorage.getItem('token')
    return config
},function(err){
    
})



Vue.prototype.$loading = (label)=>{
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: label,
  });
}

// 响应拦截器
axios.interceptors.response.use(function(res){
  
    if(res.data.code==408){
      Toast.fail('登录信息已失效,请重新登录')
      setTimeout(_=>{
        router.push('/login')
        throw '错误'
      },2000)
    }
    return res
},function(err){
  return
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
