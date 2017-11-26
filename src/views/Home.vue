<template>
    <div class="h100s">
        <nav class="bk-horz-nav bk-horz-nav-min">
            <div class="bk-nav-logo fl">
                {{sysName}}
            </div>
            <ul class="ffs-breadcrumb">
                <li class="fir">
                    <router-link :to="{pat:'#/'}">首页</router-link>
                </li>
                <li class="sec">
                    <a v-if="$route.path.split('/')[2]" @click="$router.push(parentUrls)">{{parentUrlName}}</a>
                    <router-link v-else :to="{path:$route.path}">
                        {{$route.name}}
                    </router-link>
                </li>
                <!-- 二级页面要添加 首页的  -->
                <li v-show="$route.path.split('/')[2]" class="last">
                    <a> {{$route.name}} </a>
                </li>
            </ul>
            <div class="bk-nav-user fr">
                <el-dropdown class="bk-nav-user fr" trigger="hover">
                    <span class="el-dropdown-link userinfo-inner mr5"> {{sysUserName}}</span>
                    <img src="https://magicbox.bkclouds.cc/static_api/v3/components_pro/horizontal_nav1/images/avatar.png">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </nav>
        <div class="bk-layout bk-layout-has-sidebar" style="height:calc(100% - 60px)">
            <div class="bk-sidebar" :class="collapsed?'slide-close':'slide-open'">
                <div class="slide-switch" @click="collapse">
                    <i class="icon bk-icon icon-dedent f14"></i>
                </div>
                <div class="nav-list">
                    <div class="nav-list">
                        <ul ref="menuCollapsed">
                            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
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
                            </template>
                        </ul>
                    </div>
                </div>
                <div class="copyright">
                    <p>Copyright &copy; 2012-2017 法法社.</p>
                    <span>All Rights Reserved.</span>
                </div>
            </div>
            <div class="page-content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sysName: '法法社CRM客户管理系统',
            parentUrlName: '',
            parentUrls: '',
            collapsed: true,
            sysUserName: 'admin',
            sysUserAvatar: '',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            initFlag: false
        }
    },
    methods: {
        collapse: function() { //折叠导航栏
            this.collapsed = !this.collapsed;
            var box = this.$refs.menuCollapsed.getElementsByClassName('flex-subnavs');
            for (var i = 0; i < box.length; i++) {
                box[i].style.display = 'none';
            }
        },
        onSubmit() {},
        handleopen() {
            //console.log('handleopen');
        },
        handleclose() {
            //console.log('handleclose');
        },
        handleselect: function(a, b) {},
        //退出登录
        logout: function() {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                this.$http.ajaxPost({
                    url: 'logout',
                    params: {}
                }, (res) => {
                    this.$http.aop(res, () => {
                        sessionStorage.removeItem('user');
                        this.$router.push({
                            path: '/login'
                        });

                    });

                });
            }).catch(() => {

            });
        },
        showMenu(i, status) {
            var box = this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0];
            var dis = box.style.display;
            box.style.display = (dis == 'none' ? 'block' : 'none');
        },
        roleFun(role, userRole) {
            let flag = true;
            if (role === 0 || (role !== 0 && role === userRole)) { //对应权限
                flag = true;
            } else {
                flag = false;
            }
            return flag

        }
    },
    mounted() {
        var user = sessionStorage.getItem('user');
        if (user) { 
            user = JSON.parse(user);
            this.sysUserName = user.name || '';
            this.sysUserAvatar = user.role || 0; 
        }

    }
}
</script>