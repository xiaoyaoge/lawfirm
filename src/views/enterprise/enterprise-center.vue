<template>
    <section>
        <div class="bk-panel mb20">
            <div class="bk-panel-body p25">
                <form class="bk-form" :model="form" @submit="onSubmit">
                    <div class="row">
                        <!-- 交互说明: 选中条件后给A标签添加类 on -->
                        <div id="time" class="col-md-12 col-lg-12 col-xs-12 mb15">
                            <label class="bk-label pr15" style="width:100px;">入驻时间：</label>
                            <el-radio-group v-model="topTime" class="rows">
                                <el-radio-button label="最近一年"></el-radio-button>
                                <el-radio-button label="最近半年"></el-radio-button>
                                <el-radio-button label="最近一个月"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="row more-query-cont mb15">
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">企业名称：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.ename" class="bk-form-input" placeholder="请输入企业名称" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-lg-4 col-xs-4">
                            <div class="bk-form-item mb20">
                                <label class="bk-label pr15" style="width:100px;">联系电话：</label>
                                <div class="bk-form-content" style="margin-left:100px;">
                                    <input type="text" v-model="form.telephone" class="bk-form-input" placeholder="请输入手机号码" style="width:100%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12 col-xs-12">
                            <div class="bk-form-content" style="margin-left:100px;">
                                <button class="bk-button bk-success">查询</button>
                                <!-- 交互说明 ：收起时更改文案为 展开更多查询条件，同时隐藏 more-query-cont -->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- 主要表格 -->
        <div class="bk-panel bk-demo" v-loading="listLoading">
            <div class="bk-panel-header" role="tab">
                <div class="bk-panel-info fl">
                    <div class="panel-title">企业管理</div>
                    <!-- <div class="panel-subtitle">(最高权限)</div> -->
                </div>
                <div class="bk-panel-action fr">
                    <div class="bk-form bk-inline-form bk-form-small">
                        <div class="bk-form-item is-required">
                            <div class="bk-form-content">
                                <button class="bk-button bk-primary bk-button-small" @click="$router.push('/enterprise/enterForm')" title="入驻新企业">入驻新企业</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bk-panel-body p0">
                <form>
                    <table class="bk-table has-thead-bordered">
                        <thead>
                            <tr>
                                <th>企业号</th>
                                <th>联系电话</th>
                                <th>入驻时间</th>
                                <th style="width:325px">操作</th>
                            </tr>
                        </thead>
                        <tbody v-if="table.dataList.length>0">
                            <tr v-for="(item,index) in table.dataList">
                                <td>{{item.ename}}</td>
                                <td>{{item.telephone}}</td>
                                <td>{{dateTime(item.createTime)}}</td>
                                <td>
                                    <router-link :to="{path:'/enterprise/enterInfo/'+item.eid}" class="bk-text-button" title="基本信息">
                                        基本信息
                                    </router-link>
                                    <router-link :to="{path:'/enterprise/enterMsg/'+item.eid}" class="bk-text-button" title="短信订单"> 
                                        短信订单
                                    </router-link>
                                    <router-link :to="{path:'/enterprise/enterEmail/'+item.eid}" class="bk-text-button" title="电子信函">
                                        电子信函
                                    </router-link>
                                    <router-link :to="{path:'/enterprise/enterLetter/'+item.eid}" class="bk-text-button" title="信函下载">
                                        信函下载
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="4" align="center">没数据</td>
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
    </section>
</template>
<script>
import {
    regionDataPlus,
    CodeToText,
    TextToCode
} from '../../area'
import moment from 'moment'
export default {
    data() {
        return {
            urlPath:{
                pathsec:'',
                pathsec:''
            },
            topTime: '最近一年',
            form: {
                ename: '', //身份证
                telephone: '', //手机号  

            },
            table: {
                dataList: [],
                total: 0,
                pageSize: 10,
                pageNum: 1
            },
            listLoading: false,
        }
    },
    methods: {
        dateTime(val) {
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        },
        queryCreateTime(val) {
            switch (val) {
                case '最近一年':
                    return 1;
                case '最近半年时':
                    return 2;
                case '最近一个月':
                    return 2;
                default:
                    return '';
            }
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
                ename: this.form.ename, //企业名称
                telephone: this.form.telephone //手机号   
            }
            this.listLoading = true;
            this.$http.ajaxPost({
                url: 'enterprise/query',
                params: params
            }, (res) => {
                this.$http.aop(res, () => {
                    this.table.total = res.body.data.total;
                    this.table.dataList = res.body.data.enterpriseInfoList||[];
                    this.listLoading = false;
                });
            });
        },
        onSubmit() {
            this.getDataList(); 
        }
    },
    mounted() {
        this.getDataList();
    }
}
</script>