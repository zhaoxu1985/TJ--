<template>
    <div class="emailIndex">
         <van-nav-bar
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            >
            <template #title>
                <div style="font-size:16px;color:#333">邮箱</div>
            </template>
            <template #left>
                <van-icon name="arrow-left" size="25" />
            </template>
         </van-nav-bar>
      <div class="titlle">
        <span>您的邮箱还没有完成验证,验证邮箱后可以作为登录账号</span>
      </div>
      <div class="input">
        <van-field
            v-model="email"
            clearable
            label="邮箱地址"
            placeholder="您的email地址"
            input-align="right"
        />
      </div>
      <div class="btn">
        <van-button @click="submitEmail" color="linear-gradient(to right, #FA8D1E, #FCAF3F)" block>发送验证邮箱</van-button>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          email:''
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },

      async submitEmail(){
        let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if(!reg.test(this.email)){
          return this.$toast.fail('邮箱不合法,请重新输入')
        }
        const {data:res} = await this.$axios.get('profile/sendEmail?email='+this.email)
       console.log((res))
        // if(res.ok!==1){
        //   return this.$toast.fail('发送失败')
        // }
        // let token = window.localStorage.getItem('token')
        // const {data:result} = await this.$axios.get('http://127.0.0.1/v1/profile/emailUpdate?token='+token,{
        //   "newEmail": this.email,
        //     "id": "<06456c42-80c6-684e-33b9-12e57c2d23bf@163.com>",
        //     "verify": "57824",
        // })
        this.$toast.success('请进入邮箱')
        this.$router.go(-1)
      },
    },
}
</script>

<style lang="scss">
html{
  height: 100%;
  background-color: #F8F8F8;
}
.emailIndex{
  .titlle{
    padding: 25px;
    font-size: 14px;
    box-sizing: border-box;
    color: rgb(100,100,100);
  }
  .input{
    width: 100vw;
    //height: 3vh;
    background-color: #FFFFFF;
  }
  .btn{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .van-button{
      width: 90vw;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>