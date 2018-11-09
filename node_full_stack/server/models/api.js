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
    }
}