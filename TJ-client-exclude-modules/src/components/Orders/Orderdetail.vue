<template>
  <div class="order_detail">
    <van-nav-bar title="订单详情" left-text="." left-arrow @click-left="onClickLeft" class="header" />
    <van-notice-bar class="info" color="#ff9645" background="#FFF7E4" :crollable='false' left-icon="info-o">
      温馨提示:请勿脱离平台与房东交易,以免造成财产损失或纠纷
    </van-notice-bar>
    <div class="order_status">
       <h1>{{calc(msgdetail.userInfo.state)}}</h1> 
      <p></p>
      <div>
        <van-button type="default" @click="gomsg(msgdetail.detailInfo.owner)">联系房东</van-button>
        <van-button color="rgb(255, 150, 69)" @click="go_Detail()">
          再次入住
        </van-button>
      </div>
    </div>
    <!-- 卡片一 -->
    <div class="card_box">
 <p><span>入离时期</span><span>{{getDate(msgdetail.userInfo.start_time)}}至{{getDate(msgdetail.userInfo.end_time)}}</span> </p> 
      <div>
        <div>
          <span>支付金额</span><span>￥{{msgdetail.detailInfo.new_price+'.00'}}</span>
        </div>
        <van-icon name="arrow" @click="showPopup('money')" />
      </div>
      <div>
        <div>
          <span>退订规则</span><span>订单取消，查看订单取消和变更规则</span>
        </div>
        <van-icon name="arrow" @click="showPopup('tj')" />
      </div>
    </div>
    <!-- 行程帮助 -->
    <div class="card_stroke">
      <div class="hd">行程帮助</div>
      <!--       <dt>待入住</dt>
      <dt>已入住</dt>
      <dt>已离店</dt> -->
      <van-collapse v-model="activeNames" class="dd">
        <van-collapse-item title="待入住" name="1">
          <div class="content">
            <section>
              <p class="subtitle">请携带有效身份证件前往办理入住</p>
              <p class="subContent">有效证件不限于：身份证、护照、台胞证、军官证、港澳回乡证、外国人居留证等，如有问题可直接联系房东咨询。</p>
            </section>
            <section>
              <p class="subtitle">如何更改入住日期</p>
              <p class="subContent">如您的订单符合退订规则，建议您取消并重新预订。或直接联系房东，沟通是否可以直接按照更改后的日期入住。</p>
            </section>
          </div>
        </van-collapse-item>
        <van-collapse-item title="已入住" name="2">
          <div class="content">
            <section>
              <p class="subtitle"><strong>房间物品损坏如何处理</strong></p>
              <p class="subContent">
              <pre>1、入住时，请仔细检查室内物品是否已有损坏。如有损坏，请及时告知房东，避免不必要的纠纷。
2、离店前，请检查室内物品是否有人为损坏。如有损坏，请及时告知房东，协商赔偿事宜，避免离店后押金纠纷。
                </pre>
              </p>
            </section>
            <section>
              <p class="subtitle"><strong>
                  如何办理退房</strong></p>
              <p class="subContent">
              <pre>当您的订单正常消费后，您可直接联系房东确认退房事宜，系统会自动变更订单状态为已离店。</pre>
              </p>
            </section>
          </div>
        </van-collapse-item>
        <van-collapse-item title="已离店" name="3">
          <div class="content">
            <section>
              <p class="subtitle"><strong>退房后请确认是否有物品遗落</strong></p>
              <p class="subContent">
              <pre>当有物品遗落时，您可直接联系房东，核实房间内是否有您遗落的物品，如有需要可与房东协商邮寄。</pre>
              </p>
            </section>
            <section>
              <p class="subtitle"><strong>离店后押金如何返还</strong></p>
              <p class="subContent">
              <pre>
1、线下支付的押金：请您离店时与房东沟通押金返还事宜；
2、线上支付的押金：如您已正常入住，会在订单已离店状态的次日18点自动退款，可在“订单信息”中关注退款进度；
3、押金宝二维码支付押金：在离店日20:00自动返还；
押金到账时间为1-5个工作日，请注意查收~</pre>
              </p>
            </section>
            <section>
              <p class="subtitle">
                <strong>如何开具发票</strong>
              </p>
              <p class="subContent">
              <pre>
