const fs = require('fs')
const mime = require('mime-types')

console.log(mime, 'haha')

const path = './images/Tulips.jpg'

fs.readFile(path, (err, data) => {
	if (err) throw err;
	const base64Str = new Buffer(data).toString('base64')
	console.log(mime.lookup(path), 'llllll')
	const out = 'data:' + mime.lookup(path) + ';base64,' + base64Str
	fs.writeFileSync('./home.js', out)
})