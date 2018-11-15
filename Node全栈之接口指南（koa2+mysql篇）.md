# Node全栈之接口指南（koa2+mysql篇）


# 1. 准备

	Node version 8+(recommended*), koa2, mysql, PM2, react+redux+saga全家桶

![Koa](https://raw.githubusercontent.com/holihuang/test/database/images/koa.png)

## 2. 往期koa2回顾

> [Koa2+Mongodb实践](http://172.16.117.224/fe/blog/issues/83)
> koa2部分

## 3. mysql

![Mysql](https://raw.githubusercontent.com/holihuang/test/database/images/mysql.png)

### 3.1 mysql简介

	MySQL 是最流行的关系型数据库管理系统，按照数据结构来组织、存储和管理数据的仓库，
	
	每个数据库都有一个或多个不同的API用于创建，访问，管理，搜索和复制所保存的数据。
	
	我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。
	
	所以，现在我们使用关系型数据库管理系统（RDBMS）来存储和管理的大数据量。所谓的关系型数据库，是建立在关系模型基础上的数据库，
	
	借助于集合代数等数学概念和方法来处理数据库中的数据。RDBMS即关系数据库管理系统(Relational Database Management System)的特
	
	点：
	
		1. 数据以表格的形式出现
	
 		2. 每行为各种记录名称
	
		3. 每列为记录名称所对应的数据域
	
		4. 许多的行和列组成一张表单
	
		5. 若干的表单组成database

![结构图](https://raw.githubusercontent.com/holihuang/test/database/images/%E6%95%B0%E6%8D%AE%E5%BA%93.png)

注： 数据库 -> 表 -> 列

![表的数据结构](https://raw.githubusercontent.com/holihuang/test/database/images/table.png)

注： 表的数据结构


### 3.2 [mysql安装](http://www.runoob.com/mysql/mysql-install.html)

### 3.3 mysql基本操作

#### 3.3.1 增

	语法： INSERT INTO table_name 
			( field1, field2,...fieldN )
            VALUES
            ( value1, value2,...valueN );
	如果数据是字符型，必须使用单引号或者双引号，如："value"。

	示例：
	
	
![增](https://raw.githubusercontent.com/holihuang/test/database/images/add.png)
	

#### 3.3.2 删
	
	语法： DELETE FROM table_name [WHERE Clause] 

	1. 如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除。

		(

			删除整个表：	
	
			delete from table_name;  // 逐条删除	（有记录）

			truncate table table_name; // 保持原有表的结构重新生成新表，（效率高）
		)
	 
	2. 你可以在 WHERE 子句中指定任何条件
	
	3. 您可以在单个表中一次性删除记录

	示例：

![删](https://raw.githubusercontent.com/holihuang/test/database/images/del.png)

#### 3.3.3 改

	语法：UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause]

	1. 你可以同时更新一个或多个字段。
	
	2. 你可以在 WHERE 子句中指定任何条件。
	
	3. 你可以在一个单独表中同时更新数据。

	示例：

![改](https://raw.githubusercontent.com/holihuang/test/database/images/update.png)

#### 3.3.4 查

	语法： SELECT column_name,column_name

		  FROM table_name

		  [WHERE Clause]
	
		  [LIMIT N][ OFFSET M]

	示例：

![查](https://raw.githubusercontent.com/holihuang/test/database/images/query.png)

具体操作参考[菜鸟教程](http://www.runoob.com/mysql/mysql-select-query.html)
 

## 4. PM2


![PM2](https://raw.githubusercontent.com/holihuang/test/database/images/pm2.png)

### 4.1 PM2简介

> [PM2](https://pm2.io/doc/en/runtime/guide/load-balancing/): PM2 Runtime is a Production Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

### 4.2 PM2 快速入门

详见[PM2](https://www.cnblogs.com/chyingp/p/pm2-documentation.html#top)，文章很详细，不在此过多赘述

备注：见本工程中的ecosystem.config.js配置文件

### 小结：PM2是进程管理工具（支持Node），用来简化应用管理的繁琐任务，如性能监控，自动重启，负载均衡，在本次教程中充当Node端热更新的工具（监听文件变化，自动重启）


## 5. 快速开始

### 5.1 getStarted

	// 拷贝工程
	git clone https://github.com/holihuang/node.git
	
	// 切换目录
	cd node & cd node_full_stack

	// 起前/后端服务
	npm run start //注意：后端数据依赖数据库服务，记得启动数据库服务
	

附：

	// 单起前端服务
	npm run start_static

	// 单起后端服务
	npm run start_server

	// 关闭后端服务

	npm run delete_server


### 5.2 项目目录(全栈目录)

	|--dist
	|--server
	   |--controllers
	   |--models
	   |--routers
	   |--services
	   |--utils
	   |--app.js
	|--src
	|--.babelrc
	|--.gitignore
	|--config.js
	|--ecosystem.config.js
	|--package.json
	|--webpack.config.js
	|--yarn.lock

### 5.3 项目[demo](https://github.com/holihuang/node/tree/master/node_full_stack) 

![demo](https://raw.githubusercontent.com/holihuang/test/database/images/struct.png)

### 5.4 前端

略，开发流程同react全家桶，在此不再赘述

### 5.5 后端服务

#### 5.5.1 开发流程图



#### 5.5.2  app.js (入口)

	const Koa = require('koa')
	const session = require('koa-session-minimal')
	const MysqlStore = require('koa-mysql-session')
	const cors = require('koa2-cors')
	
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
	
	// 跨域
	app.use(cors({
	    origin: 'http://localhost:8080',
	    credentials: true,
	}))
	
	// 路由
	app.use(routers.routes()).use(routers.allowedMethods())
	
	//端口
	app.listen( config.port )
	console.log(`the server is starting at port ${config.port}`)

#### 5.5.3 路由

##### 5.5.3.1 index.js

	const router = require('koa-router')()
	const home = require('./home.js')
	const api = require('./api.js')
	
	router.use('/', home.routes(), home.allowedMethods())
	router.use('/api', api.routes(), api.allowedMethods())
	
	module.exports = router

##### 5.5.3.2 api.js

	const router = require('koa-router')()
	const userInfoController = require('./../controllers/api')
	
	const routers = router.post('/btn/btnJson.json', userInfoController.getTxt)
	                      .post('/btn/add.json', userInfoController.addInfo)
	                      .post('/weather/weather.json', userInfoController.getWeather)
	module.exports = routers

#### 5.5.4 controllers

	const userInfoService = require('./../services/api')
	
	module.exports = {
	    // btn data
	    async getTxt(ctx) {
	        const formData = ctx.request.body || {}
	        const result = {
	            success: false,
	            message: '',
	            data: null,
	            code: ''
	        }
	        const userResult = await userInfoService.getTxt( formData )
	        if (userResult) {
	            result.success = true
	            result.data = userResult
	        }
	        ctx.body = result
	    },
	    async addInfo(ctx) {
	        const formData = ctx.request.body || {}
	        const result = {
	            success: false,
	            message: '',
	            data: null,
	            code: ''
	        }
	        const userResult = await userInfoService.addInfo( formData )
	        if (userResult) {
	            result.success = true
	            result.data = true
	        }
	        ctx.body = result
	    },
	    async getWeather(ctx) {
	        const formData = ctx.request.body || {}
	        const result = {
	            success: false,
	            message: '',
	            data: null,
	            code: ''
	        }
	        const userResult = await userInfoService.getWeather( formData )
	        if (userResult) {
	            result.success = true
	            result.data = userResult
	        }
	        ctx.body = result
	    },
	}


#### 5.5.5 services

	const userModel = require('./../models/api')
	
	module.exports = {
	    async getTxt(formData = {}) {
	        const resultData = await userModel.getTxt({...formData})
	        return resultData
	    },
	    async addInfo(formData = {}) {
	        const resultData = await userModel.addInfo({...formData})
	        return resultData
	    },
	    async getWeather(formData = {}) {
	        const resultData = await userModel.getWeather({...formData})
	        return resultData
	    },
	}

#### 5.5.5.6 models
	
	const dbUtils = require('./../utils/db-util')
	module.exports = {
	    //  查询txt
	    async getTxt(opt = {}) {
	        const _sql = `select * from info`
	        let result = await dbUtils.query( _sql )
	        if (Array.isArray(result) && result.length > 0) {
	            result = result
	        } else {
	            result = ''
	        }
	        return result
	    },
	    // 新增
	    async addInfo(opt = {}) {
	        const _sql = `insert into info(code, name, age, date)
	                        values(?, ?, ?, ?)`
	        let result = await dbUtils.add(_sql, ['000111', '金庸', '28', '2018-11-11'])
	        return result
	    },
	
	    // 天气
	    async getWeather(opt = {}) {
	        const _sql = `select * from info`
	        const _sql_weather = `select * from weather_info`
	        let result = await dbUtils.query(_sql)
	        const result_weather = await dbUtils.query(_sql_weather)
	        const list = []
	        result.forEach(item => {
	            result_weather.forEach(itm => {
	                if (item.code === itm.code) {
	                    list.push({
	                        ...item,
	                        ...itm,
	                    })
	                }
	            })
	        })
	        result = list
	        if (Array.isArray(result) && result.length > 0) {
	            result = result
	        } else {
	            result = ''
	        }
	        return result
	    },
	}

#### 5.5.5.7 db

	const cfg = require('../../config.js')
	const mysql = require('mysql')
	
	const db = cfg.database
	
	const pool = mysql.createPool({
	    host: db.host,
	    user: db.username,
	    database: db.database,
	    password: db.password
	})
	
	const query = function (sql, values) {
	    return new Promise((resolve, reject) => {
	        pool.getConnection((err, connection) => {
	            if (err) {
	                resolve(err)
	            } else {
	                connection.query(sql, values, (err, rows) => {
	                    if (err) {
	                        reject(err)
	                    } else {
	                        resolve(rows)
	                    }
	                    connection.release()
	                })
	            }
	        })
	    })
	}
	
	const add = function (sql, arr) {
	    return query(sql, arr)
	}
	
	module.exports = {
	    query,
	    add
	}



#### 5.5.5.8 接口

![跨域接口1](https://raw.githubusercontent.com/holihuang/test/database/images/%E8%B7%A8%E5%9F%9F%E6%8E%A5%E5%8F%A31.png)

跨域接口pic_1

![跨域接口2](https://raw.githubusercontent.com/holihuang/test/database/images/%E8%B7%A8%E5%9F%9F%E6%8E%A5%E5%8F%A32.png)

跨域接口pic_2

为什么跨域请求每次请求两次？

[跨域接口发两次请求](https://segmentfault.com/q/1010000008693779)

## 6. 总结

 本次接口指南只是简单的走通的一次http完整问答响应的流程，对各个模块如：mysql，PM2仅仅做泛泛解读，尤其是PM2的0秒宕机重启，负载均衡领域等诸多颇值得玩味的领域均未作深入涉及，但是，相信有了本次指南，对以后的开发依然具有指导意义，尤其是前后端交互的模糊地段，更好梳理开发思路。