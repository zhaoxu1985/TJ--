<template>
  <div class="msg_center">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" fixed />
    <div class="msg_content">
      <!-- 刷新组件 -->

      <!-- <div class="msglist" v-if='kw==""'></div>
      <div class='product' v-else>
        <div class="div">
          <img :src="product.img" alt="">
          <div>
            <div>
              {{product.title}}
            </div>
            <p>
              {{product.title2}}
            </p>
          </div>
          <button class="btn">发送房屋</button>
        </div>
      </div> -->
      <!-- 消息区 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="mess_age">
          <div
            v-for="(item, i) in message"
            :key="i"
            :class="item.uid == uid ? 'left' : 'right'"
          >
            <!-- 消息部分 -->
            <div class="msg">
              <!-- 如果消息是文本类型就显示文本 否显示语音 -->
              <div v-if="item.type === 'text'">
                {{ item.message }}
              </div>
              <!-- 音频消息 -->
              <div
                v-else
                class="dialog"
                @click="start_audio($event, i, uid, be.uid, item.m_id)"
                :class="{
                  audioPlay: i == active,
                  dian: item.audio_isRead == 0,
                }"
              >
                <span> {{ item.time }}"&nbsp;</span>
                <audio :src="item.audio" @ended="isend">
                  <!-- 监视音频播放完毕 触发的事件-->
                </audio>
                <div id="done"></div>
                <div id="dtwo"></div>
                <div id="dthree"></div>
                <div id="dfour"></div>
              </div>

              <!-- 三角 -->
              <!--  <div class="tri">
          </div> -->
            </div>
            <!-- 头像 -->
            <div class="imgSrc">
              <img :src="be.uid == item.uid ? be.head_img : my_headimg" />
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>

    <!-- 底部消息输入区域 -->
    <div style="backgroundclor: #fff">
      <div class="mess_foot">
        <div>
          <div>
            <van-icon
              v-if="Edit == true"
              name="volume-o"
              size="30"
              @click="edit"
            />
            <van-icon v-else name="edit" size="30" @click="edit" />
            <textarea
              v-if="Edit == true"
              type="text"
              v-model="text_msg"
              @input="change_height"
              @focus="femoji"
              class="textarea-msg"
            ></textarea>
            <input
              v-else
              type="text"
              placeholder="按住 说话"
              disabled
              @touchstart.prevent="start"
              @touchend="end"
              style="textalign: center"
            />
          </div>
          <div>
            <van-icon name="smile-o" size="30" @click="change_emoji" />
            <van-button
              type="default"
              color="#ff9645"
              size="small"
              @click="sendmsg"
              >发送</van-button
            >
          </div>
        </div>
        <!-- 下方表情包区域 -->
        <div class="emoji" v-show="isemoji">
          <div v-for="(item, i) in emoji" :key="i" @click="addemoji(item)">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let Audio = false;
let recorder = new Recorder({
  bitRate: 40, //参数采样率
  sampleRate: 10100,
  success: function (v) {
    Audio = true;
    console.log("可以录音");
  },
  error: function (v) {
    this.Audio = false;
    console.log("录音设备损坏");
  },
  fix: function (v) {
    console.log("您的设备不支持录音");
  },
});

