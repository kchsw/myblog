const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/reModel')
const { set } = require('../db/redis')
//设置cookie过期时间 
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
	console.log('CookieExpires is ' + JSON.stringify(d.toGMTString()))
	return d.toGMTString()
}
const handleUserRouter = (req, res) => {
	const method = req.method //GET POST

	//登陆
	if(method === 'POST' && req.path === '/api/user/login'){
		console.log('req.body is' + JSON.stringify(req.body))
		const { username, password } = req.body
		const result = loginCheck(username, password)
		// return result.then(data => {
		// 	console.log(data)
		// 	return data.username ? new SuccessModel('登陆成功') : new ErrorModel('登陆失败')
		// })
		return result.then(data => {
			//设置session
			console.log(data)
		    req.session.username = data.username
		    req.session.realname = data.realname
		    //同步到redis中
		    set(req.sessionId, req.session)
		    console.log('req.session is' + JSON.stringify(req.session))	
			return data.username ? new SuccessModel('登陆成功') : new ErrorModel('登陆失败')
		})
		
	} 

	//登陆测试
	if(method === 'GET' && req.path === '/api/user/login-test'){
		if(req.session.username){
			return Promise.resolve(new SuccessModel({ session: req.session },'登陆成功'))
		}
		console.log(req.session.username)
		return Promise.resolve(new ErrorModel('登陆失败'))
	}

	//登陆测试1
	if(method === 'GET' && req.path === '/api/user/login-test1'){
		const { username, password } = req.query
		const result = loginCheck(username, password)
		return result.then(data => {
			//设置session
			console.log(data)
		    req.session.username = data.username
		    req.session.realname = data.realname
		    //同步到redis中
		    set(req.sessionId, req.session)
		    console.log('req.session is' + JSON.stringify(req.session))	
			return data.username ? new SuccessModel('登陆成功') : new ErrorModel('登陆失败')
		})
	}
}

module.exports = handleUserRouter