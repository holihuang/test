const dbUtils = require('./../utils/db-util')


module.exports = {
 	async getInject(opt = {}) {
 		console.log(opt)
 		const { titles } = opt
        const _sql = `insert into film_title(name) values(?)`
        let result = await dbUtils.add(_sql, titles)
        return result
    }
}