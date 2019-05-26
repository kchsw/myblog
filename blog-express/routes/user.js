const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/reModel')
const { loginCheck } = require('../controller/user')

router.post('/login', function(req, res, next){
	const { username, password } = req.body
	const result = loginCheck(username, password)
	return result.then(data => {
		console.log(data)
		if(data.username){
			//设置session
			req.session.username = data.username
			req.session.realname = data.realname
			res.json(new SuccessModel('登陆成功'))
			return	
		}
		
		res.json(new ErrorModel('登陆失败'))
	})
})

router.get('/login-test', (req, res, next) => {
	if(req.session.username){
		res.json({
			errno: 1,
			msg: 'success'
		})
		return 
	}
	res.json({
		errno: -1,
		msg: 'fail'
	})
})
// router.get('/session-test', (req, res, next) => {
// 	const session = req.session
// 	if(session.viewnum == null){
// 		session.viewnum = 0
// 	}
// 	session.viewnum++
// 	res.json({
// 		viewnum: session.viewnum
// 	})
// })

module.exports = router