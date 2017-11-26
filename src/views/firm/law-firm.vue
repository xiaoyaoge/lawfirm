<template>
    <section>
        <div class="info" v-loading="listLoading">
            <div class="cont">
                <div class="b-manage-title">
                    <h5 class="fl">短信模板</h5>
                    <div class="edit-btns b-manage-btns fr">
                        <!-- 交互说明 
                             点击修改后，把保存于取消按钮显示出来，同时把info里所有input 的 readonly 去除
                        -->
                        <a class="bk-button bk-success bk-button-small ml10 fr" @click="create('msg')" title="添加"><span>添加</span></a>
                    </div>
                </div>
                <table class="bk-table has-table-bordered has-table-hover">
                    <thead>
                        <tr>
                            <th>模板名称</th>
                            <th>是否有效</th>
                            <th>短信运营商</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="items in dataList">
                            <td>{{items.templateName}}</td>
                            <td>
                                <select v-model="items.status" class="table-select" @change="changeMsgStatus(items,'1')">
                                    <option value="0">未生效</option>
                                    <option value="1">生效</option>
                                    <option value="2">删除</option>
                                </select>
                            </td>
                            <td>{{nameStr(items.smsProviderList)}}</td>
                            <td>{{dateTime(items.smsProviderList)}}</td>
                            <td>
                                <a @click="preview(items,'msg','info')" class="bk-text-button">查看详情</a>
                                <a @click="preview(items,'msg','edit')" class="bk-text-button">编辑</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="cont">
                <div class="b-manage-title">
                    <h5 class="fl">信函模板</h5>
                    <div class="edit-btns b-manage-btns fr">
                        <!-- 交互说明 
                             点击修改后，把保存于取消按钮显示出来，同时把info里所有input 的 readonly 去除
                        -->
                        <a class="bk-button bk-success bk-button-small ml10 fr" @click="create('email')" title="添加"><span>添加</span></a>
                    </div>
                </div>
                <table class="bk-table has-table-bordered has-table-hover">
                    <thead>
                        <tr>
                            <th>模板名称</th>
                            <th>是否有效</th>
                            <th>短信运营商</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in emailList">
                            <td>{{item.templateName}}</td>
                            <td>
                                <select v-model="item.status" class="table-select" @change="changeMsgStatus(item,'2')">
                                    <option value="0">未生效</option>
                                    <option value="1">生效</option>
                                    <option value="2">删除</option>
                                </select>
                            </td>
                            <td>{{nameStr(item.smsProviderList)}}</td>
                            <td>{{dateTime(item.modifyTime)}}</td>
                            <td>
                                <a @click="preview(item,'email','info')" class="bk-text-button">查看详情</a>
                                <a @click="preview(item,'email','edit')" class="bk-text-button">编辑</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <el-dialog :title="(previewSize=='msg'?'短信模板':'信函模板')" v-model="previewVisible" :close-on-click-modal="false">
            <div class="temp ffs-modal">
                <h5>模板明细</h5>
                <div class="cont" style=" margin: 0 auto;">
                    <p>{{msgForm.templateName}}</p>
                </div>
                <div v-if="previewSize=='msg'" class="cont" style=" margin: 0 auto;">
                    <p>{{msgForm.templateContent}} </p>
                </div>
                <div v-else>
                    <h5>短信通知内容</h5>
                    <div class="cont" style=" margin: 0 auto;">
                        {{msgForm.smsNotice}}
                    </div>
                    <h5>邮件内容</h5>
                    <img style="width: 100%;" :src="msgForm.templateContent">
                </div>
            </div>
            <div class="modal-footer ta-c">
                <a class="bk-button bk-primary" @click="previewVisible = false" title="关闭">关闭</a>
            </div>
        </el-dialog>
        <el-dialog :title="fromTitle" v-model="formVisible" :close-on-click-modal="false">
            <div class="temp ffs-modal">
                <el-form class="bk-form pb15" ref="form" label-width="120px">
                    <div class="bk-form-item mt5">
                        <label class="bk-label w120 pr20"><span class="red">*</span>模版名称：</label>
                        <div class="bk-form-content" style="margin-left: 120px">
                            <input type="text" class="bk-form-input" placeholder="输入模版名字" v-model="msgForm.templateName" maxlength="10">
                        </div>
                    </div>
                    <div class="bk-form-item mt15">
                        <label class="bk-label w120 pr20"><span class="red">*</span>内容：</label>
                        <div class="bk-form-content" style="margin-left: 120px">
                            <el-upload v-if="formType==='email'" class="upload-demo" :action="uploadPolicy.host" :multiple="uploadConfig.multiple" :data="uploadConfig.data" :on-success="uploadSuccess" :on-change="uploadChange" :on-error="uploadError" :on-remove="uploadRemove" :accept="uploadConfig.accept" :file-list="fileList" :on-preview="uploadPictureCardPreview" :before-upload="beforeUpload">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <span slot="tip" class="el-upload__tip ml15">只能上传png,gif,jpeg,webp文件，且不超过5mb</span>
                            </el-upload>
                            <textarea v-else v-model="msgForm.templateContent" row="5" class="bk-form-textarea h200" placeholder="输入短信模版内容"></textarea>
                        </div>
                    </div>
                    <div class="bk-form-item mt15">
                        <label class="bk-label w120 pr20"><span class="red">*</span>状态：</label>
                        <div class="bk-form-content" style="margin-left: 120px">
                            <el-select v-model="msgForm.status" placeholder="请选择">
                                <el-option label="未生效" :value="0"></el-option>
                                <el-option label="生效" :value="1"></el-option>
                                <!-- <el-option label="删除" :value="2"></el-option> -->
                            </el-select>
                        </div>
                    </div>
                    <div v-if="formType==='email'" class="bk-form-item mt15">
                        <label class="bk-label w120 pr20"><span class="red">*</span>邮件H5文件：</label>
                        <div class="bk-form-content" style="margin-left: 120px">
                            <input type="text" class="bk-form-input" placeholder="输入邮件H5文件名" v-model="msgForm.serverH5File">
                        </div>
                    </div>
                    <div v-if="formType==='email'" class="bk-form-item mt15">
                        <label class="bk-label w120 pr20"><span class="red">*</span>模版H5文件：</label>
                        <div class="bk-form-content" style="margin-left: 120px">
                            <input type="text" class="bk-form-input" placeholder="输入模版H5文件名" v-model="msgForm.serverHtmlFile">
                        </div>
                    </div> 
                    <div v-if="formType==='email'" class="bk-form-item mt15">
                        <label class="bk-label w120 pr20"><span class="red">*</span>模版css文件：</label>
                        <div class="bk-form-content" style="margin-left: 120px">
                            <input type="text" class="bk-form-input" placeholder="输入模版css文件名" v-model="msgForm.serverCssFile">
                        </div>
                    </div>
                    <div v-if="formType==='email'" class="bk-form-item mt15">
                        <label class="bk-label w120 pr20">通知短信：</label>
                        <div class="bk-form-content" style="margin-left: 120px">
                            <textarea v-model="msgForm.smsNotice" row="5" class="bk-form-textarea h80" placeholder="输入通知短信内容"></textarea>
                        </div>
                    </div>
                    <div class="bk-form-item row mt15" style="margin-left:0; margin-right:0; ">
                         <label class="bk-label w120 pr20">短信运营商：</label>
                         <div class="bk-form-content" style="margin-left: 120px">
                            <el-checkbox-group v-model="smsProviderList" size='mini' style="margin-top:6px;" >
                                <el-checkbox v-for="itme in getlist" :label="itme.providerId" :key="itme.providerId">{{itme.providerName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="bk-form-item mt15">
                        <label class="bk-label w120 pr20">提示：</label>
                        <div class="bk-form-content" style="margin-left: 120px">
                            <span class="bk-text info">短信模板内容支持的变量，如下：<br/>1、接收人：${receiver_name}<br/>
                            2、逾期天数：${overdue_days}<br/>
                            3、联系电话：${contact_mobile}<br/>
                            4、公司简称：${platform_short_name} 
                            </span>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="modal-footer ta-c">
                <a class="bk-button bk-default" @click="formVisible = false" title="取消">取消</a>
                <a v-if="formPot=='add'" class="bk-button bk-primary" @click="severForm('add')" title="保存">保存</a>
                <a v-else class="bk-button bk-primary" @click="severForm('edit')" title="保存">保存</a>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import moment from 'moment'
import md5 from 'js-md5'
import validate from '../../validate' 
export default {
    data() {
        return {
            listLoading: false,
            previewVisible: false,
            previewSize: 'msg',
            formVisible: false,
            formType: 'msg',
            dataList: [],
            emailList: [],
            fromTitle: '新建模版',
            msgForm: {
                lawFirmId: 1,
                status: 0,
                templateContent: '',
                templateId: 0,
                templateName: '',
                templateType: 0,
                smsNotice: '',
                serverCssFile: '',
                serverHtmlFile: '',
                smsProviderList:[]
            },
            formPot: 'add',
            uploadPolicy: {
                host: '',
            },
            uploadConfig: {
                multiple: true,
                thread: 5,
                data: {},
                accept: 'image/png,image/gif,image/jpeg,image/webp'
            },
            fileList: [],
            getlist: [],
            smsProviderList:[]
        }
    },
    methods: {
        dateTime(val) {
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        },
        preview(opts, type, opt) {
            if (opt === 'edit') {
                this.editTemple(type, opts);
                this.formPot = opt;
            } else {
                this.previewVisible = true;
                this.previewSize = type;
                this.msgForm = opts;
            }


        },
        checkForm(data) { //验证担保人信息
            let isOk = true;
            let text = '';
            Object.keys(data).forEach((val) => {
                switch (val) {
                    case 'templateName':
                        if (data[val] === '') {
                            text = '模版名称不能为空';
                            isOk = false;
                        }
                        break;
                    case 'templateContent':
                        if (data.templateType == 1) {
                            if (data[val] === '') {
                                text = '模版内容不能为空';
                                isOk = false;
                            }
                        } else {
                            if (data[val] == '') {
                                text = '模版图片地址不能为空';
                            }
                            if (!validate.checkUrl(data[val])) {
                                text = '模版图片地址不正确';
                                isOk = false;
                            }

                        }
                        break;
                    case 'serverCssFile':
                        if (data.templateType !== 1) {
                            if (data[val] == '') {
                                text = '模版css地址不能为空';
                                isOk = false;
                            }
                            // if (!validate.checkUrl(data[val])) {
                            //     text = '模版css地址不正确';
                            //     isOk = false;
                            // }
                        }
                        break;
                    case 'serverHtmlFile':
                        if (data.templateType !== 1) {
                            if (data[val] == '') {
                                text = '模版H5地址不能为空';
                                isOk = false;
                            }
                            // if (!validate.checkUrl(data[val])) {
                            //     text = '模版H5地址不正确';
                            //     isOk = false;
                            // }
                        }
                        break;
                }
            });
            if (!isOk) {
                this.$message.error(text);
                return false;
            }
            return true;
        },
        severForm(type) {
            let params = {};
            let url = (type == 'add' ? 'template/create' : 'template/modify');
            this.msgForm.smsProviderList = this.smsProviderList;
            params = {
                templateInfo: this.msgForm
            } 
            if (this.checkForm(params.templateInfo)) {
                this.$confirm('确认要保存吗？', '提示', {}).then(() => {
                    this.$http.ajaxPost({
                        url: url,
                        params: params
                    }, (res) => {
                        this.$http.aop(res, () => {
                            this.$message({
                                message: (type == 'add' ? '创建成功' : '编辑成功'),
                                type: 'success'
                            });
                            this.formVisible = false;
                            this.gitData(this.msgForm.templateType);
                        });
                    });
                }).catch(() => {
                    this.gitData(this.msgForm.templateType);
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        changeMsgStatus(opts, type) {
            let params = {};
            params = {
                status: opts.status,
                templateId: opts.templateId
            }
            this.listLoading = true;
            this.$http.ajaxPost({
                url: 'template/modifyStatus',
                params: params
            }, (res) => {
                this.$http.aop(res, () => {
                    this.$message({
                        message: (opts.status == 2 ? '删除成功' : '修改成功'),
                        type: 'success'
                    });
                    this.listLoading = false;
                    this.gitData(type);
                });
            });
        },
        gitData(type) {
            let params = {};
            params = {
                lawFirmId: 1,
                templateType: type
            }
            this.listLoading = true;
            this.$http.ajaxPost({
                url: 'template/query',
                params: params
            }, (res) => {
                this.$http.aop(res, () => {
                    if (type == 1) {
                        this.dataList = res.body.data.templateInfoList; 
                    } else {
                        this.emailList = res.body.data.templateInfoList;
                    }

                    this.listLoading = false;
                });
            });

        },
        initUpload() {
            this.$http.post('upload/getAliyunPostPolicy', { dir: 'template' }).then((res) => {
                this.$http.aop(res, () => {
                    this.uploadPolicy = res.body.data || {};
                    this.uploadConfig.data.policy = this.uploadPolicy.policy;
                    this.uploadConfig.data.OSSAccessKeyId = this.uploadPolicy.accessid;
                    this.uploadConfig.data.signature = this.uploadPolicy.signature;
                });
            }, (res) => {
                this.$http.aop(res);
            });
        },
        editTemple(type, opts) {
            this.formType = type;
            this.fromTitle = '编辑模版';
            this.msgForm = opts;
            this.smsProviderList = opts.smsProviderList; 
            if (type !== 'msg') {
                this.initUpload();
                this.fileList = [{ name: this.msgForm.templateName, url: this.msgForm.templateContent }];

            }
            this.formVisible = true;
        },
        create(type) {
            this.fromTitle = '新建模版';
            this.formType = type;
            if (type !== 'msg') {
                this.fileList = [];
                this.initUpload();
            }
            this.formVisible = true;
            this.msgForm = {
                lawFirmId: 1,
                status: 0,
                templateContent: '',
                templateName: '',
                templateType: (type == 'msg' ? 1 : 2)
            };
            this.smsProviderList = [];

        },
        uploadSuccess(response, file, fileList) { //文件长传成功  
            let url = this.uploadPolicy.host + '/' + this.uploadConfig.data.key;
            this.msgForm.templateContent = url;
            console.log(this.msgForm.templateContent)
        },
        beforeUpload(file) {
            let key = this.uploadPolicy.dir + '/' + md5('' + Date.now + this.uploadPolicy.mid + Math.random());
            this.uploadConfig.data.key = key;
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.fileList = [];
                this.$message.error('上传图片大小不能超过 5MB!');
            }
            return isLt5M;
        },
        uploadPictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        uploadRemove(file, fileList) {
            if (fileList.length > 0) { this.fileList = fileList.slice(-1); }
        },
        uploadChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = fileList.slice(-1);
            } else {
                this.fileList = [];
            }

        },
        uploadError(file, fileList) {
            this.$message({
                type: 'info',
                message: '文件上传失败'
            });
        },
        getyunyinshan() {
            let params = {}; 
            this.listLoading = true;
            this.$http.ajaxPost({
                url: 'sms/query',
                params: params
            }, (res) => {
                this.$http.aop(res, () => {  
                    this.getlist = res.body.data.smsProviderList||[]; 
                    this.listLoading = false;
                });
            });

        },
        nameStr(aList){
            let aNname = [];
            if(aList.length){
                for( var val of aList){
                    this.getlist.forEach(function(itme){
                        if(val == itme.providerId){
                            aNname.push(itme.providerName);
                        }
                    });
                }
            }
            return aNname.join();
        }

    },
    mounted() {
        this.getyunyinshan()
        this.gitData(1);
        this.gitData(2);
    }
}
</script>