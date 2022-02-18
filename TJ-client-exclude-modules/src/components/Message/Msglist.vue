<template>
  <div class="msg_list" :style="{ height: innerheight }">
    <!-- 头部导航 -->
    <van-nav-bar
      title="消息中心"
      left-arrow
      @click-left="onClickLeft"
      fixed
      class="head"
    >
      <!-- <template #right>
        <div class="head_right" @click="pushmsg()">
          <van-icon name="service-o" size="20" />
          <div>客服</div>
        </div>
      </template>  -->
    </van-nav-bar>
    <div class="msg_center1">
      <img
        src="data:image/png;base64,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"
        alt=""
      />
      <div>
        <h1>系统通知</h1>
        <p style="width: 100%">看视频赏民宿，参与活动即可获得精美礼品</p>
      </div>
    </div>

    <div class="detail_list">
      <div
        class="msg_detail"
        v-for="(item, i) in arrlength"
        :key="i"
        @click="go_detail(item, i)"
      >
        <img :src="item.be.head_img" alt="" />
        <div class="f1">
          <div class="msg_head">
            <div>
              {{ item.be.uname == null ? "匿名用户" : item.be.uname }}
            </div>
            <div>{{ item.msgArr[item.msgArr.length - 1].send_date }}</div>
          </div>
          <div
            class="msg_foot"
            v-if="item.msgArr[item.msgArr.length - 1].type == 'text'"
          >
            <p>{{ item.msgArr[item.msgArr.length - 1].message }}</p>
            <van-badge :content="msginfo[i]" v-if="msginfo[i] != 0" class="hb">
              <div />
            </van-badge>
          </div>
          <div class="msg_foot" v-else>
            <div style="color: red">[语音]</div>
            <van-badge :content="msginfo[i]" v-if="msginfo[i] != 0" class="hb">
              <div />
            </van-badge>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-show="arrlength == 0" description="暂无消息" />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      innerheight: "",
      uid: 1, // 假设是登录的用户id
      arrlength: [], // 整体展示的消息列表
      msginfo: [], // 已读未读消息  已废弃
      newMsg: [], //携带过去的最新的15条消息
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    ...mapMutations(["update_msginfo"]),
    go_detail(item, i) {
      //去私聊详情页
      console.log(item, i);
      this.update_msginfo(item);
      //修改vuex中的数据 跳转到聊天页
      this.$router.push("/msg");
    },
    capture(xxx) {
      //对async错误处理做出一个封装
      return xxx()
        .then((val) => [null, val.data])
        .catch((err) => [err, null]);
    },
    //获取用户消息列表
    getHistory() {
      return this.$axios.get(
        `https://kf.testw.top/getHistoryMsg?uid=${this.uid}`
      );
    },
    gomsg(i) {
      /// 假设 这里是去往客服的聊天
      this.$router.push("/msg");
    },
    async updatemsg() {
      let [err, data] = await this.capture(this.getHistory);
      console.log(data);
      if (!data) {
        //如果请求不到数据 证明无消息
        return;
      } else {
        this.$store.commit("update_msgarr", data.data);
      }
      let arr = this.$store.state.msg_arr;
      //  console.log(data);
      if (!arr) {
        //如果请求不到数据 证明无消息
        return;
      }
      this.arrlength = arr; //所有的消息列表
      arr.forEach((item) => {
        this.newMsg.push(item.msgArr[item.msgArr.length - 1]); //最新的一条消息
      });
      let count = 0; //未读消息条数
      // console.log(data.data)
      arr.forEach((item) => {
        item.msgArr.forEach((i) => {
          //如果消息数组中的 接受者id等于客户uid 并且有未读消息
          if (
            (i.sid == window.localStorage.getItem("uid") && i.is_read == 0) ||
            (i.audio_isRead == 0 && i.sid == window.localStorage.getItem("uid"))
          ) {
            count++; //未读消息 +1
            // console.log(i);
          }
        });
        this.msginfo.push(count); //未读消息数组
        count = 0;
      });
      let resul_count = this.msginfo.reduce((box, item) => box + item); //未读消息总条数
      this.$store.commit("change_unread", resul_count); //更改未读消息总条数
      // console.log( this.$store.state.unread_msg)
    },
  },
  async created() {
    this.uid = window.localStorage.getItem("uid") || 1;
    this.updatemsg();
  },
  sockets: {
    connect: function () {
      //与socket.io连接后回调
      console.log("web socket + 连接成功");
    },
    //>>>>>>>>   监听发来的消息
    oToMessage(data) {
      // 遍历所有的消息列表
      console.log(data.uid);
      let flag = false;
      this.arrlength.forEach((item, i) => {
        // 如果对方的发来的消息  中的发送者uid = 消息列表其中一条消息的发送者uid 就是已知的好友列表
        if (item.be.uid == data.uid && data != "") {
          console.log("已知好友列表");
          //如果存在已有的列表即更新对应的最新的消息
          this.arrlength[i].msgArr.push(data);
          data = ""; //将data赋值为空  防止重复添加
          this.msginfo[i] += 1; //未读消息列表那一条 ＋1
          flag = true;
          let resul_count = this.msginfo.reduce((box, item) => box + item); //未读消息总条数
          this.$store.commit("change_unread", resul_count); //更改未读消息总条数
          // console.log("已知好友列表");
        }
      });
      if (data != "" && flag == false) {
        //否则就是新的好友发的消息  更新消息列表
        console.log("未知好友列表");
        let obj = {
          be: {
            //对方的基本信息
            head_img: data.head_img,
            uid: data.uid,
            uname: data.uname || 匿名用户,
          },
          msgArr: [data], //消息数组
          sid: data.uid, //发送者的uid
          uid: data.sid, //我的uid
        };
        this.arrlength.push(obj); // 如果是新消息 就追加一条消息列表的消息
        data = "";
        this.msginfo.push(1); //新的消息列表 未读数+1
        let resul_count = this.msginfo.reduce((box, item) => box + item); //未读消息总条数
        this.$store.commit("change_unread", resul_count); //更改未读消息总条数
      }
    },
  },
  mounted() {
    // this.$socket.open(); //主动连接sockte
    this.innerheight = window.innerHeight + "px";
  },
};
</script>


