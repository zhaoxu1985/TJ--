<template>
  <div class="LG-box">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickSignIn"
    >
      <template #title>
        <div style="font-size:16px;color:#333">登录</div>
      </template>
      <template #left>
        <van-icon name="cross" size="25" />
      </template>
      <template v-if="loginOrSignin" #right>
        <font style="font-size:16px;color:#FCAA3A">去注册</font>
      </template>
      <template v-else #right>
        <font style="font-size:16px;color:#FCAA3A">登录</font>
      </template>
    </van-nav-bar>
    <div v-show="loginOrSignin" class="LG-login-title-box">
      登录途家
    </div>
    <div v-show="!loginOrSignin" class="LG-login-title-box">
      注册途家
    </div>
    <div v-show="loginOrSignin" style="padding:0px 20px;margin-top:10px;">
      <font style="color:#999;font-size:14px;font-weight:300;"
        >登录以使用更多服务</font
      >
    </div>
    <div v-show="!loginOrSignin" style="padding:0px 20px;margin-top:10px;">
      <font style="color:#999;font-size:14px;font-weight:300;"
        >注册以使用更多服务</font
      >
    </div>


<!-- 手机号登录模块开始 ----------start -->

    <div v-show="phoneOrAccount" class="LG-Content-phone-box">
      <div class="LG-Content-phone-content">
        <div @click="clickSelectRegion" class="LG-phone-phone-location">
            {{phoneLocation}}
        </div>
        <van-cell-group>
          <div class="LG-login-phone">
            <van-field
              v-model="loginPhone"
              clearable
              style="background-color:#f5f7f9"
              placeholder="请输入手机号"
              size="100%"
            />
          </div>
        </van-cell-group>
      </div>
      <div class="LG-phone-login">
            <van-button  class="reloadSendCode" :disabled="isClickSendCode" @click="loginFinish" color="linear-gradient(90deg,#fa8c1d,#fcaf3f)" style="width:90%;">
                  <font>发送验证码</font>
              <van-loading v-show="isClickSendCode" style="width:20px;background:none;margin-left:10px" size="20px" color="white" />
            </van-button>

      </div>

      <div class="LG-select-account-login">
          <input type="file" accept="image/*" capture="user" ref="loginInput" @change="submitLoginFace" style="display:none;">
          <input type="file" accept="image/*" capture="user" ref="siginInput" @change="submitSiginFace" style="display:none;">
          <span v-show="loginOrSignin" style="float:left;" @click="onClickSelectAccountLogin">账号密码登录</span>
          <span v-show="loginOrSignin" style="float:right;" @click="$refs.loginInput.click()">人脸登录</span>

          <span v-show="!loginOrSignin" style="align-items:center;" @click="$refs.siginInput.click()">人脸注册</span>
      </div>
    </div>
    
<!-- 手机号登录模块结束 ----------end -->




<!-- 账号密码登录模块开始 ----------start -->
    <div v-show="!phoneOrAccount" class="LG-Content-account-box">
        <div class="formIndex">
              <van-field v-model="phone" name="手机号" placeholder="手机号/邮箱/用户名" />
              <van-form>
                <van-field v-model="password" autocomplete='off' name="密码" :type="pwd" placeholder="请输入密码">
                  <template #button>
                    <van-icon v-if="pwd == 'password'" name="eye-o" @click="showType" />
                    <van-icon v-else name="closed-eye" @click="notType" />
                  </template>
                </van-field>
              </van-form>
          <div style="margin-top:50px;width:100%;display:flex;justify-content:center;">
            <van-button @click="onClickAccountLoginBtn" style="width:80%;border-radius:7px;" color="linear-gradient(90deg,#fa8c1d,#fcaf3f)" block type="info" :disabled="state">登录</van-button>
          </div>
        </div>

        <div @click="onClickSelectAccountLogin" class="LG-select-account-login">
           使用手机号登录
        </div>
    </div>



<!-- 账号密码登录模块结束 ----------end -->


