const model = require('../models/index.js')

// 查找用户
async function getUser() {
    const resultData = await model.getUser() || {}
    return {
        email: resultData.email,
        userName: resultData.name,
        detailInfo: resultData.detail_info,
        createTime: resultData.create_time
    }
}

module.exports = getUser