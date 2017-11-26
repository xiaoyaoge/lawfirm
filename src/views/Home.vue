<template>
    <div>
        <header class="header">
            <div class="fn-clear container">
                <a href="/" class="logo">
                    <img src="../style/img/logo.png" width="201" height="48" align="middle" alt="">
                </a>
                <div class="top-nav">
                    <!-- <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                                <li v-if="roleFun(item.role,sysUserAvatar)" :class="item.paths.indexOf($route.path.split('/')[1])>-1? 'open': ''">
                                    <template v-if="!item.leaf">
                                        <a @click="showMenu(index,true)">
                                            <span class="icon-box"><i class="bk-icon" :class="item.iconCls"></i></span>
                                            <span class="nav-name">{{item.name}}</span>
                                        </a>
                                        <div class="flex-subnavs" :class="'submenu-hook-'+index" :style="item.paths.indexOf($route.path)>-1?'display: block;':'display:none;'">
                                            <a v-for="child in item.children" v-if="!child.hidden" :class="$route.path==child.path?'on':''" @click="$router.push(child.path);"><i></i>{{child.name}}
                                            </a>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <a @click="$router.push(item.children[0].path);">
                                            <span class="icon-box"><i class="bk-icon" :class="item.iconCls"></i></span><span class="nav-name">{{item.children[0].name}}</span>
                                        </a>
                                    </template>
                                </li>
                            </template> -->
                    <template v-for="(item,index) in $router.options.routes" v-if="item.navmuen">
                        <template>
                            <a v-for="child in item.children" @click="$router.push(child.path);" :class="$route.path==child.path?'active':''">{{child.name}}</a>
                        </template>
                    </template>
                    <!-- <a href="#/main" class="active">首页</a>
                    <a href="#/news" class="">仁良新闻</a>
                    <a href="#/lawyer">专业律师</a>
                    <a href="#/search">函件查询</a>
                    <a href="#/about">关于我们</a> -->
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
    </div>
</template>
<script>
import '../style/global.css'
export default {
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        console.log(this.$router.options.routes);
    }
}
</script>