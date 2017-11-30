<template>
    <div>
        <header class="header">
            <div class="fn-clear container">
                <a href="/" class="logo">
                    <img src="../style/img/logo.png" width="201" height="48" align="middle" alt="">
                </a>
                <div class="top-nav">
                    <template v-for="(item,index) in $router.options.routes" v-if="item.navmuen">
                        <a v-for="child in item.children" @click="$router.push(child.path);" :class="$route.path==child.path?'active':''" v-if="!child.hidden">{{child.name}}</a>
                    </template>
                </div>
                <div class="fn-right top-right-info">
                    <div class="tel-info fn-left">
                        <i class="icon tel"></i>
                        <span>0700-5241245</span>
                        <span class="line"></span>
                    </div>
                    <div v-if="loginType==''" class="login-wrap fn-right">
                        <a @click="loginShow()">登录</a>
                        <a @click="registerShow()">注册</a>
                    </div>
                    <div v-else class="login-wrap fn-right">
                        <span><i class="icon user"></i>{{loginType}}</span>
                        <a @click="logout">退出登录</a>
                    </div>
                </div>
            </div>
        </header>
        <article>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </article>
        <footer class="footer">
            <div class="container">
                <div class="fn-clear">
                    <div class="fn-left">
                        <ul class="foot-sort clear">
                            <li>
                                <dl>
                                    <dt>关于我们</dt>
                                    <dd>
                                        <a href="###" target="_blank">概览</a>
                                        <a href="###" target="_blank">工作地点</a>
                                        <a href="###" target="_blank">团队介绍</a>
                                        <a href="###" target="_blank">团队法律声明介绍</a>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>友情链接</dt>
                                    <dd>
                                        <a href="###" target="_blank">法法社</a>
                                        <a href="###" target="_blank">分期乐</a>
                                        <a href="###" target="_blank">目目学院</a>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>最近新闻</dt>
                                    <dd>
                                        <a href="###" target="_blank">仁良业绩</a>
                                        <a href="###" target="_blank">业内资讯</a>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div class="fn-right">
                        <img src="../style/img/qr.png" width="148" height="148">
                    </div>
                </div>
            </div>
            <div class="copyright">
                © Renliang 2016 京ICP备06002628号-1
            </div>
        </footer>
        <!-- 登录弹窗 -->
        <div class="layer" v-show="loginHieden">
            <div class="common-modal">
                <i class="icon close" @click="loginHieden=false;"></i>
                <h3 class="modal-title"><i class="firm-icon"></i>登录仁良</h3>
                <div class="modal-content">
                    <form class="modal-form">
                        <div class="form-item">
                            <div class="input-item">
                                <i class="icon user"></i>
                                <input type="text" v-model="form.mobile" placeholder="请输入注册的手机账号" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="input-item">
                                <i class="icon pwd"></i>
                                <input type="password" v-model="form.password" placeholder="密码" />
                            </div>
                        </div>
                        <!-- 验证滑块 -->
                        <div class="verify-item" id="dragbox">
                            <span>按住滑块，拖至最右侧</span>
                            <div class="process-tag" id="dragbtn" style="left: 0;"></div>
                        </div>
                        <div class="form-link-wrap fn-clear">
                            <a href="###" class="fn-right">忘记密码？</a>
                        </div>
                        <button class="modal-btn" @click="login()">登录</button>
                    </form>
                </div>
                <div class="modal-bottom">
                    <div class="bottom-text text-center">还没有账号?<a @click="registerHieden=true;loginHieden=false">马上注册</a></div>
                </div>
            </div>
        </div>
        <!-- 注册/修改密码弹窗 -->
        <div class="layer" v-show="registerHieden">
            <div class="common-modal">
                <i class="icon close" @click="registerHieden=false;"></i>
                <h3 class="modal-title"><i class="firm-icon"></i>注册仁良</h3>
                <div class="modal-content">
                    <!-- 表单提交错误提示 -->
                    <div v-show="msgError!==''" class="warn-tip">
                        <i class="icon warn"></i>
                        <span>{{msgError}}</span>
                    </div>
                    <div class="modal-form">
                        <!-- 报错提示在form-item加上error就可以了 -->
                        <div class="form-item" :class="vMobile('mobile',false)?'':'error'">
                            <div class="input-item">
                                <i class="icon user"></i>
                                <input type="text" v-model="registerForm.mobile" maxlength="11" placeholder="请输入你的手机号码" />
                                <a class="sms-btn" @click="getCode(registerForm.mobile)">发送验证码</a>
                            </div>
                            <p class="error-tip">请输入正确的手机格式</p>
                        </div>
                        <!-- 正确提示在form-item加上correct就可以了 -->
                        <div class="form-item" :class="vPassword('password',false)?'':'error'">
                            <div class="input-item">
                                <i class="icon pwd"></i>
                                <input type="password" v-model="registerForm.password" placeholder="密码长度6-20位" maxlength="20" />
                            </div>
                            <p class="error-tip">密码长度6-20位</p>
                        </div>
                        <div class="form-item" :class="vPasswordS('password1',false)?'':'error'">
                            <div class="input-item">
                                <i class="icon pwd"></i>
                                <input type="password" v-model="registerForm.password1" placeholder="请再次输入你的密码" maxlength="20" />
                            </div>
                            <p class="error-tip">两次输入的密码不匹配，请重新输入</p>
                        </div>
                        <div class="form-item" :class="vVerifyCode('verifyCode',false)?'':'error'">
                            <div class="input-item">
                                <i class="icon code"></i>
                                <input type="text" v-model="registerForm.verifyCode" placeholder="请输入你的验证码" />
                            </div>
                            <p class="error-tip">请输入正确的验证码</p>
                        </div>
                        <div class="form-tip-wrap">
                            <p>点击[注册]，即代表你同意<a href="###">《仁良注册协议》</a></p>
                        </div>
                        <button class="modal-btn" @click="register()">注册</button>
                    </div>
                </div>
                <div class="modal-bottom">
                    <div class="operate-content">
                        <a @click="registerHieden=false;loginHieden=true;"><i class="icon back"></i>返回登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../style/global.css';
