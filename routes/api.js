require('module-alias/register')
const axios = require('axios')
const common = require('@root/common/common')
const express = require('express')
const app = express()
const router = express.Router()
const log = require('log4js').getLogger('api');
const mpconfig = require('@root/config/mpconfig')
const rtconfig = require('@root/config/runtime')
const api = require('../api/api')

router.use('/', (req, res, next) => {
    log.info(`url ${req.url} query ${JSON.stringify(req.query)} body ${JSON.stringify(req.body)}`)
    if(req.query.name == '' || req.query.name == null)
        req.query.name = 'test';
    next();
})
router.get('/', (req, res, next) => {
    req.send('hello from api')
});
router.post('/test', (req, res) => {
    log.info(`rtconfig ${JSON.stringify(rtconfig.data)}`)
    res.send('Hello World!')
});


router.post('/token', async function(req, res){
    try{
        let appid = mpconfig.appid;
        let appsecret = mpconfig.appsecret;
        log.info(`appid ${appid} appsecret ${appsecret}`)

        let ret = await api.GetAccessToken(appid, appsecret);

        res.send(ret);

    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})

router.post('/stabletoken', async function(req, res){
    try{
        let appid = mpconfig.appid;
        let appsecret = mpconfig.appsecret;
        log.info(`appid ${appid} appsecret ${appsecret}`)

        let ret = await api.GetStableAccessToken(appid, appsecret);

        rtconfig.data.access_token = ret.access_token;
        rtconfig.data.expires_in = ret.expires_in;
        res.send(ret);

    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})
// 查看微信报错信息
router.post('/riderrcode', async function(req, res){
    try{
        let rid = req.body.rid;
        let access_token = rtconfig.data.access_token;

        let ret = await api.GetRidErrorCode(access_token, rid);

        res.send(ret);
    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})


router.post('/jscode2session', async function(req, res){
    try{
        let appid = mpconfig.appid;
        let appsecret = mpconfig.appsecret;
        let code = req.body.code;
        log.info(`appid ${appid} appsecret ${appsecret} code ${code}`)

        let ret = await api.JsCode2Session(appid, appsecret, code);

        res.send(ret);

    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})

router.post('/checksession', async function(req, res){
    try{
        let access_token = rtconfig.data.access_token;
        let openid = req.body.openid;
        let signature = req.body.signature;
        log.info(`openid ${openid} signature ${signature}`)
        let ret = await api.CheckSession(access_token, openid, signature);

        res.send(ret);
    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})
router.post('/resetsessionkey', async function(req, res){
    try{
        let access_token = rtconfig.data.access_token;
        let openid = req.body.openid;
        let signature = req.body.signature;
        log.info(`openid ${openid} signature ${signature}`)
        let ret = await api.ResetUserSessionKey(access_token, openid, signature);

        res.send(ret);
    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})
router.post('/getpluginopenid', async function(req, res){
    try{
        let access_token = rtconfig.data.access_token;
        let code = req.body.code;
        let ret = await api.GetPluginUserOpenId(access_token, code);

        res.send(ret);
    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})

router.post('/checkencryptedmsg', async function(req, res){
    try{
        let access_token = rtconfig.data.access_token;
        let data = req.body.data;
        let ret = await api.CheckEncryptedMsg(access_token, data);

        res.send(ret);
    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})

router.post('/getpaidunionid', async function(req, res){
    try{
        let access_token = rtconfig.data.access_token;
        let openid = req.body.openid;
        let transaction_id = req.body.transaction_id;
        let mch_id = req.body.mch_id;
        let out_trade_no = req.body.out_trade_no;

        let ret = await api.CheckEncryptedMsg(access_token, openid, transaction_id, mch_id, out_trade_no);
        res.send(ret);
    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})
router.post('/getuserencryptkey', async function(req, res){
    try{
        let access_token = rtconfig.data.access_token;
        let openid = req.body.openid;
        let signature = req.body.signature;

        let ret = await api.GetUserEncryptKey(access_token, openid, signature);
        res.send(ret);
    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})
router.post('/getuserphonenumber', async function(req, res){
    try{
        let access_token = rtconfig.data.access_token;
        let code = req.body.code;

        let ret = await api.GetUserPhoneNumber(access_token, code);
        res.send(ret);
    }catch(e){
        log.error(e);
        res.send(common.InternalError)
    }
})
module.exports = router;