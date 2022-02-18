<template>
  <div class="landlord">
    <div class="fangd">房东介绍</div>
    <div>
      <img class="grade-img" src="/icon/v4landlord.png" alt="" />
    </div>
    <div class="landlord-info">
      <van-image
        round
        width="3.5rem"
        height="3.5rem"
        :src="land.img"
      />

      <div class="jies-info">
        <div class="fd-name">{{land.uname}}</div>
        <div class="fangcan">
          <span class="shuxian">自然人房东</span>
          <span class="shuxian">实名验证</span>
          <span>3套房屋</span>
        </div>
        <span class="fuwu">服务超过97%的房东</span>
      </div>

      <van-button class="button" color="linear-gradient(90deg,#fa8c1d,#fcaf3f)"
      @click="lianxi"
      >
        联系房东</van-button
      >
    </div>
    <div class="dp-info">
      <div>
        <div>好评率</div>
        <div>100%</div>
        <div>共<span class="num">46</span>条点评</div>
      </div>
      <div>
        <div>聊天回复率</div>
        <div>82%</div>
        <div>平均<span class="num">8</span>分钟回复</div>
      </div>
      <div>
        <div>订单确认率</div>
        <div>100%</div>
        <div>下单立即确认</div>
      </div>
    </div>
    <div class="zhuye" @click="other">查看房东主页 <span class="arrow"></span></div>
  </div>
</template>

<script>
export default {
  props: {
    fowner: {
      type: [Object,String],
      require: true
    }

  },
  data() {
    return {
      land:this.fowner
    };
  },
  mounted() {

    // console.log(this.fowner)

  },
  methods: {
    lianxi() {
      this.$router.push({
        name: 'msg',
        params: {
          uid: this.land.sid,
          head_img: this.land.img,
          uname: this.land.uname
        }
      })

    },
     other() {
      this.$toast({
        message: "功能待开发",
        icon: "smile",
      });
    },

  },
  watch: {
    fowner(val) {
      this.land = val
      // console.log(this.land)
    }
  }
}
</script>

<style lang="scss">
.landlord {
  padding: 0 16px;
  background: #fff;
  margin-top: 10px;

  .fangd {
    width: 100%;
    height: 52px;
    line-height: 52px;
    font-size: 20px;
    color: #333;
    font-weight: 600;
  }
  .grade-img {
    width: 100%;
    height: 30px;
    border-radius: 4px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .landlord-info {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;

    .jies-info {
      .fd-name {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        overflow: hidden;
      }

      .fangcan > span {
        font-size: 12px;
        color: rgb(155, 155, 155);
      }
      .shuxian::after {
        display: inline-block;
        content: "|";
        height: 12px;
        margin: 0 4px;
        color: #9b9b9b;
      }
      .fuwu {
        color: rgb(23, 210, 188);
        background: rgb(227, 250, 247);
        font-size: 10px;
        border-radius: 2px;
        margin-right: 4px;
        padding: 2px 4px;
      }
    }

    .button {
      height: 25px;
      border-radius: 4px;
      font-size: 12px;
    }
  }

  .dp-info {
    padding: 22px 0 12px 0;
    display: flex;
    justify-content: space-between;
    & > div {
      & > :first-child {
        font-size: 12px;
        color: #999;
      }
      & > :nth-child(2) {
        font-size: 18px;
        color: #333;
        font-weight: 600;
        margin: 4px 0 2px;
      }
      & > :last-child {
        font-size: 12px;
        color: #666;
        .num {
          color: #ff9645;
        }
      }
    }
  }
  .zhuye {
    text-align: end;
    color: #ff9645;
    font-size: 14px;
    font-weight: 600;
    line-height: 40px;

    .arrow {
      display: inline-block;
      // background-color: #ff9645;
      background-image: url("/icon/tujia_arrow_right.png");
      width: 10px;
      background-size: 100% 100%;

      height: 10px;
      margin-left: 2px;
      background-repeat: no-repeat;
    }
  }

}
</style>