发票开具方为房东，请在离店时直接联系房东开具；
              </pre>
              </p>
            </section>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="show" closeable position="bottom" class="provep" :style="{ height: '100%' }">
      <div v-if='show_msg=="money"'>
        <div class="hd">
          <h2>
            <p>{{msgdetail.order_type}}</p>
            <div>￥{{msgdetail.detailInfo.new_price+'.00'}}</div>
          </h2>
          <van-divider />
          <div class="d1">
            <p>房费</p>
            <p>￥{{msgdetail.detailInfo.new_price+'.00'}}</p>
          </div>
          <div class="d2">
            <p>{{msgdetail.order_place}}</p>
            <p>￥{{msgdetail.detailInfo.new_price+'.00'}}x一套</p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="hd2">
          <h2>温馨提示</h2>
          <pre>
1、订单退改规则按提交订单时为准；若房东后期修改退改规则，仍按提交订单时为准；
2、退改规则涉及的【房费】包括加人费，不含清洁费、押金；
3、如取消订单或未入住则100%退还清洁费；如提前离店不退还清洁费；
4、如取消订单或未入住则100%退还押金；如房东申请扣除押金，您有权拒绝，请及时关注订单押金退还状态；
5、若您对退订规则还有疑问，可前往客服中心获取更多帮助。
         </pre>
        </div>

      </div>
    </van-popup>
    <!-- 房屋信息 -->
    <div class="home_msg">
      <div class="hd">房屋信息</div>
      <div class="house_info">
        <div>
          <img :src="msgdetail.detailInfo.cover" alt="">
          <div>
            <div>
              <span>{{msgdetail.detailInfo.r_name}}</span>
            </div>
            <p style="text-align:left">{{msgdetail.detailInfo.params.attr+'|'+msgdetail.detailInfo.params.house+"室 |"+msgdetail.detailInfo.params.bed+'厅 |' || '实拍整套'}}</p>
          </div>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="foot">{{msgdetail.detailInfo.location}}</div>
    </div>

    <div class="user_info">
      <div class="hd">
        订单信息
      </div>
      <div class="list">
        <p class="title">订单号</p>
        <p class="content">{{msgdetail.userInfo.oid}}</p>
      </div>
      <div class="list">
        <p class="title">入住人</p>
        <p class="content">{{msgdetail.userInfo.name}}</p>
      </div>
      <div class="list">
        <p class="title">联系电话</p>
        <p class="content">{{msgdetail.userInfo.phone}}</p>
      </div>
      <div class="list">
        <p class="title">支付方式</p>
        <p class="content">网络交易</p>
      </div>
      <div class="list">
        <p class="title">下单时间</p>
        <p class="content">{{getDate(msgdetail.userInfo.date)}}日&nbsp;{{getTime(msgdetail.userInfo.date)}}分</p>
      </div>
    </div>

    <section class="footer">
      <p>风险提示</p>
      <p>未到店或未入住时，如需联系房东，请使用平台在线聊天工具。请勿轻易线下转账方式支付押金或其他费用，以免上当受骗！</p>
    </section>

    <!-- 客服图标 -->
    <div class="fixed" @click="gomsg('客服')">
      <van-icon name="service-o" color="#ff9645" size="30" />
    </div>

  </div>

