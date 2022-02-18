import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins:[createPersistedState({
    storage:window.sessionStorage
  })],
  state: {
    msg_arr:[],
    msg_info:{//私聊对象的信息 格式  默认是客服的信息 从消息列表等地方跳转时需重新赋值传参
      be:{
        uid:'1',
        head_img:'https://z3.ax1x.com/2021/06/22/RZOHpR.png',
        uname:'客服'
      },//聊天对方的基本信息 头像 名称 id
      msgArr:[], //携带过去的最新的15条消息 
      sid:'',// 聊天对方的id
      uid:localStorage.getItem('uid'), //用户的uid
    },
    my_headimg:localStorage.getItem('headImg'),
    unread_msg: 0, //未读消息总条数
    starDate: "",  // 
    endDate: "",
    dataDate: [], // 开始时间 结束时间 毫秒值
    searchData: {},
    priceData: [],
    city: "",
    night:'1', // 每晚
    OrderCommitInfo:{},
    address: '', // 当前地址
    coordinate: [], // 当前坐标
    isReserve: 1, // 是否预定
    isCollection: {},
    orderFinishBuy:{
      oname:'',
      oid:"",
      date:"",
      rid:''
    },//支付跳转信息
  },
  mutations: {
    setOrderFinishBuy(state,data){ //支付页面需要存的信息
      state.orderFinishBuy=data
    },
    update_msgarr(state,data){ //获取最新的消息列表
      state.msg_arr=data
    },
    change_unread(state,data){ //更改未读消息 条数
      state.unread_msg=data
    },
    update_msginfo(state, data) {//消息参数
      state.msg_info = data;
    },
    // 时间开始
    hotelStarDate(state, starDate) {
      state.starDate = starDate;
    },
    // 时间结束
    hotelEndDate(state, endDate) {
      state.endDate = endDate;
    },
    // 时间毫秒
    hotDataDate(state, dataDate) {
      state.dataDate = dataDate;
    },
    // 搜索列
    searchData(state, searchData) {
      state.searchData = searchData;
    },
    //  价格
    priceData(state, priceData) {
      state.priceData = priceData;
    },
    //  城市
    cityData(state, city) {
      state.city = city;
    },
    // 共几晚
    night(state,night){
      state.night = night
    },
    setOrderCommitInfo(state,OrderCommitInfo) {
      state.OrderCommitInfo = OrderCommitInfo

    },
    getAddress(state,address) {
      state.address = address 
      

    },
    getCoordinate(state,coordinate) {
      state.coordinate = coordinate

    },
    getReserve(state,isReserve) {
      state.isReserve = isReserve
    },
    getCollection(state,isCollection) {
      state.isCollection = isCollection

    }
  },
  actions: {},
  modules: {},
});
