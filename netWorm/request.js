const axios = require('axios')

const request = opt => {
	const { method = 'post', url = '', data = {} } = opt
	return axios({
		method,
		url,
		data,
	}).then(res => {
		const { data } = res
		console.log(data, 'data')
	}).catch(e => {
		console.log(e, 'e')
	})
}

module.exports = request