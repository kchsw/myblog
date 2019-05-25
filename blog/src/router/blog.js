const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/reModel')
const handleBlogRouter = (req, res) => {
	const method = req.method //GET POST
	const id = req.query.id || ''

	//统一的登陆验证函数
	const isLogin = function(req){
		if(!req.session.username){
			return Promise.resolve(new ErrorModel('登陆失败'))
		}
	}


	//获取博客列表
	if(method === 'GET' && req.path === '/api/blog/list'){

		let author = req.query.author || ''
		const keyword = req.query.keyword || ''
		// const listData = getList(author, keyword)
		// return new SuccessModel(listData)
		if(req.query.isadmin){
			//管理员界面
			const checkResult = isLogin(req)
			if(checkResult){
				//未登录
				return checkResult
			}

			//强制查询自己的博客
			author = req.session.username

		}
		const result = getList(author, keyword)
		return result.then(listData => {
			return new SuccessModel(listData)
		})
	}

	//获取博客详情

	if(method === 'GET' && req.path === '/api/blog/detail'){
		
		const result = getDetail(id)

		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	//新建一篇博客
	if(method === 'POST' && req.path === '/api/blog/new'){

		const checkResult = isLogin(req)
		if(checkResult){
			//未登录
			return checkResult
		}

		req.body.author = req.session.username
		const result = newBlog(req.body)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	//更新一篇博客
	if(method === 'POST' && req.path === '/api/blog/update'){

		const checkResult = isLogin(req)
		if(checkResult){
			//未登录
			return checkResult
		}

		const result = updateBlog(id, req.body)
		return result.then(val => {
			return val ? new SuccessModel('更新博客成功') : new ErrorModel('更新博客失败')
		})	
	}

	//删除一篇博客
	if(method === 'POST' && req.path === '/api/blog/del'){

		const checkResult = isLogin(req)
		if(checkResult){
			//未登录
			return checkResult
		}

		req.body.author = req.session.username
		const result = deleteBlog(id, author)
		return result.then(val => {
			return val ? new SuccessModel('删除博客成功') : new ErrorModel('删除博客失败')
		})
	}

}

module.exports = handleBlogRouter