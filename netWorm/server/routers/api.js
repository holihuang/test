const router = require('koa-router')()
const ctl = require('./../controllers/api')

const routers = router.post('/worm/inject.json', ctl.getInject)
                      
module.exports = routers