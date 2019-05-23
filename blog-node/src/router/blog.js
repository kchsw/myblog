const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/reModel')
const handleBlogRouter = (req, res) => {
	const method = req.method //GET POST
	const id = req.query.id || ''
	//获取博客列表
	if(method === 'GET' && req.path === '/api/blog/list'){

		const author = req.query.author || ''
		const keyword = req.query.keyword || ''
		// const listData = getList(author, keyword)
		// return new SuccessModel(listData)
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
		req.body.author = 'app'
		const result = newBlog(req.body)
		return result.then(data => {
			return new SuccessModel(data)
		})
	}

	//更新一篇博客
	if(method === 'POST' && req.path === '/api/blog/update'){
		const result = updateBlog(id, req.body)
		return result.then(val => {
			return val ? new SuccessModel('更新博客成功') : new ErrorModel('更新博客失败')
		})	
	}

	//删除一篇博客
	if(method === 'POST' && req.path === '/api/blog/del'){
		const author = 'app'
		const result = deleteBlog(id, author)
		return result.then(val => {
			return val ? new SuccessModel('删除博客成功') : new ErrorModel('删除博客失败')
		})
	}

}

module.exports = handleBlogRouter