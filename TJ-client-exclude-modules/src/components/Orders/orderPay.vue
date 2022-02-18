<template>
  <div class="OP-box">
      <van-nav-bar
      title="订单填写"
      left-text="."
      left-arrow
      @click-left="onClickLeft"
      class="header"
    />

    <div class="OP-countDownBox">
      <div style="font-size: 24px">支付时间剩余</div>
      <van-count-down style="margin: 20px 0px" @finish='timeOutFinish' :time="formateDate()">
        <template #default="timeData">
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
      <div>{{orderInfo.detailInfo.r_name}}</div>
      <div style="color: #999; font-size: 12px;margin-top:10px">{{starDate}} -- {{endDate}} 共{{night}}晚</div>
    </div>

    <!-- 支付方式 -->
    <div class="OP-payWay-box">
      <van-radio-group v-model="selectPayWay">
        <div class="OP-payWay-box-content">
          <div>
            <img
              width="28px"
              src="https://pic.tujia.com/upload/mobileconfig/day_190404/201904041758414443.png"
              alt=""
            />
            <div class="OP-payWay-items-left">
              <p>支付宝支付</p>
              <p style="font-size: 12px">安全支付，推荐使用</p>
            </div>
            <div class="OP-payWay-items-right">
              <van-radio name="1" checked-color="#ff9645"></van-radio>
            </div>
          </div>

          <div>
            <img
              width="28px"
              src="https://pic.tujia.com/upload/mobileconfig/day_190404/201904041811421748.png"
              alt=""
            />
            <div class="OP-payWay-items-left">
              <p>微信支付</p>
              <p style="font-size: 12px">安全支付，推荐使用</p>
            </div>
            <div class="OP-payWay-items-right">
              <van-radio name="2" checked-color="#ff9645"></van-radio>
            </div>
          </div>

          <div>
            <img
              width="28px"
              src="https://pic.tujia.com/upload/mobileconfig/day_190404/201904041813299294.png"
              alt=""
            />
            <div class="OP-payWay-items-left">
              <p>京东白条</p>
              <p style="font-size: 12px">京东安全支付</p>
            </div>
            <div class="OP-payWay-items-right">
              <van-radio name="3" checked-color="#ff9645"></van-radio>
            </div>
          </div>

          <div>
            <img
              width="28px"
              src="https://pic.tujia.com/upload/mobileconfig/day_201016/202010161807031102.png"
              alt=""
            />
            <div class="OP-payWay-items-left">
              <p>云闪付支付</p>
              <p style="font-size: 12px">云闪付支付</p>
            </div>
            <div class="OP-payWay-items-right">
              <van-radio name="4" checked-color="#ff9645"></van-radio>
            </div>
          </div>
        </div>
      </van-radio-group>
    </div>
    <van-button
      type="primary"
      color="#ff9645"
      class="submit"
      block @click="finish_buy"
      >确认支付 ￥ {{orderInfo.userInfo.price || '00,00' }}</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      selectPayWay: "1",
      orderInfo:{},
    };
  },
   
  created() {
       this.getOrderInfo()
  },
  methods: {
    onClickLeft() {
      this.$dialog
        .confirm({
          title: "提醒",
          message: "您有一笔订单待支付，确定要离开吗",
        })
        .then(() => {
          this.$router.replace('/order');
          //在将这笔订单改为 未支付状态
        })
        .catch(() => {
          return;
        });
    },
  
    //提交支付 更改状态为已支付
    async finish_buy(){
        this.$dialog.confirm({
          title: "扫码支付",
          message: `<img style="height: 30vh" src="img/code.jpg" alt=""/>`,
        })
        .then(async () => {
            
            let {data:res} = await this.$axios.post(`/order/reserve/pay?oid=${this.$store.state.orderFinishBuy.result.oid}`)
              console.log(res)
            if(res.ok==1){
              this.$toast.success('支付成功')
              setTimeout(_=>{
                return this.$router.replace({name:'oder_detail',params:{
                  oid:this.$store.state.orderFinishBuy.result.oid,
                  rid:this.$store.state.orderFinishBuy.rid,
                }})
              },1000)
            }else{
              this.$toast.success('支付失败')
              this.$router.replace({path:"/order_edit"});
            }
           
        })
        .catch(() => {
          return;
        });   
    },
  //订单计时完成触发
    timeOutFinish(){
        this.$toast.fail('订单以失效')
        this.$router.replace({path:'order'})
    },
    async getOrderInfo(){
        let {data:res} = await this.$axios.get('/order/detail',{params:{
            oid:this.orderFinishBuy.result.oid,
            rid:this.orderFinishBuy.rid
        }})
        if(res.ok!=1) return this.$toast.fail('查询订单失败')
        console.log(res);
        this.orderInfo = res.result
    },
    formateDate(){
        return Number(this.orderInfo.userInfo.date)+720000 - new Date().getTime()
    }
  },

  computed:{
      //  引入vuex sate
      ...mapState(['starDate','endDate','night','orderFinishBuy']),
      //订单倒计时时间f
  },
  
};
</script>

<style lang="scss">
p {
  margin: 0;
}
.submit {
  height: 60px;
  position: fixed;
  bottom: 0;
}
.OP-box {
  height: 100vh;
  background-color: #f8f9fb;
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
}

.OP-countDownBox {
  padding: 25px 0px;
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 8%);
}
.OP-countDownBox div {
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 倒计时>>>>>>>>>>>>>>>start  */
.colon {
  display: inline-block;
  margin: 0 4px;
  color: black;
  font-weight: 600;
  font-size: 24px;
}
.block {
  display: inline-block;
  min-width: 25px;
  height: 25px;
  background-color: #3f4954;
  color: #fff;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  margin: 0 10px;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
}
/* 倒计时>>>>>>>>>>>>>>>end  */

/* 支付方式>>>>>>>>>>>>>>start */

.OP-payWay-box {
  margin-top: 10px;
  padding: 0px 20px;
  background: white;
  min-height: 300px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 6%);
}
.OP-payWay-box div {
  height: 65px;
}
.OP-payWay-box-content > div {
  width: 100%;
  height: 65px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.OP-payWay-items-left {
  flex: 50%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  flex-wrap: wrap;
  padding: 10px 0px;
  box-sizing: border-box;
}
.OP-payWay-items-left p {
  width: 100%;
}
.OP-payWay-items-right {
  flex: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.van-radio__icon--checked,
.van-radio__icon {
  display: flex;
  align-items: center;
}
/* 支付方式>>>>>>>>>>>>>>end */
</style>