const userModel = require('./../models/api')

module.exports = {
    async getTxt(formData = {}) {
        const resultData = await userModel.getTxt({...formData})
        return resultData
    }
}