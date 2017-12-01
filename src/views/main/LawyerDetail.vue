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
                        <img :src="lawyer.avatar" :alt="lawyer.lName" width="265" height="265" align="top">
                    </div>
                    <dl>
                        <dt>{{lawyer.lname}}</dt>
                        <dd>
                            <p v-for=" item in titleJoin(lawyer.title)">{{item}}</p>
                        </dd>
                    </dl>
                </div>
                <div class="lawyer-intro">{{lawyer.introduction}}</div>
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
                avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511961367854&di=c69f2eb36e48b6b24319fb6d125bfd1f&imgtype=0&src=http%3A%2F%2Fwww.qdcyls.com%2Fuploads%2Fallimg%2F160523%2F092S414E-0.jpg",
                introduction: "最优秀的律师",
                lid: 2,
                lname: "陈修风",
                title: "中国政法大学硕士,金融圈大伽"
            }
        }
    },
    methods: {
        titleJoin(data) {
            return data.split(',');
        },
        getLawyer() {
            this.$http.ajaxPost({
                url: 'lawyer/detailQuery',
                params: {}
            }, (res) => {
                this.$http.aop(res, () => {
                    this.lawyer = res.body.data.brief;
                });

            });
        }
    },
    mounted() {

    }
}
</script>