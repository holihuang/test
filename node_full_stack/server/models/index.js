const dbUtils = require('../utils/db-util')

const user = {
    async getUser() {
    	const _sql = `select id, email, name, create_time from user_info`
        return await dbUtils.query(_sql) || []
    },
}

module.exports = user