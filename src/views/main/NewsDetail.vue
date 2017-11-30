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
                    <h2>{{news.title}}</h2>
                    <div class="news-date">{{news.createTime}}</div>
                </div>
                <div class="news-section">{{news.brief}}</div>
            </div>
        </div>
    </article>
</template>
<script>
import '../../style/news.css';
export default {
    data() {
        return {
             news:{}
        }
    },
    methods: {
        getLawyer(){
            this.$http.ajaxPost({
                url: 'news/detailQuery',
                params: {newsId:this.$route.params.id}
            }, (res) => {
                this.$http.aop(res, () => {
                    this.news = res.body.data.brief;

                });

            });
        }
    },
    mounted() {
        this.getLawyer();
    }
}
</script>