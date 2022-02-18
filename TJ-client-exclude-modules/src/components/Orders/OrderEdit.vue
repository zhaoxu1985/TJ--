<template>
  <div class="order_edit">
    <van-nav-bar
      title="订单填写"
      left-text="."
      left-arrow
      @click-left="onClickLeft"
      class="header"
    />
    <!-- 头部用户信息 -->
    <div class="order_info">
      <div class="head">
        <img
          style="width: 60px; height: 60px; border-radius: 6px"
          :src="order_info.fm"
          alt=""
        />
        <div>
          <p class="title">{{ order_info.bt }}</p>
          <span>{{
            order_info.fbt.attr +
              " | " +
              order_info.fbt.house +
              " 室" +
              " | " +
              order_info.fbt.bed +
              "厅" +
              " | " +
              "最多住" +
              order_info.fbt.person_count +
              "人" || "整套 | 实拍"
          }}</span>
        </div>
      </div>
      <div class="body">
        <div>
          <div>{{ $store.state.starDate }}</div>
          <p>{{ daystar }}入住</p>
        </div>
        <div style="font-weight: 600">-</div>
        <div>
          <div>{{ $store.state.endDate }}</div>
          <p>{{ dayend }}前离开</p>
        </div>
        <div>
          <span style="font-size: 12px; color: #ff9654">
            共{{ $store.state.night }}晚<img
              src="https://pic.tujia.com/upload/festatic/publicImages/form_arrow_right.png"
              alt=""
          /></span>
        </div>
      </div>

      <div class="foot">
        <div>
          <img
            src="https://pic.tujia.com/upload/festatic/crn/c_icon_correct.png"
            alt=""
          />
          <div>30分钟免费取消 &nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
        <div>
          <img
            src="https://pic.tujia.com/upload/festatic/crn/c_icon_lightning.png"
            alt=""
          />
          <div>立即确认</div>
        </div>
      </div>
    </div>
    <!-- 波浪线部分 -->
    <div class="bottom"></div>

    <!-- 选择用户信息 -->
    <div class="check_info">
      <!-- 卡片 -->
      <div class="card">
        <header class="head">入住信息</header>
        <div class="body">
          <div class="top">
            <div>
              入住人<img
                style="width: 16px; height: 16px"
                src="https://pic.tujia.com/upload/festatic/publicImages/tips_warn.png"
                alt=""
              />
            </div>
            <div class="right" @click="gocheck">添加/编辑</div>
          </div>
          <!-- <van-checkbox-group
            v-model="result"
            direction="horizontal"
            checked-color="#ff9645"
          > -->
          <div class="flex_wrap">
            <van-checkbox
              checked-color="#ff9645"
              v-for="(item, i) in user_info"
              :key="i"
              v-model="item.person_show"
         
              >{{ item.uname }}</van-checkbox
            >
          </div>
        </div>
        <footer class="foot">
          <div class="left">
            联系电话+86
            <img
              style="width: 6px; height: 6px"
              src="https://pic.tujia.com/upload/festatic/publicImages/jiantou-order.png"
              alt=""
            />
          </div>
          <div class="right">
            {{ phone }}
            <div class="icon"></div>
          </div>
        </footer>
      </div>

      <div class="topic">
        <div>点评积分</div>
        <div>点评最高可获800积分，可在积分商城使用</div>
      </div>

      <div class="footer">
        <div class="title">入住提示</div>
        <p>
          房东确认后，可使用在线聊天工具向房东索要入住指南，快速了解入住路线、入住方式等相关事宜。
        </p>
        <p>入住期间如有疑问，可随时联系在线客服。</p>
        <p>有未成年人入住时，需要将其监护人的联系方式告知房东。</p>
        <div class="title">费用说明</div>
        <p>
          <span>加人费：</span
          >该房源宜住人数为2人，超出宜住人数则需收取加人费¥100.00/人/晚。
        </p>
        <p><span>押金说明：</span>免押入住，订房更轻松</p>
        <p><span>发票：</span>如需房费发票, 请离店后到个人中心开具发票</p>
      </div>
    </div>

    <!-- 底部固定 -->
    <div class="bot_fixed">
      <div>
        <div>
          {{ "￥" + (order_info.new_price * $store.state.night).toFixed(2) }}
          <div>免押金入住</div>
        </div>
        <span>明细</span>
      </div>
      <div>
        <p></p>
        <van-button type="primary" color="#ff9645" size="normal" @click="go_pay"
          >提交订单</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user_info: [], //订单信息
      result: [], //入住人选中
      checked: "", //是否选中
      order_info: "",
      phone: "", //当前用户的电话号码
    };
  },
  watch: {},
  computed: {
    daystar() {
      let weekarr = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      return weekarr[
        new Date(Math.min.apply(null,this.$store.state.dataDate)).getDay()
      ];
    },
    dayend() {
      let weekarr = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      return weekarr[
        new Date(Math.max.apply(null, this.$store.state.dataDate)).getDay()
      ];
    },
  },
  methods: {
    onClickLeft() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "当前订单未完成 确认要离开吗",
        })
        .then(() => {
          this.$router.replace({ path: "/order" }); //离开订单的操作
        })
        .catch(() => {
          return;
        });
    },
    gocheck() {
      this.$router.push("/check_person");
    },
    async go_pay() {
      let flag = false;
      console.log(this.user_info)
      this.user_info.forEach((item) => {
        console.log(item, item == true);
        if (item.person_show == true) {
          //如果有入住人被选中 则放行
          flag = true;
        }
      });
      console.log(flag);
      if (flag == false) {
        //如果flag为false 后面不执行 提醒添加入住人信息
        this.$toast.fail("请添加入住人信息");
        return;
      }
      let oid = this.order_info.uid;
      let oname = this.order_info.bt;
      this.$toast.loading({
        message: "提交中",
        forbidClick: true,
      });
      let result = await this.$axios.post("order/reserve", {
        //判断当前订单是否可以预定
        rid: oid,
        title: oname,
        cover: this.order_info.fm,
        r_params: this.order_info.fbt,
        start_time: this.$store.state.dataDate[0]>this.$store.state.dataDate[1]?this.$store.state.dataDate[1]:this.$store.state.dataDate[0],
        end_time: this.$store.state.dataDate[0]>this.$store.state.dataDate[1]?this.$store.state.dataDate[0]:this.$store.state.dataDate[1],
        price: this.order_info.new_price * this.$store.state.night,
        name: window.localStorage.getItem("uname"),
        phone: window.localStorage.getItem("phone"),
      }); //判断订单是否可以预定 响应成功后 关闭加载动画
      if (result.data.ok == 1) {
        result.data.rid = oid
        this.$store.commit("setOrderFinishBuy", result.data);
        this.$router.replace({name:'oder_pay',params:{
          rid:oid,
          oid:result.data.result.oid
        }});
        this.$toast.clear();
      } else {
        this.$toast.fail("预定失败" + result.data.msg);
        this.$router.replace({path:'/order'})
      }
    },
  },
  async created() {
    this.phone = localStorage.getItem("phone");
    this.order_info = this.$store.state.OrderCommitInfo;
    console.log(this.$store.state.OrderCommitInfo);
    console.log(this.order_info);
    this.$toast.loading({
      message:"加载中"
    })
    let user_info = await this.$axios.get("/order/resideInfo"); //获取入住人的信息
    this.$toast.clear()
    user_info.data.result.forEach((item) => {
      //入住人
      item.person_show=true
    });
    this.user_info = user_info.data.result; //用户人信息
    console.log(this.user_info,this.result)
  },
  async mounted() {},
};
</script>
<style lang="scss">
.order_edit {
  word-wrap: break-word;
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
  .order_info {
    display: flex;
    flex-direction: column;
    padding: 0 15px 16px;
    .head {
      display: flex;
      justify-content: flex-start;
      padding: 16px 0;
      div {
        margin-left: 15px;
        .title {
          width: 90%;
          display: -webkit-box;
          font-size: 15px;
          line-height: 21px;
          color: #333;
          font-weight: 600;
          max-width: 100%;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
        }
      }

      span {
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 4px;
        font-size: 11px;
        line-height: 15px;
        color: #999;
      }
    }
    .body {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;

      div {
        text-align: left;
        div {
          font-size: 16px;
          color: #333;
          text-align: left;
          font-weight: 600;
        }
      }
      img {
        width: 7px;
        height: 12px;
        margin-left: 8px;
      }
      p {
        width: 100%;
        height: 20px;
        font-size: 11px;
        padding-top: 4px;
        color: #999;
        overflow: hidden;
        white-space: nowrap;
      }
    }
    .foot {
      display: flex;
      div {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #17d2bc;
      }
      img {
        width: 11px;
        height: 11px;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 18px;
    background: url(https://pic.tujia.com/upload/festatic/day_190122/201901221103322734.png)
      repeat-x;
    background-color: #f7f9fb;
    background-size: contain;
  }
  .check_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f7f9fb;
    padding: 5px 15px 70px 15px;
    .card {
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      padding: 0 10px;
      border-radius: 6px;
      .head {
        width: 100%;
        height: 55px;
        line-height: 55px;
        color: #333;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 1px solid rgb(240, 240, 240);
      }
      .body {
        display: flex;
        flex-direction: column;
        .flex_wrap {
          display: flex;
          flex-wrap: wrap;
          div {
            margin: 2px 5px;
          }
        }
        .top {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          div {
            display: flex;
            align-items: center;
          }
          .right {
            font-size: 13px;
            color: #ff9645;
            font-weight: bold;
          }
        }
        .bot {
          // position: relative;
          display: block;
          padding: 15px 5px;
          box-sizing: border-box;
          border-bottom: 1px solid rgb(240, 240, 240);
          .van-badge--fixed {
            position: absolute;
            top: 5px !important;
            right: -10px !important;
          }
          button {
            width: 73px;
            height: 28px;
            box-sizing: border-box;
            padding: 0 10px;
            border-radius: 6px !important;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            margin: 0 5px;
            font-weight: 100;
            border: 1px solid #ff9645;
            color: #ff9645;
          }
          .fei_show {
            border: 1px solid #e9e9e9 !important;
            background-color: #fff !important;
            color: #e9e9e9;
            font-size: 14px;
            font-weight: 100;
          }
        }
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        .left {
          font-size: 13px;
          color: #333;
          font-weight: 700;
        }
        .right {
          display: flex;
          align-items: center;
          .icon {
            display: inline-block;
            background-color: red;
            background-color: var(--tjc-theme, #ff9645);
            -webkit-mask: url(https://pic.tujia.com/upload/festatic/publicImages/phone-icon-new.png)
              no-repeat;
            mask: url(https://pic.tujia.com/upload/festatic/publicImages/phone-icon-new.png)
              no-repeat;
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
            width: 18px;
            height: 18px;
            margin-left: 20px;
          }
        }
      }
    }
    .topic {
      display: flex;
      justify-content: flex-start;
      background-color: #fff;
      margin-top: 15px;
      padding: 15px 10px;
      border-radius: 1vw;
      & > div:first-child {
        width: 15vw;
        height: 15px;
        font-size: 12px;
        border: 1px solid #ff9645;
        color: #ff9645;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & > div:last-child {
        display: flex;
        align-items: center;
        margin-left: 5px;
        font-size: 12px;
        color: #666;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .footer {
      margin-top: 16px;
      padding: 2vw 2vw;
      border-radius: 1vw;
      .title {
        font-size: 13px;
        font-weight: 900;
        color: #333;
        line-height: 16px;
        margin-top: 10px;
        margin-bottom: 6px;
      }
      span {
        color: #333;
        font-weight: 900;
      }
      p {
        font-size: 11px;
        margin: 1vw 0;
        line-height: 16px;
        color: #666;
      }
    }
  }
  .bot_fixed {
    background-color: #fff;
    position: fixed;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15vw;
    padding: 0 15px;
    color: #ff9645;
    & > div:first-child {
      width: 65%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      div {
        font-size: 6vw;
        div {
          display: block;
          font-size: 11px;
          color: #999;
          margin-top: 3px;
        }
      }
      span {
        position: relative;
        width: 28px;
        text-align: right;
        font-size: 11px;
        color: #ff9645;
      }
    }
    & > div:last-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 35%;
      p {
        display: inline-block;
        background-image: url(https://fe.tujiacdn.com/mob/static/img/page-unitOrder.7d75bdbc.png);
        background-position: -91px -52px;
        width: 6px;
        height: 6px;
        background-size: 115.5px 107px;
        margin-right: 5px;
      }
      button {
        height: 10vw !important;
        border-radius: 5px !important;
      }
    }
  }
}
</style>
