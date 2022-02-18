<template>
  <div id="app">
     <transition mode="e">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    capture(xxx) {
      //对async错误处理做出一个封装
      return xxx()
        .then((val) => [null, val.data])
        .catch((err) => [err, null]);
    },
    getHistory() {
      return this.$axios.get(
        `https://kf.testw.top/getHistoryMsg?uid=${window.localStorage.getItem(
          "uid"
        )}`
      );
    },
    async updatemsg() {
      let [err, data] = await this.capture(this.getHistory);
      // this.arrlength = data.data; //所有的消息列表
      // console.log(null==undefined,data.data)
      console.log(data);
      if (!data) {
        //如果请求不到数据 证明无消息
        return;
      } else {
        let count = 0; //未读消息条数
        this.$store.commit("update_msgarr", data.data);
        data.data.forEach((item) => {
          item.msgArr.forEach((i) => {
            //如果消息数组中的 接受者id等于客户uid 并且有未读消息
            // console.log(i)
            if (
              (i.sid == window.localStorage.getItem("uid") && i.is_read == 0) ||
              (i.audio_isRead == 0 &&
                i.sid == window.localStorage.getItem("uid"))
            ) {
              count++; //未读消息 +1
            }
          });
          // console.log("未读消息总数" + count);
          this.$store.commit("change_unread", count);
        });
      }
    },
  },
  async created() {
    // this.$socket.open(); //主动连接sockte
    this.updatemsg(); //只有app第一次加载的时候才会请求历史记录
  },
  mounted() {
    console.log(this.$socket);
    if (
      !!window.localStorage.getItem("token") ||
      !!window.localStorage.getItem("uid")
    ) {
      this.$socket.open();
    }
  },
  sockets: {
    connect: function () {
      console.log("web socket 连接成功");
    },
    //>>>>>>>>   监听发来的消息
    oToMessage(data) {
      console.log(data);
      let arr = this.$store.state.msg_arr;
      let count = this.$store.state.unread_msg
      console.log("未读消息总数" + count);
      this.$store.commit("change_unread", count + 1); //因为新消息并没有push 所有这里未读消息+1
    },
  },
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
.van-icon-arrow-left{
  color: black !important;
}
        .v-enter,
        .v-leave-to {
            opacity: 0;
        }
        
        .v-enter-active,
        .v-leave-active {
            transition: all .18s linear;
        }

</style>
