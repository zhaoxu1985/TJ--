var arr =[{
    path: '/order',
    name: 'Orders',   //订单主页面
    component: () => import(/* webpackChunkName: "order" */ '../components/Orders/index.vue')
  },
  {
    path: '/order_edit', //订单编辑页
    name: 'oder_edit',
    component: () => import(/* webpackChunkName: "order_edit" */'../components/Orders/OrderEdit.vue')
  },
  {
    path: '/order_detail', //订单详情页
    name: 'oder_detail',
    component: () => import(/* webpackChunkName: "order" */ '../components/Orders/Orderdetail.vue')
  },
  {
    path: '/order_pay', //订单支付页
    name: 'oder_pay',
    component: () => import(/* webpackChunkName: "order" */ '../components/Orders/orderPay.vue')
  },
  {
    path: '/check_person', //选择入住人页
    name: 'check_person',
    component: () => import(/* webpackChunkName: "order_edit" */ '../components/Orders/Checkperson')
  },
  {
    path: '/add_person', //添加入住人页
    name: 'add_person',    //Editperson
    component: () => import(/* webpackChunkName: "order_edit" */ '../components/Orders/Addperson.vue')
  },
  {
    path: '/edit_person', //添加入住人页
    name: 'edit_person',    //Editperson
    component: () => import(/* webpackChunkName: "order_edit" */ '../components/Orders/Editperson.vue')
  },
  {
    path: '/msg', //聊天私聊界面
    name: 'msg',
    component: () => import(/* webpackChunkName: "msg" */ '../components/Message/Message.vue')
  },
  {
    path: '/msg_list', //消息列表页
    name: 'msg_list',
    component: () => import(/* webpackChunkName: "msg"*/ '../components/Message/Msglist.vue')
  },]

  export default arr