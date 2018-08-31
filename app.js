const fs = require('fs')
const path = require('path')
const mimeType = require('mime-types')

class ImportStatic {
	constructor(...args) {
		this.basePath = args[0]
		this.base64 = {}
		this.read()
	}

	read() {
		const arr = []
		const dirPath = `${this.basePath}/images`
		const data = fs.readdirSync(dirPath) || []
		this.nameArr = data
		data.forEach(item => {
			arr.push(`${dirPath}/${item}`)
		})
		
		// 区分图片|图标，默认1M
		this.translateImg(arr)
		// this.translateToBase64(arr)
	}

	translateImg(arr = []) {
		arr.forEach((item, index) => {
			// to do - 区分图片|图标
			
		})
	}

	translateToBase64(arr = []) {
		arr.forEach((item, index) => {
			const key = this.nameArr[index].split('.')[0]
			const base64Str = new Buffer(fs.readFileSync(item)).toString('base64')
			const base64 = `data:${mimeType.lookup(item)};base64,${base64Str}`
			this.base64[key] = base64
		})
	}

}

module.exports = ImportStatic