<!-- 勾选服务协议-----start -->
  <div class="LG-login-finish-agreement">
      <van-checkbox checked-color="#FCAA3A" v-model="agreeAgreement" shape="square">以阅读并同意 《途家服务协议》 、《隐私政策》</van-checkbox>
  </div>
<!-- 勾选服务协议-----end -->

<!-- 弹出层 输入验证码------start -->
      <van-popup v-model="phoneRuleFinishShow">
          <div class="LG-phone-input-ruleCode">
              <!-- 后退 -->
                <van-nav-bar
                  left-text="返回"
                  left-arrow
                  @click-left="onRuleCodeGoback"
                >
                  <template #left>
                    <van-icon name="arrow-left" size="25" />
                  </template>
                </van-nav-bar>
              <div class="LG-login-title-box">
                输入短信验证码
              </div>
              <div class="LG-rules-phone-test">验证码已发送至 {{phoneLocation}} {{ loginPhone }}</div>
              
              <div class="LG-phone-rulesCode-box">
                  <van-password-input
                    :value="phoneRulesCode"
                    :mask="false"
                    :length="5"
                    :gutter="10"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
                  />
              </div>

              <van-number-keyboard
                v-model="phoneRulesCode"
                :show="showKeyboard"
                :maxlength="5"
                @blur="showKeyboard = false"
              />
              
              <div v-if="codeTiming!=0" class="LG-can-reSend-timming-text">
                  {{codeTiming}}s后可重新发送
              </div>
              <div v-else class="LG-can-reSend-timming-text LG-can-reSend-timming-btn">
                  <div @click="onClickRelaogCode">重新发送验证码</div>
              </div>
          </div>
      </van-popup>
<!-- 弹出层 输入验证码------end -->



<!-- 区号选择 底部弹出dialog框 -------start -->
    <van-popup v-model="SelectRegionShow" closeable round position="bottom" :style="{ height: '85%' }">
          <div style="width:100%;height:90%;margin-top:7vh;overflow: scroll;">
            <van-index-bar style="">
            <div v-for="(item, i) in phoneCity" :key="i">
              <van-index-anchor :index="item.title">
                <div style="font-size:20px;font-weight:700">{{ item.title }}</div>
              </van-index-anchor>
              <div
                class="LG-national-location-slelct"
                v-for="(item2, j) in item.children"
                :key="j"
                @click="selectRegionValue(i,j)"
              >
                <van-cell :title="item2.name" />
                <div class="LG-national-location-num">+{{ item2.tel }}</div>
              </div>
            </div>
          </van-index-bar>
          </div>
          
    </van-popup>
<!-- 区号选择 底部弹出dialog框 -------start -->
  </div>
</template>

