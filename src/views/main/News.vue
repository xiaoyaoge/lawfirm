<template>
    <section>
        <div class="banner" style="background: url(&quot;http://fafashe.oss-cn-shenzhen.aliyuncs.com/images/e1a43fd114485f19c6eb36f6a9ee5cd1&quot;) center center / cover no-repeat;"></div>
        <div class="news-wrap">
            <div class="container">
                <h1 class="common-title">新闻动态</h1>
                <div class="news-type">
                    <a :class="onType?'on':''" @click="typeNews(1)">仁良业绩</a>
                    <a :class="!onType?'on':''" @click="typeNews(2)">业内资讯</a>
                </div>
                <ul class="news-list clear">
                    <li v-for="(item,index) in newsList">
                        <router-link :to="{path:'/news/'+item.newsId}">
                            <div class="news-top clear">
                                <div class="fn-left">
                                    <i class="icon news"></i>
                                    <span class="date">{{dateTime(item.createTime,'MM月DD日')}}</span>
                                </div>
                                <div class="fn-right">
                                    <span class="year">{{dateTime(item.createTime,'YYYY')}}</span>
                                </div>
                            </div>
                            <dl>
                                <dt>{{item.title}}</dt>
                                <dd>{{item.brief}} </dd>
                            </dl>
                            <div class="news-bottom clear">
                                <div class="fn-right">
                                    <router-link :to="{path:'/news/'+item.newsId}" class="bk-text-button" title="查看详情">
                                        查看详情<i class="icon arrow"></i>
                                    </router-link>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <a v-show="more" @click="moreBtn()" class="more-btn">加载更多</a>
            </div>
        </div>
    </section>
</template>
<script>
import '../../style/news.css';
import moment from 'moment'
export default {
    data() {
        return {
            onType: true,
            category: 1,
            newsFlag: 1,
            pageNo: 0,
            more: 0,
            newsList: [],
        }
    },
    methods: {
        dateTime(val, type) {
            return moment(val).format(type);
        },
        dateTime(val, type) {
            return moment(val).format(type);
        },
        getNews() {
            this.pageNo = 0;
            this.$http.ajaxPost({
                url: 'news/listQuery',
                params: { category: this.category, pageNo: this.pageNo, pageSize: 9 }
                //category 1:仁良动态，2:业内资讯
            }, (res) => {
                this.$http.aop(res, () => {
                    this.newsList = res.body.data.newsList || [];
                    this.more = res.body.data.more;
                });
            });

        },
        moreNews() {
            let  _this = this;
            this.pageNo++;
            this.$http.ajaxPost({
                url: 'news/listQuery',
                params: { category: this.category, pageNo: this.pageNo, pageSize: 9 }
                //category 1:仁良动态，2:业内资讯
            }, (res) => {
                this.$http.aop(res, () => {
                    let dataStr = res.body.data.newsList||[];
                    dataStr.forEach(function(itme){
                        _this.newsList.push(itme);
                    }); 
                    this.more = res.body.data.more;
                });
            });
        },
        typeNews(val) {
            this.category = val;
            if (val === 1) {
                this.onType = true;
                this.getNews();
            } else {
                this.onType = false;
                this.getNews();
            }
        },
        moreBtn() {
            this.moreNews();
        }
    },
    mounted() {
        this.getNews();
    }
}
</script>