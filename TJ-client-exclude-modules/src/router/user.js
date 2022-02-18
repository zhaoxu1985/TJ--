var arr = [
    {
        path:'/setting',
        name:'setting',
        component: () => import(/* webpackChunkName: "user_setting" */ '../components/user/setting.vue')
    },
    {
        path:'/login',
        name:'login',
        component: () => import(/* webpackChunkName: "user_login" */ '../components/user/login.vue')
    },
    {
        path:'/editSelfData',
        name:'editSelfData',
        component: () => import(/* webpackChunkName: "user_edit" */ '../components/user/editSelfData.vue')
    },
    {
        path:'/password',
        name:'password',
        component: () => import(/* webpackChunkName: "user_edit" */ '../components/user/password.vue')
    },
    {
        path:'/email',
        name:'email',
        component: () => import(/* webpackChunkName: "user_edit" */ '../components/user/email.vue')
    },
    {
        path:'/phone',
        name:'phone',
        component: () => import(/* webpackChunkName: "user_edit" */ '../components/user/phone.vue')
    },
]
export default arr