<script>
import city from '../../../public/js/city'
export default {
  data() {
    return {
      //选择使用手机号登录或者账号密码登录
      phoneOrAccount: true,
      //全国 区号数据
      phoneCity: city,
      //登录手机号input绑定
          loginPhone: '',
      //区号选择
          phoneLocation:'+86',
      //区号选择显示隐藏
          SelectRegionShow:false,
      //协议是否同意
          agreeAgreement:false,
      //数字键盘显示隐藏,
          showKeyboard:true,
      //验证码input
          phoneRulesCode:'',
      //存储验证码id
          ssidRules:'',

      //手机号验证码点击后 输入验证码弹出层显示隐藏 
          phoneRuleFinishShow:false,
      //手机号验证码计时
          codeTiming: 60,
      //---------------账号密码登录开始---------start
          phone: "",
          password: '',
          pwd: "password",
          state: true,
      //---------------账号密码手机号登录开始---------start

      //手机号注册开始----------start
      loginOrSignin:true,  //true : 登录  false : 注册
      //是否点击了发送验证码
      isClickSendCode:false
    };
  },
  
  methods: {

    // 登录  上传人脸
    async submitLoginFace(e) {
      const formData = new FormData()
      formData.set('face', e.target.files[0])
      this.$toast.loading({
        message: '登录中',
        duration: 0
      })
      const { data: res } = await this.$axios.post('/user/login2', formData)

      // 登录成功
      if (res.ok === 1) {
        this.$toast({
          duration: 600,
          message: '登录成功',
          onClose: _ => {
            this.$router.replace({path:'/user'})
          }
        })
        this.loginOrSignInSuccess(res.result)
        return
      }
      
      // 验证失败
      this.$toast({
        duration: 2000,
        message: /[a-z]/i.test(res.msg) ? '图片格式或大小不匹配' : res.msg,
        onClose() {
        }
      }) 
    },
    
    // 注册 上传人脸
    async submitSiginFace(e) {
      const formData = new FormData()
      formData.append('face', e.target.files[0])
      this.$toast.loading({
        message:'注册中',
        duration: 0,
        onClose() {
          this.$toast('注册失败,请重试')
        }
      })
      const { data: res } = await this.$axios.post('/user/sigin3', formData)

      if (res.ok === 1) {
        this.$toast({
          duration: 600,
          message: '注册成功',
          onClose: _ => {
            this.$router.replace({path:'/user'})
          }
        })
        this.loginOrSignInSuccess(res.result)
        return
      }
      
      // 验证失败
      this.$toast({
        duration: 1000,
        message: /[a-z]/i.test(res.msg) ? '注册失败,请重试' : res.msg,
        onClose: _ => {
          this.$router.replace({path: '/login'})
        }
      })
    },


    //后退按钮
    onClickLeft() {
      this.$router.push({path:'user'})
    },


    //输入验证码页面 返回按钮
    onRuleCodeGoback(){
        this.$dialog.confirm({
          title: '警告',
          message: '短信验证码可能有延迟,确认返回并重新开始',
          confirmButtonColor:'#FCAA3A',
        })
        .then(() => {
            this.phoneRuleFinishShow = false
            clearInterval(codeTimingCount)
            this.codeTiming=60
            this.isClickSendCode=false
        })
        .catch(() => {
          
        });
    },
    //重新发送验证码按钮
    onClickRelaogCode(){
        this.codeTiming=60
        //手机号登录 重新发送验证码按钮
      if(this.loginOrSignin==true){
          this.loginInfoPush()
      }
        //手机号注册 重新发送验证码按钮
      if(this.loginOrSignin==false){
          this.reloadSendPhoneSignUp()
      }
        
    },
    //去注册按钮
    onClickSignIn() {
        this.loginOrSignin = !this.loginOrSignin
        this.phoneOrAccount = true
        this.codeTiming=60
    },
    //点击选择区号
    clickSelectRegion(){
        this.SelectRegionShow=true;
    },
    //选择国家手机号并赋值
    selectRegionValue(i,j){
      this.phoneLocation ='+'+this.phoneCity[i].children[j].tel
      this.SelectRegionShow = false
    },
//手机号登录发送请求  和 重新发送请求 方法
async loginInfoPush(){
              this.codeTiming=60

                  let {data:res} = await this.$axios.get('/user/login1_send',{params:{
                      phone:this.loginPhone
                  }})
                  //账号存在， 可以登录
                  if(res.code==200){
                    console.log(res);
                    this.ssidRules = res.result.id
                    this.isClickSendCode=false
                  }
                 //不能登录，未注册 
                  if(res.code==403){
                    this.isClickSendCode=false
                    return this.$toast(res.msg)
                  }
                  if(res.code!=200){
                    this.isClickSendCode=false
                    return this.$toast.fail(res.msg)
                  }
                  
                this.phoneRuleFinishShow =  true
                this.showKeyboard = true;
                //计时下次可发送验证码时间
                window.codeTimingCount = setInterval(()=>{
                    this.codeTiming--
                },1000)
},

//手机号注册 发送验证码  和 重新发送验证码
async reloadSendPhoneSignUp(){
        this.codeTiming=60
        let {data:res} = await this.$axios.get('/user/verify',{params:{
            "phone": this.loginPhone,
        }})
        console.log(res);
        if(res.ok==1){
          this.ssidRules = res.result.id
          this.isClickSendCode=false
        }else{
          this.isClickSendCode=false
          return this.$toast.fail(res.msg)
        }
        //弹出验证码 输入窗口
        this.phoneRuleFinishShow =  true
        this.showKeyboard = true;
        //计时下次可发送验证码时间
        window.codeTimingCount = setInterval(()=>{
            this.codeTiming--
        },1000)
},
    //手机号登录 发送验证码按钮 需要校验手机号 并发送请求
    loginFinish(){
        this.isClickSendCode=!this.isClickSendCode
        if(this.agreeAgreement == false){
          this.isClickSendCode=!this.isClickSendCode
          return this.$toast('请同意服务条款')
        }
        if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.loginPhone)){
          this.$toast.fail('请输入正确的手机号')
          this.isClickSendCode=!this.isClickSendCode
        }else{
          //登录  发送验证码按钮
            if(this.loginOrSignin==true){
              this.loginInfoPush()
            }
          //注册 发送验证码按钮
            if(this.loginOrSignin==false){
              this.reloadSendPhoneSignUp()
            }
        }
    },
    //选择使用账号密码登录
    onClickSelectAccountLogin(){
      this.phoneOrAccount=!this.phoneOrAccount
    },
