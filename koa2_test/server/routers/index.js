const router = require('koa-router')()
const home = require('./home.js')

router.use('/', home.routes(), home.allowedMethods())

module.exports = router