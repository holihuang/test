const dbUtils = require('../utils/db-util')

const user = {
    async getUser() {
        let result = await dbUtils.select('user_info', ['id', 'email', 'name', 'detail_info'])
        console.log(result, 'result')
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    }
}

module.exports = user