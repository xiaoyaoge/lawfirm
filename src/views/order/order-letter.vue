<template>
    <section>
        <div class="bk-panel mb20">
            <div class="bk-panel-body p25">
                <form class="bk-form" :model="form" @submit="onSubmit">
                    <div class="row">
                        <!-- 交互说明: 选中条件后给A标签添加类 on -->
                        <div id="time" class="col-md-12 col-lg-12 col-xs-12 mb10">
                            <label class="bk-label pr15" style="width:100px;">提交时间：</label>
                            <el-radio-group v-model="topTime" class="rows">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="最近一小时"></el-radio-button>
                                <el-radio-button label="最近一天"></el-radio-button>
                            </el-radio-group>
                        </div>
                        <div id="status" class="col-md-12 col-lg-12 col-xs-12 mb10">
                            <label class="bk-label pr15" style="width:100px;">当前状态：</label>
                            <el-radio-group v-model="orderStateSelect">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="申请中"></el-radio-button>
                                <el-radio-button label="成功"></el-radio-button>
                                <el-radio-button label="失败"></el-radio-button>
                            </el-radio-group>
                        </div>
                        <div id="ferOwen" class="col-md-12 col-lg-12 col-xs-12">
                            <label class="bk-label pr15" style="width:100px;">订单来源：</label>
                            <el-radio-group v-model="orderSource">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="企业"></el-radio-button>
                                <el-radio-button label="用户"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="row more-query-cont mt15">
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">订单号：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.orderId" class="bk-form-input" placeholder="请输入订单号" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">联系电话：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.telephone" class="bk-form-input" placeholder="请输入联系电话" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">企业名称：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.ename" class="bk-form-input" placeholder="请输入企业名称" style="width:100%;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xs-12">
                            <div class="bk-form-content" style="margin-left:100px;">
                                <button class="bk-button bk-success">查询</button>
                                <!-- 交互说明 ：收起时更改文案为 展开更多查询条件，同时隐藏 more-query-cont -->
                                <!-- <a @click="previewInfo()"></a> -->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- 主要表格 -->
        <div class="bk-panel bk-demo">
            <div class="bk-panel-header" role="tab">
                <div class="bk-panel-info fl">
                    <div class="panel-title">所有订单</div>
                    <!-- <div class="panel-subtitle">(最高权限)</div> -->
                </div>
                <div class="bk-panel-action fr none">
                    <div class="bk-form bk-inline-form bk-form-small">
                        <div class="bk-form-item is-required">
                            <div class="bk-form-content">
                                <input type="text" class="bk-form-input" placeholder="请输入搜索关键字" style="width:290px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bk-panel-body p0" v-loading="listLoading">
                <form>
                    <table class="bk-table has-thead-bordered">
                        <thead>
                            <tr>
                                <th>订单号</th>
                                <th>来源名称</th>
                                <th>联系电话</th>
                                <th>律所</th>
                                <th>当前状态<span class="txt-info">（成功/失败/总）</span></th>
                                <th>提交时间</th>
                                <th style="width:165px">操作</th>
                            </tr>
                        </thead>
                        <tbody v-if="table.dataList.length>0" >
                            <tr v-for="(item,index) in table.dataList">
                                <td>{{item.orderId}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.telephone}}</td>
                                <td>{{item.lawFirmName}}</td>
                                <td>
                                    <el-popover v-if="item.orderState===20"
                                        placement="left"
                                        title="失败原因："
                                        width="200"
                                        trigger="hover">
                                        <span class="fb bk-text-danger" v-html="item.failReason||'未知错误'"></span>
                                       <span slot="reference" v-html="templateStute(item)"></span>
                                    </el-popover>
                                    <div v-else v-html="templateStute(item)">
                                    </div>
                                </td>
                                <td>{{dateTime(item.createTime)}}</td>
                                <td>
                                    <a @click="previewInfo(item)" class="bk-text-button">查看详情</a>
                                    <template v-if="item.orderState===100">
                                        <span>正在打包上传中，请耐心等待5~10分钟</span>
                                    </template>
                                    <template v-if="item.orderState===350">
                                        <a v-if="item.packageUrl" class="bk-text-button" :href="item.packageUrl">打包下载</a>
                                        <a v-if="item.orderState===100" class="bk-text-button ml10" @click="orderCancel(item.orderId)">取消</a>
                                    </template>
                                </td>
                            </tr> 
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="7" align="center">没有数据</td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div class="bk-panel-footer p10">
                    <button v-show="false" class="bk-button bk-default bk-button-small fl" title="下载搜索结果">
                        下载搜索结果
                    </button>
                    <el-pagination v-show="table.total>10" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="table.pageSize" :total="table.total" style="float:right;">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog title="订单详情" v-model="previewVisible" :close-on-click-modal="false">
            <div class="modal-body ffs-modal" v-loading="infoLoading">
                <div v-if="deDetailShow" class="info">
                    <div class="cont">
                        <h5>下单信息</h5>
                        <form class="bk-form" id="validate_form" method="POST" action="javascript:;">
                            <div class="bk-form-item">
                                <label class="bk-label">订单类型：</label>
                                <div class="bk-form-content">
                                    {{templateType(orderInfo.orderType)}}
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">订单来源：</label>
                                <div class="bk-form-content">
                                    {{orderInfo.name}}
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">订单单号：</label>
                                <div class="bk-form-content">
                                    {{orderInfo.orderId}}
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">下单时间：</label>
                                <div class="bk-form-content">
                                    {{dateTimes(orderInfo.createTime)}}
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">联系电话：</label>
                                <div class="bk-form-content">
                                    {{orderInfo.telephone}}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="cont">
                        <h5>业务信息</h5>
                        <form class="bk-form" id="validate_form" method="POST" action="javascript:;">
                            <div class="bk-form-item mt5">
                                <label class="bk-label">律所：</label>
                                <div class="bk-form-content">
                                    {{orderInfo.lawFirmName}}
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">模板：</label>
                                <div class="bk-form-content">
                                    <el-popover ref="popover1" placement="right" :title="orderDeliveryInfo.templateName" width="300" trigger="hover">
                                        <div class="el-row ">
                                            <span @click="dialogImage(orderDeliveryInfo.templateContent)" style="position: absolute; top:0;right: 0; width: 60px; height: 60px; margin-left:-30px; margin-top: -30px;  color:#8492a6; font-size: 50px;"><i class="el-icon-view"></i></span>
                                            <img style="width: 100%;" :src="orderDeliveryInfo.templateContent" title="邮件信息模版">
                                        </div>
                                    </el-popover>
                                    <div class="bk-text-button bk-info divInline ml0" v-popover:popover1>{{orderDeliveryInfo.templateName}}</div>
                                </div>
                            </div>
                            <!-- <div class="bk-form-item mt5">
                                <label class="bk-label">第三方：</label>
                                <div class="bk-form-content">
                                    {{orderInfo.name}}
                                </div>
                            </div> -->
                            <div class="bk-form-item mt5">
                                <label class="bk-label">状态：</label>
                                <div class="bk-form-content">
                                    <p class="mb0" v-html="templateStute(orderInfo)">
                                    </p>
                                </div>
                            </div> 
                            <div class="bk-form-item mt5">
                                <label class="bk-label">发送时间：</label>
                                <div class="bk-form-content">
                                    {{dateTimes(orderDeliveryInfo.sendTime)}}
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">是否电子签名：</label>
                                <div class="bk-form-content">
                                    <p class="mb0">
                                        {{ parseInt(orderDeliveryInfo.needSign)?'是':'否'}}
                                    </p>
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">是否同步发送短信：</label>
                                <div class="bk-form-content">
                                    <p class="mb0">
                                        {{ parseInt(orderDeliveryInfo.smsNotify)?'是':'否'}}
                                    </p>
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">发送明细：</label>
                                <div class="bk-form-content">
                                    <a id="toggle_cont" @click="searchBtn({orderId:orderInfo.orderId})" class="bk-text-button bk-info ml0" title="查看明细">查看明细</a>
                                </div>
                            </div>
                            <div class="bk-form-item mt5">
                                <label class="bk-label">查看号码包：</label>
                                <div class="bk-form-content">
                                    <a id="toggle_cont" :href="orderDeliveryInfo.attachmentUrl" class="bk-text-button bk-info ml0" title="查看号码包">查看号码包</a> <span class="bk-info">(点击下载)</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div v-else class="detail" style="display: block;">
                    <div class="cont-btns">
                        <a id="back_cont" @click="delieryInfo()" class="bk-button bk-default bk-button-small mb15 fl" title="返回"><span>返回</span></a>
                        <!-- <a class="bk-button bk-default bk-button-small mb15 fr" title="批量导入"><span>批量导入</span></a> -->
                    </div>
                    <div class="bk-panel bk-demo">
                        <div class="bk-panel-header" role="tab">
                            <div class="bk-panel-info fl">
                                <div class="panel-title">信函发送明细</div>
                            </div>
                            <div class="bk-panel-action fr">
                                <div class="bk-form bk-inline-form bk-form-small">
                                    <div class="bk-form-item is-required">
                                        <div class="bk-form-content">
                                            <input type="text" class="bk-form-input" v-model="keyword" placeholder="请输入手机号或姓名" style="width:150px;">
                                        </div>
                                    </div>
                                    <button class="bk-button bk-primary bk-button-small" @click="searchBtn({orderId:orderInfo.orderId})" title="查询">查询</button>
                                </div>
                            </div>
                        </div>
                        <div class="bk-panel-body">
                            <table class="bk-table">
                                <thead>
                                    <tr>
                                        <th>姓名</th>
                                        <th>邮件</th> 
                                        <th>发送状态</th>
                                        <th>查看下载协议</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in deDetailData.dataList">
                                        <td>{{item.name}}</td>
                                        <td>{{item.email}}</td>
                                        <td>
                                            <el-popover v-if="item.status===70"
                                                placement="left"
                                                title="失败原因："
                                                width="200"
                                                trigger="hover">
                                                <span class="fb bk-text-danger" v-html="item.failReason||'未知错误'"></span>
                                               <span slot="reference" v-html="deliveDetailStatus(item.status)"></span>
                                            </el-popover>
                                            <div v-else v-html="deliveDetailStatus(item.status)">
                                            </div>
                                        </td>
                                        </td>
                                        <td>
                                            <a class="bk-text-button" target="_blank" :href="item.letterUrl">电子协议</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="bk-panel-footer mt15">
                            <el-pagination v-show="deDetailData.total>10" layout="prev, pager, next" @current-change="handlePageChange" :page-size="deDetailData.pageSize" :total="deDetailData.total" style="float:right;">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer ta-c">
                <a class="bk-button bk-primary" @click="previewVisible=false" title="添加">关闭</a>
            </div>
        </el-dialog>
        <el-dialog v-model="dialogVisible" size="">
            <img width="100%" :src="dialogImageUrl" alt="large">
        </el-dialog>
    </section>
