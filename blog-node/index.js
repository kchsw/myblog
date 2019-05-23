const http = require("http")
const querystring = require('querystring')


const server = http.createServer((req, res) => {
	//处理get请求
	// const url = req.url
	// req.query = querystring.parse(url.split("?")[1])
	// res.end(JSON.stringify(req.query))
	// res.end("hello world")

	//处理post请求
	// if(req.method === "POST"){
	// 	console.log('content-type', req.headers['content-type'])
	// 	let postData = ''
	// 	req.on("data", chunk => {
	// 		postData += chunk.toString()
	// 	})
	// 	req.on("end", () => {
	// 		console.log(postData)
	// 		res.end("hello word")
	// 	})
	// }

	const method = req.method
	const url = req.url
	const path = url.split('?')[0]
	const query = querystring.parse(url.split('?')[1])
    //设置返回格式为JSON
	res.setHeader('Content-type', 'application/json')

	//返回的数据
	const resData = {
		method,
		url,
		path,
		query
	}

	//返回
	if(method === 'GET'){
		res.end(JSON.stringify(resData))
	}
	if(method === 'POST'){
		let postData = ''
		req.on('data', chunk => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			resData.postData = postData
			res.end(JSON.stringify(resData))
		})
	}
})

server.listen(3000, () => {
	console.log("server work")
})