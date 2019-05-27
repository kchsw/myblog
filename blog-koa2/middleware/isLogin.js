const { SuccessModel, ErrorModel } = require('../model/reModel')

module.exports = async (ctx, next) => {
	if(ctx.session.username){
		await next()
		return 
	}
	ctx.body = new ErrorModel('请登陆')
}