</template>
<script>
export default {
  data() {
    return {
      show: false,
      show_msg: "",
      activeNames: [1, 2, 3],
      oid: "",
      msgdetail: {
        detailInfo: {
          r_name: "天安门西客站万寿路五棵松301温大3居室",
          params: {
            house: 3,
            bed: 3,
            person_count: 6,
            area: 128,
            attr: "单间",
          },
          location: "丰台区, 北京丰台区京铁家园1区2号楼(整租3居室)",
          location_x: "",
          location_y: "",
          service_id: "",
          owner: {
            uname: "五棵松温馨民宿",
            img: "https://pic.tujia.com/upload/landlordstorelogo/day_190503/thumb/201905031855393546_90_90.jpg",
          },
          cover:
            "https://pic.tujia.com/upload/landlordunit/day_190414/thumb/201904141311141456_700_467.jpg",
        },
        userInfo: {
          name: "嘿嘿嘿",
          phone: "1753859032302",
          date: 1623948305041,
        },
      },
    };
  },
  computed: {
    getDate(i) {
      return function (i) {
        let now = new Date(i);
        let y = now.getFullYear();
        let m = now.getMonth() + 1;
        let d = now.getDate();
        m >= 10 ? "" : (m = "0" + (now.getMonth() + 1));
        d >= 10 ? "" : (d = "0" + now.getDate());
        return `${y}-${m}-${d}`;
      };
    },
    //获取时间    格式 ` 00:00`
    getTime(i) {
      return function (i) {
        let now = new Date(i);
        let hh = now.getHours();
        let mm = now.getMinutes();
        // hh == 00 ? hh = 24 : ''
        hh >= 10 ? "" : (hh = "0" + hh);
        mm >= 10 ? "" : (mm = "0" + mm);
        return `${hh}:${mm}`;
      };
    },
    //计算订单状态
    calc(i) {
      return function (i) {
        let arr = ["待支付", "已支付", "已使用", "已超时"];
        let res = arr[i];
        return res;
      };
    },
    //计算几月几日
    getdate(i) {
      return function (i) {
        let date = new Date(parseInt(i) * 1000);
        date = `${date.getMonth() + 1}月${date.getDate()}日`;
        return date;
      };
    },
    //计算周几 几点
    getzhou(i) {
      return function (i) {
        let date = new Date(parseInt(i) * 1000);
        date = `周${date.getDay()} ${date.getHours()}时${date.getMinutes()}分`;
        return date;
      };
    },
  },
  methods: {
    go_Detail() {
      this.$router.push("/");
    },
    onClickLeft() {
      this.$router.push("/order");
    },
    showPopup(i) {
      this.show = !this.show;
      this.show_msg = i;
    },
    gomsg(i) {
      console.log(i);
      // 去客服
      this.$router.push({
        name: "msg",
        params: {
          uid: i.sid,
          head_img: i.img,
          uname: i.uname,
        },
      });
    },
    getstore(oid, rid) {
      return this.$axios.get(`/order/detail?oid=${oid}&rid=${rid}`);
    },
  },
  async created() {
    console.log(this.$route.params);
    if (!this.$route.params.oid || !this.$route.params.rid) {
      this.oid = window.sessionStorage.getItem("oid");
      this.rid = window.sessionStorage.getItem("rid");
    } else {
      window.sessionStorage.setItem("oid", this.$route.params.oid);
      window.sessionStorage.setItem("rid", this.$route.params.rid);
      this.oid = this.$route.params.oid;
      this.rid = this.$route.params.rid;
    }
    this.$toast.loading({ message: "加载中" });
    let obj = await this.getstore(this.oid, this.rid); //查询订单详情
    console.log(obj);
    this.msgdetail = obj.data.result;
    this.$toast.clear();
  },
};
</script>
<style lang="scss">
.order_detail {
  background-color: #eff1f3;
  padding-bottom: 4vw;
  .info {
    height: 20px !important;
  }
  .header {
    .van-icon {
      color: #ff9654 !important;
    }
    .van-nav-bar__text {
      width: 32px;
      height: 15px;
      background-image: url(https://pic.tujia.com/upload/festatic/publicImages/mob-TjHeader-header-logo.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .order_status {
    padding: 10px 30px 25px 30px;
    background-color: #fff;
    margin-bottom: 12px;
    text-align: center;
    p {
      font-size: 12px;
      line-height: 15px;
      color: #666;
      text-align: center;
      margin: 10px 0;
    }
    h1 {
      font-size: 20px;
      margin: 0 0 5px 0;
      color: rgb(178, 178, 178);
    }
    div {
      display: flex;
      justify-content: center;
      margin: 0;
    }
    button {
      border-radius: 8px;
      border: 0.3px solid #fda56f;
      margin: 0 10px;
      height: 31.6px;
    }
  }
  .card_box {
    margin: 0 16px 12px;
    padding: 16px 12px 6px 12px;
    background: #fff;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    p {
      margin-bottom: 16px;
      display: flex;
      align-content: center;
      & > span:first-child {
        margin-right: 16px;
        font-size: 12px;
        color: #999;
      }
      span {
        font-size: 12px;
        color: rgb(51, 51, 51);
      }
    }
    div {
      margin-bottom: 16px;
      display: flex;
      align-content: center;
      justify-content: space-between;
      div {
        margin: 0;
        padding: 0;
      }
      & > span:first-child {
        margin-right: 16px;
        font-size: 12px;
        color: #999;
      }
      span {
        font-size: 12px;
        color: rgb(51, 51, 51);
      }
    }
  }
  .provep {
    i::before {
      font-size: 30px;
      position: fixed;
      bottom: 15px;
      left: 48%;
    }
    .hd {
      padding: 25px 20px 16px;
      h2 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        div {
          color: #ff9654;
        }
      }
      .d1 {
        font-size: 16px;
        line-height: 22.5px;
        font-weight: 500;
        color: #333;
        display: flex;
        justify-content: space-between;
        margin-bottom: 11px;
      }
      .d2 {
        font-size: 14px;
        line-height: 20px;
        color: #666;
        display: flex;
        justify-content: space-between;
        margin-bottom: 11px;
      }
    }
    .hd2 {
      padding: 25px 20px 16px;
      h2 {
        margin-bottom: 20px;
      }
      pre {
        line-height: 14px;
        font-size: 12px;
        color: #666;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
  .card_stroke {
    margin: 0 16px 12px;
    border-radius: 6px;
    background-color: #fff;
    padding: 16px 12px 0 12px;
    .hd {
      padding: 5px 0 5px 0px;
    }
    .dd {
      .van-collapse-item__content {
        padding: 0 !important;
      }
      .content {
        padding: 16px 12px;
        background: #f7f9fb;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        margin: 12px 0 0 10px;
        section {
          margin-bottom: 16px;
        }
        .subtitle {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          color: #333;
          margin-bottom: 6px;
        }
        .subContent {
          font-family: PingFangSC-Light;
          font-size: 11px;
          color: #666;
          line-height: 13px;
          pre {
            white-space: pre-wrap;
          }
        }
      }
    }
  }
  .home_msg {
    margin: 0 16px 12px;
    padding: 16px 12px;
    background: #fff;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    .hd {
      margin-bottom: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
    }
    .house_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      div {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
        div {
          margin-left: 10px;
          text-align: left;
          display: flex;
          flex-direction: column;
          div {
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 13px;
            line-height: 16px;
            color: #333;
            padding-bottom: 4px;
            word-wrap: break-word;
            margin: 0;
            span {
              width: 200px;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          p {
            font-family: PingFang-SC-Regular;
            width: 100%;
            font-size: 10px;
            line-height: 14px;
            color: #666;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .user_info {
    margin: 0 16px 12px;
    padding: 16px 12px;
    background: #fff;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    .hd {
      margin-bottom: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
    }
    .list {
      line-height: 15px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      font-family: PingFangSC-Regular;
      margin-bottom: 16px;
      .title {
        margin-right: 16px;
        font-size: 12px;
        width: 50px;
        color: #999;
      }
      .content {
        flex: 1;
        font-size: 12px;
        color: #333;
      }
    }
  }
  .footer {
    margin: 0 16px 12px;
    padding: 3vw 2vw;
    border-radius: 2vw;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999;
    p {
      margin-bottom: 6px;
    }
  }
  .fixed {
    position: fixed;
    background-color: #fff;
    padding: 8px;
    border-radius: 50%;
    left: 20px;
    bottom: 50px;
    box-shadow: 2px 2px 2px hsl(0deg 0% 60% / 50%);
  }
}
</style>
