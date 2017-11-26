export default {
    checkPhoneNum(val) {
        return /^\d{11}$/.test(val);
    },
    checkPassword(val) {
        return /^\w{6,16}$/.test(val);
    },
    checkEmail(val){
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val);
    },
    checkMsgCode(val) {
        return /^\w{6}$/.test(val);
    },
    checkValidateCode(val) {
        return val ? true : false;
    },
    checkUserName(val) {
        return val.length > 1 && val.length <= 10;
    },
    checkID(val) {
        return /^(\d{15}|\d{17}[\da-zA-Z])$/.test(val);
    },
    checkNums(val) { //正浮点数
        return /(^[0-9]*$)|(^[0-9]*[\.]{1}[0-9]{1,2}$)/.test(val);
    },
    checkNum(val) { //正整数
        return /^\d+$/.test(val);
    },
    checkUrl(val) {
        return /^(((https|http|ftp|rtsp|mms)?:\/\/)?)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(val);
    },
    fixNum(val) {
        if (!/^\d+$/.test(val)) {
            return val.replace(/[^\d]/g, '');
        }
        return val;
    },
    fixFloatNum(val) {
        let valArr = [];

        if (!/^\d+(\.\d+){0,1}$/.test(val)) {
            valArr = val.split('.');
            valArr = valArr.slice(0, 2);
            val = valArr.join('.');

            return val.replace(/[^\d\.]/g, '');
        }
        return val;
    },
    fixPhoneNum(val) {
        if (!/^\d{11}$/.test(val)) {
            return val.replace(/[^\d]/g, '').slice(0, 11);
        }
        return val;
    },
    fixMsgCode(val) {
        if (!/^\d{6}$/.test(val)) {
            return val.replace(/[^\d]/g, '').slice(0, 6);
        }
        return val;
    },
    fixSingleNum(val) {
        if (!/^\d$/.test(val)) {
            return val.replace(/[^\d]/g, '').slice(0, 1);
        }
        return val;
    },
    fixID(val) {
        if (!/^\d{17}[\da-zA-Z]$/.test(val)) {
            return val.replace(/[^\d]/g, '').slice(0, 18);
        }
        return val;
    },
}