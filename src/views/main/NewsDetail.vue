<template>
    <article class="article">
        <div class="path-bar">
            <div class="container">
                <a href="index.html">首页</a>
                <i class="icon connect"></i>
                <a href="news.html">仁良新闻</a>
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
                <div class="news-section">{{news.content}}</div>
            </div>
        </div>
    </article>
</template>
<script>
import '../../style/news.css';
export default {
    data() {
        return {
             news:{
                newsId:'1',
                title:'赞助2017年北京大学法学院法律人求职发展交流会',
                createTime:'2017.10.19',
                brief: '2017年11月2日晚，由君合等律师事务所联合赞助的北京大学法学院法律人求职发展交流会在北京大学凯原楼举办，30余家国内外律所及企业，以及来自北京大学、清华大学、中国人民大学、中国政法大学等高校的法学院学生齐聚一堂。君合合伙人李茂昶、张宗珍、郑宇、孙小佳律师出席了此次活动。交流会嘉宾合影（前排左五至左八位依次为君合合伙人郑宇律师、张宗珍律师、李茂昶律师、孙小佳律师）李茂昶律师进行了开场致辞，与母校',
                content:'2017年11月2日晚，由君合等律师事务所联合赞助的北京大学法学院法律人求职发展交流会在北京大学凯原楼举办，30余家国内外律所及企业，以及来自北京大学、清华大学、中国人民大学、中国政法大学等高校的法学院学生齐聚一堂。君合合伙人李茂昶、张宗珍、郑宇、孙小佳律师出席了此次活动。交流会嘉宾合影（前排左五至左八位依次为君合合伙人郑宇律师、张宗珍律师、李茂昶律师、孙小佳律师）李茂昶律师进行了开场致辞，与母校'
            },
        }
    },
    methods: {
        getLawyer(){
            this.$http.ajaxPost({
                url: 'news',
                params: {}
            }, (res) => {
                this.$http.aop(res, () => {
                    //res.body.data.role 

                });

            });
        }
    },
    mounted() {
    }
}
</script>