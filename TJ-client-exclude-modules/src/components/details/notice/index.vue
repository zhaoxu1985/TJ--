<template>
  <div class="notice">
    <div class="title">预定须知</div>
    <div class="bttom-xian"></div>
    <div class="order-info">
      <div class="notice-item">
        <div class="item-first-text">入离时间</div>
        <div class="item-last-text">{{xuzhi.enter_date}}间入住，{{xuzhi.leave_date}}前退房</div>
      </div>
      <div class="notice-item top-text">
        <div class="item-first-text">在线押金</div>
        <div class="item-last-text item-icon">300元，离店后原路退还</div>
        <!-- <div class="item-more">查看说明
          <img src="/icon/arrow_right2x.png" alt="">
        </div> -->
      </div>
      <!-- <van-row class="top-text">
        <van-col span="4" class="xz-title">在线押金</van-col>
        <van-col span="10" class="xz-title">300元，离店后原路退还 </van-col>
      </van-row> -->
      <!-- <div class="notice-item2">
        <div class="nt-title">在线押金</div>
        <div class="nt-cont">200元，离店后原路退还</div>
        <div class="check-more">查看说明
          <img src="/icon/arrow_right2x.png" alt="">
        </div>
      </div> -->
      <div class="notice-item top-text">
        <div class="item-first-text">清洁费</div>
        <div class="item-last-text">{{xuzhi.clean}}</div>
      </div>

      <div class="notice-item top-text">
        <div class="item-first-text">发票说明</div>
        <div class="item-last-text">{{xuzhi.invoice}}</div>
      </div>
      <div class="notice-item top-text">
        <div class="item-first-text">取消规则</div>
        <div :class="xuzhi.cancel.grade | getcolor"> {{xuzhi.cancel.text}}</div>
      </div>

      <van-steps direction="vertical" class="step">
        <van-step>
          <span>现在预订（06月14日）</span><br>
          <span class="text-bg-color-sus">取消订单可退还全部房费</span>
        </van-step>
        <van-step>
          <span>订单确认30分钟后</span><br>
          <span class="text-bg-color-red">取消订单/提前离店将扣除未住房费的100%</span>
        </van-step>
        <van-step>
          <span> 离店（06月15日）</span>
        </van-step>
      </van-steps>


      <!-- 入住须知 -->
      <div class="notice-in">

        <div class="notice-in-tit">入住须知</div>
        <div class="notice-in-cont">
          <div class="cont-line" >
            <div class="cont-line-item" v-for=" item,index in xuzhi.type.list " :key="index">
              <img class="line-item-img" :src="item.support? src1:src2" alt="">
              <span>{{item.item}}</span>
            </div>

            <!-- <div class="cont-line-item">
              <img class="line-item-img" src="https://pic.tujia.com/upload/festatic/mp/error_red.png" alt="">
              <span>接待儿童</span>
            </div>

            <div class="cont-line-item">
              <img class="line-item-img" src="https://pic.tujia.com/upload/festatic/mp/check_green.png" alt="">
              <span>吸烟</span>
            </div>

            <div class="cont-line-item">
              <img class="line-item-img" src="https://pic.tujia.com/upload/festatic/mp/check_green.png" alt="">
              <span>聚会</span>
            </div>

            <div class="cont-line-item">
              <img class="line-item-img" src="https://pic.tujia.com/upload/festatic/mp/check_green.png" alt="">
              <span>接待老人</span>
            </div>
            <div class="cont-line-item">
              <img class="line-item-img" src="https://pic.tujia.com/upload/festatic/mp/error_red.png" alt="">
              <span>带宠物</span>
            </div>
            <div class="cont-line-item">
              <img class="line-item-img" src="https://pic.tujia.com/upload/festatic/mp/check_green.png" alt="">
              <span>做饭</span>
            </div>
            <div class="cont-line-item">
              <img class="line-item-img" src="https://pic.tujia.com/upload/festatic/mp/error_red.png" alt="">
              <span>商业拍摄</span>
            </div> -->
            
           
          
          </div>
          <!-- 尾部简介 -->
          <div class="weibu-text">{{xuzhi.type.explains}}</div>

        </div>


      </div>
    </div>
    <!-- 尾部提示 -->
    <div class="tip">
      <img src="https://pic.tujia.com/upload/festatic/mp/small_bulbs.png" alt="">
      <div>遵守入住规则有助于获得更愉快的入住体验</div>
      
    </div>
    <div class="bianxian"></div>
  </div>
</template>