</template>
<script>
import moment from 'moment'
import validate from '../../validate';
export default {
    data() {
        return {
            topTime: '全部',
            orderStateSelect: '全部',
            orderSource: '全部',
            form: {
                orderId: '', //订单号
                telephone: '', //企业联系电话
                ename: '', //企业电话
                hours: '', //提交时间
                orderState: '', //当前状态
                orderType: 30, // msg:10,email:20,纸质:30
                userType: 1, //订单来源
            },
            collapsed: true,
            table: {
                dataList: [],
                total: 0,
                pageSize: 10,
                pageNum: 1
            },
            listLoading: false,
            previewVisible: false,
            orderDeliveryInfo: {},
            orderInfo: {},
            deDetailShow: true,
            deDetailData: {
                dataList: [],
                total: 0,
                pageSize: 10,
                pageNum: 1
            },
            infoLoading: false,
            keyword: '',
            search: {
                orderId: '',
                name: '',
                mobile: ''
            },
            dialogVisible: false,
            dialogImageUrl: ''
        }
    },
    methods: {
        dialogImage(val) {
            this.dialogImageUrl = val;
            this.dialogVisible = true;
        },
        dateTime(val) {
            let minute = moment(val).startOf('minute').fromNow();
            return (minute.indexOf('分钟') > -1 || minute.indexOf('秒') > -1) ? moment(val).startOf('minute').fromNow() : moment(val).format('YYYY-MM-DD HH:mm:ss');
        },
        dateTimes(val) {
            return moment(val).format('YYYY年MM月DD日 HH:mm:ss');
        },
        orderState(val) {
            switch (val) {
                case '全部':
                    return '';
                case '生成失败':
                    return '20';
                case '申请中':
                    return '100';
                case '生成成功':
                    return '350';
                default:
                    return '未知状态';
            }
        },
        querySource(val) {
            switch (val) {
                case '全部':
                    return '';
                case '企业':
                    return '1';
                case '用户':
                    return '2';
                default:
                    return '';
            }
        },
        sourceText(val) {
            switch (val) {
                case '':
                    return '全部';
                case 1:
                    return '企业';
                case 2:
                    return '用户';
                default:
                    return '';
            }
        },
        queryTime(val) {
            switch (val) {
                case '全部':
                    return '';
                case '最近一小时':
                    return '1';
                case '最近一天':
                    return '24';
                default:
                    return '';
            }
        },
        templateType(val) {
            switch (val) {
                case 10:
                    return '短信';
                case 20:
                    return '电子信函';
                case 30:
                    return '纸质信函';
                default:
                    return '';
            }
        },
        templateStute(opts) {
            switch (opts.orderState) {
                case 100:
                    return '<span class="fb bk-text-info ml0">申请中</span>';
                case 350:
                     return '<span class="fb bk-text-success ml0 ">成功</span>（' + opts.succNum + ' / <i class="fb bk-text-danger">'+ opts.failNum +'</i> / ' + opts.totalNum + '）';
                case 20:
                    return '<span class="fb bk-text-danger ml0 ">失败  <i class="el-icon-warning" style="color:#D3DCE6;"> </i></span>';
                case 21:
                    return '<span class="fb bk-text-info ml0">订单已取消</span>（' + opts.succNum + ' / <i class="fb bk-text-danger">'+ opts.failNum +'</i> / ' + opts.totalNum + '）';
                default:
                    return '<span class="fb bk-text-info ml0">出现异常</span>';
            }
        },
        deliveDetailStatus(val) {
            switch (val) {
                case 0:
                    return '<span class="fb bk-text-info">未开始</span>';
                case 50:
                    return '<span class="fb bk-text-info">处理中</span>';
                case 60:
                    return '<span class="fb bk-text-info">已发出</span>';
                case 70:
                    return '<span class="fb bk-text-danger">失败  <i class="el-icon-warning" style="color:#D3DCE6;"> </i></span>';
                case 80:
                    return '<span class="fb bk-text-success">成功</span>';
                default:
                    return '';
            }
        },
        mobileView(val) {
            //return val;
            return val.replace(/\B(?=(?:\d{4})+$)/g, '-');
        },
        handleCurrentChange(val) {
            this.table.pageNum = val;
            this.getDataList();
        },
        getDataList() {
            let params = {};
            params = {
                pageSize: this.table.pageSize,
                pageNum: this.table.pageNum,
                orderId: this.form.orderId,
                telephone: this.form.telephone,
                ename: this.form.ename,
                userType: this.querySource(this.orderSource),
                hours: this.queryTime(this.topTime),
                orderState: this.orderState(this.orderStateSelect),
                orderType: this.form.orderType
            }
            this.listLoading = true;
            this.$http.ajaxPost({
                url: 'order/query',
                params: params
            }, (res) => {
                this.$http.aop(res, () => {
                    this.table.total = res.body.data.total;
                    this.table.dataList = res.body.data.orderInfoList||[];
                    this.listLoading = false;
                });
            });
        },
        onSubmit() {
            this.getDataList();
            // console.log('submit!', this.form);
        },
        handleChange(value) {
            //console.log(value)
        },
        previewInfo(opts) {
            this.deDetailShow = true;
            let params = {};
            params = {
                orderId: opts.orderId,
            }
            this.infoLoading = true;
            this.$http.ajaxPost({
                url: 'order/getInfo',
                params: params
            }, (res) => {
                this.$http.aop(res, () => {
                    this.orderDeliveryInfo = res.body.data.orderDeliveryInfo || {
                        createTime: '',
                        lawFirmName: '',
                        name: '',
                        orderId: '',
                        orderState: '',
                        orderType: 30,
                        sendNum: '',
                        status: '',
                        succNum: '',
                        telephone: '',
                        userType: ''
                    };
                    this.orderInfo = res.body.data.orderInfo || {
                        templateId: '',
                        templateName: '',
                        sendTime: '',
                        smsList: null
                    };
                    this.previewVisible = true;
                    this.infoLoading = false;
                });
            });
            this.listLoading = false;
        },
        deliveryDetail() {
            this.infoLoading = true;
            let params = {
                mobile: this.search.mobile,
                name: this.search.name,
                orderId: this.search.orderId,
                pageNum: this.deDetailData.pageNum,
                pageSize: this.deDetailData.pageSize
            };
            this.$http.ajaxPost({
                url: 'deliveryDetail/query',
                params: params
            }, (res) => {
                this.$http.aop(res, () => {
                    this.deDetailShow = false;
                    this.deDetailData.total = res.body.data.total;
                    this.deDetailData.dataList = res.body.data.deliveryDetails;
                    this.infoLoading = false;
                });

            });
        },
        handlePageChange(val) {
            this.deDetailData.pageNum = val;
            this.deliveryDetail();
        },
        searchBtn(obj) {
            this.search.orderId = obj.orderId;
            if (validate.checkPhoneNum(this.keyword)) {
                this.search.mobile = this.keyword;
                this.search.name = '';
            } else {
                this.search.name = this.keyword;
                this.search.mobile = '';
            }
            this.deliveryDetail();
        },
        delieryInfo() {
            this.deDetailShow = true;
        },
        orderCancel: function(id){
            let reqParam = {};
            reqParam = {
                orderId: id
            };
            this.$confirm('确定要取消当前订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                this.$http.ajaxPost({
                    url: 'order/cancel',
                    params: reqParam
                }, (res) => {
                    this.$http.aop(res, () => { 
                        this.$message({
                            type: 'success',
                            message: '取消成功'
                        });
                        this.getDataList(); 
                        this.listLoading = false;
                    });

                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '  操作已取消'
                });
            });
        }
    },
    mounted() {
        this.getDataList();
    }
}
</script>
<style scoped>
</style>