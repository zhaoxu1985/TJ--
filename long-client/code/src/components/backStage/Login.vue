<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="userpwd">
          <el-input
            type="password"
            v-model="loginForm.userpwd"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="resetLognForm" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //这是登陆表单的数据绑定对象
      loginForm: {
        username: "",
        userpwd: ""
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        //验证密码是否合法
        userpwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击重置按钮,重置登录表单
    resetLognForm() {
      //   console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        //   console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post("/backstage/loginuser", this.$par(this.loginForm));
        if (res.meta.status != 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        // 1.将登陆成功之后的token,保存到客户端的sessionStorage中
          // 1.1 项目中出了登陆之外的其他API接口,必须再登录之后才能访问
          // 1.2 token只应在当前网站打开期间生效,所以将token保存再sessinStorage中
        // 2.通过编程式导航跳转到后台主页,路由地址是 /home
        if(res.data[0].type===0){
            window.sessionStorage.setItem('backToken',res.token)
            this.$router.push('/BackStage')
        }else{
            this.$message.info('请输入后台管理账号密码')
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 663px;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
