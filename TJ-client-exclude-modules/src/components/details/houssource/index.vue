<template>
  <div class="houssource">
    <!-- <van-card
    
    >
      <div slot="thumb">
        <van-image
          width="82"
          height="104"
          :src="house"
        />
        <span class="card-img-text">当前房源</span>
      </div>

      <template #title>
        <div class="desc">
          实拍·整套·1居1床2人·48㎡
        </div>
        <div class="arrow">></div>
        
      </template>   
    </van-card> -->

    <van-card>
      <template #thumb>
        <van-image width="82" height="104" :src="swiper[0].url[0]" />
        <span class="card-img-text">当前房源</span>
      </template>
      <template #title>
        <div class="card-title">
          {{ params.attr }}·{{ params.house }}居{{ params.bed }}床{{
            params.person_count
          }}人·{{ params.area }}㎡
          <!-- <div class="card-arrow"><img src="/icon/aggregation-right-black.png" alt=""></div> -->
        </div>
      </template>
      <template #desc>
        <div class="card-desc">北欧风情观景大床房 （车接车送）</div>
      </template>
      <template #tags>
        <van-tag color="rgba(255, 102, 102, 0.1)" text-color="#f66"
          >今日特价减110</van-tag
        >
        <br />
        <div class="card-xuzhi">
          <img src="/icon/tanhao.png" alt="" />
          <span class="card-text">取消订单，将收取全部房费</span>
          <img src="/icon/lvshandian.png" alt="" /><span>立即确认</span>
          <van-row class="jg">
            <!-- <van-col  offset="12" span="4">
          
          <van-col offset="2" span="6">
            <s>¥1000</s><br>
          <span class="">¥989 </span>/晚 
          </van-col>
          
          <van-col offset="6" span="4"><van-button class="button" size="small" color="linear-gradient(90deg,#fa8c1d,#fcaf3f)" >预定</van-button></van-col>
        
        </van-col> -->

            <van-col class="yjg" offset="2" span="4">
              <s class="xhx">¥{{ jiage.price }}</s>
            </van-col>
            <van-col offset="4" span="6">
              <span class="newjg">¥{{ jiage.new_price }} </span>/晚
            </van-col>
            <van-col offset="3" span="4">
              <van-button
                class="button"
                size="small"
                color="linear-gradient(90deg,#fa8c1d,#fcaf3f)"
                @click="yuyue"
                
                ref="disable"
                >预定</van-button
              >
            </van-col>
          </van-row>
        </div>
      </template>
    </van-card>

    <div class="other">房东同地址其它房源</div>

    <van-card>
      <template #thumb>
        <van-image
          width="82"
          height="104"
          src="https://pic.tujia.com/upload/landlordunit/day_190414/thumb/201904141312335824_700_467.jpg"
        />
        <!-- <span class="card-img-text">当前房源</span> -->
      </template>
      <template #title>
        <div class="card-title">实拍·整套·2居2床2人·38㎡</div>
      </template>
      <template #desc>
        <div class="card-desc">欧风情观景大床房 （车接车送）</div>
      </template>
      <template #tags>
        <van-tag color="rgba(255, 102, 102, 0.1)" text-color="#f66"
          >今日特价减210</van-tag
        >
        <br />
        <div class="card-xuzhi">
          <img src="/icon/tanhao.png" alt="" />
          <span class="card-text">取消订单，将收取全部房费</span>
          <img src="/icon/lvshandian.png" alt="" /><span>立即确认</span>
          <van-row class="jg">
            <!-- <van-col  offset="12" span="4">
          
          <van-col offset="2" span="6">
            <s>¥1000</s><br>
          <span class="">¥989 </span>/晚 
          </van-col>
          
          <van-col offset="6" span="4"><van-button class="button" size="small" color="linear-gradient(90deg,#fa8c1d,#fcaf3f)" >预定</van-button></van-col>
        
        </van-col> -->

            <van-col class="yjg" offset="2" span="4">
              <s class="xhx">¥1000</s>
            </van-col>
            <van-col offset="4" span="6">
              <span class="newjg">¥789 </span>/晚
            </van-col>
            <van-col offset="3" span="4">
              <van-button
                class="button"
                size="small"
                color="linear-gradient(90deg,#fa8c1d,#fcaf3f)"
                @click="otherYuyue"
                >预定</van-button
              >
            </van-col>
          </van-row>
        </div>
      </template>
    </van-card>

    <van-card>
      <template #thumb>
        <van-image
          width="82"
          height="104"
          src="https://pic.tujia.com/upload/landlordunit/day_190414/thumb/201904141312288527_700_467.jpg"
        />
        <!-- <span class="card-img-text">当前房源</span> -->
      </template>
      <template #title>
        <div class="card-title">实拍·整套·3居1床2人·68㎡</div>
      </template>
      <template #desc>
        <div class="card-desc">欧洲风情观景大床房 （车接车送）</div>
      </template>
      <template #tags>
        <van-tag color="rgba(255, 102, 102, 0.1)" text-color="#f66"
          >今日特价减80</van-tag
        >
        <br />
        <div class="card-xuzhi">
          <img src="/icon/tanhao.png" alt="" />
          <span class="card-text">取消订单，将收取全部房费</span>
          <img src="/icon/lvshandian.png" alt="" /><span>立即确认</span>
          <van-row class="jg">
            <!-- <van-col  offset="12" span="4">
          
          <van-col offset="2" span="6">
            <s>¥1000</s><br>
          <span class="">¥989 </span>/晚 
          </van-col>
          
          <van-col offset="6" span="4"><van-button class="button" size="small" color="linear-gradient(90deg,#fa8c1d,#fcaf3f)" >预定</van-button></van-col>
        
        </van-col> -->

            <van-col class="yjg" offset="2" span="4">
              <s class="xhx">¥1100</s>
            </van-col>
            <van-col offset="4" span="6">
              <span class="newjg">¥989 </span>/晚
            </van-col>
            <van-col offset="3" span="4">
              <van-button
                class="button"
                size="small"
                color="linear-gradient(90deg,#fa8c1d,#fcaf3f)"
                @click="otherYuyue"
                >预定</van-button
              >
            </van-col>
          </van-row>
        </div>
      </template>
    </van-card>

    <van-card>
      <template #thumb>
        <van-image
          width="82"
          height="104"
          src="https://pic.tujia.com/upload/landlordunit/day_190414/thumb/201904141313158778_700_467.jpg"
        />
        <!-- <span class="card-img-text">当前房源</span> -->
      </template>
      <template #title>
        <div class="card-title">
          {{ params.attr }}·{{ params.house }}居{{ params.bed }}床{{
            params.person_count
          }}人·{{ params.area }}㎡
        </div>
      </template>
      <template #desc>
        <div class="card-desc">英国风情观景大床房 （车接车送）</div>
      </template>
      <template #tags>
        <van-tag color="rgba(255, 102, 102, 0.1)" text-color="#f66"
          >今日特价减90</van-tag
        >
        <br />
        <div class="card-xuzhi">
          <img src="/icon/tanhao.png" alt="" />
          <span class="card-text">取消订单，将收取全部房费</span>
          <img src="/icon/lvshandian.png" alt="" /><span>立即确认</span>
          <van-row class="jg">
            <!-- <van-col  offset="12" span="4">
          
          <van-col offset="2" span="6">
            <s>¥1000</s><br>
          <span class="">¥989 </span>/晚 
          </van-col>
          
          <van-col offset="6" span="4"><van-button class="button" size="small" color="linear-gradient(90deg,#fa8c1d,#fcaf3f)" >预定</van-button></van-col>
        
        </van-col> -->

            <van-col class="yjg" offset="2" span="4">
              <s class="xhx">¥103</s>
            </van-col>
            <van-col offset="4" span="6">
              <span class="newjg">¥999 </span>/晚
            </van-col>
            <van-col offset="3" span="4">
              <van-button
                class="button"
                size="small"
                color="linear-gradient(90deg,#fa8c1d,#fcaf3f)"
                @click="otherYuyue"
                >预定</van-button
              >
            </van-col>
          </van-row>
        </div>
      </template>
    </van-card>
    <div class="bianxian"></div>
  </div>
