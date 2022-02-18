<template>
  <div class="edit_person" :style="{ height: inerheight }">
    <van-nav-bar
      title="编辑入住人"
      class="titles"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="list">
      <van-field
        v-model="user_iden"
        name="证件号码"
        label="证件号码"
        type="digit"
        placeholder="请填写正确的证件号码"
        :rules="[{ required: true, message: '请填写用' }]"
      />
      <van-field
        v-model="username"
        name="真实姓名"
        label="真实姓名"
        placeholder="请填写入住人真实姓名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <!-- <van-field
        v-model="iId"
        name="入住人编号"
        label="编号"
        disabled
        placeholder="请填写入住人编号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      /> -->
      <div class="msg">
        <div class="head">
          <span class="img"></span>
          <div>
            <p>信息真实完整，免费得到住宿意外险</p>
            <span>途家住宿意外险，最高理赔21万</span>
          </div>
        </div>
        <div></div>
      </div>
      <div class="warn">
        根据公安局酒店经营管理条例，预订经营性质的酒店/民宿，需要提供当前账户的实名身份信息。当前账户的实名身份信息只用于必要的身份核实，途家民宿会为您严格保密。
      </div>
      <div class="bott">
        <van-button color="#ff9645" size="large" @click="save">
          确定</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iId: "",
      user_iden: "",
      username: "",
      reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      inerheight: "",
    };
  },
  methods: {
    md() {
      //对身份证进行加密
      return function (value) {
        value = String(value);
        return value.substr(0,parseInt(value.split('').length/5))+'*************'+value.substr(parseInt(value.split('').length/2+6),value.split('').length)
      };
    },
    onClickLeft() {
      this.$router.back(); //返回
    },
    async save() {
      //保存入住人
      this.$toast.loading({
        message: "加载中",
      });
      let res = await this.$axios.put("order/putInfo", {
        newName: this.username,
        newId: this.user_iden,
        iId: this.iId,
      });
      console.log(res);
      if (res.data.ok == 1) {
        this.$toast.success("编辑成功");
        this.$toast.clear()
        this.$router.back();
      } else {
        this.$toast.fail("网络繁忙请稍后重试");
      }
    },
  },
  created() {
    console.log(this.$route.params);
    this.user_iden = this.$route.params.user_iden;
    this.username = this.$route.params.uname;
    this.iId = this.$route.params.iId;
    this.inerheight = window.innerHeight + "px";
  },
};
</script>
<style lang="scss">
.edit_person {
  height: 100%;
  background-color: #f7f9fb;
  .list {
    background-color: #fff;
  }
  .titles {
    margin-bottom: 20px;
    i {
      color: #ff9645;
    }
  }
  .warn {
    padding: 20px;
    line-height: 15px;
    font-family: PingFangSC-Regular;
    font-size: 11px;
    color: #999;
    background-color: #f7f9fb;
    text-align: left;
  }
  .msg {
    display: flex;
    flex-direction: column;
    padding-top: 5vw;
    background-color: #f7f9fb;
    .head {
      width: 85%;
      margin: 0 auto;
      border-radius: 6px;
      .img {
        display: inline-block;
        background-image: url(https://fe.tujiacdn.com/mob/static/img/page-unitOrder.7d75bdbc.png);
        background-position: 0 0;
        width: 40px;
        height: 40px;
        background-size: 115.5px 107px;
      }
      padding: 20px 10px;
      display: flex;
      justify-content: space-around;
      background-color: #f0f3f6;
      div {
        p {
          margin-bottom: 5px;
          line-height: 1;
          font-size: 14px;
          color: #333;
          font-weight: 600;
        }
        span {
          color: #333;
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }
  .bott {
    background-color: #fff;
    padding: 10px;
    width: 100%;
    display: flex;
    border: 0 !important;
    position: fixed;
    bottom: 0;
    button {
      width: 95%;
      border-radius: 5px;
      border-color: 0;
    }
  }
}
</style>