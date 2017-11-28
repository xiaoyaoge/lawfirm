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
                    <div class="login-wrap fn-right">
                        <a href="###">登录</a>
                        <a href="###">注册</a>
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
        <div class="layer hide">
            <div class="common-modal">
                <i class="icon close"></i>
                <h3 class="modal-title"><i class="firm-icon"></i>登录仁良</h3>
                <div class="modal-content">
                    <form action="" class="modal-form">
                        <div class="form-item">
                            <i class="icon user"></i>
                            <input type="text" placeholder="请输入注册的手机账号" />
                        </div>
                        <div class="form-item">
                            <i class="icon pwd"></i>
                            <input type="text" placeholder="密码" />
                        </div>
                        <div class="form-link-wrap fn-clear">
                            <a href="###" class="fn-right">忘记密码？</a>
                        </div>
                        <button class="modal-btn" @click="login()">登录</button>
                    </form>
                </div>
                <div class="modal-bottom">
                    还没有账号?<a href="###">马上注册</a>
                </div>
            </div>
        </div>

        <!-- 注册弹窗 -->
        <div class="layer hide">
            <div class="common-modal">
                <i class="icon close"></i>
                <h3 class="modal-title"><i class="firm-icon"></i>注册仁良</h3>
                <div class="modal-content">
                    <form action="" class="modal-form">
                        <div class="form-item">
                            <i class="icon user"></i>
                            <input type="text" placeholder="请输入你的手机号码" />
                        </div>
                        <div class="form-item">
                            <i class="icon pwd"></i>
                            <input type="text" placeholder="密码长度6-20位" />
                        </div>
                        <div class="form-item">
                            <i class="icon pwd"></i>
                            <input type="text" placeholder="请再次输入你的密码" />
                        </div>
                        <div class="form-item">
                            <i class="icon code"></i>
                            <input type="text" placeholder="请输入你的验证码" />
                        </div>
                        <div class="form-link-wrap fn-clear">
                            <a href="###" class="fn-right">忘记密码？</a>
                        </div>
                        <button class="modal-btn">登录</button>
                    </form>
                </div>
                <div class="modal-bottom">
                    还没有账号?<a href="###">马上注册</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../style/global.css';
export default {
    data() {
        return {
            show: false,
            animation: '',
            //paddingTop: `paddingTop: ${(window.innerHeight - 440) / 2}px`,
            types: ['zoom', 'fade', 'flip', 'door', 'rotate', 'slideUp', 'slideDown', 'slideLeft', 'slideRight']
        }
    },
    methods: {
        login(){
        }
    },
    mounted() {
        console.log(this.$router.options.routes);
    }
}
</script>
<style>
</style>