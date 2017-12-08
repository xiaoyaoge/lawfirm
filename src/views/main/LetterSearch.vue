<template>
    <div class="article">
        <div class="search-box">
            <div class="container">
                <div class="search-form">
                    <input type="text" v-model="searchKeyWord" placeholder="请输入身份证或者函件编号" value="" />
                    <button @click="getCount(1,{})">搜索</button>
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
                                <td>{{'NO.'+item.detailId}}</td>
                                <td>{{orderTypeTxt(item.orderType)}}</td>
                                <td>{{item.receiverName}}</td>
                                <td>{{item.receiverIdCard}}</td>
                                <td>{{dateTime(item.sendTime,'YYYY-MM-DD')}}</td>
                                <td><a @click="getCount(2,item)">验证查看</a></td>
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
                                <verify-input-code ref="verifyInputCode" s-size="19px" type="text" :number="18" height="38px" s-color="#343434" input-color="#b62a2a" input-size="21px" :code="code" :get-input="getInput" :success="success"></verify-input-code>
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
                    <a class="modal-btn" @click="isOkview()" style="width:auto;">确定</a>
                    <div class="query-tip">您今日还有 <span class="c-red">{{verifyNubmer}}</span> 次验证机会</div>
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
                        <a class="btn red" @click="hiedenWarn=false">确定</a>
                        <a class="btn white" @click="hiedenWarn=false">取消</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 报错弹窗 -->
        <div v-if="hiedenVerify" class="layer">
            <div class="common-modal">
                <i class="icon close" @click="hiedenVerify=false"></i>
                <div class="modal-content options-content">
                    <i class="big-icon error"></i>
                    <dl>
                        <dt>验证失败，您输入的身份证号不匹配</dt>
                        <dd>您还有 <span class="c-red">{{verifyNubmer-1}}</span> 次查询机会</dd>
                    </dl>
                </div>
                <div class="modal-bottom">
                    <div class="btn-content">
                        <!-- <button class="btn red" @click="">重新验证</button> -->
                        <a class="btn white" @click="hiedenVerify=false">取消</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 短信模板弹窗 -->
        <div v-show="resultMsgBox" class="layer">
            <div class="common-modal">
                <i class="icon close" @click="resultMsgBox=false"></i>
                <div class="modal-content options-content">
                    <h4 class="options-title">NO. {{resultMsgData.detailId}} 短信 {{resultMsgData.name}}</h4>
                    <div class="options-text">{{resultMsgData.message}}</div>
                </div>
                <div class="modal-bottom">
                    <div class="btn-content">
                        <!-- <a class="btn red">复制</a> -->
                        <a class="btn white" @click="resultMsgBox=false">关闭</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 律师函弹窗 -->
        <div v-show="resultEmailBox" class="layer">
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
                        <a class="btn white" @click="resultEmailBox=false">关闭</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../../style/letter.css';
import validate from '../../validate'
import VerifyInputCode from 'verify-input-code'
import moment from 'moment'
export default {
    components: {
        VerifyInputCode
    },
    data() {
        return {
            title: true,
            pageNo: 0,
            codeBox: false,
            codeType: 'email',
            code: [],
            codeString: "",
            input: "",
            searchKeyWord: '',
            searchNubmer: 6,
            verifyNubmer: 6,
            hiedenWarn: false,
            hiedenVerify: false,
            pageSize: 1,
            searchKeyEmail: '',
            searchKeyMobile: '',
            viewsLetterData: {},
            resultMsgBox: false,
            resultMsgData: {},
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
        getCount(type, item) {
            let params = {
                type: type
            };
            let user = sessionStorage.getItem('user');
            if (user) {
                this.$http.ajaxPost({
                    url: 'order/getTimes', //搜索type为1，验证为2
                    params: params,
                }, (res) => {
                    this.$http.aop(res, () => {
                        // console.log(type, item);
                        if (res.body.data.remainTimes > 1) {
                            if (type === 1) {
                                this.searchBtn();
                            } else if (type === 2) {
                                this.viewsLetter(item);
                                this.verifyNubmer = res.body.data.remainTimes;
                            }
                        } else {
                            this.hiedenWarn = true;
                            this.title = true;
                            this.$parent.searchKeyWord = '';
                            this.getLetterLast();
                        }
                    });
                });
            } else {
                this.$parent.loginShow();
            }

        },
        searchBtn() {
            if (this.searchKeyWord === '') {
                this.$message({
                    message: '请输入要查询的身份证或函件',
                    type: 'warning'
                });
                return;
            }
            if (this.searchNubmer < 1) {
                this.hiedenWarn = true;
                return;
            }
            this.getLetterList();

        },
        viewsLetter(obj) {
            if (obj.orderType === 10) {
                this.codeType = 'msg';
            } else {
                this.codeType = 'email';
            }
            this.codeString = '';
            this.viewsLetterData = obj;
            this.codeBox = true;
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
                this.codeBox = false;
                this.$http.aop(res, () => {
                     
                    if (this.codeType == 'msg') {
                        this.resultMsgData = res.body.data;
                        this.resultMsgData.detailId = opts.detailId;
                        this.resultMsgBox = true;
                        this.searchKeyMobile = '';
                    } else {
                        this.resultEmailBox = true;
                        this.resultEmailData = res.body.data;
                        this.searchKeyEmail = '';
                    }
                    this.$refs.verifyInputCode.initInput();
                });
            });
        },
        getLetterList() {
            this.pageNo = 0;
            let params = {
                pageNo: this.pageNo,
                pageSize: 100
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
                        this.searchKeyWord = '';
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
            let _this = this;
            this.pageNo++;
            let params = {
                pageNo: this.pageNo,
                pageSize: 10
            };
            this.$http.ajaxPost({
                url: 'order/lastQuery',
                params: params,
            }, (res) => {
                this.$http.aop(res, () => {
                    let dataStr = res.body.data.orderBaseList || [];
                    dataStr.forEach(function(itme) {
                        _this.letterList.push(itme);
                    });

                    this.more = res.body.data.more;
                });
            });
        },
        getLetterLast() {
            this.pageNo = 0;
            let params = {
                pageNo: this.pageNo,
                pageSize: 10
            };
            this.$http.ajaxPost({
                url: 'order/lastQuery',
                params: params,
            }, (res) => {
                this.$http.aop(res, () => {
                    try {
                        this.letterList = res.body.data.orderBaseList || [];
                        this.more = res.body.data.more;
                    } catch (e) {
                        this.$message({
                            message: '请求有误，请稍后再试',
                            type: 'warning'
                        });
                        return;
                    }
                    this.title = true;
                });
            });
        }
    },
    mounted() {
        //console.log(this.$parent.login());
        if (this.$parent.searchKeyWord) {
            this.searchKeyWord = this.$parent.searchKeyWord;
            this.getCount(1, {});
        } else {
            this.getLetterLast();
            this.title = true;
        }

    }
}
</script>