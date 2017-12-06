<template>
    <div>
        <div class="header">
            <div class="fn-clear container">
                <a href="/" class="logo">
                    <img src="../style/img/logo.png" width="201" height="48" align="middle" alt="">
                </a>
                <div class="top-nav">
                    <template v-for="(item,index) in $router.options.routes" v-if="item.navmuen">
                        <a v-for="child in item.children" @click="$router.push(child.path);" :class="(child.path.indexOf($route.path.split('/')[1]))>-1?'active':''" v-if="!child.hidden">{{child.name}}</a>
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
                        <a @click="registerShow('register')">注册</a>
                    </div>
                    <div v-else class="login-wrap fn-right">
                        <span><i class="icon user"></i>{{loginType}}</span>
                        <a @click="logout">退出登录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="article">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <div class="footer">
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
                                        <a href="http://www.fafashe.com" target="_blank">法法社</a>
                                        <a href="http://www.fenqile.com" target="_blank">分期乐</a>
                                        <a href="http://www.twoeyes.cn" target="_blank">目目学院</a>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>最近新闻</dt>
                                    <dd>
                                        <a href="#/news">仁良业绩</a>
                                        <a href="#/news">业内资讯</a>
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
        </div>
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
                            <!-- 最小宽度15%,拖拽宽度从15%开始加,并且在process-bar加class="ing" -->
                            <!-- 完成在process-bar加上class="finished",width为100%,并且将文案改为验证通过 -->
                            <div class="process-bar ing" id="processTag" style="width: 48px;">
                                <span class="process-tag" id="dragbtn"></span>
                                <span class="process-text" id="processText">按住滑块，拖至最右侧</span>
                            </div>
                        </div>
                        <!-- /验证滑块 -->
                        <!-- <div class="verify-item" id="dragbox">
                            <span>按住滑块，拖至最右侧</span>
                            <div class="process-tag" id="dragbtn" style="left: 0;"></div>
                        </div> -->
                        <div class="form-link-wrap fn-clear">
                            <a class="fn-right" @click="registerShow('setpwd')">忘记密码？</a>
                        </div>
                        <button class="modal-btn" @click="login()">登录</button>
                    </form>
                </div>
                <div class="modal-bottom">
                    <div class="bottom-text text-center">还没有账号?<a @click="registerShow('register');loginHieden=false">马上注册</a></div>
                </div>
            </div>
        </div>
        <!-- 注册/修改密码弹窗 -->
        <div class="layer" v-show="registerHieden">
            <div class="common-modal">
                <i class="icon close" @click="registerHieden=false;"></i>
                <h3 class="modal-title"><i class="firm-icon"></i>{{registerType=="register"?'注册仁良':'找回密码'}}</h3>
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
                            <p v-if="registerType=='register'">点击[注册]，即代表你同意
                                <a @click="agreeHieden=true">《仁良注册协议》</a>
                            </p>
                        </div>
                        <button class="modal-btn" @click="register(registerType)">{{register==register?'注册':'确定'}}</button>
                    </div>
                </div>
                <div class="modal-bottom">
                    <div class="operate-content">
                        <a @click="registerHieden=false;loginHieden=true;"><i class="icon back"></i>返回登录</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 注册协议 -->
        <div class="layer" v-show="agreeHieden">
            <div class="protocol-modal">
                <i class="icon close" @click="agreeHieden=false"></i>
                <h3 class="modal-title">注册协议</h3>
                <div class="modal-text">
                    <p>【首部及导言】</p>
                    <p>为有效利用QQ号码资源，维护用户合法权益，特制订《QQ号码规则》（以下简称“本规则”）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。 除非您已阅读并接受本规则所有条款，否则您无权申请或使用QQ号码。您申请或使用QQ号码的行为即视为您已阅读并同意受本规则的约束。
                    </p>
                    <h4>一、【规则的范围】</h4>
                    <p>1.1 本规则是腾讯制定的关于获取和使用QQ号码的相关规则。本规则适用于腾讯提供的需要注册或使用QQ号码的全部软件和服务。</p>
                    <p>1.2 本规则属于腾讯的业务规则，是《腾讯服务协议》不可分割的组成部分。</p>
                    <p>1.3 您通过QQ号码使用腾讯的软件和服务时，须同时遵守各项服务的单独协议。</p>
                    <h4>二、【QQ号码的性质】</h4>
                    <p>QQ号码是腾讯创设的用于识别用户身份的数字标识。QQ号码的所有权属于腾讯。</p>
                    <h4>三、【QQ号码的获取】</h4>
                    <p>3.1 您可以通过如下方式免费或有偿申请注册QQ号码，包括但不限于：</p>
                    <p>（1）软件客户端；</p>
                    <p>（2）腾讯网站；</p>
                    <p>（3）手机短信、电话语音（IVR）；</p>
                    <p>（4）参与腾讯开展或授权开展的活动；</p>
                    <p>（5）其他腾讯授权的方式。</p>
                    <p>3.2 您完成申请注册程序后，依照腾讯的业务规则获得该号码的使用权。</p>
                    <p>3.3 无论您通过何种方式获取QQ号码，均受本规则约束。</p>
                    <h4>四、【用户身份信息验证】</h4>
                    <p>4.1 您在申请QQ号码过程中，需要填写一些必要的信息，请保持这些信息的及时更新，以便腾讯向您提供帮助，或更好地为您提供服务。若国家法律法规有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整或不准确，则可能无法使用服务或在使用过程中受到限制。</p>
                    <p>4.2 腾讯与用户一同致力于个人信息的保护，保护用户个人信息是腾讯的一项基本原则。未经您的同意，腾讯不会向腾讯以外的任何公司、组织和个人披露您的个人信息，但法律法规另有规定的除外。</p>
                    <h4>五、【QQ号码的使用】</h4>
                    <p>5.1 您可以按照腾讯的业务规则用QQ号码登录和使用腾讯提供的各种软件和服务。</p>
                    <p>5.2 除了腾讯提供的软件和服务，您还可以用QQ号码登录使用腾讯合作伙伴的相关服务。</p>
                    <h4>六、【QQ号码的安全】</h4>
                    <p>6.1 QQ密码由您自行设定。您应妥善保管您的QQ号码与密码。</p>
                    <p>6.2 腾讯与您共同负有维护QQ号码安全的责任。腾讯会采取并不断更新技术措施，努力保护您的QQ号码在服务器端的安全。</p>
                    <p>6.3 您需要采取特定措施保护您的号码安全，包括但不限于妥善保管QQ号码与密码、安装防病毒木马软件、定期更改密码等措施。</p>
                    <h4>七、【QQ号码的找回】</h4> 如果您的QQ号码被盗、密码遗忘或因其他原因导致无法正常登录，您可以按照腾讯的申诉途径进行申诉，并遵守《QQ帐号申诉服务协议》。腾讯并不承诺您一定能通过申诉找回QQ号码。
                    </p>
                    <h4>八、【用户行为规范】</h4>
                    <p>8.1 您不得恶意注册QQ号码。腾讯可以对恶意注册行为进行独立判断和处理。</p>
                    <p>8.2 QQ号码使用权仅属于初始申请注册人。未经腾讯许可，您不得赠与、借用、租用、转让或售卖QQ号码或者以其他方式许可非初始申请注册人使用QQ号码。</p>
                    <p>8.3 如果您当前使用的QQ号码并不是您初始申请注册的或者通过腾讯提供的其他途径获得的，但您却知悉该QQ号码当前的密码，您不得用该号码登录或进行任何操作，并请您在第一时间通知腾讯或者该号码的初始申请注册人。
                    </p>
                    <h4>九、【责任承担】</h4>
                    <p>9.1 您理解并同意，作为QQ号码的初始申请注册人和使用人，您应承担该号码项下所有活动产生的全部责任。</p>
                    <p>9.2 因腾讯原因导致您的QQ号码被盗，腾讯将依法承担相应责任。非因腾讯原因导致的，腾讯不承担任何责任。</p>
                    <p>9.3 腾讯依照业务规则限制、冻结或终止您的QQ号码使用，可能会给您造成一定的损失，该损失由您自行承担，腾讯不承担任何责任。</p>
                    <p>9.4 您不得有偿或无偿转让QQ号码，以免产生纠纷。您应当自行承担由此产生的任何责任，同时腾讯保留追究上述行为人法律责任的权利。</p>
                    <h4>十、【QQ号码使用的限制、冻结或终止】</h4>
                    <p>10.1 如您违反法律法规、腾讯各服务协议或业务规则的规定，腾讯有权进行独立判断并随时限制、冻结或终止您对QQ号码的使用，且根据实际情况决定是否恢复使用。</p>
                    <p>10.2 如果腾讯发现您并非号码初始申请注册人，腾讯有权在未经通知的情况下终止您使用该号码。</p>
                    <p>10.3 为了充分利用QQ号码资源，如果您存在注册QQ号码后未及时进行初次登录使用，或长期未登陆使用QQ号码等情形，腾讯有权终止该号码的使用。</p>
                    <p>10.4 腾讯按照本规则或相关法律法规，限制、冻结或终止您对QQ号码的使用，而由此给您带来的损失（包括但不限于通信中断，用户资料、邮件和游戏道具及相关数据等的清空等），由您自行承担。</p>
                    <h4>十一、【客户服务】</h4>
                    <p>如果您对腾讯采取的QQ号码的限制措施有异议或在使用QQ号码的过程中有其他问题的，均可联系腾讯客户服务部门（http://kf.qq.com），我们会给予您必要的帮助。</p>
                </div>
                <div class="modal-content">
                    <button class="modal-btn" @click="agreeHieden=false">我已阅读</button>
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
            registerType: 'register',
            agreeHieden: false,
            verifyCode: false,
            searchKeyWord: '',
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
                case 'newPassword':
                    if (!validate.checkPhoneNum(this.registerForm.password)) {
                        isOk = false;
                        text = '密码不正确或不能为空（密码长度6-20位';
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
        register(type) {
            let params = {
                mobile: this.registerForm.mobile,
                verifyCode: this.registerForm.verifyCode
            };
            if (type == 'register') {
                params.password = this.registerForm.password;
            } else {
                params.newPassword = this.registerForm.password;
            }
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
                        this.registerHieden = false;
                        this.loginHieden = true;
                    });
                });
            }
        },
        loginShow() {
            this.loginHieden = true;
        },
        registerShow(type) {
            if (type == 'register') {
                this.registerType = 'register';
            } else {
                this.registerType = 'setpwd';
            }
            this.registerHieden = true;
            this.loginHieden = false;

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
            let leftWidth = 0;
            let _this = this;
            var oDiv = document.getElementById('dragbtn'); // 滑块
            var oDiv2 = document.getElementById('dragbox'); // 盒子
            var processTag = document.getElementById('processTag'); //状态
            var processText = document.getElementById('processText'); //文字

            var disX = 0;
            var disY = 0;
            oDiv.onmousedown = function(ev) {
                var oEvent = ev || event;
                disX = oEvent.clientX - oDiv.offsetLeft;
                disY = oEvent.clientY - oDiv.offsetTop;
                if (leftWidth < 240) {
                    oDiv.style.cursor = 'move';
                    document.onmousemove = function(ev) {
                        var oEvent = ev || event;
                        var l = oEvent.clientX - disX;
                        //var t = oEvent.clientY - disY;
                        if (l < 38) {
                            l = 0;
                        } else if (l > oDiv2.offsetWidth - oDiv.offsetWidth) {
                            l = oDiv2.offsetWidth - oDiv.offsetWidth;
                        }
                        if (l > 240) {
                            l = 270;
                        }
                        //t = 0;
                        // if (t < 50) {
                        //     t = 0;
                        // } else if (t > oDiv2.offsetHeight - oDiv.offsetHeight) {
                        //     t = oDiv2.offsetHeight - oDiv.offsetHeight;
                        // }
                        oDiv.style.left = l + 'px';
                        //oDiv.style.top = t + 'px';
                        processTag.style.width = (l + oDiv.offsetWidth) + 'px';
                        if (l === 270) {
                            _this.verifyCode = true;
                            processTag.className = 'process-bar ing finished';
                            leftWidth = l;
                            processText.innerHTML = '验证通过';
                            return;
                        } else {
                            _this.verifyCode = false;
                        }
                    };
                }
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if (leftWidth < 240) {
                        oDiv.style.left = leftWidth + 'px';
                        processTag.style.width = (leftWidth + oDiv.offsetWidth) + 'px';
                    }
                    oDiv.style.cursor = 'default';
                };
                return false;
            };
        }
    },
    mounted() {
        this.drag();
        let user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.loginType = user.mobile || '';
        }
        //console.log(this.loginType);
        //console.log(this.$router.options.routes);
    }
}
</script>
<style>
</style>