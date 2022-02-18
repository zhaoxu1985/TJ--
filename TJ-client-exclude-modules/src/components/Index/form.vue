<template>
  <div class="formIndex">
    <van-field v-model="phone" name="手机号" placeholder="手机号/邮箱/用户名" />
    <van-field v-model="password" :type="pwd" name="密码" placeholder="密码">
      <template #button>
        <van-icon v-if="pwd == 'password'" name="eye-o" @click="showType" />
        <van-icon v-else name="closed-eye" @click="notType" />
      </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button block type="info" :disabled="state">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      username: "",
      password: "",
      pwd: "password",
      state: true,
    };
  },
  watch: {
    phone(val) {
      console.log(val);
      let phone = /^1[3|4|5|7|8][0-9]{9}$/;
      let res = phone.test(val);
      if (res) {
        this.state = false;
      } else {
        this.state = true;
      }
    },
  },
  methods: {
    showType() {
      this.pwd = "text";
    },
    notType() {
      this.pwd = "password";
    },
  },
};
</script>

<style lang="scss">
.formIndex {
  .van-field {
    width: 94%;
    margin-left: 3%;
  }
  .van-button {
    width: 80%;
    margin-top: 5vh;
    margin-left: 10%;
  }
}
</style>
