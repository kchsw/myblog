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

//绕来绕去就是通过中间件里的await next()来递归调用dispatch拿到中间件函数队列的下一个中间件来执行。
// 中间件里的next就是排在它后面的中间件，执行next()就会按顺序去执行队列里中间件直到最后一个，
// 中间件里的await next()会停滞它后面代码的执行，到最后一个中间件时它是没有next()的会返回Promise.resolve(undefiend),
// 它的上一个中间件即倒数第二个中间件await到了这个Promise后执行await next()后的代码返回Promise.resolve(undefiend)
// 它的上一个中间件，这样就逆序的执行了中间件await next()后的代码，实现了洋葱圈的模型。