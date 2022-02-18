<template>
  <div class="Phone_changge" :style="{ height: innerheight }">
    <div v-show="verify">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title>
          <div style="font-size: 16px; color: #333">手机号</div>
        </template>
        <template #left>
          <van-icon name="arrow-left" size="25" />
        </template>
      </van-nav-bar>
      <div class="head_box">
        <div>手机号</div>
        <div>{{ md(uphone) }}</div>
      </div>
      <van-button
        type="primary"
        class="bot"
        @click="change_phone"
        size="large"
        color="#ff9645"
        >更换手机号</van-button
      >
    </div>

    <!-- 身份验证 -->
    <div
      class="verify_phone"
      :style="{ height: innerheight }"
      v-show="show_verify"
    >
      <van-nav-bar left-arrow @click-left="close_verify">
        <template #title>
          <div style="font-size: 16px; color: #333">身份验证</div>
        </template>
        <template #left>
          <van-icon name="arrow-left" size="25" />
        </template>
      </van-nav-bar>
      <div class="hint">请使用新手机号接受验证码以完成验证</div>
      <van-field
        v-model="new_phone"
        type="tel"
        placeholder="请输入手机号"
        label="+86"
      />
      <div class="ver_bot">
        <input type="text" placeholder="输入验证码" v-model="auth_code" />
        <div class="ver_code">
          <!-- 发送验证码 -->
          <div class="send" @click="send" v-show="!is_count">{{ md_text }}</div>
          <van-count-down
            ref="countDown"
            :time="timers"
            format="ss"
            v-show="is_count"
            auto-start="false"
            @finish="finish"
          />
        </div>
      </div>
      <van-button
        type="primary"
        class="bot"
        @click="md_ver"
        size="large"
        color="#ff9645"
        :disabled="send_vercode"
        >验证</van-button
      >
      <div class="foot" @click="alert_jing">无法接受验证码?</div>
    </div>
    <!-- 填写验证码 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      verify: true, //显示更换手机号
      uphone: "", //电话号码
      ver_code: "", //验证码
      show_verify: false, //是否显示身份验证
      new_phone: "", // 新的手机号
      send_vercode: true, //是否发送验证码
      is_count: false, //是否显示倒计时
      timers: 60 * 1000, //倒计时计数
      md_text: "发送验证码", //文本
      auth_code: "", //输入的验证码
      accept_id: "",
    };
  },
  computed: {
    md(val) {
      return function (val) {
        val = " " + val;
        val = val.replace(val.substring(4, 8), "****");
        return val;
      };
    },
  },
  watch: {
    auth_code(newval, oldval) {
      if (newval.length > 4) {
        this.send_vercode = false;
      } else {
        this.send_vercode = true;
      }
    },
  },
  created() {
    this.innerheight = window.innerHeight + "px";
    this.uphone = window.localStorage.getItem("phone");
  },
  methods: {
    onClickLeft() {
      // 返回
      this.$router.back();
    },
    change_phone() {
      //更换手机号
      this.verify = false;
      this.show_verify = true;
      this.is_count = false;
    },
    close_verify() {
      //验证码
      this.verify = true;
      this.show_verify = false;
    },
    finish() {
      //倒计时结束
      this.md_text = "重新发送";
    },
    async send() {
      //发送验证码
      let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (reg.test(this.new_phone) == false) {
        this.$toast.fail("手机号格式不正确");
      } else {
        this.is_count = true;
        this.$refs.countDown.reset();
        this.$refs.countDown.start();
        let res = await this.$axios.get(
          `profile/sendSms?uphone=${this.new_phone}`
        );
        //  发送验证码
        console.log(res);
        if (res.data.ok != "1") {
          this.$toast.fail("验证码发送失败");
        } else {
          this.accept_id = res.data.result.id;
        }
      }
    },
    async md_ver() {
      //验证验证码
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
      });
      let res = await this.$axios.put(`profile/phone`, {
        id: this.accept_id + "",
        newPhone: this.new_phone + "",
        verify: this.auth_code + "",
      });
      console.log(res);
      if (res.data.ok == 1) {
        this.$toast.success("验证成功");

        window.localStorage.setItem('phone',this.new_phone); //修改手机号
        this.$router.replace("/setting");
      } else {
        this.$toast("验证码不正确 或手机号已绑定");

      }
    },
    alert_jing() {
      this.$dialog
        .alert({
          title: "提示",
          message: "请确保手机能正常接收短信,且途家发送的验证码未被拦截",
        })
        .then(() => {
          // on close
        });
    },
  },
};
</script>

<style lang='scss'>
.Phone_changge {
  background-color: #f4f8fb;
  .head_box {
    font-size: 3.8vw;
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    margin: 4vw 0;
    padding: 4vw 4vw;
    justify-content: space-between;
  }
  .bot {
    width: 94vw;
    margin: 0 auto;
    margin-top: 8vw;
    display: flex;
    justify-content: center;
    border-radius: 2vw;
  }
  .verify_phone {
    //验证手机号
    z-index: 222;
    height: 100%;
    width: 100vw;
    background-color: #f4f8fb;
    .hint {
      background-color: #f4f8fb;
      margin: 4vw auto;
      text-align: center;
      letter-spacing: 1px;
      font-size: 12px;
      font-weight: 100;
      color: grey;
    }
    .ver_bot {
      background-color: #fff;
      display: flex;
      height: 45px;
      justify-content: space-between;
      margin: 0 0;
      padding: 3vw 4vw;
      font-size: 15px;
      input {
        border: none;
      }

      input.custom {
        caret-color: #ff9645;
      }
    }
    .send {
      color: #ff9645;
      letter-spacing: 1px;
    }
    .foot {
      font-size: 3vw;
      text-align: center;
      margin: 4vw 0;
      color: grey;
    }
  }
}
</style>