<template>
  <div class="youhui">
    <div class="youhui-cont">
      <div class="youhui-background">
        <div class="youhui-txt">
          <div class="youhui-left">满100减5</div>
        </div>
        <div class="youhui-button">
          <span class="btn" @click="showyh">去领取</span>
        </div>
      </div>
      <!-- <img src="https://pic.tujia.com/upload/festatic/publicImages/red_packet_bg.png" alt=""> -->
    </div>

    <!-- 弹出层  优惠卷  -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '35%' }"
      lazy-render
      closeable
      close-icon="cross"
    >
      <!-- 红包内容 -->
      <div class="cont">
        <div class="popu-head">红包</div>
        <div class="popu-cont">
          <div class="hongbao-head">
            <span class="head-txt">房东红包</span>
            <span class="head-sub-txt">房东红包</span>
          </div>

          <div class="item-info">
            <div class="item-info-list">
              <div class="price">
                <span class="price-icon">￥</span>
                <span class="price-txt">1</span>
              </div>
              <span class="kage-desc">满100元减1元</span>
              <div class="kage-val">
                <span class="val-date">有效期：2021-06-04至2021-07-31</span>
              </div>
            </div>
            <div class="item-info-btn" ref="rece">
              <button class="operate-txt" @click="receive" >立即领取</button>
            </div>
          </div>
          <div class="item-desc" @click="showitem">
            <div class="item-desc-txt" :class="{'auto-height': showtxt}" >
              <span class="txt-info "
                >1、适用入住日期：2021-06-12至2021-12-13</span
              >
              <span :class="{ 'txt-info': showtxt, 'overflow-hide': !showtxt }"
                >2、每张订单房东红包与平台红包可以叠加使用，分别最多使用一个</span
              >
              <span :class="{ 'txt-info': showtxt, 'overflow-hide': !showtxt }"
                >3、一次性使用，抵扣定金后的余额不能再使用</span
              >
              <span :class="{ 'txt-info': showtxt, 'overflow-hide': !showtxt }"
                >4、部分促销活动暂不支持红包支付，具体详见相关活动规则页面</span
              >
            </div>
            <div class="item-desc-icon">
              <img src="/icon/ndetail_arr_down.png" alt="" :class="{'icon-info': showtxt,'icon-info-rotate': !showtxt}" />
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showtxt: false,
    };
  },
  methods: {
    showyh() {
      this.show = true;
    },
    showitem() {
      this.showtxt = !this.showtxt;
    },
    receive() {
      console.log(this.$refs.rece)
        this.$refs.rece.firstChild.disabled = true
        this.$toast('领取成功')
        this.$refs.rece.classList.add('rece-rmo')
        this.$refs.rece.firstChild.innerHTML="已领取"

    }
  },
};
</script>

<style lang="scss">
.youhui {
  padding: 0 16px;
  overflow: hidden;
  .youhui-cont {
    position: relative;
    border: none;

    .youhui-background {
      background-image: url("/icon/big_promotion_bg.png");
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 32px;
      border-radius: 4px;
      // padding: 0 12px;
      margin-top: 12px;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      .youhui-txt {
        position: relative;
        flex: 1;
        height: 18px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;
        justify-content: flex-start;
        .youhui-left {
          display: flex;
          align-items: center;
          margin-left: 4px;
          font-size: 0.6em;
          color: #fff;
          font-weight: 500;
          white-space: nowrap;
          height: 100%;
          flex-shrink: 0;
          padding: 2px 4px;
          background: hsla(0, 0%, 100%, 0.1);
          position: relative;
          border: none;
          margin-left: 15px;

          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid #fff;
            // border-top: 1px solid #fff;
            // border-bottom: 1px solid #fff;
            // border-left: 1px solid #fff;
            // border-right: 1px solid #fff;
            box-sizing: border-box;
            width: 200%;
            height: 200%;
            transform: scale(0.5);
            transform-origin: left top;
            border-radius: 4px;
            pointer-events: none;
          }
        }
      }

      .youhui-button {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: #fff;
        border-radius: 10px;
        margin-right: 15px;
        padding: 4px 8px;

        .btn {
          font-size: 11px;
          color: #e34d4c;
        }
      }
    }
  }
  .van-popup {
    background-color: #f1f3f5;
  }
  .cont {
    padding: 0 16px;
    .popu-head {
      margin-top: 20px;
      font-size: 18px;
      color: #333;
      font-weight: 600;
    }
    .popu-cont {
      margin-top: 10px;

      .hongbao-head {
        margin-bottom: 8px;

        .head-txt {
          font-size: 14px;
          color: #333;
          line-height: 17px;
          font-weight: 500;
          margin-right: 8px;
        }
        .head-sub-txt {
          font-size: 11px;
          color: #333;
          line-height: 14px;
        }
      }

      .item-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background-image: linear-gradient(90deg, #fcefe5, #ffe4cf);
        border-radius: 6px 6px 0 0;
        position: relative;
        &::after {
          display: block;
          content: "";
          width: 100%;
          height: 4px;
          background-image: url("https://pic.tujia.com/upload/festatic/mp/ndetail_circle2x.png");
          background-size: 100% 100%;
          background-repeat: repeat-x;
          position: absolute;
          bottom: -1px;
          left: 0;
        }

        .item-info-list {
          flex: 1;

          .price {
            .price-icon {
              font-size: 10px;
              color: #ff9645;
              font-weight: 500;
            }
            .price-txt {
              font-size: 18px;
              color: #ff9645;
              font-weight: 500;
            }
          }
          .kage-desc {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
          }
          .kage-val {
            margin-top: 5px;
            .val-date {
              font-size: 11px;
              color: #999;
            }
          }
        }

        .item-info-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 25px;
          background: #ff9645;
          border-radius: 12px;
          padding: 0 10px;
          .operate-txt {
            font-size: 12px;
            color: #fff;
            background: #ff9645;
           border: none;
          }
        }
        .rece-rmo {
        background: #dadada;
        .operate-txt {
          border: none;
           background: #dadada;
        }
        }
      }

      .item-desc {
        display: flex;
        align-items: flex-start;
        background: #fff;
        border: 0 0 6px 6px;
        padding: 8px 16px;

        .item-desc-txt {
          flex: 1;
          overflow: hidden;
          .txt-info {
            display: block;
            font-size: 11px;
            color: #999;
            line-height: 14px;
          }
          .overflow-hide {
            display: none;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .auto-height {
          height: auto;
        }

        .item-desc-icon {
          display: flex;
          align-items: center;
          height: 14px;
          margin-left: 20px;
          .icon-info {
            display: block;
            width: 8px;
            height: 8px;
          }
          .icon-info-rotate {
            transform: rotate(180deg);
             width: 8px;
            height: 8px;
            
          }
        }
      }
    }
  }
}
</style>