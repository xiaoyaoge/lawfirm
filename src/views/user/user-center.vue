<template>
    <section>
        <div class="bk-panel bk-demo">
            <div class="bk-panel-header" role="tab">
                <div class="bk-panel-info fl">
                    <div class="panel-title">管理办公人员</div>
                    <div class="panel-subtitle"></div>
                </div>
                <div class="bk-panel-action fr">
                    <button id="addUser" class="bk-button bk-primary bk-button-small" @click="handleAdd" title="新增">新增</button>
                </div>
            </div>
            <div class="bk-panel-body" v-loading="listLoading">
                <table class="bk-table">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>电话</th>
                            <th style="width:20%;">日期</th>
                            <th style="width:270px;">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in dataList"> 
                            <td>{{item.name}}</td>
                            <td>{{item.mobile}}</td>
                             <td>{{dateTime(item.modifyTime)}}</td>
                            <td>
                                <a class="bk-icon-button bk-warning bk-button-mini" title="修改" @click="handleEdit(index, item)">
                                    <i class="bk-icon icon-edit bk-icon"></i>
                                    <i class="bk-text">修改</i>
                                </a>
                                <a class="bk-icon-button bk-danger bk-button-mini" title="关闭" @click="handleDel(index,item)">
                                    <i class="bk-icon icon-close bk-icon"></i>
                                    <i class="bk-text">删除</i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--列表-->
                <!--工具条-->
                <el-col :span="24" class="toolbar mt20">
                    <div class="bk-panel-footer p10">
                        <el-pagination v-show="total>10" layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
                        </el-pagination>
                    </div>
                </el-col>
            </div>
        </div>
        <!--编辑界面-->
        <el-dialog title="编辑管理人员" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <div style="width: 90%; margin: 0 auto;">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="editForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="editForm.mobile" :maxlength="11" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="editForm.password" :maxlength="16" placeholder="............................" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="orderType" class="type-class">
                        <el-radio-group v-model="orderType">
                            <el-radio-button label="超级管理员"></el-radio-button>
                            <el-radio-button label="普通管理员"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </el-form>
            <div class="dialog-btns">
                <a class="bk-button bk-primary mr10" @click="editSubmit" title="保存">保存</a>
                <a class="bk-button bk-default" @click="editFormVisible = false" title="取消">取消</a>
            </div>
        </el-dialog>
        <!--新增界面-->
        <el-dialog title="新增管理人员" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <div style="width: 90%; margin: 0 auto;">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="addForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="addForm.mobile" :maxlength="11" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="addForm.password" :maxlength="16" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="orderType" class="type-class">
                        <el-radio-group v-model="orderType">
                            <el-radio-button label="超级管理员"></el-radio-button>
                            <el-radio-button label="普通管理员"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </el-form>
            <div class="modal-footer ta-c">
                <a class="bk-button bk-default" @click="addFormVisible = false" title="取消">取消</a>
                <a class="bk-button bk-primary" @click="addSubmit" title="添加">添加</a>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import moment from 'moment'
import md5 from 'js-md5'
export default {
    data() {
        return {
            filters: {
                users: '',
            },
            user: {},
            dataList: [],
            total: 0,
            pageSize: 10,
            pageNum: 1,
            listLoading: false,
            sels: [], //列表选中列 
            editFormVisible: false, //编辑界面是否显示 
            editFormRules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                mobile: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    pattern: /^\d{11}$/,
                    message: '请输入正确的手机号码',
                    trigger: 'blur'
                }],
                password: [{
                    type: 'string',
                    pattern: /^\w{6,16}$/,
                    message: '请输入6~16密码',
                    trigger: 'blur'
                }]
            },
            //编辑界面数据
            editForm: {
                uid: 0,
                name: '',
                mobile: '',
                password: '',
                role: 0
            },
            addFormVisible: false, //新增界面是否显示 
            addFormRules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                mobile: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    pattern: /^\d{11}$/,
                    message: '请输入正确的手机号码',
                    trigger: 'blur,change'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    pattern: /^\w{6,16}$/,
                    message: '请输入6~16密码',
                    trigger: 'blur,change'
                }]
            },
            orderType: '超级管理员',
            addForm: { //新增界面数据 
                name: '',
                mobile: '',
                password: '',
                role: 1
            }

        }
    },
    methods: { 
        dateTime(val) {
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        },
        mobileView(val) {
            //return val;
            return val.replace(/\B(?=(?:\d{4})+$)/g, '-');
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getDataList();
        },
        getUs(fun) {
            // this.user = JSON.parse(sessionStorage.getItem('user'));
            // this.filters.users = (this.user.role && this.user.role === 99) ? '最高权限' : '面签员';
            // fun && fun();
        },
        //获取用户列表
        getDataList() {
            let params = {};
            if (this.user) {
                params = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum
                }
            }
            this.listLoading = true;
            this.$http.ajaxPost({
                url: 'admin/query',
                params: params
            }, (res) => {
                this.$http.aop(res, () => {
                    this.total = res.body.data.total;
                    this.dataList = res.body.data.managerInfos;
                    this.listLoading = false;
                });
            });
        },
        //删除
        handleDel: function(index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                let para = {
                    mid: row.mid
                };
                this.$http.ajaxPost({
                    url: 'admin/delete',
                    params: para
                }, (res) => {
                    this.$http.aop(res, () => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getDataList();
                    });
                });

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //显示编辑界面
        handleEdit: function(index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
            delete(this.editForm['modifyDate']);
        },
        //显示新增界面
        handleAdd: function() {
            this.addFormVisible = true;
            this.orderType = '超级管理员'
            this.addForm = {
                name: '',
                mobile: '',
                password: '',
                role: 1
            };
        },
        //编辑
        editSubmit: function() {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认要修改当前帐号吗？', '提示', {}).then(() => {
                        this.editForm.password = md5(this.editForm.password);
                        let para = Object.assign({}, this.editForm);
                        para.role = ((this.orderType === '超级管理员') ? 99 : 1);
                        this.$http.ajaxPost({
                            url: 'admin/modify',
                            params: para
                        }, (res) => {
                            this.$http.aop(res, () => {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.pageNum = 1;
                                this.getDataList();
                            })
                        });
                        this.editFormVisible = false;
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            });
        },
        //新增
        addSubmit: function() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addForm.password = md5(this.addForm.password);
                        let para = Object.assign({}, this.addForm);
                        para.role = ((this.orderType === '超级管理员') ? 99 : 1);
                        this.$http.ajaxPost({
                            url: 'admin/create',
                            params: para
                        }, (res) => {
                            this.$http.aop(res, () => {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.pageNum = 1;
                                this.getDataList();
                            });

                        });
                        this.addFormVisible = false;
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
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