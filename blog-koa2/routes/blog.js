const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/reModel')
const isLogin = require('../middleware/isLogin')
const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
	let author = ctx.query.author || ''
	const keyword = ctx.query.keyword || ''
	if(ctx.query.isadmin){
		//管理员界面
		if(ctx.session.username == null){
			//未登录
			ctx.body = new ErrorModel('请登陆')
			return 
		}
		//强制查询自己的博客
		author = ctx.session.username

	}
	const listData = await getList(author, keyword)
	ctx.body = new SuccessModel(listData)
	// const result = getList(author, keyword)
	// return result.then(listData => {
	// 	res.json(new SuccessModel(listData)) 
	// })
})

router.get('/detail', async (ctx, next) => {
	const data = await getDetail(ctx.query.id)
	ctx.body = new SuccessModel(data)
	// const result = getDetail(req.query.id)

	// return result.then(data => {
	// 	res.json(new SuccessModel(data))
	// })
})

router.post('/new', isLogin, async (ctx, next) => {
	ctx.request.body.author = ctx.session.username
	const data = await newBlog(ctx.request.body)
	ctx.body = new SuccessModel(data)
	// const result = newBlog(ctx.body)
	// return result.then(data => {
	// 	res.json(new SuccessModel(data))
	// })
})

router.post('/update', isLogin, async (ctx, next) => {
	const val = await updateBlog(ctx.query.id, ctx.request.body)
	ctx.body = val ? new SuccessModel('更新博客成功') : new ErrorModel('更新博客失败')
	// const result = updateBlog(req.query.id, req.body)
	// return result.then(val => {
	// 	val ? res.json(new SuccessModel('更新博客成功')) : res.json(new ErrorModel('更新博客失败'))
	// })	
})

router.post('/del', isLogin, async (ctx, next) => {
	const author = ctx.session.username
	const val = await deleteBlog(ctx.query.id, author)
	ctx.body = val ? new SuccessModel('删除博客成功') : new ErrorModel('删除博客失败')
	// const author = req.session.username
	// const result = deleteBlog(req.query.id, author)
	// return result.then(val => {
	// 	val ? res.json(new SuccessModel('删除博客成功')) : res.json(new ErrorModel('删除博客失败'))
	// })	
})



module.exports = router
