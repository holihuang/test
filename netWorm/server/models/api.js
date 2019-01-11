const dbUtils = require('./../utils/db-util')

formatData = arr => {
	const list = []
	arr.forEach(item => {
		const { title, bt } = item
		list.push({
			// title: title.replace(/.*《/, '').split('》')[0],
			title,
			bt
		})
	})

	return list.map(item => {
		return Object.values(item)
	})
}

module.exports = {
 	async getInject(opt = {}) {
 		const { titles = [] } = opt
 		
 		const values = formatData(titles)
        const _sql = `insert into film(title, bt) values ?`
        let result = await dbUtils.add(_sql, values)
        return result
    }
}