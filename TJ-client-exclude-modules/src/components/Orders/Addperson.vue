<template>
  <div class="add_person" :style="{ height: outheight }">
    <van-nav-bar :title="titles" class="titles" @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" color="rgb(102, 102, 102)" />
      </template>
    </van-nav-bar>

    <div class="content">
      <van-field
        disabled
        name="证件类型"
        label="证件类型"
        placeholder="身份证"
        :rules="[{ required: true, message: '请填写证件类型' }]"
        right-icon="arrow"
      />
      <van-field
        v-model="user_iden"
        name="证件号码"
        label="证件号码"
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
    </div>
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
      <van-button color="#ff9645" size="large" @click="save"> 确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showpover: true,
      outheight: "",
      titles: "添加入住人",
      username: "",
      user_iden: "",
      reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }, // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading("验证中...");
        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    async save() {
      if (
        this.username != "" &&
        this.user_iden != "" &&
        this.reg.test(this.user_iden)
      ) {
        let userinfo = {
          uname: this.username,
          id: this.user_iden,
        };
        this.$toast.loading({
          message: "加载中",
        });
        await this.$axios.post("order/addInfo", userinfo); //添加入住人
        this.$toast.clear()
        this.$router.push("/check_person");
      } else {
        this.$toast.fail("身份证号码格式不正确 请重新输入");
      }
    },
  },
  mounted() {
    this.outheight = window.innerHeight + "px";
  },
};
</script>
<style lang="scss">
.add_person {
  width: 100%;
  background-color: #f7f9fb;
  // .titles {
  //   i {
  //     color: #ff9654 ;
  //   }
  // }
  .content {
    margin: 15px 0;
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
  .warn {
    padding: 20px;
    line-height: 15px;
    font-family: PingFangSC-Regular;
    font-size: 11px;
    color: #999;
    text-align: left;
  }
  .msg {
    display: flex;
    flex-direction: column;
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
}
</style>