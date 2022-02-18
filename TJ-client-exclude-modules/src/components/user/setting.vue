<template>
    <div class="US-box">
        <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        >
            <template #title>
                <div style="font-size:16px;color:#333">账号安全设置</div>
            </template>
            <template #left>
                <van-icon name="arrow-left" size="25" />
            </template>
         </van-nav-bar>
        <!-- 个人资料------start -->
        <div @click="goSelfData" class="US-box-item">
            <div> 个人资料 </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 个人资料------end -->

        <!-- 用户名------start -->
         <div @click="goUserName" class="US-box-item">
            <div> 用户名 </div>
                <div class="US-box-item-right">
                    <font style="font-weight:600;color:#454545">{{userName}}</font>
                </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 用户名------end -->

        <div class="US-box-item US-box-item-title">
            账号安全
        </div>

          <!-- 手机号------start -->
         <div @click="goPhone" class="US-box-item">
            <div> 手机号 </div>
            <div class="US-box-item-right">
              
                <font style="font-weight:600;color:#454545">{{userInfo.phone}}</font>
            </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 手机号------end -->

        <!-- 邮箱------start -->
         <div @click="goEmail" class="US-box-item">
            <div> 邮箱 </div>
            <div class="US-box-item-right">
                <font style="font-weight:600;color:#454545">{{userEmail}}</font>
            </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 邮箱------end -->

        <div class="US-box-item US-box-item-title">
            安全设置
        </div>

         <!-- 登陆密码------start -->
         <div @click="upadatePasswordClcik" class="US-box-item">
            <div> 登陆密码 </div>
            <div class="US-box-item-right">
                <font style="font-weight:600;color:#454545">修改</font>
            </div>
            <van-icon name="arrow" size="25" />
        </div>
        <!-- 登陆密码------end -->



        <!-- 用户名修改弹出dialog -->
        <van-dialog 
            width="90vw" 
            confirm-button-color="#fcaf3f" 
            v-model="updateUnameDialog" 
            title="修改用户名"
            @confirm='updateUnameChange'
            show-cancel-button
            >
            <van-field v-model="userNameInput" label="用户名" />
            <p class="US-updateUnameComment">可用与账号密码登录</p>
        </van-dialog>



        <div @click="exitLogin" class="US-box-signOut">
            <div>退出登录</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo:{
                token:window.localStorage.getItem('token'),
                phone:window.localStorage.getItem('phone'),
                uname:window.localStorage.getItem('uname'),
                headImg:window.localStorage.getItem('headImg'),
            },
            userEmail:'',
            userName:'',
            userNameInput:'',
            //用户名修改弹出显示隐藏 show
            updateUnameDialog:false,
        }
    },
  watch:{},
  created() {

  },
  mounted() {
  },
  methods:{
        onClickLeft() {
            this.$router.push({path:'/user'})
        },
        // 请求用户信息,
        async getUserInfo(){
            let {data:res} = await this.$axios.get('/profile/safeInfo')
            this.userName=res.result.uname
            this.userEmail=res.result.email
            this.userInfo.phone=res.result.uphone
        },
        //点击 进入个人资料页面
        goSelfData(){
            this.$router.push({path:'editSelfData'})
        },
        //修改用户名
        goUserName(){
            this.updateUnameDialog=true
        },
        //确认修改用户名触发
        async updateUnameChange(){
            this.$loading('修改中...')
            let {data:res} = await this.$axios.put(`/profile/uname?uname=${this.userNameInput}`)
            if(res.ok!==1)return this.$toast(res.msg)
            this.$toast.clear()
            setTimeout(_=>{
                this.$toast.success('修改成功')
                this.getUserInfo()
            },1000)
        },
        //修改密码
        upadatePasswordClcik(){
            this.$router.push({path:'/password'})
        },
        //修改手机号
        goPhone(){
             this.$router.push({path:'/phone'})
        },
        //修改邮箱
        goEmail(){
             this.$router.push({path:'/email'})
        },
        //退出登录
        exitLogin(){
            this.$dialog.confirm({
                title: '警告',
                message: '确认退出登录吗?',
            })
            .then(() => {
                window.localStorage.clear()
                window.sessionStorage.clear()
                this.$router.replace({path:'/user'}) 
            })
            .catch(() => {
                // on cancel
            });
            
        }
    },
    created() {
        this.getUserInfo()
    },
}
</script>

<style>
/* user setting  => US*/
.US-box{
    background-color: #F4F8FB;
    height: 100vh;
}
.van-icon-arrow-left{
    color: #333 !important;
}
.van-icon-arrow{
    color: #CFCFCF !important;
}
.US-box-item{
    height:50px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    background-color:#FFFFFF;
    font-weight: 500;
    align-items: center;
    padding: 0px 16px;
    box-sizing: border-box;
    position: relative;
}
.US-box-item-title{
     background-color:#F4F8FB;
     font-weight: 600;
}
.US-box-item-right{
    position: absolute;
    right: 12%;
}
.US-box-signOut{
    height: 50px;
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
.US-updateUnameComment{
    font-size: 14px;
    text-align: center;
    margin-top:20px;
    margin-bottom: 20px;
    color: rgb(140,140,140);
}
</style>