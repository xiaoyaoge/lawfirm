<template>
    <div class="index-cont">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h1 class="logo" title="法法社CRM客户管理同"></h1>
            <input type="text" class="bk-form-input" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></input>
            <input type="password" class="bk-form-input" v-model="ruleForm2.checkPass" auto-complete="off" @input="inputkey()" @keyup.enter="handleSubmit2" placeholder="密码"></input>
            <el-form-item prop="account"></el-form-item>
            <el-form-item prop="checkPass"></el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" class="button" style="width:100%; margin-top: 0;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            </el-form-item>
            <span class="note">忘记密码请联系管理员找回</span>
        </el-form>
    </div>
</template>
<script>
import '../style/index.css'
import md5 from 'js-md5'
export default {
    data() {
        return {
            logining: false,
            ruleForm2: {
                account: '',//17025310757
                checkPass: ''//123456
            },
            rules2: {
                account: [{
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                }, ],
                checkPass: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            },
            checked: true
        };
    },
    methods: {
        inputkey(){
            this.ruleForm2.checkPass = this.ruleForm2.checkPass.replace(/^\s+|\s+$/g,"");
        },
        handleReset2() {
            this.$refs.ruleForm2.resetFields();
        },
        handleSubmit2(ev) {
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    var loginParams = {
                        account: this.ruleForm2.account,
                        password: md5(this.ruleForm2.checkPass)
                    }; 
                    this.$http.ajaxPost({
                        url: 'login',
                        params: loginParams
                    }, (res) => {
                        this.$http.aop(res, () => {
                            sessionStorage.setItem('user', JSON.stringify(res.body.data));
                            if (res.body.data.role == 99) {
                                this.$router.push({
                                    path: '/lawFirm'
                                });
                            } else {
                                this.$router.push({
                                    path: '/enterprise'
                                });
                            }

                        });

                    });

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted() {

    }
}
</script>