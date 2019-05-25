//标准输入输出
// process.stdin.pipe(process.stdout)

const http = require('http')
const server = http.createServer((req, res) => {
	// if(req.method === 'POST'){
	// 	req.pipe(res)
	// }
	if(req.method === 'GET'){
		var fileName = path.resolve(__dirname, 'data.txt')
		var stream = fs.createReadStream(fileName)
		stream.pipe(res)
	}
})

server.listen(8000)

var fs = require('fs')
var path = require('path')

// //读取文件内容
// fs.readFile(fileName, (err, data) => {
// 	if(err){
// 		console.error(err)
// 		return 
// 	}

// 	//data是二进制类型，需要转换为字符串
// 	console.log(data.toString())
// })
// //写入文件
// const content = '这是新写入的内容\n'
// const opt = {
// 	flag: 'a'  //追加写入 覆盖用 'w'
// }
// fs.writeFile(fileName, content, opt, (err) => {
// 	if(err){
// 		console.error(err)
// 	}
// })

//流的方式
//复制文件
//两个文件名
// var fileName1 = path.resolve(__dirname, 'data.txt')
// var fileName2 = path.resolve(__dirname, 'data-bak.txt')
// //读取文件的stream对象
// var readStream = fs.createReadStream(fileName1)
// //写入文件的stream对象
// var writeStream = fs.createWriteStream(fileName2)
// //执行拷贝， 通过pipe
// readStream.pipe(writeStream)
// //数据读取完成， 即拷贝完成
// readStream.on('data', chunk => {
// 	console.log(chunk.toString())
// })
// readStream.on('end', function(){
// 	console.log('拷贝完成')
// })
