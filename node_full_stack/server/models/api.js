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
    }
}