const http = require('http')
const axios = require('axios')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')

const ipAddress = 'www.ygdy8.net'
const baseUrl = 'http://www.ygdy8.net/html/gndy/dyzz/list_23_'
let index = 1
const titles = []

// postData: send to db

postData = titles => {
	axios({
		method: 'post',
		url: 'http://localhost:8000/api/worm/inject.json',
		data: {
			titles
		},
	}).then(res => {
		const { data } = res
		console.log(data, 'data')
	}).catch(e => {
		console.log(e, 'e')
	})
}

getBt = (url, i) => {
	http.get(`http://${ipAddress}${url}`, res => {
		const chunks = []
		res.on('data', chunk => {
			chunks.push(chunk)
		})
		res.on('end', () => {
			const html = iconv.decode(Buffer.concat(chunks), 'gb2312')
			const $ = cheerio.load(html, { decodeEntities: false })
			const bt = $('#Zoom table a').attr('href')
			titles[i]['bt'] = bt
			console.log(titles, '00000')
		})
	})
}


fetchBt = _ => {
	titles.forEach((item, index) => {
		const { btUrl } = item
		getBt(btUrl, index)
	})
}


// fetch data
fetchData = (url, i) => {
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
				const btUrl = $ele.attr('href')
				console.log(btUrl, 'sasa')
				titles.push({
					title: $ele.text(),
					btUrl
				})
			})
			console.log(titles)
			if(i < 3) {
				fetchData(baseUrl, ++index)
			} else {
				console.log('爬虫结束')
				// post to db
				// postData(titles)
				fetchBt()
			}
		})
	})
}

main = _ => {
	console.log('爬虫开始')
	fetchData(baseUrl, index)
}


main()