<script>
export default {
  props: {
    notice: {
      type: [Object,String],
      require: true,
      default: function() {
        return {
          assure: {
            isassure: false,
            text: "免押入住，订房更轻松"

          },
          cancel: {
            grade: 2,
            text:"提前1天取消订单，可退全款"

          },
          clean: "您将免费享受房东提供的深度客房清洁服务",
          enter_date: "14:00",
          invoice:"平台可开具发票",
          leave_date: "12:00",
          type: {

          }

        }
      }
    },
  },
  data() {
    return {
      xuzhi: this.notice,
      src1: 'https://pic.tujia.com/upload/festatic/mp/check_green.png',
      src2: 'https://pic.tujia.com/upload/festatic/mp/error_red.png'

    };
  },
  watch: {
    notice(val) {
      this.xuzhi = val
    // console.log(this.xuzhi)  

    // console.log(this.xuzhi.cancel.grade)
    
     
        // this.xuzhi.cancel.grade = "item-color"

        // console.log(this.xuzhi.cancel)

        // if(this.xuzhi.cancel.grade = 2) {
          
        //    this.xuzhi.cancel.grade="item-color"
        // }


      // console.log(this.xuezhi)

      // console.log(this.gardes)
    

   },

  },
  created() {
    // console.log(this.xuzhi)
  },
  filters: {
    getcolor(val) {

      if(val == 1) {

        return "item-color1"

      } else if(val == 2) {
        return "item-color2"

      } else {
        return "item-color3"
      }
    } 
  },
  // mounted() {
  //   console.log(this.notice)
  // }
}
</script>

<style lang="scss">
.notice {
  background: #fff;
  .title {
    font-size: 20px;
    color: #333;
    line-height: 1;
    font-weight: 600;
    padding: 14px 16px;
  }
  .bttom-xian {
    width: 100%;
    border-bottom: 1px solid #e9e4e4;
  }
  .order-info {
    padding: 16px;
    border-radius: 6px;

    .top-text {
      margin-top: 20px;
    }

    .notice-item {
      display: flex;
      // justify-items: flex-start;
      // justify-content: space-between;
      justify-content: flex-start;
      // justify-content: space-between;
      font-size: 12px;
      color: #666;
      line-height: 15px;

      .item-first-text {
        width: 64px;
      }
      // .item-icon {

      // }

      .item-last-text {
        color: #333;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        // justify-content: space-between;
      }
      .item-color1 {
        background-color: rgb(23, 210, 188);
        color: #fff;
        padding: 0 4px;
      }
       .item-color2 {
        background-color: rgb(189, 154, 80);
        color: #fff;
        padding: 0 4px;
      }
       .item-color3 {
        background-color: rgb(255, 102, 102);
        color: #fff;
        padding: 0 4px;
      }

      // .item-more {
      //   display: flex;
      // }
    }
    // .notice-item2 {
    //     display: flex;
    //     justify-content: flex-start;
    //     margin-top: 20px;
    //     color: #666;
    //     line-height: 15px;
    //     font-size: 12px;
    //     .nt-title {
    //       width: 64px;

    //     }
    //     .nt-cont {
    //       display: flex;
    //       align-items: flex-start;
    //       justify-content: flex-start;
    //       color: #333;
    //     }
    //     .check-more {
    //      display: flex;
    //      justify-content: flex-end;
    //      justify-self: flex-end;
    //       margin-left: 4px;
    //       font-size: 12px;
    //       font-weight: 600;
    //       img {
    //         width: 4px;
    //         height: 8px;
    //       }

    //     }

    //   }
    .xz-title {
      color: #333;
      font-size: 12px;
    }
  }

  .van-step__icon--active, .van-step__icon--finish, .van-step__title--active, .van-step__title--finish {
    color: #969799;
  }
  .step {
    .text-bg-color-sus {
      // width: 8.3rem;
      background-color: rgba(23, 210, 188, 0.145);
        color: #17D2BC;
        padding: 0 4px;
        font-size: 12px;
    }
    .text-bg-color-red {
      // width: 14.2rem;
      background-color: rgba(255, 102, 102, 0.145);
        color: #FF6666;
        padding: 0 4px;
        font-size: 12px;


    }
  }
  .notice-in {
    // align-items: flex-start;
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    font-size: 12px;
    color: #666;
    line-height: 15px;

    .notice-in-tit {
      width: 64px;
    }
    .notice-in-cont {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      color:#333;

      .cont-line{
        display: grid;
        grid-template-columns: 50% 50%;
        width: 100%;

        .cont-line-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          color: #333;
          overflow: hidden;


          .line-item-img {
            
            background-size: 100% 100%;
            width: 12px;
            height: 12px;
            margin-right: 5px;

          }
          .line-item-img + span {
            margin-right: 60px;
          }
        }
      }
      .weibu-text {
        font-size: 12px;
        height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999;
      }

    }


  }

  .tip {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    line-height: 24px;
    max-width: 100%;
    background: #f8fafc;
    border-radius: 4px;
    padding: 0 15px;
    // margin-top: 12px;
    img {
      width: 10px;
      height: 10px;
      margin-right: 4px;
    }
    div {
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 9px;
      color: #bfbfbf;

    }

  }

  .bianxian {
    margin-top: 15px;
  }
}
</style>