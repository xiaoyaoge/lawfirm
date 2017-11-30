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
                        <router-link :to="{path:'/lawyer/'+item.id}" class="bk-text-button" title="查看详情">
                            <div class="img-box">
                                <img src="../../style/img/1.jpg" alt="" width="265" height="265" align="top">
                            </div>
                            <dl>
                                <dt>{{item.lname}}</dt>
                                <dd>
                                    <p v-for="itmes in titleJoin(item.title)">{{itmes}}</p> 
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
            lawyerList:[],
        }
    },
    methods: {
        titleJoin(data) {
            return data.split(',');
        },
        getLawyer(){
            this.$http.ajaxPost({
                url: 'lawyer/listQuery',
                params: {pageSiez:'7',pageNo:0}
            }, (res) => {
                this.$http.aop(res, () => {
                     this.lawyerList = res.body.data.lawyerList||[];
                }); 
            });
        },
    },
    mounted() {
        this.getLawyer();
    }
}
</script>