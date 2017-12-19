<template>
    <article class="article">
        <div class="path-bar">
            <div class="container">
                <a @click="$router.push({ path: '/main' })">首页</a>
                <i class="icon connect"></i>
                <span class="current">专业律师</span>
            </div>
        </div>
        <div class="lawyer-wraps">
            <div class="container">
                <h1 class="common-title">专业律师</h1>
                <ul class="lawyer-list clear">
                    <li v-for="(item,index) in lawyerList">
                        <router-link :to="{path:'/lawyer/'+item.lid}" class="bk-text-button" title="查看详情">
                            <div class="img-box">
                                <img :src="item.avatar+'?x-oss-process=image/resize,w_265/auto-orient,1/quality,q_90'" :alt="item.lname" width="265" align="top">
                            </div>
                            <dl>
                                <dt>{{item.lname}}</dt>
                                <dd v-if="titleJoin(item.title).length">
                                    <p v-for="(itmes,index) in titleJoin(item.title)" v-if="index<2">{{itmes}}</p>
                                    <p v-if="titleJoin(item.title).length<2">&nbsp;&nbsp;</p>
                                </dd>
                                <dd v-else>
                                    <p>&nbsp;&nbsp;</p>
                                    <p>&nbsp;&nbsp;</p>
                                </dd>
                            </dl>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </article>
</template>
<script>
import '../../style/lawyer.css';
export default {
    data() {
        return {
            lawyerList: [],
        }
    },
    methods: {
        titleJoin(data) {
            return data.split(',');
        },
        getLawyer() {
            this.$http.ajaxPost({
                url: 'lawyer/listQuery',
                params: { pageSizez: '7', pageNo: 0 }
            }, (res) => {
                this.$http.aop(res, () => {
                    this.lawyerList = res.body.data.lawyerList || [];
                });
            });
        },
    },
    mounted() {
        this.getLawyer();
    }
}
</script>