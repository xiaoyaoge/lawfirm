<template>
    <section v-loading="initLoading">
        <div id="main_slider">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for="(item,index) in bannerList" :key="index" style="background: #1e1209;">
                    <a v-if="item.jumpUrl" :href="item.jumpUrl" :style="[{background:'url('+item.imageUrl+') center center no-repeat',backgroundSize:'cover'}]">
                        <!-- <img :src="item.imageUrl"> -->
                    </a>
                    <img v-else :src="item.imageUrl">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
         <div class="letter-search">
            <div class="container">
                <div class="search-form">
                    <label for="">函件查询</label>
                    <input type="text" v-model="keyWord" placeholder="请输入身份证或者函件编号" />
                    <button @click="searchBtns()">搜索</button>
                </div>
            </div>
        </div>
        <div class="news-wrap">
            <div class="container">
                <h1 class="common-title">最近新闻</h1>
                <ul class="news-list clear">
                    <li v-for="(item,index) in nwesList">
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
                <router-link :to="{path:'/news'}" class="more-btn" title="查看更多">查看更多</router-link>
                <!-- <a href="###" class="more-btn">查看更多</a> -->
            </div>
        </div>
        <div class="lawyer-wrap">
            <div class="container">
                <h1 class="common-title">律师团队</h1>
                <ul class="lawyer-list clear">
                    <li v-for="(item,index) in lawyerList">
                        <dl>
                            <dt>
                                <img :src="item.avatar+'?x-oss-process=image/resize,h_336/auto-orient,1/quality,q_90'" alt="" height="336" align="top">
                            </dt>
                            <dd>{{item.lname}}</dd>
                        </dl>
                    </li>
                </ul>
                <router-link :to="{path:'/lawyer'}" class="more-btn" title="查看更多">查看更多</router-link>
            </div>
        </div>
        <div class="co-wrap hide">
            <div class="container">
                <h1 class="common-title">合作组织</h1>
                <ul class="co-list clear">
                    <li v-for="(item,index) in coList">
                        <img src="../../style/img/fql_logo.png" :alt="item.title" width="121" height="75" align="middle">
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
import '../../style/index.css';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import moment from 'moment'
export default {
    data() {
        return {
            keyWord: '',
            initLoading: false,
            bannerList: [],
            nwesList: [],
            lawyerList: [],
            coList: [
                { linkUrl: '12334', lName: '郭梦祺', imageUrl: '1.jpg', title: '', id: '1' },
                { linkUrl: '12334', lName: '郭梦祺', imageUrl: '2.jpg', title: '', id: '2' },
                { linkUrl: '12334', lName: '郭梦祺', imageUrl: '3.jpg', title: '', id: '3' },
                { linkUrl: '12334', lName: '郭梦祺', imageUrl: '4.jpg', title: '', id: '4' },
                { linkUrl: '12334', lName: '郭梦祺', imageUrl: '5.jpg', title: '', id: '5' }
            ],
            swiperOption: {
                direction: 'horizontal',
                notNextTick: true,
                autoplay: 3000,
                speed: 300,
                loop: true,
                //effect:"coverflow",
                grabCursor: true,
                //setWrapperSize :true,
                // paginationType:"bullets",
                pagination: '.swiper-pagination',
                paginationClickable: true,
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                // scrollbar:'.swiper-scrollbar',
                //mousewheelControl : true,
                observeParents: true
            }
        }
    },
    components: {
        swiper,
        swiperSlide,
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    methods: {
        dateTime(val, type) {
            return moment(val).format(type);
        },
        getBanner() {
            this.$http.ajaxPost({
                url: 'home/bannerListQuery',
                params: {}
            }, (res) => {
                this.$http.aop(res, () => {
                    this.bannerList = res.body.data.bannerList || [];
                });
            });
        },
        getNews() {
            this.$http.ajaxPost({
                url: 'news/listQuery',
                params: { category: 0, pageNo: 0, pageSize: 3 } //category 1:仁良动态，2:业内资讯
            }, (res) => {
                this.$http.aop(res, () => {
                    this.nwesList = res.body.data.newsList || [];
                });
            });

        },
        getLawyer() {
            this.$http.ajaxPost({
                url: 'lawyer/listQuery',
                params: { pageSize: '7', pageNo: 0 }
            }, (res) => {
                this.$http.aop(res, () => {
                    this.lawyerList = res.body.data.lawyerList || [];
                });
            });
        },
        initGetData() {
            this.initLoading = true;
            this.getBanner();
            this.getLawyer();
            this.getNews();
            this.initLoading = false;
        },
        searchBtns() {
            this.$parent.searchKeyWord = this.keyWord;
            this.$router.push({ path: '/search' });
        }
    },
    mounted() {
        this.initGetData();

    }
}
</script>