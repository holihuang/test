const router = require('koa-router')()
const userInfoController = require('./../controllers/api')

const routers = router.post('/btn/btnJson.json', userInfoController.getTxt)
module.exports = routers