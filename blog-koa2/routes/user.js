const { SuccessModel, ErrorModel } = require('../model/reModel')
const { loginCheck } = require('../controller/user')
const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
	const { username, password } = ctx.request.body
	const data = await loginCheck(username, password)
	if(data.username){
		//设置session
		ctx.session.username = data.username
		ctx.session.realname = data.realname
		ctx.body = new SuccessModel('登陆成功')
		return	
	}else{
		ctx.body = new ErrorModel('登陆失败')
	}
	// const result = loginCheck(username, password)
	// return result.then(data => {
	// 	console.log(data)
	// 	if(data.username){
	// 		//设置session
	// 		req.session.username = data.username
	// 		req.session.realname = data.realname
	// 		res.json(new SuccessModel('登陆成功'))
	// 		return	
	// 	}
		
	// 	res.json(new ErrorModel('登陆失败'))
	// })
})

router.get('/session-test', async function(ctx, next){
	if(ctx.session.viewCount == null){
		ctx.session.viewCount = 0
	}
	ctx.session.viewCount++
	ctx.body = {
		viewCount: ctx.session.viewCount
	}
})


module.exports = router
