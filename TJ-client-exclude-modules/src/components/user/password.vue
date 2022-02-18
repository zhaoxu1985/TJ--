<template>
    <div style="position:absolute;top:0px;right:0;width:100vw;height:100vh">
                <van-nav-bar
                        left-text="返回"
                        left-arrow

                        @click-left="onClickLeft"
                    >
                    <template #title>
                        <div style="font-size:16px;color:#333">登录密码</div>
                    </template>
                    <template #left>
                        <van-icon name="arrow-left" size="25" />
                    </template>
                </van-nav-bar>
            <div class="PWD-content-box">
                 <van-field
                    v-model="codeInput"
                    center
                    clearable
                    label="验证码"
                    placeholder="请输入验证码"
                    >
                    <template #button>
                        <van-button 
                            size="small" 
                            type="primary" 
                            :disabled="sendBtnShow"
                            @click="sendCode"
                            style="width:76px;height:32px"
                            color="linear-gradient(90deg,#fa8c1d,#fcaf3f)"
                        >
                            <p v-if="!sendBtnShow" style="font-size:12px">发送验证码</p>
                            <p v-if="sendBtnShow" style="font-size:12px">{{countTime}}s</p>
                        </van-button>
                    </template>
                </van-field>
                    <van-field
                    v-model="password"
                    center
                    clearable
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    >
                </van-field>
                    <van-field
                    v-model="confirmPassword"
                    center
                    clearable
                    type="password"
                    label="确认密码"
                    placeholder="再次确认密码"
                    >
                </van-field>
                <div @click="confirmUpdate" class="US-box-signOut">
                    <div>确认修改</div>
                </div>
                <p class="PWD-comment">由8-16位英文字母、数字或符号组成、且必须包含英文字母和数字，不可以包含空格以及注册手机号\邮箱\用户名</p>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            codeInput:'', //验证码输入框
            ssid:'',  // 手机号回传ssid
            sendBtnShow:false,
            countTime:60,
            password:'',
            confirmPassword:''
        }
    },
    methods: {
        onClickLeft(){
            this.$router.push({path:'/setting'})
        },

        //发送验证码
        async sendCode(){
            this.sendBtnShow=true
            this.codeInput=''
            window.subCount = setInterval(()=>{
                this.countTime--
            },1000)
            let {data:res} = await this.$axios.get('/profile/sendSms',{params:{
                uphone:window.localStorage.getItem('phone')
            }})
            if(res.ok!==1)return this.$toast.fail(res.msg)
            this.ssid = res.result.id
        },
        //确认修改按钮
        async confirmUpdate(){

            if(this.codeInput.length==0 ||this.password.length==0 || this.confirmPassword.length==0){
                return this.$toast.fail('请填写完整信息')
            }
            if(this.password !== this.confirmPassword){
                return this.$toast.fail('两次密码不同!')
            }
            const toast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: '验证中...',
            });
            let {data:res} = await this.$axios.put('/profile/pwd',{
                newPwd:this.password,
                id:this.ssid,
                verify:this.codeInput
            })
            if(res.ok!=1){
                this.$toast.clear()
                return this.$toast.fail(res.msg)
            } 
            this.$toast.success('修改成功')
            setTimeout(()=>{
                this.$router.replace({path:'/setting'})
            },1000)
        }
    },
    watch:{
        countTime(data){
            if(data<=0){
                window.clearInterval(subCount)
                this.countTime=60
                this.sendBtnShow=false
            }
        }
    },
    mounted() {
    },
    beforeDestroyed() {
        // this.show=false
    },
}
</script>

<style>
    .PWD-content-box{
        padding: 0px 16px;
        margin-top: 20px;
    }
    .PWD-comment{
        font-size: 14px;
        color: rgb(100,100,100);
        margin-top:50px;
    }
    .van-field__label{
        width: 65px !important;
    }
    .van-field__value{
        width: 90% !important;
    }
    .US-box-signOut{
    height: 45px;
    padding: 0px 15px;
    margin-top: 50px;
    }
    .US-box-signOut div{
        width: 100%;
        height: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        color: white;
        background: linear-gradient(90deg,#fa8c1d,#fcaf3f);;
    }
</style>