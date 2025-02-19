require('module-alias/register')
const common = require('@root/common/common')
const axios = require('axios');
const crypto = require('../utils/crypto')
const log = require('log4js').getLogger('api')

// 获取accesstoken
// appid: 微信小程序的小程序ID
// appsecret: 微信小程序的秘钥appsecret
async function GetAccessToken(appid, appsecret){
    try{
        let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
        log.info(`gettoken url ${url}`);
        let res = await axios.get(url);
        res = res.data;

        log.info(res);
        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}
async function GetStableAccessToken(appid, appsecret){
    try{
        let url = `https://api.weixin.qq.com/cgi-bin/stable_token `
        log.info(`gettoken url ${url}`);
        let data = {
            grant_type: 'client_credential',
            appid: appid,
            secret: appsecret,
            force_refresh: false,
        }
        log.info(`data ${JSON.stringify(data)}`)
        let res = await axios.post(url, data);
        res = res.data;

        log.info(res);
        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}
async function GetRidErrorCode(access_token, rid){
    try{
        let url = `https://api.weixin.qq.com/cgi-bin/openapi/rid/get?access_token=${access_token}`
        let data = {
            rid,
        }
        let res = await axios.post(url, data);
        res = res.data;
        log.info(res);

        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}

// jscode换取识别用户的session
async function JsCode2Session(appid, appsecret, code){
    try{
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
        let res = await axios.get(url);
        res = res.data;
        log.info(res)

        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}

// 检查session是否有效
async function CheckSession(access_token, openid, signature){
    try{
        let url = `https://api.weixin.qq.com/wxa/checksession?access_token=${access_token}&signature=${signature}&openid=${openid}&sig_method=SIG_METHOD`
        let res = await axios.get(url);
        res = res.data;
        log.info(res)

        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}

// 重置用户session
async function ResetUserSessionKey(access_token, openid, signature){
    try{
        let url = `https://api.weixin.qq.com/wxa/resetusersessionkey?access_token=${access_token}&openid=${openid}&signature=${signature}&sig_method=hmac_sha256 `
        let res = await axios.get(url);
        res = res.data;
        log.info(res);

        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}

// 获取插件用户的openid
async function GetPluginUserOpenId(access_token, code){
    try{
        let url = `https://api.weixin.qq.com/wxa/getpluginopenpid?access_token=${access_token}`
        let data = {
            code: code,
        }
        let res = await axios.post(url, data);
        res = res.data;
        log.info(res);

        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}

// 检测加密数据是否是微信加密
async function CheckEncryptedMsg(access_token, code){
    try{
        // 将数据sha256后base16加密
        let encryptedData = crypto.hashAndEncode(code)
        let url = `https://api.weixin.qq.com/wxa/business/checkencryptedmsg?access_token=${access_token}` 
        let data = {
            encrypted_msg_hash: encryptedData,
        }
        let res = await axios.post(url, data);
        res = res.data;
        log.info(res);

        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}

// 支付完成后获取用户的unionid
async function GetPaidUnionId(access_token, openid, transaction_id, mch_id, out_trade_no){
    try{
        let url = `https://api.weixin.qq.com/wxa/getpaidunionid?access_token=${access_token}`
        let data = {
            openid,
            transaction_id,
            mch_id,
            out_trade_no
        }
        let res = await axios.post(url, data);
        res = res.data;
        log.info(res);
        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}
// 获取用户最近3次的encryptKey
async function GetUserEncryptKey(access_token, openid, signature){
    try{
        let url = `https://api.weixin.qq.com/wxa/business/getuserencryptkey?access_token=${access_token}&signature=${signature}&openid=${openid}&sig_method=SIG_METHOD `
        let res = await axios.get(url);
        res = res.data;
        log.info(res);

        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}

// 获取用户的手机号验证
async function GetUserPhoneNumber(access_token, code){
    try{
        let url = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${access_token}`
        let data = {
            code,
        }
        let res = await axios.post(url, data);
        res = res.data;
        log.info(res);

        return res;
    }catch(e){
        log.error(e);
        return common.InternalError;
    }
}
module.exports = {
    GetAccessToken,
    GetStableAccessToken,

    GetRidErrorCode,

    JsCode2Session,
    CheckSession,
    ResetUserSessionKey,

    GetPluginUserOpenId,
    CheckEncryptedMsg,
    GetPaidUnionId,
    GetUserEncryptKey,
    GetUserPhoneNumber,
}