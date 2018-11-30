const model = require('./../models/api')

module.exports = {
	async getInject(formData = {}) {
        const resultData = await model.getInject({...formData})
        return resultData
    },
}