export default {
  data() {
    return {
      pageSize: 1,
      isLoading: false,
      title: "", //导航标题 如果是商品跳转过来的就展示商品名称
      uid: "", //自己的uid
      sid: "", //对方的id
      be: {}, //聊天对方的信息
      loop: "", // 发送语音的定时器
      Edit: true, //是语音播放 还是文字输入
      isemoji: false, // 是否开启表情包
      active: "###", // 播放语音的class
      kw: "", // 假定的假定页面传参 对话人的id
      outheight: "", //视口高度
      text_msg: "", //文本内容区
      my_headimg: "",
      emoji: [
        "😊",
        "😂",
        "🤣",
        "😍",
        "😒",
        "😘",
        "😁",
        "😉",
        "😎",
        "🥰",
        "🙄",
        "🤑",
        "😤",
        "😴",
        "🤐",
        "😪",
        "😭",
        "👿",
        "🤬",
        "👻",
        "🤬",
        "🤡",
        "👽",
        "😻",
        "🥶",
        "😜",
        "😢",
        "🤔",
        "👌",
        "🙌",
        "✌",
        "👏",
        "💋",
        "👍",
        "🐂",
        "🐎",
        "🐖",
        "🐕",
        "🐏",
        "🐱",
      ], // 表情包大全
      long: false, //控制长按语音
      product: {
        img: "https://pic.tujia.com/upload/qualifiedpics/day_210313/thumb/202103130127386354_221_221.jpg",
        title:
          "古北水镇～观景  Loft复式大客厅（空调+地暖+免费接送+管家式服务）",
        title2: "整套 2居3床4人",
      }, //详情页跳转过来的商品
      //用户和对方的消息记录
      message: [],
      status: "", //用于监控滚动条状态
    };
  },

  methods: {
    change_height() {
      this.Edit = true;
      this.outheight = window.innerHeight - 200 + "px";
    },
    capture(xxx) {
      //对async错误处理做出一个封装
      return xxx()
        .then((val) => [null, val.data])
        .catch((err) => [err, null]);
    },
    // 下拉刷新事件
    onRefresh() {
      setTimeout(async () => {
        // console.log(this.message[0]);
        this.pageSize += 1;
        let obj = await this.$axios.get("https://kf.testw.top/getHistoryPage", {
          params: {
            uid: this.uid,
            sid: this.be.uid,
            m_id: this.message[0].m_id,
            pageSize: this.pageSize,
          },
        });
        // console.log(obj);
        if (obj.data.data.length == 0) {
          this.$toast.fail("暂无更多数据");
        } else {
          obj.data.data.forEach((item) => {
            this.message.unshift(item);
          });
          this.$toast("刷新成功");
        }
        this.isLoading = false;
      }, 1000);
    },
    // 音频播放完毕触发的事件
    isend() {
      this.active = "####";
    },
    //文本域获得焦点 表情包退下
    femoji() {
      this.isemoji = false;
    },
    addemoji(item) {
      //添加发送表情
      this.text_msg += item;
    },
    // 发送文本或者表情消息消息
    sendmsg() {
      if (!this.text_msg) {
        return;
      }
      this.isemoji = false;
      //发送的消息  //数据先定死一部分
      let sendObj = {
        uid: this.uid, //用户id
        sid: this.be.uid, //对方id‘
        audio: "", //语音消息,
        message: this.text_msg, //文本消息
        type: "text",
        //对方的头像
        head_img: window.localStorage.getItem("headImg"),
        uname: this.uname,
        is_read: 0, // text是否已读
        send_date: this.$getDate(), //当前日期
        send_time: this.$getTime(), //当前时间
        audio_isRead: 1, //语音是否已读
        m_id: Date.now(), //当前毫秒值
        be_uname: this.be.uname, // 对方的name
        be_head_img: this.be.head_img, // 对方的头像
      };
      console.log(sendObj);
      this.$socket.emit("puoToMessage", sendObj);
      this.text_msg = "";
      this.message.push(sendObj);
      this.$axios.post("https://kf.testw.top/updateMsgRead", {
        //消息已读未读
        uid: this.be.uid,
        sid: this.uid,
      });
      this.status = !this.status;
    },
    //更改是否语音输入
    edit() {
      this.Edit = !this.Edit;
      this.isemoji = false;
    },
    // 按住事件 不超过一秒不执行
    start(e) {
      if (Audio == false) {
        this.$toast.fail("您的设别不支持录音功能");
        return;
      }
      clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
      this.loop = setTimeout(() => {
        recorder.start(); //开始录音
        this.long = true; //800后将他赋值 开始录音 不到300hm 则清空定时器不开始录音
      }, 400);
      this.$toast.loading({
        message: "按住说话,松开发送",
        duration: 10000, //持续提示
        icon: "volume-o",
        forbidClick: false,
      });
    }, // 松开事件
    end() {
      if (Audio == false) {
        this.$toast.fail("您的设别不支持录音功能");
        return;
      }
      if (this.long == false) {
        //如果按住时长没超过一定时间则提示  并清除定时器任务 停止发送语音
        this.$toast.fail("按住时间过短");
        clearTimeout(this.loop);
        return;
      }
      recorder.getBlob((data) => {
        //console.log(data); //拿到的音频对象
        let sendObj = {
          uid: this.uid, //用户id
          sid: this.be.uid, //对方id‘
          audio: data, //语音消息,
          message: "", //文本消息
          type: "audio/mp3",
          head_img: window.localStorage.getItem("headImg"), //自己的头像
          uname: this.uname, //发送人的名称为
          is_read: 1, // text是否已读
          send_date: this.$getDate(), //发送日期
          send_time: this.$getTime(), //发送准确时间
          audio_isRead: 0, //语音是否已读
          m_id: Date.now(), //当前时间
          be_uname: this.be.uname, //接收者uname
          be_head_img: this.be.head_img, //接收者头像
        };
        recorder.stop(); //录音停止
        console.log(sendObj);
        this.$socket.compress(true).emit("puoToMessage", sendObj); //将数据压缩发到后台
        sendObj.audio = URL.createObjectURL(data);
        this.message.push(sendObj);
        window.scrollTo(0, document.body.scrollHeight);
        clearTimeout(this.loop); //清空定时器，防止重复注册定时器
        this.$toast.clear(); //清除轻提示
        this.long = false; //清除状态
      });
    }, //返回按钮
    async onClickLeft() {
      this.$router.back();
      let [err, data] = await this.capture(this.getHistory);
      if (!data) {
        //如果请求不到数据 证明无消息
        return;
      } else {
        this.$store.commit("update_msgarr", data.data);
      }
    },
    // 开始播放录音的方法
    start_audio(event, i, uid, sid, m_id) {
      console.log(uid, sid, m_id);
      this.$axios.post("https://kf.testw.top/updateVoiceRead", {
        //更改当前语音消息为已读状态
        uid: sid,
        sid: this.uid,
        m_id,
      });
      this.message[i].audio_isRead = 1;
      let obj = event.currentTarget.children; //触发事件的元素本身
      if (this.active == i) {
        this.active = "###";
      } else {
        this.active = i;
      }
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].tagName == "AUDIO") {
          obj[i].addEventListener(
            //音频是否已结束 结束就将动画结束
            "ended",
            () => {
              this.active = "###";
            },
            false
          );
          // audio播放音频
          if (obj[i].paused) {
            //如果是暂停状态 就播放
            var other = document.getElementsByTagName("audio");
            other.forEach((item) => {
              if (item !== obj[i]) {
                item.pause(); //点击播放当前音频  使其他音频暂停播放
              }
            });
            obj[i].load(); //重新加载语音
            obj[i].play(); //播放当前点击的语音
          } else {
            obj[i].pause(); //如果在播放状态就暂停
          }
        }
      }
    },
    //是否显示下方表情包
    change_emoji() {
      this.Edit = true;
      this.isemoji = !this.isemoji;
    },
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
    //获取消息列表传过来的数据
    async getlist() {
      console.log(this.$route);
      let sid = this.$route.params; //  根据路由跳转传过来的 sid  重新获取消息记录渲染  下面的消息列表不执行
      let store = ""; //消息的信息
      if (JSON.stringify(sid) != "{}") {
        console.log("其他页面 跳转过来的");
        let [err, obj] = await this.capture(this.getHistory);
        console.log(obj.data);
        let newarr =
          obj.data.filter((item) => {
            return item.be.uid == sid.uid;
          }) || []; //看看是否有历史消息
        console.log(newarr, sid);
        if (newarr.length == 0) {
          //如果没有 手动给他赋值 账号信息
          store = {
            be: {
              uid: sid.uid || this.$store.state.be.uid,
              head_img: sid.head_img || this.$store.state.head_img,
              uname: sid.uname,
            },
            uid: window.localStorage.getItem("uid"),
            sid: sid.uid,
            msgArr: [],
          };
        } else {
          store = newarr[0]; //如果有的话帅选出来
        }
      } else {
        console.log("正常消息列表传过来");
        console.log(this.$store.state.msg_info);
        // 好友列表传过来 消息参数
        store = this.$store.state.msg_info;
      }
      console.log(store);
      this.message = store.msgArr; //消息列表
      this.be = store.be;
      this.uid = store.uid; //当前用户的id
      this.sid = store.sid; //私发消息对方的id
      // console.log(this.uid);
      // console.log(this.message);
      this.title = store.be.uname; //根据传过来身份展示标题
    },
  },
  async created() {
    this.my_headimg = window.localStorage.getItem("headImg");
    this.uid = window.localStorage.getItem("uid") || 1;
    this.uname = window.localStorage.getItem("uname") || "用户idQ#vjndaslk";
    this.getlist();
    this.$axios.post("https://kf.testw.top/updateMsgRead", {
      //消息已读未读
      uid: this.be.uid,
      sid: window.localStorage.getItem("uid"),
    });
  },
  async mounted() {
    window.scrollTo(0, document.body.scrollHeight);
    this.outheight = window.innerHeight + "px";
    let textarea = document.querySelector(".textarea-msg"); //聊天的文本域 滚动条实时底部
    textarea.oninput = () => {
      textarea.style.height = "auto"; //文本域高度自适应  但不超过100px
      textarea.style.height = textarea.scrollHeight + "px";
    };
    textarea.onfocus = () => {
      //文本域获得焦点表情包就消失
      this.isemoji = false;
      // console.log("失去焦点");
    };
  },
  sockets: {
    connect: function () {
      //与socket.io连接后回调
      console.log("web socket + 连接成功");
    },
    //>>>>>>>>    待完善
    async oToMessage(data) {
      if (
        data.uid == this.be.uid && //发送过来的 对方消息发送对象的id要等与自己
        data.sid == this.uid //   发送人的id 等于当前用户聊天的id
        // (data.uid == this.sid && data.uid == this.uid)
      ) {
        this.message.push(data);
        this.$axios.post("https://kf.testw.top/updateMsgRead", {
          //消息已读未读
          uid: this.be.uid,
          sid: window.localStorage.getItem("uid"),
        });
        // this.$store.commit("update_msgarr", [this.message]);
      }
      this.status = !this.status; //更新状态
    },
  },
  watch: {
    status() {
      // console.log("触发了");
      setTimeout(() => {
        // console.log("底部滚动条定时器");
        window.scrollTo(0, document.body.scrollHeight);
      }, 200);
    },
  },
};
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
.msg_center {
  background: #f7f9fb;
  padding: 46px 0 56px 0;
  box-sizing: border-box;
  height: 100%;
  .van-icon {
    color: #333;
  }
  .van-nav-bar__left {
    i {
      color: #ff9645;
    }
  }
  .empty {
    height: 56px;
    background: #fff;
    width: 100%;
  }
  .mess_age {
    width: 100%;
    // height: calc(100vh - 48px);
    padding-bottom: 60px;
    box-sizing: border-box;
    background-color: #f7f9fb;
    // overflow-y: auto;
    margin: 0;
    .dialog {
      position: relative;
      text-align: right;
      height: 26px;
      display: flex;
      align-items: center;
      padding: 2px 5px !important;
    } //消息框右边的样式
    .left {
      display: flex;
      margin-left: 35px;
      justify-content: flex-end;
      // align-items: center;
      padding: 15px 0;
      .dian::after {
        content: " ";
        border: 2px solid red; /*设置红色*/
        background-color: red;
        border-radius: 50%; /*设置圆角*/
        position: absolute;
        right: 55px;
        margin-right: -5px;
        margin-top: -5px;
      }
      img {
        width: 35px;
        height: 35px;
        margin: 0 8px;
        border-radius: 50%;
      }
      .msg {
        width: 80%;
        position: relative;
        min-height: 28px;
        right: 5px;
        display: flex;
        justify-content: flex-end;
        word-wrap: break-word;
        div {
          max-width: 100%;
          background-color: #fbcd64;
          padding: 5px 8px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .msg::after {
        content: " ";
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fbcd64;
        top: 10px;
        right: -5px;
        z-index: 0;
        transform: rotate(45deg);
      }
    }
    //消息框左边的样式
    .right {
      display: flex;
      padding: 15px 0;
      justify-content: flex-end; //从末尾排序
      flex-direction: row-reverse; //然后翻转
      // align-items: center;
      margin-left: 8px;
      .dian::after {
        content: " ";
        border: 2px solid red; /*设置红色*/
        background-color: red;
        border-radius: 50%; /*设置圆角*/
        position: absolute;
        right: -5px;
        margin-right: -5px;
        margin-top: -5px;
      }
      img {
        width: 35px;
        height: 35px;
        margin: 0 6px;
      }
      .msg {
        width: 80%;
        min-height: 28px;
        position: relative;
        left: 5px;
        display: flex;
        justify-content: flex-start;
        // flex-direction: row-reverse;
        word-wrap: break-word;
        text-overflow: ellipsis;
        div {
          max-width: 100%;
          background-color: #fff;
          padding: 8px;
          border-radius: 5px;
          word-wrap: break-word;
          word-break: break-all;
          display: flex;
          align-items: center;
        }
      }
      .msg::before {
        content: " ";
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fff;
        top: 10px;
        left: -5px;
        z-index: 0;
        transform: rotate(45deg);
      }
    }
  }
  //语音播放的动画
  @keyframes yuying {
    0% {
      height: 0%;
    }

    20% {
      height: 50%;
    }

    50% {
      height: 100%;
    }

    80% {
      height: 50%;
    }

    100% {
      height: 0%;
    }
  }
  #done,
  #dtwo,
  #dthree,
  #dfour {
    width: 2px;
    border-radius: 50px;
    margin: 0 2px;
    padding: 0 !important;
    background-color: rgb(230, 95, 230);
    vertical-align: middle;
    display: inline-block;
  }

  .audioPlay {
    #done {
      animation: yuying 0.6s infinite 0.15s;
      -webkit-animation: yuying 0.6s infinite 0.15s;
    }
    #dtwo {
      animation: yuying 0.6s infinite 0.3s;
      -webkit-animation: yuying 0.6s infinite 0.3s;
    }
    #dthree {
      animation: yuying 0.6s infinite 0.45s;
      -webkit-animation: yuying 0.6s infinite 0.45s;
    }
    #dfour {
      animation: yuying 0.6s infinite 0.6s;
      -webkit-animation: yuying 0.6s infinite 0.6s;
    }
  }
  #done {
    margin-left: 2px;
    height: 50%;
  }
  #dtwo {
    height: 100%;
  }
  #dthree {
    height: 70%;
  }
  #dfour {
    height: 40%;
  }
  //如果是从商品界面跳转过来则可以直接发送商品
  .product {
    border-top: 1px solid rgb(219, 216, 216);
    box-shadow: 0 1px 5px 0 rgb(0 0 0 / 6%);
    .div {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 20px 20px;
      background-color: #fff;
      img {
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 50px;
        -ms-flex: 0 0 50px;
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      div {
        width: 54.66667vw;
        overflow: hidden;
        line-height: 16px;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        font-weight: 400;
        color: #333;
      }
      p {
        margin-top: 6px;
        font-size: 11px;
        font-weight: 300;
        color: #999;
      }
      .btn {
        padding: 5px;
        line-height: 12px;
        font-size: 12px;
        border: 0.5px solid #ff9645;
        -webkit-border-radius: 4px;
        background-color: #ffffff;
        border-radius: 4px;
        color: #ff9645;
      }
      .btn:active {
        background-color: #f3f3f3;
      }
    }
  }
  .mess_foot {
    width: 100vw;
    background-color: #fff;
    position: fixed;
    z-index: 111;
    opacity: 1;
    bottom: 0;
    textarea {
      width: calc(100% - 20px); //意思是父级元素减去30px的宽度
      margin: 0 0 0 5px;
      max-height: 80px;
      min-height: 25px;

      // padding: 9px 0 2px 0;
      // line-height: 15px;
      border: 0.5px solid #dadada;
      -webkit-border-radius: 2px;
      border-radius: 2px;
      background: #f7f9fb;
      -webkit-appearance: none;
      resize: none;
    }
    & > div:first-child {
      display: flex;
      /*   height: 40px; */
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      & > div:first-child {
        display: flex;
        align-items: center;
        width: 72vw;
      }
      & > div:last-child {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28vw;
        font-size: 12px;
      }
      input {
        width: calc(100% - 30px);
        margin: 0 0 0 10px;
        line-height: 35px;
        padding-left: 5px;
        border: 0.5px solid #dadada;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        background: #f7f9fb;
        -webkit-appearance: none;
        text-align: center;
      }

      button {
        white-space: nowrap;
        margin-left: 1vw;
      }
    }
    .emoji {
      display: flex;
      height: 150px;
      overflow: hidden;
      overflow-y: auto;
      justify-content: center;
      flex-wrap: wrap;
      padding-bottom: 50px;
      & div {
        padding: 10px;
        box-sizing: border-box;
        width: 10%;
      }
    }
  }
}
</style>