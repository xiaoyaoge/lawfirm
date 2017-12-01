<template>
    <div class="article">
        <div class="search-box">
            <div class="container">
                <div class="search-form">
                    <input type="text" v-model="searchKeyWord" placeholder="请输入身份证或者函件编号" value="" />
                    <button @click="searchBtn()">搜索</button>
                </div>
                <div class="search-tip">需登录后才可以查询律所所发出的短信或者电子函件</div>
            </div>
        </div>
        <div class="letters-box">
            <div class="container">
                <h2 class="">最近函件公示</h2>
                <!-- 搜索结果 -->
                <div class="search-result">
                    <table>
                        <thead>
                            <tr>
                                <th width="30"></th>
                                <th>函件编号</th>
                                <th>函件类型</th>
                                <th>姓名</th>
                                <th>身份证号码</th>
                                <th>发函时间</th>
                                <th>函件内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in letterList">
                                <td></td>
                                <td>{{item.id}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.idCard}}</td>
                                <td>{{item.time}}</td>
                                <td><a @click="viewsLetter(item.type)">验证查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 搜索无果 -->
                <div class="search-result none hide">
                    <dl>
                        <dt><i class="box-icon"></i></dt>
                        <dd>未找到与<b class="c-red">“12566”</b>相关的函件</dd>
                    </dl>
                </div>
                <a v-show="more" @click="moreBtn()" class="more-btn">查看更多</a>
            </div>
        </div>
        <!-- 函件查询弹窗 -->
        <div v-show="codeBox" class="layer">
            <div class="common-modal">
                <i class="icon close" @click="codeBox=false"></i>
                <h3 class="modal-title">查询验证</h3>
                <div class="modal-content query-content">
                    <div class="query-info">为了保护用户隐私，请验证该函件收件人的身份证号与{{(codeType=='email')?'收函邮箱':'手机号'}}</div>
                    <div class="query-form">
                        <dl>
                            <dt>身份证号码</dt>
                            <dd>
                                <vue-input-code span-size="19px" type="text" :number="18" height="38px" span-color="#b62a2a" input-color="#b62a2a" input-size="21px" :code="code" :get-input="getInput" :success="success"></vue-input-code>
                            </dd>
                        </dl>
                        <dl v-if="codeType=='email'">
                            <dt>收函邮箱</dt>
                            <dd>
                                <input type="text" v-model="searchKeyWord" placeholder="请输入收函邮箱地址">
                            </dd>
                        </dl>
                        <dl v-else>
                            <dt>手机号码</dt>
                            <dd>
                                <input type="tel" v-model="searchKeyWord" maxlength="11" placeholder="请输入短信收件人手机号码">
                            </dd>
                        </dl>
                    </div>
                    <button class="modal-btn">确定</button>
                    <div class="query-tip">您今日还有 <span class="c-red">{{searchNubmer}}</span> 次查询机会</div>
                </div>
            </div>
        </div>
        <!-- 警告弹窗 -->
        <div v-show="hiedenWarn" class="layer">
            <div class="common-modal">
                <i class="icon close" @click="hiedenWarn=false"></i>
                <div class="modal-content options-content">
                    <i class="big-icon warn"></i>
                    <dl>
                        <dt>已达到每日限额查询次数</dt>
                    </dl>
                </div>
                <div class="modal-bottom">
                    <div class="btn-content">
                        <button class="btn red" @click="hiedenWarn=false">确定</button>
                        <button class="btn white" @click="hiedenWarn=false">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 报错弹窗 -->
        <div class="layer hide">
            <div class="common-modal">
                <i class="icon close"></i>
                <div class="modal-content options-content">
                    <i class="big-icon error"></i>
                    <dl>
                        <dt>验证失败，您输入的身份证号不匹配</dt>
                        <dd>您还有 <span class="c-red">5</span> 次查询机会</dd>
                    </dl>
                </div>
                <div class="modal-bottom">
                    <div class="btn-content">
                        <button class="btn red">重新验证</button>
                        <button class="btn white">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 短信模板弹窗 -->
        <div class="layer hide">
            <div class="common-modal">
                <i class="icon close"></i>
                <div class="modal-content options-content">
                    <h4 class="options-title">NO.123445 短信 王尼玛</h4>
                    <div class="options-text">
                        【仁良律所】王尼玛，我所受蓝天白云委托警告：由于您拒不履约，我所将发送《起诉告知函》至您身申办业务时填写的邮箱或实际地址！如拒不履约还款，将按照函告内容追究法律责任。请联系17503030303
                    </div>
                </div>
                <div class="modal-bottom">
                    <div class="btn-content">
                        <button class="btn red">复制</button>
                        <button class="btn white">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 律师函弹窗 -->
        <div class="layer hide">
            <div class="common-modal letter-modal">
                <i class="icon close"></i>
                <div class="modal-content">
                    <img src="../../style/img/letter_sample.png" alt="" width="726" height="1035">
                </div>
                <div class="modal-bottom">
                    <div class="btn-content">
                        <button class="btn red">下载</button>
                        <button class="btn white">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../../style/letter.css';
import validate from '../../validate'
import VueInputCode from 'vue-input-code'
export default {
    components: {
        VueInputCode
    },
    data() {
        return {
            codeBox: false,
            codeType: 'email',
            code: ['1', ''],
            codeString: "",
            input: "",
            searchKeyWord: '',
            searchNubmer: 0,
            hiedenWarn: false,
            letterList: [
                { type: '短信', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '电子邮件', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '短信', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '电子邮件', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '短信', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '电子邮件', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '短信', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '电子邮件', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '短信', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' },
                { type: '电子邮件', name: '王*玛', idCard: '124457********8852', time: '2017-10-24', id: 'NO.123445' }
            ],
            more: 0,
        }
    },
    methods: {
        getInput(code) {
            this.input = code;
            //console.log(this.input);
        },
        success(code) {
            this.codeString = code;
            //console.log(this.codeString);
        },
        searchBtn() {
            let user = sessionStorage.getItem('user');
            if (user) {
                if (this.searchNubmer < 1) {
                    this.hiedenWarn = true;
                    return;
                }
                this.getLetterList();
            } else {
                this.$parent.loginHieden = true;
            }
        },
        viewsLetter(type) {
            let user = sessionStorage.getItem('user');
            if (user) {
                if (type == "短信") {
                    this.codeType = 'msg';
                } else {
                    this.codeType = 'email';
                }
                this.codeBox = true;
            } else {
                this.$parent.loginHieden = true;
            }

        },
        getLetterList() {
            this.$http.ajaxPost({
                url: 'letter/listQuery',
                params: { keyWord: this.searchKeyWord, pageNo: 0, pageSiez: 1 } //category 1:仁良动态，2:业内资讯
            }, (res) => {
                this.$http.aop(res, () => {
                    this.letterList = res.body.data.letterList || [];
                    this.more = res.body.data.more;
                });
            });
        },
        moreBtn() {
            this.$http.ajaxPost({
                url: 'letter/listQuery',
                params: { keyWord: this.searchKeyWord, pageNo: 0, pageSiez: 1 } //category 1:仁良动态，2:业内资讯
            }, (res) => {
                this.$http.aop(res, () => {
                    this.letterList = res.body.data.letterList || [];
                    this.more = res.body.data.more;
                });
            });
        }

    },
    mounted() {
        //this.$parent.loginHieden = true;
    }
}
</script>