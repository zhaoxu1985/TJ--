<template>
    <el-container class="loginbox">
        <div class="loginbg">
            <el-card>
                <h3>登录管理员面板</h3>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名：" prop="uname">
                        <el-input v-model="ruleForm.uname"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="upwd">
                        <el-input type="password" v-model="ruleForm.upwd" @keydown.enter.native="login"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login" type="primary" @click="login">登录</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            uid: 1,
            ruleForm: {
                uname: '',
                upwd: ''
            },
            rules: {
                uname: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                upwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
            },
        }
    },
    created() {
        document.title = '管理员登录面板'
    },
    methods: {
        async login() {
            const {data: ret} = await this.axios.post('/login', this.ruleForm)
            if(ret.code!==200) {
                return this.$message.error('用户名或密码错误')
            }else {
                window.sessionStorage.setItem('uid', ret.data[0].uid)
                window.sessionStorage.setItem('avatar', ret.data[0].head_img)
                window.sessionStorage.setItem('username', ret.data[0].username)
                this.$message.success('登录成功')
                this.$router.push('/')
                const{data:result} = await this.axios.get('https://tj.testw.top/v1/dataCollect')
                console.log(result)
                if(result.ok==0) {
                    return
                }else {
                    this.chat.$emit('result',result.result)
                }
                return
            }
            
        },
        reset() {
            this.$refs.ruleForm.resetFields()
        }
    }
}
</script>
<style lang="scss" scope>
    .loginbox {
        
        width: 100%;
        height: 100%;
        background-color: #ff9645;
        display: flex;
        justify-content: center;
        align-items: center;
        .loginbg {
            width: 800px;
            height: 600px;
            background-image: url("/image/logo.png");
            background-repeat: no-repeat;
            background-size: 30%;
            background-position-x: center;
            background-position-y: 20%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            -webkit-clip-path: polygon(50% 0%, 100% 50%, 87% 50%, 87% 100%, 14% 100%, 14% 50%, 0 50%);
            clip-path: polygon(50% 0%, 100% 50%, 87% 50%, 87% 100%, 14% 100%, 14% 50%, 0 50%);
        }
        .el-card {
            width: 600px;
            height: 400px;
            margin-top: 200px;
            background-color: transparent;
            border: none;
            box-shadow: none !important;
            .el-form {
                margin-top: 50px;
                .el-form-item {
                    margin: 10%;
                    .login {
                        background-color: #44d39f;
                        border-color: #44d39f;
                    }
                }
            }
        }
    }
</style>