//账号密码登录开始----------------------start
    //密码显示
    showType() {
      this.pwd = "text";
    },
    //密码隐藏
    notType() {
      this.pwd = "password";
    },
    //校验是否同意协议， 并发送请求
    async onClickAccountLoginBtn(){
       if(this.agreeAgreement==false)return this.$toast('请同意服务协议')
        let {data:res} = await this.$axios.post('/user/login',{
          uname:this.phone,
          upwd:this.password
        })
       if(res.ok!=1)return this.$toast.fail(res.msg)
       this.loginOrSignInSuccess(res.result)
       this.$toast.success('登录成功')
       setTimeout(()=>{
         this.$router.replace({path:'user'})
       },1000)
    },
//账号密码登录开始----------------------end


  //手机号 验证码提交
    async commitLoginPhoneCode(){
        //登录  输入验证码并验证
              const toast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '验证中...',
              });
              let {data:res} = await this.$axios.post('/user/login1',{
                  "phone": this.loginPhone,
                  "id": this.ssidRules,
                  "verify": this.phoneRulesCode
              })
              console.log(res);
              if(res.code==200 && res.ok==1){
                this.$toast.success('登录成功')
                this.loginOrSignInSuccess(res.result)
                this.$router.replace({path:'user'})
                this.$toast.clear()

              }else{
                this.$toast.fail(res.msg)
                this.$toast.clear(loginBeforeToast)
              }
    },
//手机号注册 输入验证码完成后调用
    async finishPhoneSignIn(){
        window.loginBeforeToast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '验证中...',
        });
        let {data:res} = await this.$axios.post('/user/sigin',{
              "uphone": this.loginPhone,
              "id": this.ssidRules,
              "newVerify": this.phoneRulesCode
        })
        if(res.ok==1){
            this.loginOrSignInSuccess(res.result)
            this.$router.replace({path:'user'})
            this.$toast.clear(loginBeforeToast)
        }
        if(res.code!=0){
          this.$toast.fail(res.msg)
          this.$toast.clear(loginBeforeToast)
        }
    },

    //登录成功 和 注册成功 接收传入的用户信息对象，并且保存本地
    loginOrSignInSuccess(info){
        console.log(info);
        window.localStorage.setItem('token',info.token)
        window.localStorage.setItem('phone',this.loginPhone)
        window.localStorage.setItem('uid',info.uid)
        window.localStorage.setItem('uname',info.uname || Date.now())
        window.localStorage.setItem('headImg',info.avatar || 'https://z3.ax1x.com/2021/06/22/RZOHpR.png')
        window.localStorage.setItem('avatar',info.avatar)
        this.$router.replace({path:'/user'})
        this.$socket.open()
    }
  },
  watch:{
    //验证码输入完成 发送验证请求
    async phoneRulesCode(val){
      if(val.length == 5){

        if(this.loginOrSignin===true){
            //登录  输入验证码并验证
              this.commitLoginPhoneCode()
        }else{
            //注册  输入验证码并验证
              this.finishPhoneSignIn()
        }
      }
    },
    //验证登录手机号
      phone(val) {
        // let phone = /^1[3|4|5|7|8][0-9]{9}$/;
        // let res = phone.test(val);
        if (val.length>0 && this.password.length>0) {
          this.state = false;
        }else{
          this.state = true
        }
      },
      password(val){
        if(this.password.length>0 && val.length>0){
            this.state = false
        }else{
            this.state = true
        }
      },

      //监听验证码发送后60秒计时
      codeTiming(val){
          if(val<=0){
            clearInterval(window.codeTimingCount)
          }
      },
  }
};
</script>

