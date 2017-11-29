<template>
	<article class="article">
		<div class="path-bar">
			<div class="container">
				<a href="index.html">首页</a>
				<i class="icon connect"></i>
				<a href="lawyer.html">专业律师</a>
				<i class="icon connect"></i>
				<span class="current">律师详情</span>
			</div>
		</div>
		<div class="lawyer-detail">
			<div class="container clear">
				<div class="lawyer-info fn-left">
					<div class="img-box">
						<img src="../../style/img/1.jpg" :alt="lawyer.lName" width="265" height="265" align="top">
					</div>
					<dl>
						<dt>{{lawyer.lName}}</dt>
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
        	lawyer:{
        		introduction:'郭梦祺律师曾在上海基层法院有过7年的工作经验，任职于法院立案庭、诉调中心、民事审判庭等多个部门，精通多类型的民事诉讼业务，并且拥有极强的法院沟通能力2013年，从法官转型成为律师，尤其擅长于家事婚姻、房屋继承析产及动拆迁等领域纠纷解决；并且，郭梦祺律师曾担任多家国、民企事业单位的法律顾问，在公司治理和人事、劳动争议解决方面拥有丰富的经验。郭梦祺律师是上海金融信息行业协会不良资产信息应用专业为会员会入库处置专家，同时也是全球投资移民律师协会中国区律师会员；在不良资产流通、处置问题和全球投资移民领域，获得广泛的认可。',
	        	linkUrl:'123456',
	        	lName:'郭梦祺',
	        	imageUrl:'1.jpg',
	        	title:'复旦大学法律硕士,中国法学会会员',
	        	id:'1'
        	}
        }
    },
    methods: {
    	titleJoin(data) {
            return data.split(',');
        },
        getLawyer(){
            this.$http.ajaxPost({
                url: 'lawyer',
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