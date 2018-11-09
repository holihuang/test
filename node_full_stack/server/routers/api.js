const router = require('koa-router')()
const userInfoController = require('./../controllers/api')

const routers = router.post('/btn/btnJson.json', userInfoController.getTxt)
                       .post('/btn/add.json', userInfoController.addInfo)
module.exports = routers