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
                <h2 v-if="title">最近函件公示</h2>
                <h2 v-else>查询结果</h2>
                <!-- 搜索结果 -->
                <div v-if="letterList.length>0" class="search-result">
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
                                <td>NO. {{item.detailId}}</td>
                                <td>{{orderTypeTxt(item.orderType)}}</td>
                                <td>{{item.receiverName}}</td>
                                <td>{{item.receiverIdCard}}</td>
                                <td>{{dateTime(item.sendTime,'YYYY-MM-DD')}}</td>
                                <td><a @click="viewsLetter(item)">验证查看</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 搜索无果 -->
                <div v-else class="search-result none">
                    <dl>
                        <dt><i class="box-icon"></i></dt>
                        <dd v-if="searchKeyWord">未找到与<b class="c-red">“{{searchKeyWord}}”</b>相关的函件</dd>
                        <dd v-else>没有数据</dd>
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
                                <input type="text" v-model="searchKeyEmail" placeholder="请输入收函邮箱地址">
                            </dd>
                        </dl>
                        <dl v-else>
                            <dt>手机号码</dt>
                            <dd>
                                <input type="tel" v-model="searchKeyMobile" maxlength="11" placeholder="请输入短信收件人手机号码">
                            </dd>
                        </dl>
                    </div>
                    <button class="modal-btn" @click="isOkview()">确定</button>
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
        <div v-if="resultMsgBox" class="layer">
            <div class="common-modal">
                <i class="icon close" @click="resultMsgBox=false"></i>
                <div class="modal-content options-content">
                    <h4 class="options-title">NO.123445 短信 王尼玛</h4>
                    <div class="options-text">{{esultMsgData.message}}</div>
                </div>
                <div class="modal-bottom">
                    <div class="btn-content">
                        <button class="btn red">复制</button>
                        <button class="btn white" @click="resultMsgBox=false">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 律师函弹窗 -->
        <div v-if="resultEmailBox" class="layer">
            <div class="common-modal letter-modal">
                <i class="icon close" @click="resultEmailBox=false"></i>
                <div class="modal-content">
                    <iframe :src="resultEmailData.letterUrl" style="border:none; width:100%; min-height: 500px;"></iframe>
                    <!-- <img src="../../style/img/letter_sample.png" alt="" width="726" height="1035"> -->
                </div>
                <div class="modal-bottom">
                    <div class="btn-content">
                        <!-- <button class="btn red" >下载</button> -->
                        <a :href="resultEmailData.letterUrl" class="btn red">下载</a>
                        <button class="btn white" @click="resultEmailBox=false">关闭</button>
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
import moment from 'moment'
export default {
    components: {
        VueInputCode
    },
    data() {
        return {
            title: true,
            pageNo: 0,
            codeBox: false,
            codeType: 'email',
            code: ['1', ''],
            codeString: "",
            input: "",
            searchKeyWord: '',
            searchNubmer: 6,
            hiedenWarn: false,
            pageSiez: 1,
            searchKeyEmail: '',
            searchKeyMobile: '',
            viewsLetterData: {},
            resultMsgBox: false,
            esultMsgData: {},
            resultEmailBox: false,
            resultEmailData: {},
            letterList: [],
            more: 0,
        }
    },
    methods: {
        orderTypeTxt(val) {
            let text = '';
            switch (val) {
                case 10:
                    text = '短信';
                    break;
                case 20:
                    text = '电子邮件';
                    break;
                default:
                    text = '邮件下载'
                    break;
            }
            return text;
        },
        dateTime(val, type) {
            return moment(val).format(type);
        },
        getInput(code) {
            this.input = code;
            //console.log(this.input);
        },
        success(code) {
            this.codeString = code;
            //console.log(this.codeString);
        },
        searchBtn() {
            if (this.searchKeyWord === '') {
                this.$message({
                    message: '请输入要查询的身份证或函件',
                    type: 'warning'
                });
                return;
            }
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
        viewsLetter(obj) {
            let user = sessionStorage.getItem('user');
            if (user) {
                if (obj.orderType == "10") {
                    this.codeType = 'msg';
                } else {
                    this.codeType = 'email';
                }
                this.codeString = '';
                this.viewsLetterData = obj;
                this.codeBox = true;
            } else {
                this.$parent.loginHieden = true;
            }
        },
        isOkview() {
            let opts = this.viewsLetterData;
            this.getSearchView(opts);
        },
        getSearchView(opts) {
            let params = {
                detailId: opts.detailId,
                idCard: this.codeString,
                orderType: opts.orderType
            };
            if (!validate.checkID(params.idCard)) {
                this.$message({
                    message: '请输入正确的身份证号',
                    type: 'warning'
                });
                return;
            }
            if (opts.orderType == 10) {
                params.mobile = this.searchKeyMobile;
                if (!validate.checkPhoneNum(params.mobile)) {
                    this.$message({
                        message: '请输入正确的手机号码',
                        type: 'warning'
                    });
                    return;
                }
            } else {
                params.email = this.searchKeyEmail;
                if (!validate.checkEmail(params.email)) {
                    this.$message({
                        message: '请输入正确的邮箱地址',
                        type: 'warning'
                    });
                    return;
                }
            }

            this.$http.ajaxPost({
                url: 'order/verify',
                params: params,
            }, (res) => {
                this.$http.aop(res, () => {
                    if (this.codeType == 'msg') {
                        this.resultMsgBox = true;
                        this.resultMsgData = res.body.data;
                    } else {
                        this.resultEmailBox = true;
                        this.resultEmailData = res.body.data;
                    }

                });
            });
        },
        getLetterList() {
            this.pageNo = 0;
            let params = {
                pageNo: this.pageNo,
                pageSiez: 1
            };
            if (!validate.checkID(this.searchKeyWord)) {
                params.detailId = this.searchKeyWord;
            } else {
                params.idCard = this.searchKeyWord;
            }
            this.$http.ajaxPost({
                url: 'order/listQuery',
                params: params,
            }, (res) => {
                this.$http.aop(res, () => {
                    try {
                        this.letterList = res.body.data.orderList || [];
                        this.more = res.body.data.more;
                    } catch (e) {
                        this.$message({
                            message: '请求有误，请稍后再试',
                            type: 'warning'
                        });
                        return;
                    }
                    this.title = false;
                });
            });
        },
        moreBtn() {
            this.pageNo++;
            let params = {
                pageNo: this.pageNo,
                pageSiez: 1
            };
            if (!validate.checkID(this.searchKeyWord)) {
                params.detailId = this.searchKeyWord;
            } else {
                params.idCard = this.searchKeyWord;
            }
            this.$http.ajaxPost({
                url: 'order/listQuery',
                params: params,
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