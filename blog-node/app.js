const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
//mysql pw #2/aa<aB<Swey
//设置cookie过期时间 
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
	console.log('CookieExpires is ' + JSON.stringify(d.toGMTString()))
	return d.toGMTString()
}
//处理post Data
const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
    	if(req.method !== 'POST'){
    		resolve({})
    		return 
    	}
    	if(req.headers['content-type'] !== 'application/json'){
    		resolve({})
    		return   
    	}
    	let postData = ''
		req.on('data', chunk => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			if(!postData){
				resolve({})
    			return  
			}
			resolve(JSON.parse(postData))
		})
	})
    return promise
}

//session 数据
const SESSION_DATA = {}
const serverHandle = (req, res) => {
    
	//设置返回格式 JSON
	res.setHeader('Content-type', 'application/json')

	// const resData = {
	// 	name: 'kchsw',
	// 	site: 'imooc',
	// 	env: process.env.NODE_ENV
	// }

	// res.end(
	// 	JSON.stringify(resData)
	// )

	//获取path
	const url = req.url
	req.path = url.split('?')[0]

	//解析query
	req.query = querystring.parse(url.split("?")[1])

	//解析cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || ''
	cookieStr.split(';').forEach(item => {
		if(!item) return 
			const arr = item.split('=')
			const key = arr[0].trim()
			const val = arr[1].trim()
			req.cookie[key] = val 
	})
	console.log('cookie is' + JSON.stringify(req.cookie))

	//解析session
	let needSetCookie = false
	let userId = req.cookie.userid
	if(userId){
		if(!SESSION_DATA[userId]){
			SESSION_DATA[userId] = {}
		}	
	}else{
		//第一次登陆的情况
		userId = `${Date.now()}_${Math.random()}`
		SESSION_DATA[userId] = {}
		needSetCookie = true
	}
	req.session = SESSION_DATA[userId]
	//处理post Data成功
    getPostData(req).then(postData => {
    	req.body = postData
	    //处理 blog 路由
		// const blogData = handleBlogRouter(req, res)
		// if(blogData){
		// 	res.end(JSON.stringify(blogData))
		// 	return 
		// }
		const blogResult = handleBlogRouter(req, res)
		if(blogResult){
			blogResult.then(blogData => {
				if(needSetCookie){
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
				}
				res.end(JSON.stringify(blogData))
			})
			return 
		}

		//处理 user 路由
		// const userData = handleUserRouter(req, res)
		// if(userData){ 
		// 	res.end(JSON.stringify(userData))
		// 	return 
		// }

		const userResult = handleUserRouter(req, res)
		if(userResult){ 
			userResult.then(userData => {
				if(needSetCookie){
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
				}
				res.end(JSON.stringify(userData))
			})	
			return 
		}

		//未命中路由, 返回404

		res.writeHead(404, {"Content-type": "text/plain"})
		res.write("404 Not Found\n")
		res.end()

    })	
}

module.exports = serverHandle