<style>
.LG-box{
  height: 100vh;
}
.van-icon-cross {
  color: black !important;
}
/* 登录途家标题 */
.LG-login-title-box {
  font-size: 31px;
  letter-spacing: 3.5px;
  padding: 0px 16px;
  box-sizing: border-box;
  border-left: 4px solid #fc8138;
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #323232;
}
/* 手机号登录box */
.LG-Content-phon-box {
  padding: 0px 20px;
}
.LG-national-location-slelct {
  display: flex;
  align-items: center;
  position: relative;
}
.LG-national-location-num {
  margin-right: 10vw;
}
.LG-Content-phone-box {
  /* 使用手机号登录box框 */
  display: flex;
  padding: 0px 20px;
  margin-top: 30px;
  flex-wrap: wrap;
}
.LG-Content-phone-content {
  width: 100%;
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(220, 220, 220);
}
input {
  font-size: 20px;
  letter-spacing: 2px;
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 18px !important;
  vertical-align: middle !important;
}
/* 区号的显示 */
.LG-phone-phone-location {
  width: 70px;
  /* height: 50px; */
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.LG-phone-phone-location::after {
  content: "";
  position: absolute;
  right: 0;
  border-style: solid;
  border-width: 0px 0px 10px 10px;
  border-color: transparent transparent #fcaa3a transparent;
  width:  0px;
  height: 0px;
  bottom: 5px;
}

[class*="van-hairline"]::after {
  border: 0px;
}
.van-cell-group,
.van-hairline--top-bottom {
  width: 100%;
}
/* 手机号登录按钮 */
.LG-phone-login{
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

/* 同意条款box */
.LG-login-finish-agreement{
  width: 100%;
  height: 40vh;
  font-size: 13px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 30px;
  justify-content: center;
}
/* 同意条款input */
.van-icon-success{
  border-radius: 5px !important;
}
/* 手机验证码输入层 */
.LG-phone-input-ruleCode{
  width: 100vw !important;
  height: 100vh !important;
  background: rgb(240,240,240);
}
.van-icon-arrow-left{
  color: rgb(107, 107, 107) !important;
}
.LG-rules-phone-test{
  padding: 0px 20px;
  color: rgb(185, 183, 183);
  font-size: 14px;
}
.LG-phone-rulesCode-box{
  margin-top: 20px;
}
/* 使用账号登录box */
.LG-select-account-login{
  padding: 0px 16px;
  margin-top: 20px;
  text-align: center;
  flex: 1;
  font-size: 14px;
  color: #666;
}
/* 账号密码登录模块开始 box */
.LG-Content-account-box{
  margin-top: 30px;
}
/* 可重新发送验证码计时文字 box */
.LG-can-reSend-timming-text{
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: rgb(129, 129, 129);
}
/* 计时完成 重新发送验证码按钮 */
.LG-can-reSend-timming-btn{
    width: 100%;
    height: 6vh;
    display: flex;
    justify-content: center;
}
.LG-can-reSend-timming-btn div{
  width: 80%;
  height: 100%;
  background:linear-gradient(90deg,#fa8c1d,#fcaf3f);
  border-radius:7px;
  display: flex;
  justify-content: center;
  align-items:center;
  color:white;
  font-size: 16px;
}
.van-button__content{
  width: 100% !important;
  font-size: 16px !important;
  display: flex !important;
}
.van-button__text{
    width: 100% !important;
    display: flex !important;
    justify-content: center;
    flex-wrap: nowrap !important;
}
/* 输入框清除按钮 */
.van-field__clear{
  font-size:20px
}
</style>
