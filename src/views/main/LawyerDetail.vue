<template>
    <article class="article">
        <div class="path-bar">
            <div class="container">
                <a @click="$router.push({ path: '/main' })">首页</a>
                <i class="icon connect"></i>
                <a @click="$router.push({ path: '/lawyer' })">专业律师</a>
                <i class="icon connect"></i>
                <span class="current">律师详情</span>
            </div>
        </div>
        <div class="lawyer-detail">
            <div class="container clear">
                <div class="lawyer-info fn-left">
                    <div class="img-box">
                        <img :src="lawyer.avatar+'?x-oss-process=image/resize,w_265/auto-orient,1/quality,q_90'" :alt="lawyer.lName" width="265" align="top">
                    </div>
                    <dl>
                        <dt>{{lawyer.lname}}</dt>
                        <dd>
                            <p v-for=" (item ,index) in titleJoin(lawyer.title)" >{{item}}</p>
                        </dd>
                    </dl>
                </div>
                <div class="lawyer-intro ql-editor" v-html="lawyer.introduction"></div>
            </div>
        </div>
    </article>
</template>
<script>
import '../../style/lawyer.css';
export default {
    data() {
        return {
            lawyer: {
                avatar: "",
                introduction: "",
                lid: 2,
                lname: "",
                title: ""
            }
        }
    },
    methods: {
        titleJoin(data) {
            return data.split(',');
        },
        getLawyer() {
            this.$http.ajaxPost({
                url: 'lawyer/queryInfo',
                params: { lid: this.$route.params.id }
            }, (res) => {
                this.$http.aop(res, () => {
                    this.lawyer = res.body.data;

                });

            });
        }
    },
    mounted() {
        this.getLawyer();
    }
}
</script>