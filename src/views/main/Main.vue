<template>
    <section>
		<div id="main_slider">
		    <swiper :options="swiperOption" ref="mySwiper">
			    <!-- slides -->
			    <swiper-slide v-for="(item,index) in bannerList" style="background: #1e1209;">
			    	<div class="container"><a :href="item.jumpUrl"><img :src="item.imageUrl"></a></div>
			    </swiper-slide>
			    <!-- <swiper-slide style="background: #7d4a24;">
			    	<div class="container">Slide 2</div>
			    </swiper-slide>
			    <swiper-slide style="background: #666;">
			    	<div class="container">Slide 3</div>
			    </swiper-slide>
			    <swiper-slide style="background: #999;">
			    	<div class="container">Slide 4</div>
			    </swiper-slide>  -->
			    <!-- Optional controls -->
			    <div class="swiper-pagination"  slot="pagination"></div>
			    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
			    <!-- <div class="swiper-button-next" slot="button-next"></div> -->
			    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
			</swiper>
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
									<span class="date">11月6日</span>
								</div>
								<div class="fn-right">
									<span class="year">2017</span>
								</div>
							</div>
							<dl>
								<dt>{{item.title}}</dt>
								<dd>{{item.brief}} </dd>
							</dl>
							<div class="news-bottom clear">
								<div class="fn-right" >
									<router-link :to="{path:'/news/'+item.newsId}" class="bk-text-button" title="查看详情">
                                        查看详情<i class="icon arrow"></i>
                                    </router-link>
								</div>
							</div>
						</router-link>
					</li>
					<!-- <li>
						<a href="###">
							<div class="news-top clear">
								<div class="fn-left">
									<i class="icon news"></i>
									<span class="date">11月6日</span>
								</div>
								<div class="fn-right">
									<span class="year">2017</span>
								</div>
							</div>
							<dl>
								<dt>赞助2017年北京大学法学院法律人求职发展交流会</dt>
								<dd>2017年11月2日晚，由君合等律师事务所联合赞助的北京大学法学院法律人求职发展交流会在北京大学凯原楼举办，30余家国内外律所及企业，以及来自北京大学、清华大学、中国人民大学、中国政法大学等高校的法学院学生齐聚一堂。君合合伙人李茂昶、张宗珍、郑宇、孙小佳律师出席了此次活动。交流会嘉宾合影（前排左五至左八位依次为君合合伙人郑宇律师、张宗珍律师、李茂昶律师、孙小佳律师）李茂昶律师进行了开场致辞，与母校
								</dd>
							</dl>
							<div class="news-bottom clear">
								<div class="fn-right">
									查看详情<i class="icon arrow"></i>
								</div>
							</div>
						</a>
					</li>
					<li>
						<a href="###">
							<div class="news-top clear">
								<div class="fn-left">
									<i class="icon news"></i>
									<span class="date">11月6日</span>
								</div>
								<div class="fn-right">
									<span class="year">2017</span>
								</div>
							</div>
							<dl>
								<dt>赞助2017年北京大学法学院法律人求职发展交流会</dt>
								<dd>2017年11月2日晚，由君合等律师事务所联合赞助的北京大学法学院法律人求职发展交流会在北京大学凯原楼举办，30余家国内外律所及企业，以及来自北京大学、清华大学、中国人民大学、中国政法大学等高校的法学院学生齐聚一堂。君合合伙人李茂昶、张宗珍、郑宇、孙小佳律师出席了此次活动。交流会嘉宾合影（前排左五至左八位依次为君合合伙人郑宇律师、张宗珍律师、李茂昶律师、孙小佳律师）李茂昶律师进行了开场致辞，与母校
								</dd>
							</dl>
							<div class="news-bottom clear">
								<div class="fn-right">
									查看详情<i class="icon arrow"></i>
								</div>
							</div>
						</a>
					</li> -->
				</ul>
				<router-link :to="{path:'/news'}" class="more-btn" title="查看更多">查看更多</router-link>
				<!-- <a href="###" class="more-btn">查看更多</a> -->
			</div>
		</div>
		<div class="letter-search">
			<div class="container">
				<div class="search-form">
					<label for="">函件查询</label>
					<input type="text" placeholder="请输入身份证或者函件编号" value="" />
					<button>搜索</button>
				</div>
			</div>
		</div>
		<div class="lawyer-wrap">
			<div class="container">
				<h1 class="common-title">律师团队</h1>
				<ul class="lawyer-list clear">
					<li v-for="(item,index) in lawyerList">
						<dl>
							<dt>
								<img src="../../style/img/1.jpg" alt="" height="336" align="top">
							</dt>
							<dd>郭梦祺</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<img src="../../style/img/2.jpg" alt="" height="336" align="top">
							</dt>
							<dd>郭梦祺</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<img src="../../style/img/3.jpg" alt="" height="336" align="top">
							</dt>
							<dd>郭梦祺</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<img src="../../style/img/4.jpg" alt="" height="336" align="top">
							</dt>
							<dd>郭梦祺</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<img src="../../style/img/5.jpg" alt="" height="336" align="top">
							</dt>
							<dd>郭梦祺</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<img src="../../style/img/6.jpg" alt="" height="336" align="top">
							</dt>
							<dd>郭梦祺</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<img src="../../style/img/7.jpg" alt="" height="336" align="top">
							</dt>
							<dd>郭梦祺</dd>
						</dl>
					</li>
				</ul>
				<a href="###" class="more-btn">查看所有</a>
			</div>
		</div>
		<div class="co-wrap">
			<div class="container">
				<h1 class="common-title">合作组织</h1>
				<ul class="co-list clear">
					<li>
						<img src="../../style/img/fql_logo.png" alt="" width="121" height="75" align="middle">
					</li>
					<li>
						<img src="../../style/img/fql_logo.png" alt="" width="121" height="75" align="middle">
					</li>
					<li>
						<img src="../../style/img/fql_logo.png" alt="" width="121" height="75" align="middle">
					</li>
					<li>
						<img src="../../style/img/fql_logo.png" alt="" width="121" height="75" align="middle">
					</li>
					<li>
						<img src="../../style/img/fql_logo.png" alt="" width="121" height="75" align="middle">
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
export default {
    data() {
    	return {
    		bannerList:[
    			{imageUrl:'1111',jumpUrl:'2222',title:'2221',id:'1'},
    			{imageUrl:'3333',jumpUrl:'44444',title:'3331',id:'2'}
    		],
    		nwesList:[
    			{newsId:'1',title:'赞助2017年北京大学法学院法律人求职发展交流会',createTime:'',brief:
    		'2017年11月2日晚，由君合等律师事务所联合赞助的北京大学法学院法律人求职发展交流会在北京大学凯原楼举办，30余家国内外律所及企业，以及来自北京大学、清华大学、中国人民大学、中国政法大学等高校的法学院学生齐聚一堂。君合合伙人李茂昶、张宗珍、郑宇、孙小佳律师出席了此次活动。交流会嘉宾合影（前排左五至左八位依次为君合合伙人郑宇律师、张宗珍律师、李茂昶律师、孙小佳律师）李茂昶律师进行了开场致辞，与母校' },
    			{newsId:'2',title:'赞助2017年北京大学法学院法律人求职发展交流会',createTime:'',brief:
    		'2017年11月2日晚，由君合等律师事务所联合赞助的北京大学法学院法律人求职发展交流会在北京大学凯原楼举办，30余家国内外律所及企业，以及来自北京大学、清华大学、中国人民大学、中国政法大学等高校的法学院学生齐聚一堂。君合合伙人李茂昶、张宗珍、郑宇、孙小佳律师出席了此次活动。交流会嘉宾合影（前排左五至左八位依次为君合合伙人郑宇律师、张宗珍律师、李茂昶律师、孙小佳律师）李茂昶律师进行了开场致辞，与母校' },
    			{newsId:'3',title:'赞助2017年北京大学法学院法律人求职发展交流会',createTime:'',brief:
    		'2017年11月2日晚，由君合等律师事务所联合赞助的北京大学法学院法律人求职发展交流会在北京大学凯原楼举办，30余家国内外律所及企业，以及来自北京大学、清华大学、中国人民大学、中国政法大学等高校的法学院学生齐聚一堂。君合合伙人李茂昶、张宗珍、郑宇、孙小佳律师出席了此次活动。交流会嘉宾合影（前排左五至左八位依次为君合合伙人郑宇律师、张宗珍律师、李茂昶律师、孙小佳律师）李茂昶律师进行了开场致辞，与母校' }
    		],
    		lawyerList:[
    			{introduction:'',lName:'郭梦祺',title:'',lid:''},
    			{introduction:'',lName:'郭梦祺',title:'',lid:''},
    			{introduction:'',lName:'郭梦祺',title:'',lid:''},
    		],
	        swiperOption: {
	        	direction : 'horizontal',
				notNextTick: true,
				autoplay: 3000,
				speed: 300,
				loop:true,
				//effect:"coverflow",
				grabCursor : true,
				//setWrapperSize :true,
				// paginationType:"bullets",
				pagination : '.swiper-pagination',
				paginationClickable :true,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				// scrollbar:'.swiper-scrollbar',
				//mousewheelControl : true,
				observeParents:true
	        }
	    }
    },components: {
    	swiper,
    	swiperSlide
  	},
    computed: {
      	swiper() {
        	return this.$refs.mySwiper.swiper
      	}
    },
    methods: {
    },
    mounted() {
    }
}
</script>

