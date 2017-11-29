<template>
    <article class="article">
        <div class="path-bar">
            <div class="container">
                <a href="index.html">首页</a>
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
                                <dt>{{item.lName}}</dt>
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
            lawyerList:[
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'1.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'1'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'2.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'2'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'3.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'3'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'4.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'4'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'5.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'5'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'6.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'6'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'7.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'7'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'5.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'5'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'6.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'6'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'7.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'7'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'5.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'5'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'6.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'6'},
                {introduction:'',linkUrl:'123456',lName:'郭梦祺',imageUrl:'7.jpg',title:'复旦大学法律硕士,中国法学会会员',id:'7'} 
            ],
        }
    },
    methods: {
        titleJoin(data) {
            return data.split(',');
        },
        getLawyerList(){
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