import validate from '../validate'

export default {
    data() {
        return {
            loginType: '',
            loginHieden: false,
            registerHieden: false,
            verifyCode: false,
            form: {
                mobile: '',
                password: ''

            },
            registerForm: {
                mobile: '',
                password: '',
                password1: '',
                verifyCode: ''
            },
            inputMobile: false,
            msgError: '',
            animation: '',
            //paddingTop: `paddingTop: ${(window.innerHeight - 440) / 2}px`,
            types: ['zoom', 'fade', 'flip', 'door', 'rotate', 'slideUp', 'slideDown', 'slideLeft', 'slideRight']
        }
    },
    methods: {
        switchForm(val, type) {
            let isOk = true;
            let text = '';
            switch (val) {
                case 'mobile':
                    if (!validate.checkPhoneNum(this.registerForm.mobile)) {
                        isOk = false;
                        text = '手机号码不正确或不能为空';
                    }
                    break;
                case 'password':
                    if (!validate.checkPassword(this.registerForm.password)) {
                        isOk = false;
                        text = '密码不正确或不能为空（密码长度6-20位）';
                    }
                    break;
                case 'password1':
                    if (this.registerForm.password !== this.registerForm.password1) {
                        isOk = false;
                        text = '两次输入的密码不匹配，请重新输入';
                    }
                    break;
                case 'verifyCode':
                    if (!validate.checCode(this.registerForm.verifyCode)) {
                        isOk = false;
                        text = "请输入正确的验证码";
                    }
                    break;
            }
            if (type) {
                return { isOk: isOk, text: text }
            } else {
                return isOk;
            }
        },
        vMobile(val, type) {
            let flag = false;
            if (this.registerForm.mobile) {
                flag = this.switchForm(val, type);
            } else {
                flag = true;
            }
            return flag;
        },
        vPassword(val, type) {
            let flag = false;
            if (this.registerForm.password) {
                flag = this.switchForm(val, type);
            } else {
                flag = true;
            }
            return flag;
        },
        vPasswordS(val, type) {
            let flag = false;
            if (this.registerForm.password1) {
                flag = this.switchForm(val, type);
            } else {
                flag = true;
            }
            return flag;
        },
        vVerifyCode(val, type) {
            let flag = false;
            if (this.registerForm.verifyCode) {
                flag = this.switchForm(val, type);
            } else {
                flag = true;
            }
            return flag;
        },
        getCode(mobile) {
            this.$http.ajaxPost({
                url: 'member/sendVerifyCode',
                params: { mobile: this.registerForm.mobile, scene: 1 } //scene： 1/注册 ，2/找回密码 ，3/登录
            }, (res) => {
                this.$http.aop(res, () => {
                    this.$message({
                        message: '验证码发送成功',
                        type: 'success'
                    });
                });
            });
        },
        checkLoginForm(data) {
            let isOk = true;
            let text = '';
            let type = true;
            Object.keys(data).forEach((val) => {
                if (isOk) {
                    switch (val) {
                        case 'mobile':
                            if (!validate.checkPhoneNum(this.form.mobile)) {
                                isOk = false;
                                text = '手机号码不正确或不能为空';
                            }
                            break;
                        case 'password':
                            if (this.form.password === '') {
                                isOk = false;
                                text = '密码不能为空';
                            }
                            break;
                        default:
                            break;
                    }
                }
            });

            if (!isOk) {
                this.$message.error(text);
                return false;
            }
            return true;
        },
        login() {

            if (this.checkLoginForm(this.form)) {
                if (!this.verifyCode) {
                    this.$message({
                        message: '请滑动验证码 ！',
                        type: 'warning'
                    });
                    alert(this.verifyCode);
                    return;
                }
                this.$http.ajaxPost({
                    url: 'member/login',
                    params: { mobile: this.form.mobile, password: this.form.password }
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.loginHieden = false;
                        this.loginType = this.form.mobile;
                        sessionStorage.setItem('user', JSON.stringify({ uid: res.body.data, mobile: this.form.mobile }));
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                    });
                });
            }
        },
        checkForm(data) {
            let isOk = true;
            let text = '';
            let type = true;
            Object.keys(data).forEach((val) => {
                switch (isOk) {
                    case true:
                        let obj = this.switchForm(val, type);
                        isOk = obj.isOk;
                        text = obj.text;
                        break;
                    default:
                        break;
                }
            });

            if (!isOk) {
                this.msgError = text;
                return false;
            }
            return true;
        },
        register() {
            if (this.checkForm(this.registerForm)) {
                this.$http.ajaxPost({
                    url: 'member/register',
                    params: { mobile: this.registerForm.mobile, password: this.registerForm.password, verifyCode: this.registerForm.verifyCode }
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.msgError = '';
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                    });
                });
            }
        },
        loginShow() {
            this.loginHieden = true;
        },
        registerShow() {
            this.registerHieden = true;

        },
        logout() {
            this.$http.ajaxPost({
                url: 'member/logout',
                params: {}
            }, (res) => {
                this.$http.aop(res, () => {
                    sessionStorage.removeItem('user');
                    this.loginType = '';
                    this.$router.push({
                        path: '/main'
                    });

                });

            });
        },
        drag() {
            let _this = this;
            var oDiv = document.getElementById('dragbtn');
            var oDiv2 = document.getElementById('dragbox');
            var disX = 0;
            var disY = 0;
            oDiv.onmousedown = function(ev) {
                var oEvent = ev || event;
                disX = oEvent.clientX - oDiv.offsetLeft;
                disY = oEvent.clientY - oDiv.offsetTop;
                console.log(oDiv2.offsetWidth, oDiv.offsetWidth)
                document.onmousemove = function(ev) {
                    var oEvent = ev || event;
                    var l = oEvent.clientX - disX;
                    var t = oEvent.clientY - disY;
                    if (l < 50) {
                        l = 0;
                    } else if (l > oDiv2.offsetWidth - oDiv.offsetWidth) {
                        l = oDiv2.offsetWidth - oDiv.offsetWidth;
                    }
                    if (l > 260) {
                        l = 270;
                    }
                    if (t < 50) {
                        t = 0;
                    } else if (t > oDiv2.offsetHeight - oDiv.offsetHeight) {
                        t = oDiv2.offsetHeight - oDiv.offsetHeight;
                    }
                    oDiv.style.left = l + 'px';
                    oDiv.style.top = t + 'px';
                    if (l == 270) {
                        _this.verifyCode = true;
                    } else {
                        _this.verifyCode = false;
                    }
                };
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false;
            };
        }
    },
    mounted() {
        this.drag();
        let user = sessionStorage.getItem('user');
        console.log(user);
        if (user) {
            user = JSON.parse(user);
            this.loginType = user.mobile || '';
        }
        console.log(this.loginType);
        console.log(this.$router.options.routes);
    }
}
</script>
<style>
</style>