const userInfoService = require('./../services/api')

module.exports = {
    // btn data
    async getTxt(ctx) {
        const formData = ctx.request.body || {}
        const result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        const userResult = await userInfoService.getTxt( formData )
        if (userResult) {
            result.success = true
            result.data = userResult
        }
        ctx.body = result
    },
    async addInfo(ctx) {
        const formData = ctx.request.body || {}
        const result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        const userResult = await userInfoService.addInfo( formData )
        if (userResult) {
            result.success = true
            result.data = true
        }
        ctx.body = result
    }
}