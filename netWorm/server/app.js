const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('../server.config')
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

app.listen('8000', () => {
	console.log('the server is starting at 8000')
})