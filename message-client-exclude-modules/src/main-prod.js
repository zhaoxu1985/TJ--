// import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './element.js'
// import 'element-ui/lib/theme-chalk/index.css'
// import './vant.js'
// import 'vant/lib/index.css'

import './assets/styles/gloabl.css'
// import axios from 'axios'
import './assets/icon/iconfont.css'
import VueSocketIO from 'vue-socket.io'
import ClientSocketIO from 'socket.io-client'

Vue.use(new VueSocketIO({
  debug: true,
  connection: ClientSocketIO.connect('https://kf.testw.top',{
    autoConnect: false,
    transports: ['websocket'],
    auth: {
      imgPath: window.sessionStorage.getItem('avatar'),
      uid: window.sessionStorage.getItem('uid'), //到时候根据登录的账户不同 传递不同的id 用于确认私聊者的身份
      uname:window.sessionStorage.getItem('username')
    }
  }), //连接服务端
}))


Vue.prototype.chat = new Vue()

// 注册时间
//获取年月日 格式 ` 2020-01-01`  
Vue.prototype.$getDate = () => {
    let now = new Date()
    let y = now.getFullYear()
    let m = now.getMonth() + 1
    let d = now.getDate()
    m >= 10 ? '' : m = '0' + (now.getMonth() + 1)
    d >= 10 ? '' : d = '0' + now.getDate()
    return `${y}-${m}-${d}`
  }
  
  //获取时间    格式 ` 00:00`
  Vue.prototype.$getTime = () => {
    let now = new Date()
    let hh = now.getHours()
    let mm = now.getMinutes()
    // hh == 00 ? hh = 24 : ''
    hh >= 10 ? '' : hh = '0' + hh
    mm >= 10 ? '' : mm = '0' + mm
    return `${hh}:${mm}`
  }
axios.defaults.validateStatus = status=>{return true}
axios.defaults.baseURL = 'https://kf.testw.top'

axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('uid')
  return config
})



Vue.config.productionTip = false
Vue.prototype.axios = axios


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
