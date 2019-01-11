const service = require('./../services/api')

module.exports = {
	async getInject(ctx) {
        const formData = ctx.request.body || {}
        const result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        const userResult = await service.getInject( formData )
        if (userResult) {
            result.success = true
            result.data = userResult
        }
        ctx.body = result
    },
}