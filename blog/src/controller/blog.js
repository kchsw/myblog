const { exec } = require('../db/mysql')
const xss = require('xss')
const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `
	if(author){
		sql += `and author='${author}' `
	}
	if(keyword){
		sql += `and title like '%${keyword}%' `
	}
	sql += `order by createTime desc;`

	//返回promise
	return exec(sql)
	// return [
	// 	{author, keyword},
	// 	{
	// 		id: 1,
	// 		title: '标题1',
	// 		content: '内容S',
	// 		createTime: 1558018215083
	// 	},{
	// 		id: 21,
	// 		title: '标题13',
	// 		content: '内容3S',
	// 		createTime: 1558018215583
	// 	}
	// ]
}

const getDetail = (id) => {
	const sql = `select * from blogs where id='${id}';`
	return exec(sql).then(rows => {
		return rows[0]
	})
}

const newBlog = (blogData = {}) => {
	const { author } = blogData
	const title = xss(blogData.title)
	const content = xss(blogData.content)
	const createTime = Date.now()

	const sql = `
		insert into blogs (title, content, createTime, author) 
		values ('${title}', '${content}', ${createTime}, '${author}');
	`
	return exec(sql).then(insertData => {
		console.log('insertData is' + JSON.stringify(insertData))
		return {
			id: insertData.insertId
		}
	})
}

const updateBlog = (id, blogData = {}) => {
	const { title, content } = blogData
	const sql = `
		update blogs set title='${title}', content='${content}' where id=${id}
	`
	return exec(sql).then(updateData => {
		console.log('updateData is' + JSON.stringify(updateData))
		if(updateData.affectedRows > 0){
			return true
		}
		return false
	})
}

const deleteBlog = (id, author) => {
	const sql = `
		delete from blogs where id='${id}' and author='${author}';
	`
	return exec(sql).then(deleteData => {
		console.log('deleteData is' + JSON.stringify(deleteData))
		if(deleteData.affectedRows > 0){
			return true
		}
		return false
	})
}
module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
}