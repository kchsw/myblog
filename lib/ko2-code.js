const http = require('http')
//组合中间件

function compose(middlewareList){
	return function(ctx){
		function dispatch(i){
			const fn = middlewareList[i]
			try{
				return Promise.resolve(
					fn(ctx, dispatch.bind(null, i + 1))  // <==绕来绕去就是执行这个函数 
					                                     // next ==> dispatch.bind(null, i + 1)
				)
			}catch(err){
				return Promise.reject(err)
			}
		}
		return dispatch(0)
	}
}

class LikeKoa2 {
	constructor {
		this.middlewareList = []		
	}

	use(fn){
		this.middlewareList.push(fn)
	}

	createContext(req, res){
		const ctx = {
			req,
			res
		}
		ctx.query = req.query
		return ctx
	}

	handleRequest(ctx, fn){
		return fn(ctx)
	}

	callback(){
		const fn = compose(this.middlewareList)

		return (req, res) => {
			cosnt ctx = this.createContext(req, res)
			return this.handleRequest(ctx, fn)
		}
	}

	listen(...args){
		const server = http.createServer(this.callback()) // this.callback() ==> fn(ctx)
		server.listen(...args)
	}
}

module.exports = LikeKoa2