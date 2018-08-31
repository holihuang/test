/*
** file: 批量引入静态图片插件
** author: huanghaolei
** date: 2018-08-06
**
 */ 

const fs = require('fs')
const path = require('path')
const mimeType = require('mime-types')
const uuidV1 = require('uuid/v1')

class ImportStatic {
	constructor(...args) {
		this.basePath = args[0]
		const { mode = 'dev' } = args[1]
		this.env = mode
		this.limitSize = args[2] || 1024 * 1024  //接收格式：string，默认：number, 1M 
		this.imgInfo = {}
		this.read()
	}

	/*
	**  @read: 读取目录里面的图片
	** 
	 */
	read() {
		const arr = []
		const dirPath = `${this.basePath}/images`

		try {
			const isImgDirectory = fs.statSync(dirPath).isDirectory()
			if(isImgDirectory) {
				
				const data = fs.readdirSync(dirPath) || []
				this.nameArr = data

				// 获取图片的路径|size|name信息
				this.getImgInfo(dirPath)
			}

		} catch(err) {
			console.error(err)
		}
	}

	/*
	** 	@getImgInfo: 获得图片的基本信息
	** 	@return { path, size, name }
	*/ 
	// size: byte(单位)
	getImgInfo(dirPath) {
		const pathArr = []
		const nameArr = this.nameArr || []
		nameArr.forEach((item, index) => {
			pathArr.push(`${dirPath}/${item}`)
		})
		this.imgInfoArr = this.insertNameAndSize(pathArr) || []
		this.translateImg()
	}

	/*
	**  @insertNameAndSize: 读取图片的size, name
	**  @return { size, name }
	*/
	insertNameAndSize(arr = []) {
		const list = []
		arr.forEach((item, index) => {
			const { size } = fs.statSync(item)
			list.push({ path: item, size, name: this.nameArr[index] })	
		})
		return list
	}

	/*
	** @formatLimitSize: 转换size阈值
	** @return { number }
	*/ 
	formatLimitSize() {
		let limitSize
		if(typeof this.limitSize === 'number') {
			limitSize = this.limitSize
		} else {
			const number = this.limitSize.replace(/\D/g, '')
			let weight = 1
			if(this.limitSize.indexOf('k') > -1 || this.limitSize.indexOf('K') > -1) {
				weight = 1024
			} else if(this.limitSize.indexOf('m') > -1 || this.limitSize.indexOf('M') > -1) {
				weight = 1024 * 1024 
			}
			limitSize = number * weight
		}
		return limitSize
	}

	/*
	** @copyImg: 移动图片(移动到dist/images)
	** @默认是以react-redux文件目录结构为参考
	*/
	copyImg(opt) {
		const { item, index } = opt
		const [rootPath] = this.basePath.split('src')
		const dest = `${rootPath}dist/images/${item.name.split('.')[0]}@${uuidV1()}.${item.name.split('.')[1]}`
		const readStream = fs.createReadStream(item)
		const writeStream = fs.createWriteStream(dest)
		readStream.pipe(writeStream)
		return dest
	}

	/*
	**	@translateImg: 转换图片为base64，或开发者模式引组件内的静态图片，生产模式下引dist/images下的图片
	**
	 */ 
	translateImg() {
		const arr = this.imgInfoArr 
		const limitSize = this.formatLimitSize()
		arr.forEach((item, index) => {
			const { path, size = '', name = '' } = item
			const [key] = name.split('.')
			let value = ''
			if(+size < limitSize ) {
				// 转换成base64格式
				const base64Str = new Buffer(fs.readFileSync(path)).toString('base64')
				const base64 = `data:${mimeType.lookup(path)};base64,${base64Str}`
				value = base64
			} else {
				// 开发者模式引模块内的图片，生产者模式下引dist/images下的图片
				if(this.env === '"production"') {
					value = this.copyImg({ item, index })	
				} else {
					value = path
				}
			}
			this.imgInfo[key] = value
		})
	}

}

module.exports = ImportStatic

