// 子路由
const router = require('koa-router')()
const index = require('../controllers/home.js')

module.exports = router.get('/', index)