</template>
<script>
export default {
  props: {
    params: {
      type: Number | String,
      require: true,
      default: ()=> {
        return {};
      }
    },
    swiper: {
      type: Object | Array | String,
      require: true,
      default: function () {
        return [
          {
            class_name: "",
            type: "",
            url: [""],
          },
        ];
      },
    },
    jiage: {
      type: Object | Number,
      require: true,
      default: function () {
        return {
          price: "",
          new_price: "",
          r_name:'',
        };
      },
    },
  },
  // props: ['params','swiper'],
  data() {
    return {
      show: false,
      // houses: 'https://pic.tujia.com/upload/landlordunit/day_190414/thumb/201904141312288527_700_467.jpg',
      // yuyued: {
      //   price: this.jiage.price,
      //   new_price: this.jiage.new_price,
      //   uid: this.$route.query.id,
      //   fm: this.swiper[0].url[0],
      //   bt: this.jiage.r_name,
      //   fbt: this.params,

      // }
    };
  },
  created() {
    //  const startdate = Math.min.apply(null, this.$store.state.dataDate);
    // const enddate = Math.max.apply(null, this.$store.state.dataDate);
    // console.log(startdate,enddate)
    // this.$axios
    //   .get(`/details/is?start=${startdate}&end=${enddate}&rid=${this.$route.query.id}`)
    //   .then((result) => {
    //     console.log(result.data)
        this.$nextTick(() => {
          console.log(this.$refs.disable)
          if (this.$store.state.isReserve == -1) {
            // this.$refs.btndisable.disable = true;
            // this.$refs.btndisable.color = "#a9a9a9";
            // console.log(this.$refs.disable.disabled)
            this.$refs.disable.disabled = true
            // console.log(this.$refs.disable.style)
            // const style = getComputedStyle(this.$refs.disable)
            // // this.$refs.disable.style.backgroundColor = "#fff"
            // console.log(style.background)
            // this.$refs.disable.classList.add('dbtn')
            this.$refs.disable.style.background = 'linear-gradient(270deg,#d4d4d4,#a9a9a9)'
          }
        });
      // });

  },

  methods: {
    showPopup() {
      this.show = true;
    },
    // yuyuel() {
    //   console.log({
    //     price: this.jiage.price,
    //     new_price: this.jiage.new_price,
    //     uid: this.$route.query.id,
    //     fm: this.swiper[0].url[0],
    //     bt: this.jiage.r_name,
    //     fbt: this.params,

    //   })
    // },
    otherYuyue() {
      this.$toast({
        message: '功能待开发',
        icon: 'smile',
      })

    },
     async yuyue() {

        let startdate = Math.min.apply(null,this.$store.state.dataDate)
      let enddate = Math.max.apply(null,this.$store.state.dataDate)
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        selector: "#custom-selector",
      });
      let { data: res } = await this.$axios.get("/details/is", {
        params: {
          start: startdate,
          end: enddate,
          rid: this.$route.query.id,
        },
      });
      if (res.ok == 1) {
        this.$store.commit("setOrderCommitInfo", {
        price: this.jiage.price,
        new_price: this.jiage.new_price,
        uid: this.$route.query.id,
        fm: this.swiper[0].url[0],
        bt: this.jiage.r_name,
        fbt: this.params,

      });
        this.$router.replace({ path: "/order_edit" });
        this.$toast.clear();
      } else {
        this.$toast.fail(res.msg);
        this.$toast.clear();
      }
    },
  },

};
</script>


