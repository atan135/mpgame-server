require('module-alias/register')
const common = require('@root/common/common')
const axios = require('axios');
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
        return common.InternalError;
    }
}

module.exports = {
    GetAccessToken,
    GetStableAccessToken,
}