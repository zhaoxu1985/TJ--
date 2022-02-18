import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Info from '../views/info/Info.vue'
import login from '../views/login.vue'


// 导入路由
import Chat from '../views/chat/Chat.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', redirect: '/info'},
  { path: '/login', component: login },
  { path: '/home', component: Home, children: [
    { path: '/info', component: Info },
    { path: '/chat', component: Chat }
  ]}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('uid')
  if(!tokenStr) return next('/login')
  next()
})

export default router