<style lang="scss">
.houssource {
  //  .van-card__header {
  //     width: 82px;
  //    height: 104px;

  // .van-card__content {
  //   min-width: 100%;
  // }

  .card-title {
    font-size: 14px;
    color: #333;
    font-weight: 600;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    //   .card-arrow {
    //     font-size: 20px;
    //     font-weight: 10;
    //     color: #969799 !important;
    //     float: right;
    // }
    &::after {
      display: block;
      content: "";
      width: 7px;
      height: 12px;
      background-image: url("/icon/aggregation-right-black.png");
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .card-desc {
    color: #666;
    overflow: hidden;
    white-space: nowrap;
  }
  .card-xuzhi {
    img {
      width: 10px;
      height: 10px;
      margin-right: 2px;
    }
    .card-text {
      margin-right: 8px;
    }
  }
  // .price {
  //   float: left;
  //   margin-left: 75%;

  // }
  .yj {
    margin-right: 18vw;
  }
  // .jk{
  //   margin-top: 200px;
  // }
  .jg {
    margin-top: 10px;
  }
  .button {
    width: 53px;
    height: 28px;
    font-weight: 600;
  }
  .dbtn {
    background: red;
  }
  .yjg {
    text-align: center;
    line-height: 30px;
    .xhx {
      font-size: 12px;
      text-decoration: line-through;
    }
  }
  .newjg {
    font-size: 14px;
    color: #ff9645;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
  }
  // .claerfloat::after {
  //   content: "";
  //   display: block;
  //   clear: both;
  //   visibility: hidden;
  // }

  .card-img-text {
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 93%;
    height: 20px;
    background-color: rgba(51, 51, 51, 0.7);
    color: #fff;
    text-align: center;
    line-height: 20px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .other {
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    height: 36px;
    position: relative;

    font-size: 13px;
    font-weight: 600;
    color: #333;
    padding: 0 0 5px 29px;
    &::before {
      position: absolute;
      bottom: 5px;
      left: 16px;
      display: block;
      content: "";
      width: 3px;
      height: 13px;
      background: linear-gradient(135deg, #fa8c1d, #fcaf3f);
      border-radius: 3px;
    }
  }

  .bianxian {
    width: 100%;
    border-bottom: 10px solid #f7f9fb;
  }
}
</style>