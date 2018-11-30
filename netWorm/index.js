const cheerio = require('cheerio')
const http = require('http')
const axios = require('axios')
const iconv = require('iconv-lite')

let index = 1
const baseUrl = 'http://www.ygdy8.net/html/gndy/dyzz/list_23_'
const titles = []

postData = (titles) => {
	console.log('+++++++++++++++++++++++++++++')
	axios({
		method: 'post',
		url: 'http://172.16.102.172:8000/api/worm/inject.json',
		data: {
			titles
		}
	}).then(res => {
		console.log('||||||||||||||||||||||||||||')
		console.log(res, 'res')
	}).catch(e => {
		console.log('???????????????????')
		console.log(e)
	}) 
}

getTitle = (url, i) => {
	console.log(`正在爬取${i}页`)
	http.get(`${url}${i}.html`, res => {
		const chunks = []
		res.on('data', chunk => {
			chunks.push(chunk)
		})
		res.on('end', () => {
			const html = iconv.decode(Buffer.concat(chunks), 'gb2312')
			const $ = cheerio.load(html, { decodeEntities: false })
			$('.co_content8 .ulink').each((idex, ele) => {
				const $ele = $(ele)
				titles.push({
					title: $ele.text()
				})
			})
			console.log(titles)
			if(i < 3) {
				getTitle(baseUrl, ++index)
			} else {
				console.log('爬虫结束')
				// post to db
				postData(titles)
			}
		})
	})
}

main = _ => {
	console.log('爬虫开始')
	getTitle(baseUrl, index)	
} 

main()

module.exports = {
	list: titles
}