<style lang="scss">
.msg_list {
  padding-top: 46px;
  background-color: #f7f9fb;
  .head {
    i {
      color: #666;
    }
    .head_right {
      display: flex;
      flex-direction: column;
      div {
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #666;
        letter-spacing: 0;
        line-height: 10px;
        font-weight: 400;
        margin-top: 4px;
      }
    }
  }
  .msg_center1 {
    background-color: #fff;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 12px 20px;
    justify-content: flex-start;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 6%);
    img {
      width: 35px;
      height: 35px;
      -webkit-border-radius: 50%;
      border-radius: 50%;
    }
    div {
      text-align: left;
      padding-left: 15px;
      box-sizing: border-box;
      width: 100%;
      h1 {
        width: 100%;
        margin-bottom: 2px;
        line-height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      p {
        min-height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #999;
        overflow: hidden;
        word-wrap: normal;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
      }
    }
  }
  .detail_list {
    .msg_detail {
      background-color: #fff;
      padding: 15px 0 15px 20px;
      display: flex;
      border: 0.5px solid rgb(241, 240, 240);
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .van-divider {
        margin: 25px 0 !important;
      }
      .f1 {
        width: calc(100vw - 65px);
        padding-left: 10px;
        box-sizing: border-box;
        .hb {
          width: 20px;
          height: 20px;
          .van-badge {
            top: 12px;
            right: 12px;
          }
        }
        .msg_head {
          width: 100%;
          padding: 0;
          min-height: 16px;
          line-height: 16px;
          font-size: 12px;
          font-weight: 500;
          color: #666;
          display: flex;
          justify-content: space-between;
          div {
            width: 50%;
            line-height: 16px;
            font-size: 14px;
            font-weight: 300;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
          }
          & > div:last-child {
            width: 50%;
            font-size: 12px;
            text-align: right;
            padding-right: 5px;
            color: #999;
          }
        }
        .msg_body {
          min-height: 21px;
          max-width: 70.66667vw;
          margin: 4px 0 4px 0;
          line-height: 21px;
          font-size: 15px;
          color: #333;
        }
        .msg_foot {
          line-height: 16px;
          padding-top: 3px;
          font-size: 12px;
          font-weight: 300;
          color: #999;
          overflow: hidden;
          word-wrap: normal;
          white-space: nowrap;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          display: flex;
          justify-content: space-between;
          p {
            white-space: nowrap;
            width: 65%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>