<template>
    <article class="article">
        <div class="path-bar">
            <div class="container">
                <a @click="$router.push({ path: '/main' })">首页</a>
                <i class="icon connect"></i>
                <a @click="$router.push({ path: '/news' })">仁良新闻</a>
                <i class="icon connect"></i>
                <span class="current">仁良业绩</span>
            </div>
        </div>
        <div class="news-article">
            <div class="container">
                <div class="news-title">
                    <h2>{{news.brief.title}}</h2>
                    <div class="news-date">{{dateTime(news.brief.createTime,'YYYY-MM-DD')}}</div>
                </div>
                <div class="news-section" v-html="news.detail.content"></div>
            </div>
        </div>
    </article>
</template>
<script>
import '../../style/news.css'
import moment from 'moment'
export default {
    data() {
        return {
            news: {
                brief: {},
                detail: {}
            }
        }
    },
    methods: {
        dateTime(val, type) {
            return moment(val).format(type);
        },
        getLawyer() {
            this.$http.ajaxPost({
                url: 'news/detailQuery',
                params: { newsId: this.$route.params.id }
            }, (res) => {
                this.$http.aop(res, () => {
                    this.news.brief = res.body.data.brief;
                    this.news.detail = res.body.data.detail;
                });

            });
        }
    },
    mounted() {
        this.getLawyer();
    }
}
</script>