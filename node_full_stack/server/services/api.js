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
}