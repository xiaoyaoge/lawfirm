<template>
    <section v-loading="listLoading">
        <div class="cont-btns mb15">
            <a class="bk-button bk-default bk-button-small fl" @click="$router.push('/enterprise')" title="返回">
                <span>返回</span>
            </a>
        </div>
        <div class="info">
            <div class="bk-panel-body p25 cont">
                <div class="b-manage-title">
                    <h5 class="fl">账号信息</h5>
                    <div class="edit-btns b-manage-btns fr">
                        <!-- 交互说明 
                             点击修改后，把保存于取消按钮显示出来，同时把info里所有input 的 readonly 去除
                        -->
                        <a class="bk-button bk-success bk-button-small ml10 fr" @click="severInfo" title="保存"><span>保存</span></a>
                    </div>
                </div>
                <div class="bk-form">
                    <div class="bk-form-item">
                        <label class="bk-label"><span class="red">*</span>账号：</label>
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" v-model="form.account" placeholder="请输入帐号（为手机号）" maxlength="11">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>密码：</label>
                        <div class="bk-form-content">
                            <div class="bk-text bk-info">
                                默认为输入的企业法人身份证后6位
                            </div>
                        </div>
                    </div>
                </div>
                <div class="b-manage-title">
                    <h5 class="fl">企业信息</h5>
                </div>
                <form class="bk-form" id="validate_form" method="POST" action="javascript:;">
                    <div class="bk-form-item">
                        <label class="bk-label"><span class="red">*</span>企业名称：</label>
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" v-model="form.ename" placeholder="请输入企业名称">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>企业简称：</label>
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" v-model="form.shortEname" placeholder="请输入企业简称">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>注册地址：</label>
                        <div class="bk-form-content">
                            <el-cascader size="large" class="mb5" :options="provinceAndCityDataPlus" filterable v-model="registerAddress" @change="handleChange">
                            </el-cascader>
                            <span class="none">{{CodeToText[registerAddress[0]]}}{{CodeToText[registerAddress[1]]}}{{CodeToText[registerAddress[2]]}}</span>
                            <input type="text" class="bk-form-input" placeholder="请输入详细地址" v-model="form.registerAddress">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>实际经营地址：</label>
                        <div class="bk-form-content">
                            <el-cascader size="large" class="mb5" :options="provinceAndCityDataPlus" filterable v-model="address" @change="handleChange">
                            </el-cascader>
                            <span class="none">{{CodeToText[address[0]]}}{{CodeToText[address[1]]}}{{CodeToText[address[2]]}}</span>
                            <input type="text" class="bk-form-input" name="" placeholder="请输入详细地址：" v-model="form.address">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>统一社会信用代码：</label>
                        <!-- <label class="bk-label">营业执照编号：</label> -->
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" placeholder="请输入统一社会信用代码" v-model="form.licenseNumber" maxlength="18">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>纳税人识别号：</label>
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" placeholder="请输入纳税人识别号" v-model="form.taxpayerNumber" maxlength="15">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>法人姓名：</label>
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" placeholder="请输入法人姓名" v-model="form.legalPersonName" maxlength="10">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>法人身份证：</label>
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" placeholder="请输入法人身份证" v-model="form.legalPersonIdCard" maxlength="18">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>企业联系人：</label>
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" placeholder="请输入业联系人" v-model="form.linkman" maxlength="10">
                        </div>
                    </div>
                    <div class="bk-form-item mt5">
                        <label class="bk-label"><span class="red">*</span>企业联系电话：</label>
                        <div class="bk-form-content">
                            <input type="text" class="bk-form-input" placeholder="请输入企业联系电话" v-model="form.telephone" >
                        </div>
                    </div>
                </form>
            </div>
            <div class="cont">
                <div class="b-manage-title mb5">
                    <h5 class="fl">图片信息</h5>
                    <div class="edit-btns b-manage-btns fr">
                    </div>
                </div>
                <div class="row img-wrap">
                    <div class="col-md-3 col-lg-3">
                        <div class="img-title">企业营业执照(必填)</div>
                        <div class="img-box">
                            <img :src="form.licensePic||defaultImgUrl">
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <a class="bk-button bk-primary" @click="modifyUpload('企业营业执照','licensePic')">{{form.licensePic?'修改照片':'上传照片'}}</a>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <a class="bk-button bk-default" @click="previewBox('企业营业执照',(form.licensePic||defaultImgUrl))" target="_blank">预览照片</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3">
                        <div class="img-title">企业印章图样(必填)</div>
                        <div class="img-box">
                            <img :src="form.sealPic||defaultImgUrl">
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <a class="bk-button bk-primary" @click="modifyUpload('企业印章图样','sealPic')">{{form.sealPic?'修改照片':'上传照片'}}</a>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <a class="bk-button bk-default" @click="previewBox('企业印章图样',(form.sealPic||defaultImgUrl))" target="_blank">预览照片</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3">
                        <div class="img-title">企业签约协议1(选填)</div>
                        <div class="img-box">
                            <img :src="form.agreementPic||defaultImgUrl">
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <a class="bk-button bk-primary" @click="modifyUpload('企业签约协议1','agreementPic')">{{form.agreementPic?'修改照片':'上传照片'}}</a>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <a class="bk-button bk-default" @click="previewBox('企业签约协议1',(form.agreementPic||defaultImgUrl))" target="_blank">预览照片</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-3">
                        <div class="img-title">企业签约协议2(选填)</div>
                        <div class="img-box">
                            <img :src="form.agreement2Pic||defaultImgUrl">
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <a class="bk-button bk-primary" @click="modifyUpload('企业签约协议2','agreement2Pic')">{{form.agreement2Pic?'修改照片':'上传照片'}}</a>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <a class="bk-button bk-default" @click="previewBox('企业签约协议2',(form.agreement2Pic||defaultImgUrl))" target="_blank">预览照片</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="uploadTitle" size="tiny" v-model="uploadVisible" :close-on-click-modal="false" @close="closeDebtDialog">
            <el-form ref="debtForm">
                <el-form-item>
                    <el-upload ref="upload" list-type="picture-card" :action="uploadPolicy.host" :multiple="uploadConfig.multiple" :data="uploadConfig.data" :on-success="uploadSuccess" :on-change="uploadChange" :on-error="uploadError" :on-remove="uploadRemove" :on-preview="uploadPictureCardPreview" :accept="uploadConfig.accept" :file-list="fileList" :before-upload="beforeUpload">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp/gif文件，且不超过5mb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="modal-footer ta-c">
                <a class="bk-button bk-default" @click="uploadVisible = false" title="点错了">确定</a>
            </div>
        </el-dialog>
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </section>
</template>
<script>
import {
    regionDataPlus,
    CodeToText,
    TextToCode
} from '../../area'
import moment from 'moment'
import md5 from 'js-md5';
import validate from '../../validate';
export default {
    data() {
        return {
            defaultImgUrl: 'http://fafashe.oss-cn-shenzhen.aliyuncs.com/images/f6ea28dd98b1ddb41c627d0c64197177',
            collapsed: true,
            collapsedText: '显示更多查询条件',
            TextToCode: TextToCode,
            CodeToText: CodeToText,
            address: ['', '', ''],
            registerAddress: ['', '', ''],
            provinceAndCityDataPlus: regionDataPlus,
            formEdit: true,
            formEditBtn: true,
            form: {
                account: '', //帐号
                ename: '', //企业名称
                shortEname: '', //企业简称
                address: '', //办公地址
                areaCode: '',
                areaName: '',
                registerAddress: '', //登记地址
                registerAreaCode: '',
                registerAreaName: '',
                linkman: '', //联系人
                telephone: '', //联系电话 
                legalPersonIdCard: '', //法人身份证
                legalPersonName: '', //法人姓名
                licenseNumber: '', //统一社会信用代码
                taxpayerNumber: '', //纳税人识别  
                agreement2Pic: '', //企业协议2
                agreementPic: '', //企业协议1
                licensePic: '', //企业执照
                sealPic: '', //企业印章图样 
            },
            uploadTitle: '',
            uploadType: '',
            uploadVisible: false,
            dialogVisible: false,
            dialogImageUrl: '',
            uploadPolicy: {},
            uploadConfig: {
                multiple: true,
                thread: 5,
                data: {},
                accept: 'image/png,image/gif,image/jpeg,image/webp'
            },
            fileList: [],
            listLoading: false,
        }
    },
    methods: {
        editIonf(type) {
            if (type === 'edit') {
                this.formEdit = false;
                this.formEditBtn = false;
            } else {
                this.formEdit = true;
                this.formEditBtn = true;
            }
        },
        handleCurrentChange(val) {
            this.table.pageNum = val;

        },
        checkForm(data) { //验证担保人信息
            let isOk = true;
            let text = '';
            Object.keys(data).forEach((val) => {
                switch (val) {
                    case 'shortEname':
                        if (data[val] === '') {
                            text = '企业名称不能为空';
                            isOk = false;
                        }
                        break;
                    case 'ename':
                        if (data[val] === '') {
                            text = '企业简称不能为空';
                            isOk = false;
                        }
                        break;

                    case 'account':
                        if (!validate.checkPhoneNum(data[val])) {
                            text = '帐号应为手机号';
                            isOk = false;
                        }
                        break;
                    case 'linkman':
                        if (data[val] === '') {
                            text = '联系人不能为空';
                            isOk = false;
                        }
                        break;
                    case 'telephone':
                        if (data[val] === '') {
                            text = '联系电话不能为空';
                            isOk = false;
                        }
                        break;
                    case 'address':
                        if (data[val] === '') {
                            text = '办公地址不能为空';
                            isOk = false;
                        }
                        break;
                    case 'areaName':
                        if (data[val] === ',,') {
                            text = '请选择办公地址省市区';
                            isOk = false;
                        }
                        break;
                    case 'registerAddress':
                        if (data[val] === '') {
                            text = '登记地址不能为空';
                            isOk = false;
                        }
                        break;
                    case 'registerAreaName':
                        if (data[val] === ',,') {
                            text = '请选择登记地址省市区';
                            isOk = false;
                        }
                        break;
                    case 'legalPersonName':
                        if (data[val] === '') {
                            text = '法人姓名不能为空';
                            isOk = false;
                        }
                        break;
                    case 'legalPersonIdCard':
                        if (!validate.checkID(data[val])) {
                            text = '法人身份证不能为空';
                            isOk = false;
                        }
                        break;
                    case 'licenseNumber':
                        if (data[val] === '') {
                            text = '不能为空统一社会信用代码';
                            isOk = false;
                        }
                        break;
                    case 'taxpayerNumber':
                        if (data[val] === '') {
                            text = '纳税人识别不能为空';
                            isOk = false;
                        }
                        break;
                    case 'licensePic':
                        if (data[val] === '') {
                            text = '请上传企业执照';
                            isOk = false;
                        }
                        break;
                    case 'sealPic':
                        if (data[val] === '') {
                            text = '请上传企业印章图样';
                            isOk = false;
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
        severInfo() {
            let params = {
                enterprise: this.form,
            };
            params.enterprise.areaCode = this.address.join();
            params.enterprise.areaName = [this.CodeToText[this.address[0]], this.CodeToText[this.address[1]], this.CodeToText[this.address[2]]].join();
            params.enterprise.registerAreaCode = this.registerAddress.join();
            params.enterprise.registerAreaName = [this.CodeToText[this.registerAddress[0]], this.CodeToText[this.registerAddress[1]], this.CodeToText[this.registerAddress[2]]].join();
            console.log(params.enterprise)
            if (this.checkForm(params.enterprise)) {
                this.$confirm('确认提创建吗？', '提示', {}).then(() => {
                    this.listLoading = true;
                    this.$http.ajaxPost({
                        url: 'enterprise/create',
                        params: params
                    }, (res) => {
                        this.$http.aop(res, () => {
                            let eid = res.body.data.eid;
                            this.$message({
                                message: '入驻成功',
                                type: 'success'
                            });

                            this.$router.push('/enterprise/enterInfo/' + eid);
                        });
                        this.listLoading = false;
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        handleChange(value) {},
        modifyUpload(title, type) { // 初始化上传控件 
            if (type !== this.uploadType) {
                this.fileList = [];
            }
            this.$http.post('upload/getAliyunPostPolicy', {}).then((res) => {
                this.$http.aop(res, () => {
                    this.uploadPolicy = res.body.data || {};
                    this.uploadConfig.data.policy = this.uploadPolicy.policy;
                    this.uploadConfig.data.OSSAccessKeyId = this.uploadPolicy.accessid;
                    this.uploadConfig.data.signature = this.uploadPolicy.signature;

                    this.uploadTitle = title;
                    this.uploadType = type;
                    this.uploadVisible = true;
                });
            }, (res) => {
                this.$http.aop(res);
            });
        },
        closeDebtDialog() {
            this.uploadVisible = false;
        },
        uploadSuccess(response, file, fileList) { //文件长传成功  
            let url = this.uploadPolicy.host + '/' + this.uploadConfig.data.key;
            this.form[this.uploadType] = url;
        },
        beforeUpload(file) {
            let key = this.uploadPolicy.dir + '/' + md5('' + Date.now + this.uploadPolicy.uid + Math.random());
            this.uploadConfig.data.key = key;
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.fileList = [];
                this.$message.error('上传图片大小不能超过 5MB!');
            }
            return isLt5M;
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
        uploadPictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        uploadError(file, fileList) {
            this.$message({
                type: 'info',
                message: '文件上传失败'
            });
        },
        convertTextToCode(provinceText, cityText, regionText) {
            let code = ''
            if (provinceText && this.TextToCode[provinceText]) {
                const province = this.TextToCode[provinceText]
                code += province.code + ', '
                if (cityText && province[cityText]) {
                    const city = province[cityText]
                    code += city.code + ', '
                    if (regionText && city[regionText]) {
                        code += city[regionText].code
                    }
                }
            }
            return code
        },
        previewBox(title, url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        }

    },
    mounted() {
        this.$parent.parentUrlName = "企业管理";
        this.$parent.parentUrls = '/enterprise';

    }
}
</script>