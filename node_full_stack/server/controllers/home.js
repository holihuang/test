const getUser = require('../services/home')

async function query(ctx) {
    ctx.body = await getUser()
}

module.exports = query