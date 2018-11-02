const model = require('../models/index.js')

// 查找用户
async function getUser() {
	return await model.getUser()
}

module.exports = getUser