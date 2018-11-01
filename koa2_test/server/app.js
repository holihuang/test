const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('../config')
const routers = require('./routers/index')

const app = new Koa()

// session 存储配置
const mysqlSessionCfg = {
    user: config.database.username,
    password: config.database.password,
    database: config.database.database,
    host: config.database.host
}

// session 中间件
app.use(session({
    key: 'USER_ID',
    store: new MysqlStore(mysqlSessionCfg)
}))

// 路由
app.use(routers.routes()).use(routers.allowedMethods())

//端口
app.listen( config.port )
console.log(`the server is starting at port ${config.port}`)