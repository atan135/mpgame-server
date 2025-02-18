require('module-alias/register')
const axios = require('axios')
const common = require('@root/common/common')
const express = require('express')
const app = express()
const router = express.Router()
const log = require('log4js').getLogger('api');
const mpconfig = require('@root/config/mpconfig')
const rtconfig = require('@root/config/runtime')
const api = require('@root/api/api')

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
module.exports = router;