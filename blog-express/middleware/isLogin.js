const { SuccessModel, ErrorModel } = require('../model/reModel')

module.exports = (req, res, next) => {
	if(req.session.username){
		next()
		return 
	}
	res.json(new ErrorModel('请登陆'))
}